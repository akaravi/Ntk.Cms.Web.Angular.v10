
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreEnumService,
  CoreModuleModel,
  CoreModuleSaleItemModel,
  CoreModuleSaleItemService,
  CoreModuleService,
  DataFieldInfoModel, ErrorExceptionResult,
  FilterDataModel,
  FilterModel, InfoEnumModel, SortTypeEnum, TokenInfoModelV3
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';


@Component({
  selector: 'app-core-modulesaleitem-listview',
  templateUrl: './listview.component.html',
  standalone: false
})
export class CoreModuleSaleItemListViewComponent implements OnInit, OnDestroy {
  @Input() set optionHeaderId(x: number) {
    this.LinkHeaderId = x;
    this.DataGetAll();
  }
  LinkHeaderId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private coreModuleSaleItemService: CoreModuleSaleItemService,
    public publicHelper: PublicHelper,
    private cmsToastrService: CmsToastrService,
    private coreModuleService: CoreModuleService,
    private coreEnumService: CoreEnumService,
    private cdr: ChangeDetectorRef,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

  }
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();

  tableContentSelected = [];
  filteModelContent = new FilterModel();
  dataModelResult: ErrorExceptionResult<CoreModuleSaleItemModel> = new ErrorExceptionResult<CoreModuleSaleItemModel>();
  tokenInfo = new TokenInfoModelV3();

  tableRowsSelected: Array<CoreModuleSaleItemModel> = [];
  tableRowSelected: CoreModuleSaleItemModel = new CoreModuleSaleItemModel();
  tableSource: MatTableDataSource<CoreModuleSaleItemModel> = new MatTableDataSource<CoreModuleSaleItemModel>();
  dataModelCoreModuleResult: ErrorExceptionResult<CoreModuleModel> = new ErrorExceptionResult<CoreModuleModel>();
  dataModelEnumCmsModuleSaleItemTypeResult: ErrorExceptionResult<InfoEnumModel> = new ErrorExceptionResult<InfoEnumModel>();


  tabledisplayedColumns: string[] = [
    'LinkModuleId',
    'MonthLength',
    'EnumCmsModuleSaleItemType',
  ];


  cmsApiStoreSubscribe: Subscription;

  ngOnInit(): void {
    this.filteModelContent.sortColumn = 'Title';
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.DataGetAll();
    }

    this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.getEnumCmsModuleSaleItemType();
      this.tokenInfo = value;
      this.DataGetAll();
    });
    this.getModuleList();
    this.getEnumCmsModuleSaleItemType();
  }
  getModuleList(): void {
    const filter = new FilterModel();
    filter.rowPerPage = 100;
    this.coreModuleService.ServiceGetAllModuleName(filter).subscribe({
      next: (ret) => {
        this.dataModelCoreModuleResult = ret;
      }
    });
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
    this.tableRowsSelected = [];
    this.onActionTableRowSelect(new CoreModuleSaleItemModel());

    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });


    this.filteModelContent.accessLoad = true;

    const filterModel = JSON.parse(JSON.stringify(this.filteModelContent));
    if (this.LinkHeaderId && this.LinkHeaderId > 0) {
      const fastfilter = new FilterDataModel();
      fastfilter.propertyName = 'LinkModuleSaleHeader';
      fastfilter.value = this.LinkHeaderId;
      filterModel.filters.push(fastfilter);
    }
    filterModel.sortColumn = 'Id';
    this.coreModuleSaleItemService.ServiceGetAll(filterModel).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.tableSource.data = ret.listItems;
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


  onActionButtonReload(): void {
    this.DataGetAll();
  }

  onActionTableRowSelect(row: CoreModuleSaleItemModel): void {
    this.tableRowSelected = row;
    if (!row["expanded"])
      row["expanded"] = false;
    row["expanded"] = !row["expanded"];
  }

}
