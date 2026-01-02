import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  DataFieldInfoModel,
  DataProviderPlanPriceModel,
  DataProviderPlanPriceService,
  ErrorExceptionResult,
  RecordStatusEnum,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { CmsLinkToComponent } from "src/app/shared/cms-link-to/cms-link-to.component";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-data-provider-plan-price-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: false,
})
export class DataProviderPlanPriceHeaderComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private headerService: DataProviderPlanPriceService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private cmsToastrService: CmsToastrService,
    public translate: TranslateService,
    private cmsStoreService: CmsStoreService,
    public dialog: MatDialog,
    public tokenHelper: TokenHelper,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  @Input() optionId: string | number = "";

  dataModelResult: ErrorExceptionResult<DataProviderPlanPriceModel> =
    new ErrorExceptionResult<DataProviderPlanPriceModel>();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  private unsubscribe: Subscription[] = [];
  ngOnInit(): void {
    if (this.optionId && (typeof this.optionId === 'string' ? this.optionId.length > 0 : this.optionId > 0)) {
      this.DataGetOneContent();
    }

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async () => {
          this.DataGetOneContent();
        }),
    );
  }
  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  DataGetOneContent(): void {
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    this.headerService.setAccessLoad();
    const id = typeof this.optionId === 'string' ? this.optionId : this.optionId.toString();
    this.headerService.ServiceGetOneById(id).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        if (ret.isSuccess) {
          this.dataModelResult = ret;
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  onActionButtonLinkTo(
    model: DataProviderPlanPriceModel = this.dataModelResult.item,
  ): void {
    if (!model?.id || (typeof model.id === 'string' ? model.id.length === 0 : model.id <= 0)) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    if (model.recordStatus != RecordStatusEnum.Available) {
      this.cmsToastrService.typeWarningRecordStatusNoAvailable();
      return;
    }
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    //open popup
    const dialogRef = this.dialog.open(CmsLinkToComponent, {
      height: "90%",
      width: "90%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {
        // title: model.title,
        urlViewContentQRCodeBase64: "",
        urlViewContent: "",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
    //open popup
  }
}
