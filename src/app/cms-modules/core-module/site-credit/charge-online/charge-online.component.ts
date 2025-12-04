import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {CoreModuleModel,
  CoreModuleService,
  CoreModuleSiteCreditCalculateDtoModel,
  CoreModuleSiteCreditPaymentDtoModel,
  CoreSiteService,
  ErrorExceptionResult,
  FilterModel} from "ntk-cms-api";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../core/models/formInfoModel";

import { CoreModuleSiteCreditChargeOnlineCalculateComponent } from "../charge-online-calculate/charge-online-calculate.component";

@Component({
  selector: "app-coremodule-site-credit-charge-online",
  templateUrl: "./charge-online.component.html",
  standalone: false,
})
export class CoreModuleSiteCreditChargeOnlineComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private coreSiteService: CoreSiteService,
    private cmsToastrService: CmsToastrService,
    private coreModuleService: CoreModuleService,
    private router: Router,
    public translate: TranslateService,
    private dialogRef: MatDialogRef<CoreModuleSiteCreditChargeOnlineComponent>,
  ) {
    if (data) {
      this.dataModelCalculate =
        data.model || new CoreModuleSiteCreditPaymentDtoModel();
    }
  }
  currency = "";
  formInfo: FormInfoModel = new FormInfoModel();

  dataModelCalculate: CoreModuleSiteCreditCalculateDtoModel =
    new CoreModuleSiteCreditCalculateDtoModel();
  dataModelCoreModuleResult: ErrorExceptionResult<CoreModuleModel> =
    new ErrorExceptionResult<CoreModuleModel>();
  ngOnInit(): void {
    this.translate
      .get("ACTION.CHARGE_ONLINE")
      .subscribe((str: string) => {
        this.formInfo.formTitle = str;
      });
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
      CoreModuleSiteCreditChargeOnlineCalculateComponent,
      {
        //height: '90%',
        data: {
          credit: this.dataModelCalculate.credit,
          linkModuleId: this.dataModelCalculate.linkModuleId,
          linkSiteId: this.dataModelCalculate.linkSiteId,
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
