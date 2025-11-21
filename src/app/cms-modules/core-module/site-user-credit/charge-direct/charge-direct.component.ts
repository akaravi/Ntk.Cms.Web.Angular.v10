import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreModuleModel,
  CoreModuleService,
  CoreModuleSiteUserCreditChargeDirectDtoModel,
  CoreModuleSiteUserCreditModel,
  CoreModuleSiteUserCreditService,
  CoreSiteService,
  ErrorExceptionResult,
  FilterModel,
  FormInfoModel,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-coremodule-site-credit-direct-add",
  templateUrl: "./charge-direct.component.html",
  standalone: false,
})
export class CoreModuleSiteUserCreditChargeDirectComponent implements OnInit {
  requestModel: CoreModuleSiteUserCreditModel;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreSiteService: CoreSiteService,
    private cmsToastrService: CmsToastrService,
    private coreModuleService: CoreModuleService,
    private router: Router,
    public publicHelper: PublicHelper,
    private service: CoreModuleSiteUserCreditService,
    public translate: TranslateService,
    private dialogRef: MatDialogRef<CoreModuleSiteUserCreditChargeDirectComponent>,
  ) {
    if (data) {
      this.requestModel = data.model || new CoreModuleSiteUserCreditModel();
    }
  }

  dataModel: CoreModuleSiteUserCreditChargeDirectDtoModel =
    new CoreModuleSiteUserCreditChargeDirectDtoModel();
  dataModelResult: ErrorExceptionResult<CoreModuleSiteUserCreditModel> =
    new ErrorExceptionResult<CoreModuleSiteUserCreditModel>();
  dataModelCoreModuleResult: ErrorExceptionResult<CoreModuleModel> =
    new ErrorExceptionResult<CoreModuleModel>();
  formInfo: FormInfoModel = new FormInfoModel();
  ngOnInit(): void {
    this.translate.get("ACTION.CHARGE_DIRECT").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    if (
      !this.requestModel ||
      this.requestModel.linkSiteId <= 0 ||
      this.requestModel.linkModuleId <= 0 ||
      this.requestModel.linkUserId <= 0
    ) {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.dataModel.credit = this.requestModel.credit;
    this.dataModel.linkModuleId = this.requestModel.linkModuleId;
    this.dataModel.linkSiteId = this.requestModel.linkSiteId;
    this.dataModel.linkUserId = this.requestModel.linkUserId;
    this.DataGetCurrency();
    this.getModuleList();
  }
  getModuleList(): void {
    const filter = new FilterModel();
    filter.rowPerPage = 100;
    this.coreModuleService.ServiceGetAllModuleName(filter).subscribe({
      next: (ret) => {
        this.dataModelCoreModuleResult = ret;
      },
    });
  }
  onActionButtonSubmit(): void {
    const pName = this.constructor.name + "ServiceChargeDirect";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.service.ServiceChargeDirect(this.dataModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.cmsToastrService.typeSuccessSubmit();
          this.dialogRef.close({ dialogChangedDate: true });
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
  currency = "";
  DataGetCurrency(): void {
    this.coreSiteService.ServiceGetCurrencyMaster().subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.currency = ret.item;
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
      },
    });
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
