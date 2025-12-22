import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  CoreSiteService,
  ErrorExceptionResult,
  EstateAdsTypeModel,
  EstateAdsTypeService,
  FilterModel,
  InfoEnumModel,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { ThemeService } from "src/app/core/services/theme.service";
import { CmsBankpaymentTransactionInfoComponent } from "src/app/shared/cms-bankpayment-transaction-info/cms-bankpayment-transaction-info.component";
import { environment } from "src/environments/environment";
import { EstateAccountAgencyAdsSalePaymentComponent } from "../sale-payment/sale-payment.component";

@Component({
  selector: "app-estate-account-agency-ads-salelist",
  templateUrl: "./sale-list.component.html",
  styleUrls: ["./sale-list.component.scss"],
  standalone: false,
})
export class EstateAccountAgencyAdsSaleListComponent
  implements OnInit, OnDestroy
{
  requestLinkAccountAgencyId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private estateAdsTypeService: EstateAdsTypeService,
    public publicHelper: PublicHelper,
    private cmsToastrService: CmsToastrService,
    public coreEnumService: CoreEnumService,
    private coreSiteService: CoreSiteService,
    public themeService: ThemeService,
    public tokenHelper: TokenHelper,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private cmsStoreService: CmsStoreService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
    this.requestLinkAccountAgencyId = this.activatedRoute.snapshot.paramMap.get(
      "LinkAccountAgencyId",
    );
  }
  showBuy = false;
  comment: string;
  author: string;
  dataSource: any;
  flag = false;
  tableContentSelected = [];
  dataModelResult: ErrorExceptionResult<EstateAdsTypeModel> =
    new ErrorExceptionResult<EstateAdsTypeModel>();
  tokenInfo = new TokenInfoModelV3();

  tableRowSelected: EstateAdsTypeModel = new EstateAdsTypeModel();
  categoryModelSelected: EstateAdsTypeModel = new EstateAdsTypeModel();
  dataModelEnumCmsModuleSaleItemTypeResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  tabledisplayedColumns: string[] = [
    "LinkModuleId",
    "EnumCmsModuleSaleItemType",
    "FromDate",
    "ExpireDate",
  ];

  // expandedElement: CoreModuleSaleItemModel | null;
  private unsubscribe: Subscription[] = [];
  currency = "";

  ngOnInit(): void {
    if (
      !this.requestLinkAccountAgencyId ||
      this.requestLinkAccountAgencyId.length === 0
    ) {
      this.cmsToastrService.typeErrorComponentAction();
      this.router.navigate(["/estate/main/account-agency"]);
      return;
    }
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.tokenInfo = value;
        }),
    );
    // this.getEnumCmsModuleSaleItemType();

    this.DataGetAll();
    this.DataGetCurrency();
    //**بررسی تراکنش از قبل */
    const transactionId = +localStorage.getItem("TransactionId") | 0;
    if (transactionId > 0) {
      var panelClass = "";
      if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
      else panelClass = "dialog-min";
      const dialogRef = this.dialog.open(
        CmsBankpaymentTransactionInfoComponent,
        {
          panelClass: panelClass,
          enterAnimationDuration:
            environment.cmsViewConfig.enterAnimationDuration,
          exitAnimationDuration:
            environment.cmsViewConfig.exitAnimationDuration,
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
    //**بررسی تراکنش از قبل */
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

  getEnumCmsModuleSaleItemType(): void {
    this.coreEnumService.ServiceCmsModuleSaleItemTypeEnum().subscribe({
      next: (ret) => {
        this.dataModelEnumCmsModuleSaleItemTypeResult = ret;
      },
    });
  }
  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  DataGetAll(): void {
    this.tableRowSelected = new EstateAdsTypeModel();
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

    this.showBuy = false;
    const model = new FilterModel();
    this.estateAdsTypeService.ServiceGetAllSale(model).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.showBuy = true;
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

  onActionButtonBuy(model: EstateAdsTypeModel): void {
    this.tableRowSelected = model;
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(
      EstateAccountAgencyAdsSalePaymentComponent,
      {
        height: "90%",
        panelClass: panelClass,
        enterAnimationDuration:
          environment.cmsViewConfig.enterAnimationDuration,
        exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
        data: {
          linkAccountAgencyId: this.requestLinkAccountAgencyId,
          linkAdsTypeId: model.id,
        },
      },
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
  }

  onActionBackToParent(): void {
    this.router.navigate([
      "/estate/main/account-agency-ads/LinkPropertyId/" +
        this.requestLinkAccountAgencyId,
    ]);
  }
}
