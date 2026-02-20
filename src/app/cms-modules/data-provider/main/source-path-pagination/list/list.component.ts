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
import { TranslateService } from "@ngx-translate/core";
import {
  DataProviderSourcePathPaginationModel,
  DataProviderSourcePathPaginationService,
  FilterDataModel,
  FilterModel,
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
import { DataProviderSourcePathPaginationAddComponent } from "../add/add.component";
import { DataProviderSourcePathPaginationEditComponent } from "../edit/edit.component";

@Component({
  selector: "app-data-provider-source-path-pagination-list",
  templateUrl: "./list.component.html",
  standalone: false,
})
export class DataProviderSourcePathPaginationListComponent
  extends ListBaseComponent<
    DataProviderSourcePathPaginationService,
    DataProviderSourcePathPaginationModel,
    string
  >
  implements OnInit, OnDestroy
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tableData: DataProviderSourcePathPaginationModel[] = [];
  constructorInfoAreaId = this.constructor.name;
  filteModelContent = new FilterModel();
  filterDataModelQueryBuilder: FilterDataModel[] = [];
  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    "recordStatus",
    "title",
    "id",
    "linkSourcePathId",
    "servicePricePerPage",
    "endUserPricePerPage",
    "action",
  ];
  tabledisplayedColumnsMobileSource: string[] = [
    "recordStatus",
    "title",
    "id",
    "linkSourcePathId",
    "action",
  ];
  private unsubscribe: Subscription[] = [];

  constructor(
    public contentService: DataProviderSourcePathPaginationService,
    private cmsToastrService: CmsToastrService,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
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
      new DataProviderSourcePathPaginationModel(),
      publicHelper,
      tokenHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };
    this.filteModelContent.sortColumn = "id";
    this.filteModelContent.sortType = SortTypeEnum.Descending;
  }

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
    const filterModel = JSON.parse(JSON.stringify(model));
    if (
      this.filterDataModelQueryBuilder &&
      this.filterDataModelQueryBuilder.length > 0
    ) {
      filterModel.filters = [...this.filterDataModelQueryBuilder];
    }
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
    this.onActionTableRowSelect(new DataProviderSourcePathPaginationModel());
    const pName = this.constructor.name + ".DataGetAll";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.filteModelContent.accessLoad = true;
    const filterModel = this.filterModelCompiler(this.filteModelContent);
    this.contentService.ServiceGetAllEditor(filterModel).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

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
        this.applyDataGetAllResult(ret);
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
      if (this.tableSource.sort.direction === "asc") {
        sort.direction = "desc";
      } else {
        sort.direction = "asc";
      }
    } else {
      sort.direction = "asc";
    }
    this.tableSource.sort = sort;
    this.filteModelContent.sortColumn = sort.active;
    this.filteModelContent.sortType =
      sort.direction.toUpperCase() === "DESC"
        ? SortTypeEnum.Descending
        : SortTypeEnum.Ascending;
    this.tableSource.data = this.tableSource.filteredData;
    this.DataGetAll();
  }
  onTablePageingData(event?: PageEvent): void {
    this.filteModelContent.currentPageNumber = event.pageIndex + 1;
    this.filteModelContent.rowPerPage = event.pageSize;
    this.DataGetAll();
  }

  onActionbuttonNewRow(): void {
    if (this.tokenInfo == null || !this.dataModelResult?.access?.accessAddRow) {
      this.cmsToastrService.typeErrorAccessAdd();
      return;
    }
    const dialogRef = this.dialog.open(
      DataProviderSourcePathPaginationAddComponent,
      {
        height: "90%",
        data: {},
      },
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }
  onActionbuttonEditRow(
    model: DataProviderSourcePathPaginationModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id.length === 0) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.typeErrorSelectedRow")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.onActionTableRowSelect(model);
    if (
      this.tokenInfo == null ||
      !this.dataModelResult?.access?.accessEditRow
    ) {
      this.cmsToastrService.typeErrorAccessEdit();
      return;
    }
    const dialogRef = this.dialog.open(
      DataProviderSourcePathPaginationEditComponent,
      {
        height: "90%",
        data: { id: this.tableRowSelected.id },
      },
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }
  onActionbuttonDeleteRow(
    model: DataProviderSourcePathPaginationModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id.length === 0) {
      const emessage = this.translate.instant(
        "ERRORMESSAGE.MESSAGE.typeErrorSelectedRow",
      );
      this.cmsToastrService.typeErrorSelected(emessage);
      return;
    }
    this.onActionTableRowSelect(model);

    if (
      this.tokenInfo == null ||
      !this.dataModelResult?.access?.accessDeleteRow
    ) {
      this.cmsToastrService.typeErrorAccessDelete();
      return;
    }

    const title = model.title;
    this.cmsConfirmationDialogService
      .confirm(
        this.translate.instant("MESSAGE.Pay_Attention"),
        this.translate.instant("MESSAGE.Delete", { 0: title }),
      )
      .then((result) => {
        if (result) {
          this.contentService.ServiceDelete(model.id).subscribe({
            next: (ret) => {
              if (ret.isSuccess) {
                this.cmsToastrService.typeSuccessRemove();
                this.DataGetAll();
              } else {
                this.cmsToastrService.typeErrorMessage(ret.errorMessage);
              }
            },
            error: (er) => {
              this.cmsToastrService.typeError(er);
            },
          });
        }
      });
  }
  onActionbuttonViewRow(
    model: DataProviderSourcePathPaginationModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id.length === 0) {
      const emessage = this.translate.instant(
        "ERRORMESSAGE.MESSAGE.typeErrorSelectedRow",
      );
      this.cmsToastrService.typeErrorSelected(emessage);
      return;
    }
    this.onActionTableRowSelect(model);
  }

  onActionButtonReload(): void {
    this.DataGetAll();
  }

  onActionButtonStatist(forceShow?: boolean): void {
    if (forceShow !== undefined) {
      this.optionsStatist.data.show = forceShow;
    } else {
      this.optionsStatist.data.show = !this.optionsStatist.data.show;
    }
  }

  onActionCopied(): void {
    this.cmsToastrService.typeSuccessCopedToClipboard();
  }

  onSubmitOptionsSearch(model: any): void {
    this.filteModelContent.filters = model;
    this.DataGetAll();
  }
}
