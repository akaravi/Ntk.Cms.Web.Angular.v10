import {
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
    CrmDealModel,
    CrmDealService,
    FilterDataModel,
    FilterModel,
    ManageUserAccessDataTypesEnum,
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
import { ThemeService } from "src/app/core/services/theme.service";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { environment } from "src/environments/environment";
import { CrmDealAddComponent } from "../add/add.component";
import { CrmDealEditComponent } from "../edit/edit.component";

/**
 * Component لیست Dealهای CRM.
 * این component لیست تمام Dealهای موجود را نمایش می‌دهد و امکان افزودن، ویرایش و حذف را فراهم می‌کند.
 */
@Component({
  selector: "app-crm-deal-list",
  templateUrl: "./list.component.html",
  standalone: false,
})
export class CrmDealListComponent
  extends ListBaseComponent<CrmDealService, CrmDealModel, string>
  implements OnInit, OnDestroy
{
  requestLinkOpportunityId = "";
  requestLinkAccountId = "";
  requestLinkContactId = "";
  requestLinkPipelineId = "";
  requestLinkStageId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private contentService: CrmDealService,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
    public cmsToastrService: CmsToastrService,
    private router: Router,
    public tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
    public themeService: ThemeService,
    private activatedRoute: ActivatedRoute,
    public pageInfo: PageInfoService,
    public publicHelper: PublicHelper,
    public dialog: MatDialog,
  ) {
    super(
      contentService,
      new CrmDealModel(),
      publicHelper,
      tokenHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };
    this.requestLinkOpportunityId =
      this.activatedRoute.snapshot.paramMap.get("LinkOpportunityId");
    this.requestLinkAccountId =
      this.activatedRoute.snapshot.paramMap.get("LinkAccountId");
    this.requestLinkContactId =
      this.activatedRoute.snapshot.paramMap.get("LinkContactId");
    this.requestLinkPipelineId =
      this.activatedRoute.snapshot.paramMap.get("LinkPipelineId");
    this.requestLinkStageId =
      this.activatedRoute.snapshot.paramMap.get("LinkStageId");

    /*filter Sort*/
    this.filteModelContent.sortColumn = "id";
    this.filteModelContent.sortType = SortTypeEnum.Descending;
  }
  @Input() optionloadComponent = true;
  @Input() optionloadByRoute = true;
  @Input() set optionLinkOpportunityId(id: string) {
    this.requestLinkOpportunityId = "";
    if (id && id.length > 0) {
      this.requestLinkOpportunityId = id;
    }
  }
  link: string;
  comment: string;
  author: string;
  dataSource: any;
  flag = false;
  tableContentSelected = [];

  filteModelContent = new FilterModel();

  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    "name",
    "linkOpportunityId",
    "linkAccountId",
    "amount",
    "currency",
    "stage",
    "status",
    "probability",
    "expectedCloseDate",
    "action_menu",
  ];

  tabledisplayedColumnsMobileSource: string[] = [
    "name",
    "amount",
    "currency",
    "stage",
    "status",
    "action_menu",
  ];

  expandedElement: CrmDealModel | null;
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
    if (!this.optionloadComponent) {
      return;
    }
    this.tableRowsSelected = [];
    this.onActionTableRowSelect(new CrmDealModel());

    if (
      this.requestLinkOpportunityId &&
      this.requestLinkOpportunityId.length > 0
    ) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkOpportunityId";
      filter.value = this.requestLinkOpportunityId;
      this.filteModelContent.filters.push(filter);
    }
    if (this.requestLinkAccountId && this.requestLinkAccountId.length > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkAccountId";
      filter.value = this.requestLinkAccountId;
      this.filteModelContent.filters.push(filter);
    }
    if (this.requestLinkContactId && this.requestLinkContactId.length > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkContactId";
      filter.value = this.requestLinkContactId;
      this.filteModelContent.filters.push(filter);
    }
    if (this.requestLinkPipelineId && this.requestLinkPipelineId.length > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkPipelineId";
      filter.value = this.requestLinkPipelineId;
      this.filteModelContent.filters.push(filter);
    }
    if (this.requestLinkStageId && this.requestLinkStageId.length > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkStageId";
      filter.value = this.requestLinkStageId;
      this.filteModelContent.filters.push(filter);
    }

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
    this.contentService.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    this.contentService.ServiceGetAll(filterModel).subscribe({
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
    const dialogRef = this.dialog.open(CrmDealAddComponent, {
      height: "90%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }

  onActionButtonEditRow(model: CrmDealModel = this.tableRowSelected): void {
    if (!(model?.id?.length > 0)) {
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
    const dialogRef = this.dialog.open(CrmDealEditComponent, {
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
  onActionButtonDeleteRow(model: CrmDealModel = this.tableRowSelected): void {
    if (!(model?.id?.length > 0)) {
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
          this.tableRowSelected.name +
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
    const filterModel = this.filterModelCompiler(this.filteModelContent);
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

  onActionCopied(): void {
    this.cmsToastrService.typeSuccessCopedToClipboard();
  }

  onActionButtonReload(): void {
    this.optionloadComponent = true;
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

  isExpansionDetailRow = (index: number, row: CrmDealModel) =>
    row.hasOwnProperty("detailRow");
  onActionButtonMemoRow(): void {}
  onActionButtonMemo(): void {}
  onActionButtonExport(): void {}
  onActionButtonPrintRow(): void {}
}
