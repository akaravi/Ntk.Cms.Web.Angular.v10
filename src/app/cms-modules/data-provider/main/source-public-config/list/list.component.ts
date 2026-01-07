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
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  DataProviderSourcePublicConfigModel,
  DataProviderSourcePublicConfigService,
  FilterDataModel,
  FilterModel,
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
import { DataProviderSourcePublicConfigAddComponent } from "../add/add.component";
import { DataProviderSourcePublicConfigEditComponent } from "../edit/edit.component";

@Component({
  selector: "app-data-provider-source-public-config-list",
  templateUrl: "./list.component.html",
  standalone: false,
})
export class DataProviderSourcePublicConfigListComponent
  extends ListBaseComponent<
    DataProviderSourcePublicConfigService,
    DataProviderSourcePublicConfigModel,
    string
  >
  implements OnInit, OnDestroy
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tableData: DataProviderSourcePublicConfigModel[] = [];
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public contentService: DataProviderSourcePublicConfigService,
    private cmsToastrService: CmsToastrService,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
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
      new DataProviderSourcePublicConfigModel(),
      publicHelper,
      tokenHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };

    /*filter Sort*/
    this.filteModelContent.sortColumn = "id";
    this.filteModelContent.sortType = SortTypeEnum.Descending;
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
    "recordStatus",
    "title",
    "className",
    //"abilityDelivery",
    //"abilityReceive",
    //"abilityCreditCheck",
    "action",
  ];
  tabledisplayedColumnsMobileSource: string[] = [
    "id",
    "recordStatus",
    "title",
    "className",
    //"abilityDelivery",
    //"abilityReceive",
    //"abilityCreditCheck",
    "action",
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
    this.onActionTableRowSelect(new DataProviderSourcePublicConfigModel());
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
    this.contentService.ServiceGetAllEditor(this.filteModelContent).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

        if (ret.isSuccess) {
          this.tableData = ret.listItems;
          this.tableSource.data = ret.listItems;
          this.tableSource.sort = this.sort;
          this.tableSource.paginator = this.paginator;
          this.tableSource.filter = "$$$";
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

  onActionButtonReload(): void {
    this.DataGetAll();
  }

  onActionButtonNewRow(): void {
    if (this.tokenInfo == null || !this.dataModelResult?.access?.accessAddRow) {
      this.cmsToastrService.typeErrorAccessAdd();
      return;
    }
    const dialogRef = this.dialog.open(
      DataProviderSourcePublicConfigAddComponent,
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
  onActionButtonEditRow(
    model: DataProviderSourcePublicConfigModel = this.tableRowSelected,
  ): void {
    if (
      !model ||
      !model.id ||
      (typeof model.id === "string" ? model.id.length === 0 : model.id === 0)
    ) {
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
      DataProviderSourcePublicConfigEditComponent,
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
  onActionButtonDeleteRow(
    model: DataProviderSourcePublicConfigModel = this.tableRowSelected,
  ): void {
    if (
      !model ||
      !model.id ||
      (typeof model.id === "string" ? model.id.length === 0 : model.id === 0)
    ) {
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
    const dialogRef = this.cmsConfirmationDialogService.confirm(
      this.translate.instant("MESSAGE.Pay_Attention"),
      this.translate.instant("MESSAGE.Delete", { 0: title }),
    );

    dialogRef.then((result) => {
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
    model: DataProviderSourcePublicConfigModel = this.tableRowSelected,
  ): void {
    if (
      !model ||
      !model.id ||
      (typeof model.id === "string" ? model.id.length === 0 : model.id === 0)
    ) {
      const emessage = this.translate.instant(
        "ERRORMESSAGE.MESSAGE.typeErrorSelectedRow",
      );
      this.cmsToastrService.typeErrorSelected(emessage);
      return;
    }
    this.onActionTableRowSelect(model);
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
  onActionButtonNewRowAuto(): any {
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
    this.contentService.ServiceAutoAdd().subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.cmsToastrService.typeSuccessAdd();
          this.DataGetAll();
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
  onSubmitOptionsSearch(model: any): void {
    this.filteModelContent.filters = model;
    this.DataGetAll();
  }
  onActionButtonPrivateList(
    model: DataProviderSourcePublicConfigModel = this.tableRowSelected,
  ): void {
    if (!(model?.id?.length > 0)) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.typeErrorSelectedRow")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.onActionTableRowSelect(model);

    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessWatchRow
    ) {
      this.cmsToastrService.typeErrorSelected();
      return;
    }
    this.router.navigate([
      "/data-provider/main/source/list/LinkPublicConfigId",
      this.tableRowSelected.id,
    ]);
  }
}
