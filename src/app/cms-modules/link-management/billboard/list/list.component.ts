import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  FilterDataModel,
  LinkManagementBillboardFilterModel,
  LinkManagementBillboardModel,
  LinkManagementBillboardPatternModel,
  LinkManagementBillboardService,
  LinkManagementCategoryModel,
  LinkManagementTargetFilterModel,
  RecordStatusEnum,
  SortTypeEnum,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { ListBaseComponent } from "src/app/core/cmsComponent/listBaseComponent";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { PageInfoService } from "src/app/core/services/page-info.service";
import { environment } from "src/environments/environment";
import { PublicHelper } from "../../../../core/helpers/publicHelper";
import { CmsToastrService } from "../../../../core/services/cmsToastr.service";
import { LinkManagementBillboardDeleteComponent } from "../delete/delete.component";

@Component({
  selector: "app-linkmanagement-billboard-list",
  templateUrl: "./list.component.html",
  standalone: false,
})
export class LinkManagementBillboardListComponent
  extends ListBaseComponent<
    LinkManagementBillboardService,
    LinkManagementBillboardModel,
    number
  >
  implements OnInit, OnDestroy
{
  requestLinkBillboardPatternId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public contentService: LinkManagementBillboardService,
    private cmsToastrService: CmsToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cmsStoreService: CmsStoreService,
    public tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    public pageInfo: PageInfoService,
    public publicHelper: PublicHelper,
    public dialog: MatDialog,
  ) {
    super(
      contentService,
      new LinkManagementBillboardModel(),
      publicHelper,
      tokenHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;

    this.requestLinkBillboardPatternId = +Number(
      this.activatedRoute.snapshot.paramMap.get("LinkBillboardPatternId"),
    );

    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };

    /*filter Sort*/
    this.filteModelContent.sortColumn = "id";
    this.filteModelContent.sortType = SortTypeEnum.Descending;
    if (this.requestLinkBillboardPatternId > 0) {
      const fastfilter = new FilterDataModel();
      fastfilter.propertyName = "LinkBillboardPatternId";
      fastfilter.value = this.requestLinkBillboardPatternId;
      this.filteModelContent.filters.push(fastfilter);
    }
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
  filteModelContent = new LinkManagementBillboardFilterModel();
  filterDataModelQueryBuilder: FilterDataModel[] = [];
  categoryModelSelected: LinkManagementCategoryModel;
  categoryPatternModelSelected: LinkManagementBillboardPatternModel;

  filterModelCompiler(
    model: LinkManagementTargetFilterModel,
  ): LinkManagementTargetFilterModel {
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

  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    "linkMainImageIdSrc",
    "id",
    "recordStatus",
    // 'Title',
    "createdDate",
    "updatedDate",
    // 'Action'
  ];
  tabledisplayedColumnsMobileSource: string[] = [
    "linkMainImageIdSrc",
    "id",
    "recordStatus",
    // 'Title',
    "createdDate",
    "updatedDate",
    // 'Action'
  ];

  private unsubscribe: Subscription[] = [];
  ngOnInit(): void {
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
  }
  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  DataGetAll(): void {
    this.tabledisplayedColumns = this.publicHelper.TableDisplayedColumns(
      this.tabledisplayedColumnsSource,
      this.tabledisplayedColumnsMobileSource,
      [],
      this.tokenInfo,
    );
    this.tableRowsSelected = [];
    this.onActionTableRowSelect(new LinkManagementBillboardModel());
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
    if (this.categoryModelSelected && this.categoryModelSelected.id > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkBillboardPatternId";
      filter.value = this.categoryModelSelected.id;
      filterModel.filters.push(filter);
    }
    if (
      this.categoryPatternModelSelected &&
      this.categoryPatternModelSelected.id > 0
    ) {
      const filter = new FilterDataModel();
      filter.propertyName = "billboardCategories";
      filter.propertyAnyName = "linkCategoryId";
      filter.value = this.categoryPatternModelSelected.id;
      filterModel.filters.push(filter);
    }

    this.contentService.setAccessLoad();
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

  onActionSelectorSelectPattern(
    model: LinkManagementBillboardPatternModel | null,
  ): void {
    /*filter */
    var sortColumn = this.filteModelContent.sortColumn;
    var sortType = this.filteModelContent.sortType;
    this.filteModelContent = new LinkManagementBillboardFilterModel();
    this.filteModelContent.sortColumn = sortColumn;
    this.filteModelContent.sortType = sortType;
    /*filter */
    this.categoryPatternModelSelected = model;

    this.DataGetAll();
  }
  onActionSelectorSelectCategory(
    model: LinkManagementCategoryModel | null,
  ): void {
    /*filter */
    var sortColumn = this.filteModelContent.sortColumn;
    var sortType = this.filteModelContent.sortType;
    this.filteModelContent = new LinkManagementBillboardFilterModel();
    this.filteModelContent.sortColumn = sortColumn;
    this.filteModelContent.sortType = sortType;
    /*filter */
    this.categoryModelSelected = model;

    this.DataGetAll();
  }
  onActionButtonNewRow(): void {
    if (
      this.categoryPatternModelSelected == null ||
      this.categoryPatternModelSelected.id === 0
    ) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.typeErrorCategoryNotSelected")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessAddRow
    ) {
      this.cmsToastrService.typeErrorAccessAdd();
      return;
    }
    this.router.navigate([
      "/linkmanagement/billboard/add",
      this.categoryPatternModelSelected.id,
    ]);
  }

  onActionButtonEditRow(
    model: LinkManagementBillboardModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
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
    this.router.navigate([
      "/linkmanagement/billboard/edit",
      this.tableRowSelected.id,
    ]);
  }
  onActionButtonDeleteRow(
    model: LinkManagementBillboardModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id === 0) {
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
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(LinkManagementBillboardDeleteComponent, {
      height: "90%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { id: this.tableRowSelected.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
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

  onActionButtonLog(
    model: LinkManagementBillboardModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id === 0) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.typeErrorSelectedRow")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.router.navigate([
      "/linkmanagement/target-billboard-log/LinkManagementBillboardId",
      model.id,
    ]);
  }
}
