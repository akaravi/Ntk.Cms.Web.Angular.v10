import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
    CoreEnumService,
    CoreUserModel,
    CrmAccountModel,
    CrmAccountService,
    CrmEnumService,
    DataFieldInfoModel,
    ErrorExceptionResult,
    InfoEnumModel,
    TokenInfoModelV3
} from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";


/**
 * Component افزودن Account جدید در CRM.
 * این component فرم افزودن Account جدید را نمایش می‌دهد.
 */
@Component({
  selector: "app-crm-account-add",
  templateUrl: "./add.component.html",
  standalone: false,
})
export class CrmAccountAddComponent
  extends AddBaseComponent<CrmAccountService, CrmAccountModel, string>
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CrmAccountAddComponent>,
    public coreEnumService: CoreEnumService,
    public crmAccountService: CrmAccountService,
    public crmEnumService: CrmEnumService,
    public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
  ) {
    super(crmAccountService, new CrmAccountModel(), publicHelper, translate);
    this.publicHelper.processService.cdr = this.cdr;
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];
  fileManagerTree: TreeModel;
  appLanguage = "fa";
  tokenInfo = new TokenInfoModelV3();
  dataModelResult: ErrorExceptionResult<CrmAccountModel> =
    new ErrorExceptionResult<CrmAccountModel>();
  dataModel: CrmAccountModel = new CrmAccountModel();

  dataModelCrmAccountRatingEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelCrmAccountTypeEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    this.translate.get("TITLE.ADD").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

    this.DataGetAccess();
    // Commented: Enum methods not available in API
    // this.getCrmAccountRatingEnum();
    // this.getCrmAccountTypeEnum();
  }

  /**
   * دریافت اطلاعات CrmAccountRatingEnum
   * Commented: Enum method not available in API
   */
  getCrmAccountRatingEnum(): void {
    // this.crmEnumService.ServiceCrmAccountRatingEnum().subscribe((res) => {
    //   this.dataModelCrmAccountRatingEnumResult = res;
    // });
  }

  /**
   * دریافت اطلاعات CrmAccountTypeEnum
   * Commented: Enum method not available in API
   */
  getCrmAccountTypeEnum(): void {
    // this.crmEnumService.ServiceCrmAccountTypeEnum().subscribe((res) => {
    //   this.dataModelCrmAccountTypeEnumResult = res;
    // });
  }

  DataAddContent(): void {
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";
    const pName = this.constructor.name + "main";
    this.publicHelper.processService.processStart(
      pName,
      "",
      this.constructorInfoAreaId,
    );

    this.crmAccountService.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
            });
          this.cmsToastrService.typeSuccessAdd();
          this.dialogRef.close({ dialogChangedDate: true });
        } else {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Error;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);

        this.formInfo.submitButtonEnabled = true;
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }

  onActionFileSelected(model: NodeInterface): void {
    this.dataModel.linkMainImageId = model.id;
    this.dataModel.linkMainImageIdSrc = model.downloadLinksrc;
  }
  onActionSelectorUser(model: CoreUserModel | null): void {
    this.dataModel.linkAssignedUserId = null;
    if (model && model.id > 0) {
      this.dataModel.linkAssignedUserId = model.id;
    }
  }

  /**
   * متد انتخاب Parent Account
   * @param model - مدل Account انتخاب شده یا null
   */
  onActionSelectorParentAccount(model: CrmAccountModel | null): void {
    this.dataModel.linkParentAccountId = null;
    if (model && model.id) {
      this.dataModel.linkParentAccountId = model.id;
    }
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    this.DataAddContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }

  // Getters and setters for optional properties
  get billStreet(): string {
    return (this.dataModel as any)?.billStreet || '';
  }

  set billStreet(value: string) {
    if (!(this.dataModel as any).billStreet) {
      (this.dataModel as any).billStreet = '';
    }
    (this.dataModel as any).billStreet = value;
  }

  get billCity(): string {
    return (this.dataModel as any)?.billCity || '';
  }

  set billCity(value: string) {
    if (!(this.dataModel as any).billCity) {
      (this.dataModel as any).billCity = '';
    }
    (this.dataModel as any).billCity = value;
  }

  get billState(): string {
    return (this.dataModel as any)?.billState || '';
  }

  set billState(value: string) {
    if (!(this.dataModel as any).billState) {
      (this.dataModel as any).billState = '';
    }
    (this.dataModel as any).billState = value;
  }

  get billPostalCode(): string {
    return (this.dataModel as any)?.billPostalCode || '';
  }

  set billPostalCode(value: string) {
    if (!(this.dataModel as any).billPostalCode) {
      (this.dataModel as any).billPostalCode = '';
    }
    (this.dataModel as any).billPostalCode = value;
  }

  // Helper method for accessing optional properties
  getOptionalProperty(propertyName: string): any {
    return (this.dataModel as any)?.[propertyName];
  }

  setOptionalProperty(propertyName: string, value: any): void {
    (this.dataModel as any)[propertyName] = value;
  }

  // Getters and setters for all optional properties
  get accountNo(): string { return (this.dataModel as any)?.accountNo || ''; }
  set accountNo(value: string) { (this.dataModel as any).accountNo = value; }

  get rating(): string { return (this.dataModel as any)?.rating || ''; }
  set rating(value: string) { (this.dataModel as any).rating = value; }

  get ownership(): string { return (this.dataModel as any)?.ownership || ''; }
  set ownership(value: string) { (this.dataModel as any).ownership = value; }

  get sicCode(): string { return (this.dataModel as any)?.sicCode || ''; }
  set sicCode(value: string) { (this.dataModel as any).sicCode = value; }

  get tickerSymbol(): string { return (this.dataModel as any)?.tickerSymbol || ''; }
  set tickerSymbol(value: string) { (this.dataModel as any).tickerSymbol = value; }

  get email2(): string { return (this.dataModel as any)?.email2 || ''; }
  set email2(value: string) { (this.dataModel as any).email2 = value; }

  get otherPhone(): string { return (this.dataModel as any)?.otherPhone || ''; }
  set otherPhone(value: string) { (this.dataModel as any).otherPhone = value; }

  get emailOptOut(): boolean { return (this.dataModel as any)?.emailOptOut || false; }
  set emailOptOut(value: boolean) { (this.dataModel as any).emailOptOut = value; }

  get notifyOwner(): boolean { return (this.dataModel as any)?.notifyOwner || false; }
  set notifyOwner(value: boolean) { (this.dataModel as any).notifyOwner = value; }

  get billCountry(): string { return (this.dataModel as any)?.billCountry || ''; }
  set billCountry(value: string) { (this.dataModel as any).billCountry = value; }

  get billPoBox(): string { return (this.dataModel as any)?.billPoBox || ''; }
  set billPoBox(value: string) { (this.dataModel as any).billPoBox = value; }

  get shipStreet(): string { return (this.dataModel as any)?.shipStreet || ''; }
  set shipStreet(value: string) { (this.dataModel as any).shipStreet = value; }

  get shipCity(): string { return (this.dataModel as any)?.shipCity || ''; }
  set shipCity(value: string) { (this.dataModel as any).shipCity = value; }

  get shipState(): string { return (this.dataModel as any)?.shipState || ''; }
  set shipState(value: string) { (this.dataModel as any).shipState = value; }

  get shipPostalCode(): string { return (this.dataModel as any)?.shipPostalCode || ''; }
  set shipPostalCode(value: string) { (this.dataModel as any).shipPostalCode = value; }

  get shipCountry(): string { return (this.dataModel as any)?.shipCountry || ''; }
  set shipCountry(value: string) { (this.dataModel as any).shipCountry = value; }

  get shipPoBox(): string { return (this.dataModel as any)?.shipPoBox || ''; }
  set shipPoBox(value: string) { (this.dataModel as any).shipPoBox = value; }
}
