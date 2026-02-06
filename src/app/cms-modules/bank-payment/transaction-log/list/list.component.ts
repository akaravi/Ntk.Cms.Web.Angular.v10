import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
    ApplicationAppModel,
    BankPaymentEnumService,
    BankPaymentTransactionLogModel,
    BankPaymentTransactionLogService,
    ErrorExceptionResult,
    FilterDataModel,
    FilterModel,
    InfoEnumModel,
    RecordStatusEnum,
    SortTypeEnum,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { ListBaseComponent } from "src/app/core/cmsComponent/listBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { PageInfoService } from "src/app/core/services/page-info.service";
import { environment } from "src/environments/environment";
import { BankPaymentTransactionLogViewComponent } from "../view/view.component";

@Component({
  selector: "app-bankpayment-transactionlog-list",
  templateUrl: "./list.component.html",
  standalone: false,
})
export class BankPaymentTransactionLogListComponent
  extends ListBaseComponent<
    BankPaymentTransactionLogService,
    BankPaymentTransactionLogModel,
    number
  >
  implements OnInit, OnDestroy
{
  requestLinkTransactionId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private contentService: BankPaymentTransactionLogService,
    private activatedRoute: ActivatedRoute,
    public cmsToastrService: CmsToastrService,
    private bankPaymentEnumService: BankPaymentEnumService,
    private router: Router,
    public tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private cmsStoreService: CmsStoreService,
    public pageInfo: PageInfoService,
    public publicHelper: PublicHelper,
    public dialog: MatDialog,
  ) {
    super(
      contentService,
      new BankPaymentTransactionLogModel(),
      publicHelper,
      tokenHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;

    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };

    /*filter Sort*/
    this.filteModelContent.sortColumn = "createdDate";
    this.filteModelContent.sortType = SortTypeEnum.Descending;
    /**filterActionSearch */
    this.optionsSearch.data.filterModelContent = this.filteModelContent;
    this.optionsSearch.data.filterActionSearchRecordStatusShow = true;
    if (this.tokenHelper.isAdminSite) {
      this.optionsSearch.data.filterActionSearchLinkUserIdShow = true;
      this.optionsSearch.data.filterActionSearchLinkSiteIdShow = true;
    } else {
      this.optionsSearch.data.filterActionSearchLinkSiteIdShow = false;
      this.optionsSearch.data.filterActionSearchLinkUserIdShow = false;
    }
    /**filterActionSearch */
  }
  comment: string;
  author: string;
  dataSource: any;
  flag = false;
  tableContentSelected = [];
  filteModelContent = new FilterModel();
  filterDataModelQueryBuilder: FilterDataModel[] = [];

  categoryModelSelected: ApplicationAppModel;

  dataModelEnumTransactionRecordStatusResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    "id",
    "TransactionStatus",
    "LinkTransactionId",
    // 'Memo',
    // 'CreatedDate',
    // 'Action'
  ];
  tabledisplayedColumnsMobileSource: string[] = [
    "id",
    "TransactionStatus",
    "LinkTransactionId",
    // 'Memo',
    // 'CreatedDate',
    // 'Action'
  ];
  expandedElement: BankPaymentTransactionLogModel | null;
  private unsubscribe: Subscription[] = [];
  ngOnInit(): void {
    this.requestLinkTransactionId = +Number(
      this.activatedRoute.snapshot.paramMap.get("LinkTransactionId"),
    );
    if (this.requestLinkTransactionId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "LinkTransactionId";
      filter.value = this.requestLinkTransactionId;
      this.filteModelContent.filters.push(filter);
    }
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.DataGetAll();
    }
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.tokenInfo = value;
          this.DataGetAll();
        }),
    );
    this.getEnumTransactionRecordStatus();
  }
  getEnumTransactionRecordStatus(): void {
    this.bankPaymentEnumService.ServiceTransactionRecordStatusEnum().subscribe({
      next: (ret) => {
        this.dataModelEnumTransactionRecordStatusResult = ret;
      },
    });
  }
  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  filterModelCompiler(model: FilterModel): FilterModel {
    /*filter CLone*/
    const filterModel = JSON.parse(JSON.stringify(model));
    /*filter CLone*/
    /*filter add search*/
    if (
      this.filterDataModelQueryBuilder &&
      this.filterDataModelQueryBuilder.length > 0
    ) {
      filterModel.filters = [...this.filterDataModelQueryBuilder];
    }
    /*filter add search*/
    return filterModel;
  }
  DataGetAll(): void {
    this.tabledisplayedColumns = this.publicHelper.TableDisplayedColumns(
      this.tabledisplayedColumnsSource,
      this.tabledisplayedColumnsMobileSource,
      [],
      this.tokenInfo,
    );
    this.tableRowsSelected = [];
    this.onActionTableRowSelect(new BankPaymentTransactionLogModel());
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.get_information_list")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.filteModelContent.accessLoad = true;
    const filterModel = this.filterModelCompiler(this.filteModelContent);
    /**filterActionSearch */
    if (this.filteModelContent.filterActionSearchRecordStatus > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "recordStatus";
      filter.value = this.filteModelContent.filterActionSearchRecordStatus;
      filterModel.filters.push(filter);
    }
    if (this.filteModelContent.filterActionSearchLinkSiteId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkSiteId";
      filter.value = this.filteModelContent.filterActionSearchLinkSiteId;
      filterModel.filters.push(filter);
    }
    if (this.filteModelContent.filterActionSearchLinkUserId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkUserId";
      filter.value = this.filteModelContent.filterActionSearchLinkUserId;
      filterModel.filters.push(filter);
    }
    /**filterActionSearch */
    const filter = new FilterDataModel();
    if (this.categoryModelSelected && this.categoryModelSelected.id > 0) {
      filter.propertyName = "LinkTransactionId";
      filter.value = this.categoryModelSelected.id;
      filterModel.filters.push(filter);
    }
    this.contentService.ServiceGetAllEditor(filterModel).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.tableSource.data = ret.listItems;
          if (this.optionsStatist?.data?.show) this.onActionButtonStatist(true);
          setTimeout(() => {
            if (this.optionsSearch.childMethods)
              this.optionsSearch.childMethods.setAccess(ret.access);
          }, 1000);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  onTableSortData(sort: MatSort): void {
    if (
      this.tableSource &&
      this.tableSource.sort &&
      this.tableSource.sort.active === sort.active
    ) {
      if (this.tableSource.sort.start === "asc") {
        sort.start = "desc";
        this.filteModelContent.sortColumn = sort.active;
        this.filteModelContent.sortType = SortTypeEnum.Descending;
      } else if (this.tableSource.sort.start === "desc") {
        sort.start = "asc";
        this.filteModelContent.sortColumn = "";
        this.filteModelContent.sortType = SortTypeEnum.Ascending;
      } else {
        sort.start = "desc";
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
  onActionButtonViewRow(
    model: BankPaymentTransactionLogModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id <= 0) {
      this.cmsToastrService.typeErrorSelectedRow();
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
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(BankPaymentTransactionLogViewComponent, {
      height: "90%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { id: this.tableRowSelected.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
  }
  onActionButtonDeleteRow(
    model: BankPaymentTransactionLogModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id <= 0) {
      this.translate
        .get("MESSAGE.no_row_selected_to_delete")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.onActionTableRowSelect(model);
    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessDeleteRow
    ) {
      this.cmsToastrService.typeErrorAccessDelete();
      return;
    }
  }
  onActionButtonNotifictionActionSend(
    model: BankPaymentTransactionLogModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id <= 0) {
      this.cmsToastrService.typeErrorSelected();
      return;
    }
    this.onActionTableRowSelect(model);
    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessEditRow
    ) {
      this.cmsToastrService.typeErrorAccessEdit();
      return;
    }
  }
  onActionSelectorSelect(model: ApplicationAppModel | null): void {
    /*filter */
    var sortColumn = this.filteModelContent.sortColumn;
    var sortType = this.filteModelContent.sortType;
    this.filteModelContent = new FilterModel();

    this.filteModelContent.sortColumn = sortColumn;
    this.filteModelContent.sortType = sortType;
    /*filter */
    this.categoryModelSelected = model;
    this.DataGetAll();
  }
  onActionButtonStatist(view = !this.optionsStatist.data.show): void {
    this.optionsStatist.data.show = view;
    if (!this.optionsStatist.data.show) {
      return;
    }
    const statist = new Map<string, number>();
    this.translate.get("MESSAGE.Active").subscribe((str: string) => {
      statist.set(str, 0);
    });
    this.translate.get("MESSAGE.All").subscribe((str: string) => {
      statist.set(str, 0);
    });
    const pName = this.constructor.name + ".ServiceStatist";
    this.translate.get("MESSAGE.Get_the_statist").subscribe((str: string) => {
      this.publicHelper.processService.processStart(
        pName,
        str,
        this.constructorInfoAreaId,
      );
    });
    const filterModel = this.filterModelCompiler(this.filteModelContent);
    /**filterActionSearch */
    if (this.filteModelContent.filterActionSearchRecordStatus > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "recordStatus";
      filter.value = this.filteModelContent.filterActionSearchRecordStatus;
      filterModel.filters.push(filter);
    }
    if (this.filteModelContent.filterActionSearchLinkSiteId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkSiteId";
      filter.value = this.filteModelContent.filterActionSearchLinkSiteId;
      filterModel.filters.push(filter);
    }
    if (this.filteModelContent.filterActionSearchLinkUserId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkUserId";
      filter.value = this.filteModelContent.filterActionSearchLinkUserId;
      filterModel.filters.push(filter);
    }
    /**filterActionSearch */
    this.contentService.ServiceGetCount(filterModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate.get("MESSAGE.All").subscribe((str: string) => {
            statist.set(str, ret.totalRowCount);
          });
          this.optionsStatist.childMethods.setStatistValue(statist);
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
    const filterStatist1 = this.filterModelCompiler(this.filteModelContent);
    /**filterActionSearch */
    if (this.filteModelContent.filterActionSearchRecordStatus > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "recordStatus";
      filter.value = this.filteModelContent.filterActionSearchRecordStatus;
      filterStatist1.filters.push(filter);
    }
    if (this.filteModelContent.filterActionSearchLinkSiteId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkSiteId";
      filter.value = this.filteModelContent.filterActionSearchLinkSiteId;
      filterStatist1.filters.push(filter);
    }
    if (this.filteModelContent.filterActionSearchLinkUserId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkUserId";
      filter.value = this.filteModelContent.filterActionSearchLinkUserId;
      filterStatist1.filters.push(filter);
    }
    /**filterActionSearch */
    const fastfilter = new FilterDataModel();
    fastfilter.propertyName = "recordStatus";
    fastfilter.value = RecordStatusEnum.Available;
    filterStatist1.filters.push(fastfilter);
    this.contentService.ServiceGetCount(filterStatist1).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate.get("MESSAGE.Active").subscribe((str: string) => {
            statist.set(str, ret.totalRowCount);
          });
          this.optionsStatist.childMethods.setStatistValue(statist);
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

  onActionButtonReload(): void {
    this.DataGetAll();
  }
  onSubmitOptionsSearch(model: Array<FilterDataModel>): void {
    if (model && model.length > 0) {
      this.filterDataModelQueryBuilder = [...model];
    } else {
      this.filterDataModelQueryBuilder = [];
    }
    this.DataGetAll();
  }

  onActionBackToParent(): void {
    this.router.navigate(["/bankpayment/transaction/"]);
  }
}
