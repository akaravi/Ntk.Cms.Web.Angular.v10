
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreEnumService, CoreSiteService, ErrorExceptionResult, EstateAdsTypeModel, EstateAdsTypeService, FilterModel, InfoEnumModel, TokenInfoModelV3
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsBankpaymentTransactionInfoComponent } from 'src/app/shared/cms-bankpayment-transaction-info/cms-bankpayment-transaction-info.component';
import { environment } from 'src/environments/environment';
import { EstatePropertyAdsSalePaymentComponent } from '../sale-payment/sale-payment.component';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { ThemeService } from 'src/app/core/services/theme.service';


@Component({
  selector: 'app-estate-property-ads-salelist',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss'],
  standalone: false
})
export class EstatePropertyAdsSaleListComponent implements OnInit, OnDestroy {
  requestLinkPropertyId = '';
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private estateAdsTypeService: EstateAdsTypeService,
    public publicHelper: PublicHelper,
    private cmsToastrService: CmsToastrService,
    public coreEnumService: CoreEnumService,
    private coreSiteService: CoreSiteService,
    private cmsStoreService: CmsStoreService,
    public tokenHelper: TokenHelper,
    private router: Router,
    public themeService: ThemeService,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {
    this.publicHelper.processService.cdr = this.cdr;
    this.requestLinkPropertyId = this.activatedRoute.snapshot.paramMap.get('LinkPropertyId');
  }
  showBuy = false;
  comment: string;
  author: string;
  dataSource: any;
  flag = false;
  tableContentSelected = [];
  dataModelResult: ErrorExceptionResult<EstateAdsTypeModel> = new ErrorExceptionResult<EstateAdsTypeModel>();
  tokenInfo = new TokenInfoModelV3();

  tableRowSelected: EstateAdsTypeModel = new EstateAdsTypeModel();
  categoryModelSelected: EstateAdsTypeModel = new EstateAdsTypeModel();
  dataModelEnumCmsModuleSaleItemTypeResult: ErrorExceptionResult<InfoEnumModel> = new ErrorExceptionResult<InfoEnumModel>();

  tabledisplayedColumns: string[] = [
    'LinkModuleId',
    'EnumCmsModuleSaleItemType',
    'FromDate',
    'ExpireDate',
  ];



  // expandedElement: CoreModuleSaleItemModel | null;
  cmsApiStoreSubscribe: Subscription;
  currency = '';

  ngOnInit(): void {
    if (!this.requestLinkPropertyId || this.requestLinkPropertyId.length === 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.router.navigate(['/estate/property']);
      return;
    }
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.DataGetAll();
    }

    this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.tokenInfo = value;
      this.DataGetAll();
    });


    setTimeout(() => {

      this.DataGetAll();
    }, 500);
    this.DataGetCurrency();
    const transactionId = + localStorage.getItem('TransactionId');
    if (transactionId > 0) {
      var panelClass = '';
      if (this.publicHelper.isMobile)
        panelClass = 'dialog-fullscreen';
      else
        panelClass = 'dialog-min';
      const dialogRef = this.dialog.open(CmsBankpaymentTransactionInfoComponent, {
        // height: "90%",
        panelClass: panelClass,
        enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
        exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
        data: {
          id: transactionId,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result && result.dialogChangedDate) {
          localStorage.removeItem('TransactionId');
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
      }
    }
    );
  }

  getEnumCmsModuleSaleItemType(): void {
    this.coreEnumService.ServiceCmsModuleSaleItemTypeEnum().subscribe({
      next: (ret) => {
        this.dataModelEnumCmsModuleSaleItemTypeResult = ret;
      }
    });
  }
  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }
  DataGetAll(): void {
    this.tableRowSelected = new EstateAdsTypeModel();
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.showBuy = false;
    const model = new FilterModel();
    this.estateAdsTypeService.ServiceGetAllSale(model).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.showBuy = true;
          this.dataModelResult = ret;
        }
        else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      }
    }
    );
  }

  onActionButtonBuy(model: EstateAdsTypeModel): void {
    this.tableRowSelected = model;
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(EstatePropertyAdsSalePaymentComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {
        linkPropertyId: this.requestLinkPropertyId,
        linkAdsTypeId: model.id,
        bankPrivateMaster: model.paymentForMainSite
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {

      }
    });
  }

  onActionBackToParent(): void {
    this.router.navigate(['/estate/property-ads/LinkPropertyId/' + this.requestLinkPropertyId]);
  }
}
