import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  FilterDataModel,
  FilterModel,
  RecordStatusEnum,
  SmsMainClientApplicationModel,
  SmsMainClientApplicationService,
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
import { SmsMainClientApplicationAddComponent } from "../add/add.component";
import { SmsMainClientApplicationEditComponent } from "../edit/edit.component";

@Component({
  selector: "app-sms-client-application-list",
  templateUrl: "./list.component.html",
  standalone: false,
})
export class SmsMainClientApplicationListComponent
  extends ListBaseComponent<
    SmsMainClientApplicationService,
    SmsMainClientApplicationModel,
    string
  >
  implements OnInit, OnDestroy
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tableData: SmsMainClientApplicationModel[] = [];
  requestLinkUserId = "";
  requestLinkSiteId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public contentService: SmsMainClientApplicationService,
    public cmsToastrService: CmsToastrService,
    private activatedRoute: ActivatedRoute,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
    private router: Router,
    public tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
    public pageInfo: PageInfoService,
    public publicHelper: PublicHelper,
    public dialog: MatDialog,
  ) {
    super(
      contentService,
      new SmsMainClientApplicationModel(),
      publicHelper,
      tokenHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };

    if (this.activatedRoute.snapshot.paramMap.get("LinkUserId")) {
      this.requestLinkUserId =
        this.activatedRoute.snapshot.paramMap.get("LinkUserId");
    }
    if (this.activatedRoute.snapshot.paramMap.get("LinkSiteId")) {
      this.requestLinkSiteId =
        +this.activatedRoute.snapshot.paramMap.get("LinkSiteId") || 0;
    }
    if (this.requestLinkUserId?.length > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "LinkUserId";
      filter.value = this.requestLinkUserId;
      this.filteModelContent.filters.push(filter);
    }
    if (this.requestLinkSiteId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkSiteId";
      filter.value = this.requestLinkSiteId;
      this.filteModelContent.filters.push(filter);
    }

    /*filter Sort*/
    this.filteModelContent.sortColumn = "id";
    this.filteModelContent.sortType = SortTypeEnum.Descending;
  }
  comment: string;
  author: string;
  dataSource: SmsMainClientApplicationModel;
  flag = false;
  tableContentSelected = [];

  filteModelContent = new FilterModel();
  filterDataModelQueryBuilder: FilterDataModel[] = [];

  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    "recordStatus",
    "title",
    "linkUserId",
    "linkSiteId",
    "createdDate",
    "updatedDate",
    // 'Action'
  ];
  tabledisplayedColumnsMobileSource: string[] = [
    "recordStatus",
    "title",
    "linkUserId",
    "createdDate",
    // 'Action'
  ];
  expandedElement: SmsMainClientApplicationModel | null;
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
    this.onActionTableRowSelect(new SmsMainClientApplicationModel());
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
    this.contentService.ServiceGetAllEditor(filterModel).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        this.dataModelResult = ret;

        if (ret.isSuccess) {
          this.tableData = ret.listItems;
          this.tableSource.data = ret.listItems;
          if (this.sort) {
            this.tableSource.sort = this.sort;
          }
          if (this.paginator) {
            this.tableSource.paginator = this.paginator;
          }
          // Clear filter to show all data
          this.tableSource.filter = "";

          if (this.optionsStatist?.data?.show) {
            this.onActionButtonStatist(true);
          }
          setTimeout(() => {
            if (this.optionsSearch.childMethods) {
              this.optionsSearch.childMethods.setAccess(ret.access);
            }
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
    let linkUserId = this.requestLinkUserId;
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(SmsMainClientApplicationAddComponent, {
      height: "90%",
      width: "60%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {
        linkUserId: linkUserId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.onActionButtonEditRow(result.model);
        this.DataGetAll();
      }
    });
  }

  onActionButtonEditRow(
    model: SmsMainClientApplicationModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id.length == 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    this.onActionTableRowSelect(model);
    this.tableRowSelected = model;
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
    const dialogRef = this.dialog.open(SmsMainClientApplicationEditComponent, {
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
    model: SmsMainClientApplicationModel = this.tableRowSelected,
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

  onActionButtonPermissionList(
    model: SmsMainClientApplicationModel = this.tableRowSelected,
    event?: MouseEvent,
  ): void {
    if (!model || !model.id || model.id.length == 0) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.typeErrorSelectedRow")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.onActionTableRowSelect(model);

    if (this.dataModelResult == null || this.dataModelResult.access == null) {
      this.cmsToastrService.typeErrorSelected();
      return;
    }
    if (event?.ctrlKey) {
      const link =
        "/#/sms/main/client-application-permission/LinkClientApplicationId/" +
        this.tableRowSelected.id;
      window.open(link, "_blank");
    } else {
      this.router.navigate([
        "/sms/main/client-application-permission/LinkClientApplicationId/",
        this.tableRowSelected.id,
      ]);
    }
  }
  onActionButtonReload(): void {
    this.DataGetAll();
  }
  onActionCopied(): void {
    this.cmsToastrService.typeSuccessCopedToClipboard();
  }
  onSubmitOptionsSearch(model: Array<FilterDataModel>): void {
    if (model && model.length > 0) {
      this.filterDataModelQueryBuilder = [...model];
    } else {
      this.filterDataModelQueryBuilder = [];
    }
    this.DataGetAll();
  }
}
