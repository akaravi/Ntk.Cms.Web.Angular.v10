import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
    CoreModuleModel,
    CoreModuleService,
    CoreModuleSiteUserCreditCalculateDtoModel,
    CoreModuleSiteUserCreditPaymentDtoModel,
    CoreSiteService,
    ErrorExceptionResult,
    FilterModel
} from "ntk-cms-api";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { CmsBankpaymentTransactionInfoComponent } from "src/app/shared/cms-bankpayment-transaction-info/cms-bankpayment-transaction-info.component";
import { CoreModuleSiteUserCreditChargeOnlineCalculateComponent } from "../charge-online-calculate/charge-online-calculate.component";

import { FormInfoModel } from "../../../../core/models/formInfoModel";

@Component({
  selector: "app-coremodule-site-user-credit-charge-online",
  templateUrl: "./charge-online.component.html",
  standalone: false,
})
export class CoreModuleSiteUserCreditChargeOnlineComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private coreSiteService: CoreSiteService,
    public cmsToastrService: CmsToastrService,
    private coreModuleService: CoreModuleService,
    private router: Router,
    public translate: TranslateService,
    private dialogRef: MatDialogRef<CoreModuleSiteUserCreditChargeOnlineComponent>,
  ) {
    if (data) {
      this.dataModelCalculate =
        data.model || new CoreModuleSiteUserCreditPaymentDtoModel();
    }
  }
  currency = "";

  formInfo: FormInfoModel = new FormInfoModel();
  dataModelCalculate: CoreModuleSiteUserCreditCalculateDtoModel =
    new CoreModuleSiteUserCreditCalculateDtoModel();
  dataModelCoreModuleResult: ErrorExceptionResult<CoreModuleModel> =
    new ErrorExceptionResult<CoreModuleModel>();

  ngOnInit(): void {
    this.DataGetCurrency();
    this.translate
      .get("ACTION.CHARGE_ONLINE")
      .subscribe((str: string) => {
        this.formInfo.formTitle = str;
      });

    const transactionId = +localStorage.getItem("TransactionId");
    if (transactionId > 0) {
      const dialogRef = this.dialog.open(
        CmsBankpaymentTransactionInfoComponent,
        {
          // height: "90%",
          data: {
            id: transactionId,
          },
        },
      );
      dialogRef.afterClosed().subscribe((result) => {
        if (result && result.dialogChangedDate) {
          localStorage.removeItem("TransactionId");
        }
      });
    }
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

  onActionButtonBuy(): void {
    const dialogRef = this.dialog.open(
      CoreModuleSiteUserCreditChargeOnlineCalculateComponent,
      {
        //height: '90%',
        data: {
          credit: this.dataModelCalculate.credit,
          linkModuleId: this.dataModelCalculate.linkModuleId,
          linkSiteId: this.dataModelCalculate.linkSiteId,
          linkUserId: this.dataModelCalculate.linkUserId,
        },
      },
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
  }

  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
