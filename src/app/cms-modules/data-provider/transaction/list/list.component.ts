
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  DataProviderTransactionModel,
  DataProviderTransactionService,
  FilterDataModel,
  FilterModel, RecordStatusEnum, SortTypeEnum
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { ListBaseComponent } from 'src/app/core/cmsComponent/listBaseComponent';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { PageInfoService } from 'src/app/core/services/page-info.service';
import { environment } from 'src/environments/environment';
import { PublicHelper } from '../../../../core/helpers/publicHelper';
import { CmsToastrService } from '../../../../core/services/cmsToastr.service';
import { DataProviderTransactionViewComponent } from '../view/view.component';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';


@Component({
  selector: 'app-donate-transaction-list',
  templateUrl: './list.component.html',
  standalone: false
})
export class DataProviderTransactionListComponent extends ListBaseComponent<DataProviderTransactionService, DataProviderTransactionModel, number>
  implements OnInit, OnDestroy {
  requestLinkCmsUserId = 0;
  requestLinkPlanId = 0;
  requestLinkPlanPriceId = 0;
  requestLinkClientId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private activatedRoute: ActivatedRoute,
    public contentService: DataProviderTransactionService,
    private cmsToastrService: CmsToastrService,
    private router: Router,
    public tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
    public pageInfo: PageInfoService,
    public publicHelper: PublicHelper,
    public dialog: MatDialog,
  ) {
    super(contentService, new DataProviderTransactionModel(), publicHelper, tokenHelper, translate);
    this.publicHelper.processService.cdr = this.cdr;

    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };

    /*filter Sort*/
    this.filteModelContent.sortColumn = 'Id';
    this.filteModelContent.sortType = SortTypeEnum.Descending;

  }
  filteModelContent = new FilterModel();

  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    'Id',
    'LinkSiteId',
    'RecordStatus',
    'LinkClientId',
    'LinkPlanId',
    'LinkPlanPriceId',
    'SystemTransactionId',
    'SystemPaymentisSuccess',
    'AmountPure',
    'FeeTransport',
    'FeeTax',
    'Amount',
    'CreatedDate',
    // 'Action'
  ];
  tabledisplayedColumnsMobileSource: string[] = [
    'Id',
    'LinkSiteId',
    'RecordStatus',
    'LinkClientId',
    'LinkPlanId',
    'LinkPlanPriceId',
    'SystemTransactionId',
    'SystemPaymentisSuccess',
    'AmountPure',
    'FeeTransport',
    'FeeTax',
    'Amount',
    'CreatedDate',
    // 'Action'
  ];

  cmsApiStoreSubscribe: Subscription;
  ngOnInit(): void {
    this.requestLinkCmsUserId = + Number(this.activatedRoute.snapshot.paramMap.get('LinkCmsUserId'));
    if (this.requestLinkCmsUserId && this.requestLinkCmsUserId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = 'LinkCmsUserId';
      filter.value = this.requestLinkCmsUserId;
      this.filteModelContent.filters.push(filter);
    }
    this.requestLinkPlanId = + Number(this.activatedRoute.snapshot.paramMap.get('LinkPlanId'));
    if (this.requestLinkPlanId && this.requestLinkPlanId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = 'LinkPlanId';
      filter.value = this.requestLinkPlanId;
      this.filteModelContent.filters.push(filter);
    }
    this.requestLinkClientId = + Number(this.activatedRoute.snapshot.paramMap.get('LinkClientId'));
    if (this.requestLinkClientId && this.requestLinkClientId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = 'LinkClientId';
      filter.value = this.requestLinkClientId;
      this.filteModelContent.filters.push(filter);
    }
    this.requestLinkPlanPriceId = + Number(this.activatedRoute.snapshot.paramMap.get('LinkPlanPriceId'));
    if (this.requestLinkPlanPriceId && this.requestLinkPlanPriceId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = 'LinkPlanPriceId';
      filter.value = this.requestLinkPlanPriceId;
      this.filteModelContent.filters.push(filter);
    }
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.DataGetAll();
    }

    this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.tokenInfo = value;
      this.DataGetAll();
    });
  }
  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }
  DataGetAll(): void {
    this.tabledisplayedColumns = this.publicHelper.TableDisplayedColumns(this.tabledisplayedColumnsSource, this.tabledisplayedColumnsMobileSource, [], this.tokenInfo);
    this.tableRowsSelected = [];
    this.onActionTableRowSelect(new DataProviderTransactionModel());
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.get_information_list').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    this.filteModelContent.accessLoad = true;
    /*filter CLone*/
    const filterModel = JSON.parse(JSON.stringify(this.filteModelContent));
    /*filter CLone*/

    this.contentService.setAccessLoad();
    this.contentService.ServiceGetAllEditor(filterModel).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.tableSource.data = ret.listItems;

          if (this.optionsStatist?.data?.show)
            this.onActionButtonStatist(true);
          setTimeout(() => {
            if (this.optionsSearch.childMethods)
              this.optionsSearch.childMethods.setAccess(ret.access);
          }, 1000);
        } else {
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

  onTableSortData(sort: MatSort): void {
    if (this.tableSource && this.tableSource.sort && this.tableSource.sort.active === sort.active) {
      if (this.tableSource.sort.start === 'asc') {
        sort.start = 'desc';
        this.filteModelContent.sortColumn = sort.active;
        this.filteModelContent.sortType = SortTypeEnum.Descending;
      } else if (this.tableSource.sort.start === 'desc') {
        sort.start = 'asc';
        this.filteModelContent.sortColumn = '';
        this.filteModelContent.sortType = SortTypeEnum.Ascending;
      } else {
        sort.start = 'desc';
      }
    } else {
      this.filteModelContent.sortColumn = sort.active;
      this.filteModelContent.sortType = SortTypeEnum.Descending;
    }
    this.tableSource.sort = sort;
    this.filteModelContent.currentPageNumber = 0;
    this.DataGetAll();
  }
  onTablePageingData(event?: PageEvent): void {
    this.filteModelContent.currentPageNumber = event.pageIndex + 1;
    this.filteModelContent.rowPerPage = event.pageSize;
    this.DataGetAll();
  }

  onActionButtonViewRow(model: DataProviderTransactionModel = this.tableRowSelected): void {
    if (!model || !model.id || model.id > 0) {
      this.cmsToastrService.typeErrorSelected();
      return;
    }
    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessWatchRow
    ) {
      this.cmsToastrService.typeErrorAccessWatch();
      return;
    }
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(DataProviderTransactionViewComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { id: this.tableRowSelected.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
      }
    });
  }


  onActionButtonStatist(view = !this.optionsStatist.data.show): void {
    this.optionsStatist.data.show = view;
    if (!this.optionsStatist.data.show) {
      return;
    }
    const statist = new Map<string, number>();
    this.translate.get('MESSAGE.Active').subscribe((str: string) => { statist.set(str, 0); });
    this.translate.get('MESSAGE.All').subscribe((str: string) => { statist.set(str, 0); });
    const pName = this.constructor.name + '.ServiceStatist';
    this.translate.get('MESSAGE.Get_the_statist').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    this.contentService.ServiceGetCount(this.filteModelContent).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate.get('MESSAGE.All').subscribe((str: string) => { statist.set(str, ret.totalRowCount) });
          this.optionsStatist.childMethods.setStatistValue(statist);
        } else {
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

    const filterStatist1 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter = new FilterDataModel();
    fastfilter.propertyName = 'RecordStatus';
    fastfilter.value = RecordStatusEnum.Available;
    filterStatist1.filters.push(fastfilter);
    this.contentService.ServiceGetCount(filterStatist1).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate.get('MESSAGE.Active').subscribe((str: string) => { statist.set(str, ret.totalRowCount) });
          this.optionsStatist.childMethods.setStatistValue(statist);
        } else {
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




  onActionButtonReload(): void {
    this.DataGetAll();
  }
  onSubmitOptionsSearch(model: any): void {
    this.filteModelContent.filters = model;
    this.DataGetAll();
  }

  onActionBackToParent(): void {

    if (this.requestLinkCmsUserId > 0) {
      this.router.navigate(['/data-provider/plan/']);
    }
    else if (this.requestLinkPlanId > 0) {
      this.router.navigate(['/data-provider/plan/']);
    } else if (this.requestLinkPlanPriceId > 0) {
      this.router.navigate(['/data-provider/plan-price/']);
    } else if (this.requestLinkClientId > 0) {
      this.router.navigate(['/data-provider/client/']);
    }
  }
}
