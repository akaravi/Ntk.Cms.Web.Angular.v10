import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreSiteModel,
  CoreTokenConnectionModel,
  CoreTokenConnectionService,
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
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { environment } from "src/environments/environment";
import { CoreTokenConnectionEditComponent } from "../edit/edit.component";
import { CoreTokenConnectionViewComponent } from "../view/view.component";

@Component({
  selector: "app-coretoken-notification-list-online",
  templateUrl: "./list-online.component.html",
  standalone: false,
})
export class CoreTokenConnectionListOnlineComponent
  extends ListBaseComponent<
    CoreTokenConnectionService,
    CoreTokenConnectionModel,
    string
  >
  implements OnInit, OnDestroy
{
  requestLinkSiteId = 0;
  requestLinkUserId = 0;
  requestLinkDeviceId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public contentService: CoreTokenConnectionService,
    private cmsToastrService: CmsToastrService,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
    private activatedRoute: ActivatedRoute,
    public tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private cmsStoreService: CmsStoreService,
    private router: Router,
    public pageInfo: PageInfoService,
    public publicHelper: PublicHelper,
    public dialog: MatDialog,
  ) {
    super(
      contentService,
      new CoreTokenConnectionModel(),
      publicHelper,
      tokenHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;

    this.requestLinkSiteId = +Number(
      this.activatedRoute.snapshot.paramMap.get("linkSiteId"),
    );
    this.requestLinkUserId = +Number(
      this.activatedRoute.snapshot.paramMap.get("linkUserId"),
    );
    this.requestLinkDeviceId = +Number(
      this.activatedRoute.snapshot.paramMap.get("LinkDeviceId"),
    );

    if (this.requestLinkSiteId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "LinkCmsSiteId";
      filter.value = this.requestLinkSiteId;
      this.filteModelContent.filters.push(filter);
    }
    if (this.requestLinkUserId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkUserId";
      filter.value = this.requestLinkUserId;
      this.filteModelContent.filters.push(filter);
    }
    if (this.requestLinkDeviceId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "LinkDeviceId";
      filter.value = this.requestLinkDeviceId;
      this.filteModelContent.filters.push(filter);
    }
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

  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    "id",
    "linkSiteId",
    "linkUserId",
    "LinkMemberUserId",
    "UserAccessAreaType",
    "UserType",
    "UserAccessAdminAllowToAllData",
    "UserAccessAdminAllowToProfessionalData",
    "RememberOnDevice",
    "createdDate",
    "ExpireDate",
    // 'Action'
  ];
  tabledisplayedColumnsMobileSource: string[] = [
    "id",
    "linkSiteId",
    "linkUserId",
    "LinkMemberUserId",
    "UserAccessAreaType",
    "UserType",
    "UserAccessAdminAllowToAllData",
    "UserAccessAdminAllowToProfessionalData",
    "RememberOnDevice",
    "createdDate",
    "ExpireDate",
    // 'Action'
  ];
  dataModelEnumManageUserAccessAreaTypesResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelEnumManageUserAccessUserTypesResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  expandedElement: CoreSiteModel | null;
  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    this.filteModelContent.sortColumn = "createdDate";
    this.filteModelContent.sortType = SortTypeEnum.Descending;
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

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.processOrderStore)
        .subscribe(async (value) => {
          var rowProcessOrder = value.find(
            (x) =>
              x.contentAction == "core_token_online_update_list" && !x.isRun,
          );
          if (rowProcessOrder && rowProcessOrder?.id?.length > 0) {
            rowProcessOrder.isRun = true;
            this.publicHelper.setProcessOrder(rowProcessOrder);
            this.DataGetAll((isSuccess) => {
              rowProcessOrder.isComplate = true;
              rowProcessOrder.isSuccess = isSuccess;
              this.publicHelper.setProcessOrder(rowProcessOrder);
            });
          }
        }),
    );
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  DataGetAll(xFunc: any = () => {}): void {
    this.tabledisplayedColumns = this.publicHelper.TableDisplayedColumns(
      this.tabledisplayedColumnsSource,
      this.tabledisplayedColumnsMobileSource,
      [],
      this.tokenInfo,
    );
    this.tableRowsSelected = [];
    this.onActionTableRowSelect(new CoreTokenConnectionModel());
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
    /**filterActionSearch */
    if (this.filteModelContent.filterActionSearchRecordStatus > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "RecordStatus";
      filter.value = this.filteModelContent.filterActionSearchRecordStatus;
      filterModel.filters.push(filter);
    }
    if (this.filteModelContent.filterActionSearchLinkSiteId > 0) {
      const filter = new FilterDataModel();
      filter.propertyAnyName = "linkSiteId";
      filter.propertyName = "SiteUsers";
      filter.value = this.filteModelContent.filterActionSearchLinkSiteId;
      filterModel.filters.push(filter);
    }
    if (this.filteModelContent.filterActionSearchLinkUserId > 0) {
      const filter = new FilterDataModel();
      filter.propertyAnyName = "linkUserId";
      filter.value = this.filteModelContent.filterActionSearchLinkUserId;
      filterModel.filters.push(filter);
    }
    /**filterActionSearch */
    this.contentService.ServiceGetAllLiveConnection(filterModel).subscribe({
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

        if (xFunc) xFunc(true);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);

        if (xFunc) xFunc(false);
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
    model: CoreTokenConnectionModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    this.onActionTableRowSelect(model);
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
    const dialogRef = this.dialog.open(CoreTokenConnectionViewComponent, {
      height: "90%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { id: this.tableRowSelected.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        // this.DataGetAll();
      }
    });
  }

  onActionButtonEditRow(
    model: CoreTokenConnectionModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id.length === 0) {
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
    const dialogRef = this.dialog.open(CoreTokenConnectionEditComponent, {
      height: "90%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { id: this.tableRowSelected.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }
  onActionButtonDeleteRow(
    model: CoreTokenConnectionModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id.length === 0) {
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
        message =
          str["MESSAGE.Do_you_want_to_delete_this_content"] +
          "?" +
          "<br> ( " +
          this.tableRowSelected.id +
          " ) ";
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
    fastfilter.propertyName = "RecordStatus";
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

  onActionButtonViewUserRow(
    model: CoreTokenConnectionModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    this.onActionTableRowSelect(model);
    if (
      !this.tableRowSelected.linkUserId ||
      this.tableRowSelected.linkUserId === 0
    ) {
      this.translate
        .get("MESSAGE.content_does_not_contain_user_information")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.router.navigate(["/core/user/edit", this.tableRowSelected.linkUserId]);
  }

  onActionButtonViewSiteRow(
    model: CoreTokenConnectionModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    this.onActionTableRowSelect(model);
    if (
      !this.tableRowSelected.linkSiteId ||
      this.tableRowSelected.linkSiteId === 0
    ) {
      this.translate
        .get("MESSAGE.content_does_not_include_site_information")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.router.navigate(["/core/site/edit", this.tableRowSelected.linkSiteId]);
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
    this.router.navigate(["/core/site/"]);
  }
}
