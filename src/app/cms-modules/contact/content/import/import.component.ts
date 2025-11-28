import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  ContactContentModel,
  ContactContentService,
  ContactImportApplyRequestDtoModel,
  ContactImportApplyResultModel,
  ContactImportDestinationHeaderModel,
  ContactImportMappingItem,
  ContactImportPreviewResponseModel,
  GoogleContactFileType,
} from "ntk-cms-api";
import { firstValueFrom } from "rxjs";
import { ListBaseComponent } from "src/app/core/cmsComponent/listBaseComponent";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { PageInfoService } from "src/app/core/services/page-info.service";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { PublicHelper } from "../../../../core/helpers/publicHelper";
import { CmsToastrService } from "../../../../core/services/cmsToastr.service";

@Component({
  selector: "app-contact-content-import",
  templateUrl: "./import.component.html",
  styleUrls: ["./import.component.scss"],
  standalone: false,
})
export class ContactContentImportComponent
  extends ListBaseComponent<ContactContentService, ContactContentModel, string>
  implements OnInit, OnDestroy
{
  @ViewChild("fileInput") fileInput?: ElementRef<HTMLInputElement>;

  constructorInfoAreaId = this.constructor.name;
  readonly fileAccept = ".csv,.xls,.xlsx,.vcf";
  readonly allowedExtensions = [".csv", ".xls", ".xlsx", ".vcf"];
  readonly previewProcessKey = `${this.constructor.name}_preview`;
  readonly applyProcessKey = `${this.constructor.name}_apply`;

  previewResponse?: ContactImportPreviewResponseModel;
  applyResult?: ContactImportApplyResultModel;

  sourceHeaders: string[] = [];
  destinationHeaders: ContactImportDestinationHeaderModel[] = [];
  sampleRows: Array<{ [key: string]: string }> = [];
  mappingSelections: Record<string, string> = {}; // destinationKey -> sourceHeader
  sourceToDestinationMapping: Record<string, string> = {}; // sourceHeader -> destinationKey

  selectedFile?: File;
  isPreviewLoading = false;
  isApplyLoading = false;
  lastPreviewError = "";
  lastApplyError = "";

  fileTypeTranslationMap: Record<GoogleContactFileType, string> = {
    [GoogleContactFileType.Unknown]: "CONTACT.IMPORT.FILE_TYPE.UNKNOWN",
    [GoogleContactFileType.GoogleCsv]: "CONTACT.IMPORT.FILE_TYPE.GOOGLE",
    [GoogleContactFileType.OutlookCsv]: "CONTACT.IMPORT.FILE_TYPE.OUTLOOK",
    [GoogleContactFileType.VCard]: "CONTACT.IMPORT.FILE_TYPE.VCARD",
    [GoogleContactFileType.Excel]: "CONTACT.IMPORT.FILE_TYPE.EXCEL",
  };

  constructor(
    public contentService: ContactContentService,
    private cmsToastrService: CmsToastrService,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
    public tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    public pageInfo: PageInfoService,
    public publicHelper: PublicHelper,
  ) {
    super(
      contentService,
      new ContactContentModel(),
      publicHelper,
      tokenHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
  }

  ngOnInit(): void {
    this.translate
      .get(["CONTACT.IMPORT.PAGE_TITLE", "CONTACT.IMPORT.PAGE_DESCRIPTION"])
      .subscribe((texts) => {
        this.pageInfo.updateTitle(texts["CONTACT.IMPORT.PAGE_TITLE"]);
        this.pageInfo.updateDescription(
          texts["CONTACT.IMPORT.PAGE_DESCRIPTION"],
        );
      });
  }

  ngOnDestroy(): void {
    this.publicHelper.processService.processStop(this.previewProcessKey);
    this.publicHelper.processService.processStop(this.applyProcessKey);
  }

  get missingRequiredHeaders(): ContactImportDestinationHeaderModel[] {
    if (!this.destinationHeaders?.length) {
      return [];
    }
    return this.destinationHeaders.filter(
      (destination) =>
        destination.required && !this.mappingSelections[destination.key],
    );
  }

  get isApplyDisabled(): boolean {
    return (
      !this.previewResponse ||
      !this.selectedFile ||
      this.isApplyLoading ||
      this.missingRequiredHeaders.length > 0
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) {
      return;
    }
    if (!this.isExtensionAllowed(file)) {
      this.translate
        .get("CONTACT.IMPORT.ERROR_UNSUPPORTED_FILE")
        .subscribe((message) => {
          this.cmsToastrService.typeErrorMessage(message);
          this.lastPreviewError = message;
        });
      this.clearFileSelection();
      return;
    }
    this.selectedFile = file;
    this.lastPreviewError = "";
    this.lastApplyError = "";
    this.applyResult = undefined;
    this.requestPreview(file);
  }

  onRemoveFile(): void {
    this.clearFileSelection();
  }

  onResetImport(): void {
    if (!this.selectedFile || this.isPreviewLoading) {
      return;
    }
    this.applyResult = undefined;
    this.lastApplyError = "";
    this.requestPreview(this.selectedFile);
  }

  onMappingChange(): void {
    this.lastApplyError = "";
    this.updateSourceToDestinationMapping();
    this.cdr.detectChanges();
  }

  /**
   * تغییر mapping از source header به destination
   */
  onSourceHeaderMappingChange(
    sourceHeader: string,
    destinationKey: string,
  ): void {
    // اگر قبلاً این source header برای destination دیگری استفاده شده بود، آن را پاک کن
    const previousDestination = this.sourceToDestinationMapping[sourceHeader];
    if (previousDestination && previousDestination !== destinationKey) {
      this.mappingSelections[previousDestination] = "";
    }

    // اگر این destination قبلاً source header دیگری داشت، آن را از sourceToDestinationMapping پاک کن
    const previousSource = Object.keys(this.sourceToDestinationMapping).find(
      (key) => this.sourceToDestinationMapping[key] === destinationKey,
    );
    if (previousSource && previousSource !== sourceHeader) {
      delete this.sourceToDestinationMapping[previousSource];
    }

    // mapping جدید را تنظیم کن
    if (destinationKey && destinationKey.trim() !== "") {
      this.sourceToDestinationMapping[sourceHeader] = destinationKey;
      this.mappingSelections[destinationKey] = sourceHeader;
    } else {
      delete this.sourceToDestinationMapping[sourceHeader];
      if (previousDestination) {
        this.mappingSelections[previousDestination] = "";
      }
    }

    this.onMappingChange();
  }

  /**
   * به‌روزرسانی sourceToDestinationMapping از mappingSelections
   */
  private updateSourceToDestinationMapping(): void {
    this.sourceToDestinationMapping = {};
    Object.entries(this.mappingSelections).forEach(
      ([destinationKey, sourceHeader]) => {
        if (sourceHeader && sourceHeader.trim() !== "") {
          this.sourceToDestinationMapping[sourceHeader] = destinationKey;
        }
      },
    );
  }

  /**
   * بررسی می‌کند که آیا یک destination قبلاً برای source header دیگری استفاده شده است
   */
  isDestinationUsed(
    destinationKey: string,
    currentSourceHeader: string,
  ): boolean {
    if (!destinationKey || destinationKey.trim() === "") {
      return false;
    }
    return Object.entries(this.sourceToDestinationMapping).some(
      ([sourceHeader, destKey]) =>
        sourceHeader !== currentSourceHeader && destKey === destinationKey,
    );
  }

  /**
   * دریافت destination key برای یک source header
   */
  getDestinationForSource(sourceHeader: string): string {
    return this.sourceToDestinationMapping[sourceHeader] || "";
  }

  /**
   * لیست ستون‌هایی که mapping شده‌اند (برای نمایش در جدول)
   */
  get mappedColumns(): Array<{
    sourceHeader: string;
    destination: ContactImportDestinationHeaderModel;
  }> {
    return Object.entries(this.sourceToDestinationMapping)
      .map(([sourceHeader, destinationKey]) => {
        const destination = this.destinationHeaders.find(
          (d) => d.key === destinationKey,
        );
        return destination ? { sourceHeader, destination } : null;
      })
      .filter(
        (
          item,
        ): item is {
          sourceHeader: string;
          destination: ContactImportDestinationHeaderModel;
        } => item !== null,
      );
  }

  async onApplyImport(): Promise<void> {
    if (this.isApplyDisabled) {
      return;
    }
    const confirmed = await this.askForConfirmation();
    if (!confirmed) {
      return;
    }
    this.lastApplyError = "";
    this.applyResult = undefined;
    this.isApplyLoading = true;
    const model = this.buildApplyModel();
    this.translate.get("MESSAGE.Receiving_information").subscribe((message) => {
      this.publicHelper.processService.processStart(
        this.applyProcessKey,
        message,
        this.constructorInfoAreaId,
      );
    });
    // در model.mappings هر کدوم که SourceHeader خال است آر ردیف را حذف کن
    if (Array.isArray(model.mappings)) {
      model.mappings = model.mappings.filter(
        (m) => !!m.sourceHeader && m.sourceHeader.trim() !== "",
      );
    }
    this.contentService.ServiceImportApply(model).subscribe({
      next: (response) => {
        this.isApplyLoading = false;
        this.publicHelper.processService.processStop(this.applyProcessKey);
        if (response.isSuccess) {
          this.applyResult = response.item;
          this.translate
            .get("CONTACT.IMPORT.APPLY_SUCCESS")
            .subscribe((message) => {
              this.cmsToastrService.typeSuccessMessage(message);
            });
        } else {
          this.lastApplyError = response.errorMessage;
          this.cmsToastrService.typeErrorMessage(response.errorMessage);
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isApplyLoading = false;
        this.publicHelper.processService.processStop(
          this.applyProcessKey,
          false,
        );
        this.lastApplyError = error;
        this.cmsToastrService.typeError(error);
      },
    });
  }

  formatFileSize(file?: File): string {
    if (!file) {
      return "";
    }
    const size = file.size;
    if (size < 1024) {
      return `${size} B`;
    }
    const kb = size / 1024;
    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }
    const mb = kb / 1024;
    if (mb < 1024) {
      return `${mb.toFixed(1)} MB`;
    }
    const gb = mb / 1024;
    return `${gb.toFixed(1)} GB`;
  }

  trackByHeader(_index: number, header: string): string {
    return header;
  }

  trackByMappedColumn(
    _index: number,
    item: {
      sourceHeader: string;
      destination: ContactImportDestinationHeaderModel;
    },
  ): string {
    return item.sourceHeader;
  }

  trackByDestination(
    _index: number,
    destination: ContactImportDestinationHeaderModel,
  ): string {
    return destination.key;
  }

  private requestPreview(file: File): void {
    this.isPreviewLoading = true;
    this.previewResponse = undefined;
    this.sourceHeaders = [];
    this.destinationHeaders = [];
    this.sampleRows = [];
    this.mappingSelections = {};
    this.applyResult = undefined;
    this.lastPreviewError = "";
    this.translate.get("MESSAGE.Receiving_information").subscribe((message) => {
      this.publicHelper.processService.processStart(
        this.previewProcessKey,
        message,
        this.constructorInfoAreaId,
      );
    });
    this.contentService.ServiceImportPreview(file).subscribe({
      next: (response) => {
        this.isPreviewLoading = false;
        this.publicHelper.processService.processStop(this.previewProcessKey);
        if (response.isSuccess) {
          this.previewResponse = response.item;
          this.sourceHeaders = response.item?.sourceHeaders ?? [];
          this.destinationHeaders = response.item?.destinationHeaders ?? [];
          this.sampleRows = response.item?.sampleRows ?? [];
          this.initializeMappings();
          this.translate
            .get("CONTACT.IMPORT.PREVIEW_READY")
            .subscribe((message) => {
              this.cmsToastrService.typeSuccessMessage(message);
            });
        } else {
          this.lastPreviewError = response.errorMessage;
          this.cmsToastrService.typeErrorMessage(response.errorMessage);
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isPreviewLoading = false;
        this.publicHelper.processService.processStop(
          this.previewProcessKey,
          false,
        );
        this.lastPreviewError = error;
        this.cmsToastrService.typeError(error);
      },
    });
  }

  private initializeMappings(): void {
    this.mappingSelections = {};
    this.sourceToDestinationMapping = {};
    if (!this.destinationHeaders?.length) {
      return;
    }
    this.destinationHeaders.forEach((destination) => {
      const autoMatch = this.findAutoMatch(destination);
      if (autoMatch) {
        this.mappingSelections[destination.key] = autoMatch;
        this.sourceToDestinationMapping[autoMatch] = destination.key;
      } else {
        this.mappingSelections[destination.key] = "";
      }
    });
  }

  private findAutoMatch(
    destination: ContactImportDestinationHeaderModel,
  ): string | undefined {
    if (!destination || !this.sourceHeaders?.length) {
      return undefined;
    }
    const normalizedDestinationTitles = [destination.title, destination.key]
      .filter((value) => !!value)
      .map((value) => value.toLowerCase());
    return this.sourceHeaders.find((header) =>
      normalizedDestinationTitles.includes(header.toLowerCase()),
    );
  }
  model = new ContactImportApplyRequestDtoModel();
  private buildApplyModel(): ContactImportApplyRequestDtoModel {
    this.model.sessionId = this.previewResponse?.sessionId ?? "";
    this.model.mappings = this.destinationHeaders.map((destination) => {
      const item = new ContactImportMappingItem();
      item.destinationKey = destination.key;
      item.sourceHeader = this.mappingSelections[destination.key] ?? "";
      return item;
    });
    return this.model;
  }

  private clearFileSelection(): void {
    this.selectedFile = undefined;
    this.previewResponse = undefined;
    this.sourceHeaders = [];
    this.destinationHeaders = [];
    this.sampleRows = [];
    this.mappingSelections = {};
    this.sourceToDestinationMapping = {};
    this.applyResult = undefined;
    this.lastPreviewError = "";
    this.lastApplyError = "";
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = "";
    }
    this.cdr.detectChanges();
  }

  private isExtensionAllowed(file: File): boolean {
    const extension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();
    return this.allowedExtensions.includes(extension);
  }

  private async askForConfirmation(): Promise<boolean> {
    const translated = await firstValueFrom(
      this.translate.get([
        "CONTACT.IMPORT.CONFIRM_APPLY_TITLE",
        "CONTACT.IMPORT.CONFIRM_APPLY_MESSAGE",
      ]),
    );
    return this.cmsConfirmationDialogService.confirm(
      translated["CONTACT.IMPORT.CONFIRM_APPLY_TITLE"],
      translated["CONTACT.IMPORT.CONFIRM_APPLY_MESSAGE"],
    );
  }
}
