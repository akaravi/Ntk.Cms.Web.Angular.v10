import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  EstatePropertyProjectFilterModel,
  EstatePropertyProjectModel,
  EstatePropertyProjectService,
  FilterDataModel,
  ManageUserAccessDataTypesEnum,
  RecordStatusEnum,
  SortTypeEnum,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { ListBaseComponent } from "src/app/core/cmsComponent/listBaseComponent";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { PageInfoService } from "src/app/core/services/page-info.service";
import { CmsLinkToComponent } from "src/app/shared/cms-link-to/cms-link-to.component";
import { environment } from "src/environments/environment";
import { PublicHelper } from "../../../../../core/helpers/publicHelper";
import { CmsToastrService } from "../../../../../core/services/cmsToastr.service";
import { EstatePropertyProjectDeleteComponent } from "../delete/delete.component";

@Component({
  selector: "app-estate-property-project-list",
  templateUrl: "./list.component.html",
  standalone: false,
})
export class EstatePropertyProjectListComponent
  extends ListBaseComponent<
    EstatePropertyProjectService,
    EstatePropertyProjectModel,
    string
  >
  implements OnInit, OnDestroy
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public contentService: EstatePropertyProjectService,
    private cmsToastrService: CmsToastrService,
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
      new EstatePropertyProjectModel(),
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
  link: string;

  filteModelContent = new EstatePropertyProjectFilterModel();
  filterDataModelQueryBuilder: FilterDataModel[] = [];

  filterModelCompiler(
    model: EstatePropertyProjectFilterModel,
  ): EstatePropertyProjectFilterModel {
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

  categoryModelSelected: EstatePropertyProjectModel;
  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    "linkMainImageIdSrc",
    "id",
    "recordStatus",
    "mainAdminRecordStatus",
    // 'Title',
    // 'CreatedDate',
    "LinkTo",
    "action_menu",
  ];
  tabledisplayedColumnsMobileSource: string[] = [
    "linkMainImageIdSrc",
    "id",
    "recordStatus",
    "mainAdminRecordStatus",
    // 'Title',
    // 'CreatedDate',
    "LinkTo",
    "action_menu",
  ];
  private unsubscribe: Subscription[] = [];
  GetAllWithHierarchyCategoryId = false;
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
    this.onActionTableRowSelect(new EstatePropertyProjectModel());
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
    /** filter Category */
    if (
      this.categoryModelSelected &&
      this.categoryModelSelected.id.length > 0
    ) {
      const filterChild = new FilterDataModel();
      filterChild.propertyName = "linkEstateProjectCategoryId";
      filterChild.value = this.categoryModelSelected.id;
      filterModel.filters.push(filterChild);
    }
    /** filter Category */
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
  onActionButtonNewRow(event?: MouseEvent): void {
    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessAddRow
    ) {
      this.cmsToastrService.typeErrorAccessAdd();
      return;
    }

    if (event?.ctrlKey) {
      this.link = "/#/estate/data/property-project/add/";
      window.open(this.link, "_blank");
    } else {
      this.router.navigate(["/estate/data/property-project/add"]);
    }
  }
  onActionButtonEditRow(
    model: EstatePropertyProjectModel = this.tableRowSelected,
    event?: MouseEvent,
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

    if (event?.ctrlKey) {
      this.link =
        "/#/estate/data/property-project/edit/" + this.tableRowSelected.id;
      window.open(this.link, "_blank");
    } else {
      this.router.navigate([
        "/estate/data/property-project/edit",
        this.tableRowSelected.id,
      ]);
    }
  }
  onActionButtonProperty(
    model: EstatePropertyProjectModel = this.tableRowSelected,
    event?: MouseEvent,
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

    if (event?.ctrlKey) {
      this.link =
        "/#/estate/data/property/LinkProjectId/" + this.tableRowSelected.id;
      window.open(this.link, "_blank");
    } else {
      this.router.navigate([
        "/estate/data/property/LinkProjectId",
        this.tableRowSelected.id,
      ]);
    }
  }
  onActionButtonPropertyCompany(
    model: EstatePropertyProjectModel = this.tableRowSelected,
    event?: MouseEvent,
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

    if (event?.ctrlKey) {
      this.link =
        "/#/estate/data/property-company/LinkProjectId/" +
        this.tableRowSelected.id;
      window.open(this.link, "_blank");
    } else {
      this.router.navigate([
        "/estate/data/property-company/LinkProjectId",
        this.tableRowSelected.id,
      ]);
    }
  }
  onActionButtonDeleteRow(
    model: EstatePropertyProjectModel = this.tableRowSelected,
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
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(EstatePropertyProjectDeleteComponent, {
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

  onActionButtonWithHierarchy(): void {
    this.GetAllWithHierarchyCategoryId = !this.GetAllWithHierarchyCategoryId;
    this.DataGetAll();
  }
  onActionSelectorSelect(model: EstatePropertyProjectModel | null): void {
    /*filter */
    var sortColumn = this.filteModelContent.sortColumn;
    var sortType = this.filteModelContent.sortType;
    this.filteModelContent = new EstatePropertyProjectFilterModel();

    this.filteModelContent.sortColumn = sortColumn;
    this.filteModelContent.sortType = sortType;
    /*filter */
    this.categoryModelSelected = model;
    this.DataGetAll();
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

  expandedElement: any;

  onActionButtonLinkTo(
    model: EstatePropertyProjectModel = this.tableRowSelected,
  ): void {
    if (!model || !model.id || model.id.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    if (model.recordStatus != RecordStatusEnum.Available) {
      this.cmsToastrService.typeWarningRecordStatusNoAvailable();
      return;
    }
    this.onActionTableRowSelect(model);

    const pName = this.constructor.name + "ServiceGetOneById";
    this.translate
      .get("MESSAGE.get_state_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.contentService.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    this.contentService.ServiceGetOneById(model.id).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          //open popup
          var panelClass = "";
          if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
          else panelClass = "dialog-min";
          const dialogRef = this.dialog.open(CmsLinkToComponent, {
            height: "90%",
            panelClass: panelClass,
            enterAnimationDuration:
              environment.cmsViewConfig.enterAnimationDuration,
            exitAnimationDuration:
              environment.cmsViewConfig.exitAnimationDuration,
            data: {
              title: ret.item.title,
              urlViewContentQRCodeBase64: ret.item.urlViewContentQRCodeBase64,
              urlViewContent: ret.item.urlViewContent,
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result && result.dialogChangedDate) {
              this.DataGetAll();
            }
          });
          //open popup
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
}
