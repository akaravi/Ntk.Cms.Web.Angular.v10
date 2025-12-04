import { DOCUMENT } from "@angular/common";
import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {BankPaymentInjectPaymentGotoBankStep1CalculateModel,
  BankPaymentInjectPaymentGotoBankStep2LandingSitePageModel,
  BankPaymentPrivateSiteConfigModel,
  CoreModuleModel,
  CoreModuleService,
  CoreModuleSiteUserCreditCalculateDtoModel,
  CoreModuleSiteUserCreditPaymentDtoModel,
  CoreModuleSiteUserCreditService,
  CoreSiteService,
  ErrorExceptionResult,
  FilterModel} from "ntk-cms-api";

import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TRANSACTION_ID_LOCAL_STORAGE_KEY } from "src/app/core/models/constModel";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../core/models/formInfoModel";

@Component({
  selector: "app-coremodule-site-user-credit-charge-online-calculate",
  templateUrl: "./charge-online-calculate.component.html",
  standalone: false,
})
export class CoreModuleSiteUserCreditChargeOnlineCalculateComponent
  implements OnInit
{
  requestCredit = 0;
  requestLinkModuleId = 0;
  requestLinkSiteId = 0;
  requestLinkUserId = 0;
  requestBankPrivateMaster = false;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) private document: any,
    private dialogRef: MatDialogRef<CoreModuleSiteUserCreditChargeOnlineCalculateComponent>,
    private cmsToastrService: CmsToastrService,
    private coreModuleSiteUserCreditService: CoreModuleSiteUserCreditService,
    private coreModuleService: CoreModuleService,
    private coreSiteService: CoreSiteService,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      if (data.credit && data.credit > 0) {
        this.requestCredit = data.credit;
      }
      if (data.linkModuleId && data.linkModuleId > 0) {
        this.requestLinkModuleId = data.linkModuleId;
      }
      if (data.linkSiteId && data.linkSiteId > 0) {
        this.requestLinkSiteId = data.linkSiteId;
      }
      if (data.linkUserId && data.linkUserId > 0) {
        this.requestLinkUserId = data.linkUserId;
      }
    }
    if (this.requestCredit === 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    if (this.requestLinkModuleId === 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }

    this.dataModelCalculate.credit = this.requestCredit;
    this.dataModelCalculate.linkModuleId = this.requestLinkModuleId;
    this.dataModelCalculate.linkSiteId = this.requestLinkSiteId;
    this.dataModelCalculate.linkUserId = this.requestLinkUserId;
    this.dataModelPayment.credit = this.requestCredit;
    this.dataModelPayment.linkModuleId = this.requestLinkModuleId;
    this.dataModelPayment.linkSiteId = this.requestLinkSiteId;
    this.dataModelPayment.linkUserId = this.requestLinkUserId;
    this.dataModelPayment.lastUrlAddressInUse = this.document.location.href;
  }
  viewCalculate = false;

  dataModelResult: ErrorExceptionResult<BankPaymentPrivateSiteConfigModel> =
    new ErrorExceptionResult<BankPaymentPrivateSiteConfigModel>();
  dataModelCalculateResult: ErrorExceptionResult<BankPaymentInjectPaymentGotoBankStep1CalculateModel> =
    new ErrorExceptionResult<BankPaymentInjectPaymentGotoBankStep1CalculateModel>();
  dataModelPaymentResult: ErrorExceptionResult<BankPaymentInjectPaymentGotoBankStep2LandingSitePageModel> =
    new ErrorExceptionResult<BankPaymentInjectPaymentGotoBankStep2LandingSitePageModel>();

  dataModelCalculate: CoreModuleSiteUserCreditCalculateDtoModel =
    new CoreModuleSiteUserCreditCalculateDtoModel();
  dataModelPayment: CoreModuleSiteUserCreditPaymentDtoModel =
    new CoreModuleSiteUserCreditPaymentDtoModel();
  formInfo: FormInfoModel = new FormInfoModel();
  dataModelCoreModuleResult: ErrorExceptionResult<CoreModuleModel> =
    new ErrorExceptionResult<CoreModuleModel>();
  ngOnInit(): void {
    this.translate
      .get("TITLE.Select_Payment_Gateway")
      .subscribe((str: string) => {
        this.formInfo.formTitle = str;
      });
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
  DataCalculate(): void {
    this.viewCalculate = false;
    const pName = this.constructor.name + "ServiceOrderCalculate";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.coreModuleSiteUserCreditService
      .ServiceOrderCalculate(this.dataModelCalculate)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataModelCalculateResult = ret;
            this.viewCalculate = true;
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
  DataPayment(): void {
    this.formInfo.submitButtonEnabled = false;
    const pName = this.constructor.name + "ServiceOrderPayment";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.coreModuleSiteUserCreditService
      .ServiceOrderPayment(this.dataModelPayment)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataModelPaymentResult = ret;
            this.translate
              .get("MESSAGE.Transferring_to_the_payment_gateway")
              .subscribe((str: string) => {
                this.cmsToastrService.typeSuccessMessage(str);
              });
            localStorage.setItem(
              TRANSACTION_ID_LOCAL_STORAGE_KEY,
              ret.item.transactionId.toString(),
            );
            this.document.location.href =
              this.dataModelPaymentResult.item.urlToPay;
          } else {
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
            this.formInfo.submitButtonEnabled = true;
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.formInfo.submitButtonEnabled = true;
          this.publicHelper.processService.processStop(pName);
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
  onActionSelectCalculate(model: BankPaymentPrivateSiteConfigModel): void {
    this.dataModelCalculate.bankPaymentPrivateId = model.id;
    this.dataModelPayment.bankPaymentPrivateId = model.id;
    this.DataCalculate();
  }
  onActionSelectBankPayment(): void {
    this.DataPayment();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
