import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  ErrorExceptionResult,
  FilterDataModel,
  FilterModel,
  InfoEnumModel,
  RecordStatusEnum,
  SmsEnumService,
  SmsMainApiPathModel,
  SmsMainApiPathPriceServiceModel,
  SmsMainApiPathPriceServiceService,
  SmsMainApiPathService,
  SortTypeEnum,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { ListBaseComponent } from "src/app/core/cmsComponent/listBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { PageInfoService } from "src/app/core/services/page-info.service";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { environment } from "src/environments/environment";
import { SmsMainApiPathPriceServiceAddComponent } from "../add/add.component";
import { SmsMainApiPathPriceServiceEditComponent } from "../edit/edit.component";

@Component({
  selector: "app-sms-apipathpriceservice-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class SmsMainApiPathPriceServiceListMobileComponent
  extends ListBaseComponent<
    SmsMainApiPathPriceServiceService,
    SmsMainApiPathPriceServiceModel,
    string
  >
  implements OnInit, OnDestroy
{
  requestLinkApiPathId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public contentService: SmsMainApiPathPriceServiceService,
    private cmsToastrService: CmsToastrService,
    private activatedRoute: ActivatedRoute,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
    private router: Router,
    public tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private smsMainApiPathService: SmsMainApiPathService,
    private cmsStoreService: CmsStoreService,
    public smsEnumService: SmsEnumService,
    public pageInfo: PageInfoService,
    public publicHelper: PublicHelper,
    public dialog: MatDialog,
  ) {
    super(
      contentService,
      new SmsMainApiPathPriceServiceModel(),
      publicHelper,
      tokenHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };

    /*filter Sort*/
    this.filteModelContent.sortColumn = "LinkApiPathId";
    this.filteModelContent.sortType = SortTypeEnum.Ascending;
  }
  filteModelContent = new FilterModel();
  filterDataModelQueryBuilder: FilterDataModel[] = [];

  categoryModelSelected: SmsMainApiPathModel;
  dataModelSmsMessageTypeEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelSmsOutBoxTypeEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelPrivateResult: ErrorExceptionResult<SmsMainApiPathModel> =
    new ErrorExceptionResult<SmsMainApiPathModel>();
  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    "recordStatus",
    "title",
    "LinkApiPathId",
    "messageType",
    "serviceMaxPage",
    "endUserMaxPage",
    "servicePricePerPage",
    "endUserPricePerPage",
  ];
  tabledisplayedColumnsMobileSource: string[] = [
    "recordStatus",
    "title",
    "LinkApiPathId",
    "messageType",
    "servicePricePerPage",
    "endUserPricePerPage",
  ];

  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    this.filteModelContent.sortColumn = "LinkApiPathId";
    if (this.activatedRoute.snapshot.paramMap.get("LinkApiPathId")) {
      this.requestLinkApiPathId =
        this.activatedRoute.snapshot.paramMap.get("LinkApiPathId");
    }
    if (this.requestLinkApiPathId?.length > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "LinkApiPathId";
      filter.value = this.requestLinkApiPathId;
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
    this.getPrivateConfig();
    this.getSmsMessageTypeEnum();
  }
  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  getPrivateConfig(): void {
    const filter = new FilterModel();
    filter.rowPerPage = 100;
    this.smsMainApiPathService.ServiceGetAll(filter).subscribe({
      next: (ret) => {
        this.dataModelPrivateResult = ret;
      },
    });
  }
  getSmsMessageTypeEnum(): void {
    this.smsEnumService.ServiceSmsMessageTypeEnum().subscribe((res) => {
      this.dataModelSmsMessageTypeEnumResult = res;
    });
  }
  getSmsOutBoxTypeEnum(): void {
    this.smsEnumService.ServiceSmsOutBoxTypeEnum().subscribe((res) => {
      this.dataModelSmsOutBoxTypeEnumResult = res;
    });
  }
  DataGetAll(): void {
    this.tabledisplayedColumns = this.publicHelper.TableDisplayedColumns(
      this.tabledisplayedColumnsSource,
      this.tabledisplayedColumnsMobileSource,
      [],
      this.tokenInfo,
    );
    this.tableRowsSelected = [];
    this.onActionTableRowSelect(new SmsMainApiPathPriceServiceModel());
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
    /*filter CLone*/
    const filterModel = JSON.parse(JSON.stringify(this.filteModelContent));
    /*filter CLone*/
    /*filter add search*/
    if (
      this.filterDataModelQueryBuilder &&
      this.filterDataModelQueryBuilder.length > 0
    ) {
      filterModel.filters = [...this.filterDataModelQueryBuilder];
    }
    /*filter add search*/
    /** filter Category */
    if (
      this.categoryModelSelected &&
      this.categoryModelSelected.id.length > 0
    ) {
      let fastfilter = new FilterDataModel();
      fastfilter.propertyName = "LinkApiPathId";
      fastfilter.value = this.categoryModelSelected.id;
      filterModel.filters.push(fastfilter);
    }
    /** filter Category */
    this.contentService.ServiceGetAllEditor(filterModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

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

  onActionButtonNewRow(): void {
    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessAddRow
    ) {
      this.cmsToastrService.typeErrorAccessAdd();
      return;
    }
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(SmsMainApiPathPriceServiceAddComponent, {
      height: "90%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { linkApiPathId: this.categoryModelSelected?.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }

  onActionButtonEditRow(
    model: SmsMainApiPathPriceServiceModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id.length == 0) {
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
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(
      SmsMainApiPathPriceServiceEditComponent,
      {
        height: "90%",
        panelClass: panelClass,
        enterAnimationDuration:
          environment.cmsViewConfig.enterAnimationDuration,
        exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
        data: { id: this.tableRowSelected.id },
      },
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }

  onActionButtonDeleteRow(
    model: SmsMainApiPathPriceServiceModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id.length == 0) {
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

    var title = "";
    var message = "";
    this.translate
      .get([
        "MESSAGE.Please_Confirm",
        "MESSAGE.Do_you_want_to_delete_this_content",
      ])
      .subscribe((str: string) => {
        title = str["MESSAGE.Please_Confirm"];
        message = str["MESSAGE.Do_you_want_to_delete_this_content"] + "?";
      });
    this.cmsConfirmationDialogService
      .confirm(title, message)
      .then((confirmed) => {
        if (confirmed) {
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

          this.contentService
            .ServiceDelete(this.tableRowSelected.id)
            .subscribe({
              next: (ret) => {
                if (ret.isSuccess) {
                  this.cmsToastrService.typeSuccessRemove();
                  this.DataGetAll();
                } else {
                  this.cmsToastrService.typeErrorRemove();
                }
                this.publicHelper.processService.processStop(pName);
              },
              error: (er) => {
                this.cmsToastrService.typeError(er);
                this.publicHelper.processService.processStop(pName, false);
              },
            });
        }
      })
      .catch(() => {
        // console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
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
    this.contentService.ServiceGetCount(this.filteModelContent).subscribe({
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

    const filterStatist1 = JSON.parse(JSON.stringify(this.filteModelContent));
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

  // Pull-to-Refresh functionality
  pullToRefreshState = {
    isRefreshing: false,
    startY: 0,
    currentY: 0,
    pullDistance: 0,
    threshold: 80,
  };

  Math = Math;

  // Swipe Actions functionality
  swipeState: Map<
    string,
    { startX: number; currentX: number; offset: number }
  > = new Map();
  readonly SWIPE_THRESHOLD = 100;
  readonly SWIPE_MAX_OFFSET = 120;

  onItemTouchStart(event: TouchEvent, itemId: string): void {
    event.stopPropagation();
    const touch = event.touches[0];
    this.swipeState.set(itemId, {
      startX: touch.clientX,
      currentX: touch.clientX,
      offset: 0,
    });
  }

  onItemTouchMove(event: TouchEvent, itemId: string): void {
    event.stopPropagation();
    const state = this.swipeState.get(itemId);
    if (!state) return;
    const touch = event.touches[0];
    state.currentX = touch.clientX;
    const diff = state.currentX - state.startX;
    const isRTL = document.documentElement.dir === "rtl";
    const maxOffset = isRTL ? this.SWIPE_MAX_OFFSET : -this.SWIPE_MAX_OFFSET;
    const minOffset = isRTL ? -this.SWIPE_MAX_OFFSET : this.SWIPE_MAX_OFFSET;
    state.offset = Math.max(minOffset, Math.min(maxOffset, diff));
  }

  onItemTouchEnd(event: TouchEvent, itemId: string): void {
    event.stopPropagation();
    const state = this.swipeState.get(itemId);
    if (!state) return;
    const isRTL = document.documentElement.dir === "rtl";
    const threshold = isRTL ? this.SWIPE_THRESHOLD : -this.SWIPE_THRESHOLD;
    if (
      (isRTL && state.offset > threshold) ||
      (!isRTL && state.offset < threshold)
    ) {
    } else {
      state.offset = 0;
    }
    this.swipeState.set(itemId, state);
  }

  onTouchStart(event: TouchEvent): void {
    const target = event.target as HTMLElement;
    const contentArea = target.closest(".cms-m-content");
    if (contentArea && (contentArea as HTMLElement).scrollTop === 0) {
      this.pullToRefreshState.startY = event.touches[0].clientY;
      this.pullToRefreshState.isRefreshing = false;
    }
  }

  onTouchMove(event: TouchEvent): void {
    const target = event.target as HTMLElement;
    const contentArea = target.closest(".cms-m-content");
    if (
      contentArea &&
      (contentArea as HTMLElement).scrollTop === 0 &&
      this.pullToRefreshState.startY > 0
    ) {
      this.pullToRefreshState.currentY = event.touches[0].clientY;
      this.pullToRefreshState.pullDistance = Math.max(
        0,
        this.pullToRefreshState.currentY - this.pullToRefreshState.startY,
      );
      if (this.pullToRefreshState.pullDistance > 10) {
        event.preventDefault();
      }
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (
      this.pullToRefreshState.pullDistance >=
        this.pullToRefreshState.threshold &&
      !this.pullToRefreshState.isRefreshing
    ) {
      this.pullToRefreshState.isRefreshing = true;
      this.onActionButtonReload();
      setTimeout(() => {
        this.pullToRefreshState.isRefreshing = false;
        this.pullToRefreshState.pullDistance = 0;
        this.pullToRefreshState.startY = 0;
        this.pullToRefreshState.currentY = 0;
      }, 1000);
    } else {
      this.pullToRefreshState.pullDistance = 0;
      this.pullToRefreshState.startY = 0;
      this.pullToRefreshState.currentY = 0;
    }
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
    this.router.navigate(["/sms/main/api-path"]);
  }

  onActionTableRowSelect(row: SmsMainApiPathPriceServiceModel): void {
    this.tableRowSelected = row;
  }
}
