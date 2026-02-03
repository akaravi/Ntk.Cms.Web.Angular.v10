import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
    CoreEnumService,
    CoreModuleModel,
    CoreModuleSaleHeaderModel,
    CoreModuleSaleHeaderService,
    CoreModuleSaleInvoiceDetailModel,
    CoreModuleSaleInvoiceModel,
    CoreModuleSaleItemModel,
    CoreModuleService,
    CoreSiteService,
    DataFieldInfoModel,
    ErrorExceptionResult,
    FilterModel,
    InfoEnumModel,
    TokenInfoModelV3,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { CmsBankpaymentTransactionInfoComponent } from "src/app/shared/cms-bankpayment-transaction-info/cms-bankpayment-transaction-info.component";
import { CoreModuleSaleHeaderSalePaymentComponent } from "../sale-payment/sale-payment.component";

@Component({
  selector: "app-core-modulesaleheader-sale-list",
  templateUrl: "./sale-list.component.html",
  styleUrls: ["./sale-list.component.scss"],
  standalone: false,
})
export class CoreModuleSaleHeaderSaleListComponent
  implements OnInit, OnDestroy
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private coreModuleSaleHeaderService: CoreModuleSaleHeaderService,
    private coreSiteService: CoreSiteService,
    public publicHelper: PublicHelper,
    public cmsToastrService: CmsToastrService,
    public coreEnumService: CoreEnumService,
    private coreModuleService: CoreModuleService,
    private cmsStoreService: CmsStoreService,
    public tokenHelper: TokenHelper,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    public dialog: MatDialog,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  showBuy = false;
  comment: string;
  author: string;
  dataSource: any;
  flag = false;
  tableContentSelected = [];
  dataModel: CoreModuleSaleInvoiceDetailModel =
    new CoreModuleSaleInvoiceDetailModel();
  dataModelResult: ErrorExceptionResult<CoreModuleSaleHeaderModel> =
    new ErrorExceptionResult<CoreModuleSaleHeaderModel>();
  dataModelItemResult: ErrorExceptionResult<CoreModuleSaleItemModel> =
    new ErrorExceptionResult<CoreModuleSaleItemModel>();
  dataModelRegResult: ErrorExceptionResult<CoreModuleSaleInvoiceModel> =
    new ErrorExceptionResult<CoreModuleSaleInvoiceModel>();
  tokenInfo = new TokenInfoModelV3();

  tableRowsSelected: Array<CoreModuleSaleHeaderModel> = [];
  tableRowSelected: CoreModuleSaleHeaderModel = new CoreModuleSaleHeaderModel();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();
  categoryModelSelected: CoreModuleSaleHeaderModel =
    new CoreModuleSaleHeaderModel();
  dataModelEnumCmsModuleSaleItemTypeResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelCoreModuleResult: ErrorExceptionResult<CoreModuleModel> =
    new ErrorExceptionResult<CoreModuleModel>();

  tabledisplayedColumns: string[] = [
    "LinkModuleId",
    "EnumCmsModuleSaleItemType",
    "FromDate",
    "ExpireDate",
  ];

  expandedElement: CoreModuleSaleItemModel | null;
  private unsubscribe: Subscription[] = [];
  currency = "";

  ngOnInit(): void {
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
    const transactionId = +localStorage.getItem("TransactionId");
    if (transactionId > 0) {
      const dialogRef = this.dialog.open(
        CmsBankpaymentTransactionInfoComponent,
        {
          // height: "90%",
          data: {
            Id: transactionId,
          },
        },
      );
      dialogRef.afterClosed().subscribe((result) => {
        if (result && result.dialogChangedDate) {
          localStorage.removeItem("TransactionId");
        }
      });
    }
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
  getModuleList(): void {
    const filter = new FilterModel();
    filter.rowPerPage = 100;
    this.coreModuleService.ServiceGetAllModuleName(filter).subscribe({
      next: (ret) => {
        this.dataModelCoreModuleResult = ret;
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
    this.tableRowsSelected = [];
    this.tableRowSelected = new CoreModuleSaleHeaderModel();
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
    this.coreModuleSaleHeaderService.ServiceGetAllSale(model).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.showBuy = true;
          this.dataModelResult = ret;
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
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

  onActionButtonDetail(model: CoreModuleSaleHeaderModel): void {
    this.tableRowSelected = model;
  }
  onActionButtonBuy(model: CoreModuleSaleHeaderModel): void {
    this.tableRowSelected = model;

    const dialogRef = this.dialog.open(
      CoreModuleSaleHeaderSalePaymentComponent,
      {
        data: { linkHeaderId: model.id },
      },
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
  }

  onActionBackToParent(): void {
    this.router.navigate(["/core/modulesale/Header"]);
  }
}
