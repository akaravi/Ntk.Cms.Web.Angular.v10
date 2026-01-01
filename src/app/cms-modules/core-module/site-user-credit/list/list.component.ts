import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
    CoreModuleModel,
    CoreModuleService,
    CoreModuleSiteUserCreditModel,
    CoreModuleSiteUserCreditService,
    ErrorExceptionResult,
    FilterDataModel,
    FilterModel,
    RecordStatusEnum,
    SortTypeEnum,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { ListBaseComponent } from "src/app/core/cmsComponent/listBaseComponent";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { PageInfoService } from "src/app/core/services/page-info.service";
import { CmsBankpaymentTransactionInfoComponent } from "src/app/shared/cms-bankpayment-transaction-info/cms-bankpayment-transaction-info.component";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { environment } from "src/environments/environment";
import { PublicHelper } from "../../../../core/helpers/publicHelper";
import { CmsToastrService } from "../../../../core/services/cmsToastr.service";
import { CoreModuleSiteUserCreditChargeDirectComponent } from "../charge-direct/charge-direct.component";
import { CoreModuleSiteUserCreditChargeOnlineComponent } from "../charge-online/charge-online.component";
import { CoreModuleSiteUserCreditEditComponent } from "../edit/edit.component";

@Component({
  selector: "app-coremodule-site-user-credit-list",
  templateUrl: "./list.component.html",
  standalone: false,
})
export class CoreModuleSiteUserCreditListComponent
  extends ListBaseComponent<
    CoreModuleSiteUserCreditService,
    CoreModuleSiteUserCreditModel,
    number
  >
  implements OnInit, OnDestroy
{
  requestLinkUserId = 0;
  requestLinkSiteId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public contentService: CoreModuleSiteUserCreditService,
    private cmsToastrService: CmsToastrService,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
    public tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private cmsStoreService: CmsStoreService,
    private coreModuleService: CoreModuleService,
    public router: Router,
    public pageInfo: PageInfoService,
    public publicHelper: PublicHelper,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {
    super(
      contentService,
      new CoreModuleSiteUserCreditModel(),
      publicHelper,
      tokenHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;

    this.requestLinkUserId = +Number(
      this.activatedRoute.snapshot.paramMap.get("LinkUserId"),
    );
    this.requestLinkSiteId = +Number(
      this.activatedRoute.snapshot.paramMap.get("LinkSiteId"),
    );
    if (this.requestLinkUserId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkUserId";
      filter.value = this.requestLinkUserId;
      this.filteModelContent.filters.push(filter);
    }
    if (this.requestLinkSiteId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkSiteId";
      filter.value = this.requestLinkSiteId;
      this.filteModelContent.filters.push(filter);
    }
    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };

    /*filter Sort*/
    this.filteModelContent.sortColumn = "id";
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
  filteModelContent = new FilterModel();
  filterDataModelQueryBuilder: FilterDataModel[] = [];

  dataModelCoreModuleResult: ErrorExceptionResult<CoreModuleModel> =
    new ErrorExceptionResult<CoreModuleModel>();

  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    "recordStatus",
    "linkSiteId",
    // 'LinkUserId',
    "LinkModuleId",
    "Credit",
    "SumCreditBlocked",
    "SumCost",
    "SumDebtor",
    "SumCreditor",
    // 'Action'
  ];
  tabledisplayedColumnsMobileSource: string[] = [
    "recordStatus",
    "linkSiteId",
    // 'LinkUserId',
    "LinkModuleId",
    "Credit",
    "SumCreditBlocked",
    // 'Action'
  ];
  searchonCheckMyAccount = false;
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
    this.getModuleList();
    /**last payment transaction check*/
    const transactionId = +localStorage.getItem("TransactionId");
    if (transactionId > 0) {
      const dialogRef = this.dialog.open(
        CmsBankpaymentTransactionInfoComponent,
        {
          // height: "90%",
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
    /**last payment transaction check*/
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
    this.onActionTableRowSelect(new CoreModuleSiteUserCreditModel());
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
    if (this.searchonCheckMyAccount) {
      filterModel.filters.push({
        propertyName: "linkUserId",
        value: this.tokenInfo.user.id,
      });
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

  onActionButtonEditRow(
    model: CoreModuleSiteUserCreditModel = this.tableRowSelected,
  ): void {
    if (!(model?.id > 0)) {
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

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { id: this.tableRowSelected.id };
    const dialogRef = this.dialog.open(
      CoreModuleSiteUserCreditEditComponent,
      dialogConfig,
    );
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }
  onActionButtonDeleteRow(
    model: CoreModuleSiteUserCreditModel = this.tableRowSelected,
  ): void {
    if (!(model?.id > 0)) {
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
          this.tableRowSelected.linkUserId +
          " ) ";
      });
    this.cmsConfirmationDialogService
      .confirm(title, message)
      .then((confirmed) => {
        if (confirmed) {
          const pName = this.constructor.name + "ServiceDelete";
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
  onActionButtonCheckMyAccount(view = !this.searchonCheckMyAccount): void {
    this.searchonCheckMyAccount = view;
    // if (!this.searchonCheckMyAccount) {
    //   return;
    // }
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

  onActionButtonLogCreditAccountRow(
    model: CoreModuleSiteUserCreditModel = this.tableRowSelected,
    event?: MouseEvent,
  ): void {
    if (
      !model ||
      !model.linkModuleId ||
      model.linkModuleId === 0 ||
      !model.linkSiteId ||
      model.linkSiteId === 0 ||
      !model.linkUserId ||
      model.linkUserId === 0
    ) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.typeErrorSelectedRow")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.onActionTableRowSelect(model);

    if (event?.ctrlKey) {
      var link =
        "/#/coremodulelog/site-user-credit/" +
        model.linkSiteId +
        "/" +
        model.linkUserId +
        "/" +
        model.linkModuleId;
      window.open(link, "_blank");
    } else {
      this.router.navigate([
        "/coremodulelog/site-user-credit",
        model.linkSiteId,
        model.linkUserId,
        model.linkModuleId,
      ]);
    }
  }

  onActionButtonSiteUserCreditDirectAccountRow(
    model: CoreModuleSiteUserCreditModel = this.tableRowSelected,
  ): void {
    if (
      !model ||
      !model.linkModuleId ||
      model.linkModuleId === 0 ||
      !model.linkSiteId ||
      model.linkSiteId === 0
    ) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.typeErrorSelectedRow")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.onActionTableRowSelect(model);
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    //open popup
    const dialogRef = this.dialog.open(
      CoreModuleSiteUserCreditChargeDirectComponent,
      {
        height: "50%",
        width: "50%",
        panelClass: panelClass,
        enterAnimationDuration:
          environment.cmsViewConfig.enterAnimationDuration,
        exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
        data: {
          model: model,
        },
      },
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
    //open popup
  }

  onActionButtonSiteUserCreditOnlineAccountRow(
    model: CoreModuleSiteUserCreditModel = this.tableRowSelected,
  ): void {
    if (
      !model ||
      !model.linkModuleId ||
      model.linkModuleId === 0 ||
      !model.linkSiteId ||
      model.linkSiteId === 0
    ) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.typeErrorSelectedRow")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.onActionTableRowSelect(model);

    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    //open popup
    const dialogRef = this.dialog.open(
      CoreModuleSiteUserCreditChargeOnlineComponent,
      {
        height: "50%",
        width: "50%",
        panelClass: panelClass,
        enterAnimationDuration:
          environment.cmsViewConfig.enterAnimationDuration,
        exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
        data: {
          model: model,
        },
      },
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
    //open popup
  }
}
