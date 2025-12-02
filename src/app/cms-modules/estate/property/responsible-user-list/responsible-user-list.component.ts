import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreUserModel,
  DataFieldInfoModel,
  EstatePropertyService,
  FilterDataModel,
  FilterModel,
  FormInfoModel,
  SortTypeEnum,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { ComponentOptionSearchModel } from "src/app/core/cmsComponent/base/componentOptionSearchModel";
import { ComponentOptionStatistModel } from "src/app/core/cmsComponent/base/componentOptionStatistModel";
import { ListBaseComponent } from "src/app/core/cmsComponent/listBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { PageInfoService } from "src/app/core/services/page-info.service";

@Component({
  selector: "app-estate-property-responsible-user-list",
  templateUrl: "./responsible-user-list.component.html",
  standalone: false,
})
export class EstatePropertyResponsibleUserListComponent
  extends ListBaseComponent<EstatePropertyService, CoreUserModel, number>
  implements OnInit, OnDestroy
{
  requestTitle = "";
  requestPropertyId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstatePropertyResponsibleUserListComponent>,
    public contentService: EstatePropertyService,
    private cmsToastrService: CmsToastrService,
    private cmsStoreService: CmsStoreService,
    public tokenHelper: TokenHelper,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    public pageInfo: PageInfoService,
    public publicHelper: PublicHelper,
    public dialog: MatDialog,
  ) {
    super(
      contentService,
      new CoreUserModel(),
      publicHelper,
      tokenHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    if (data) {
      if (data.title) this.requestTitle = data.title + "";
      if (data.id) this.requestPropertyId = data.id + "";
    }
    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };
  }

  dataSource: any;
  tablePropertySelected = [];
  filteModelContent = new FilterModel();
  filterDataModelQueryBuilder: FilterDataModel[] = [];

  formInfo: FormInfoModel = new FormInfoModel();

  optionsSearch: ComponentOptionSearchModel = new ComponentOptionSearchModel();
  optionsStatist: ComponentOptionStatistModel =
    new ComponentOptionStatistModel();

  tokenInfo = new TokenInfoModelV3();

  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    "linkMainImageIdSrc",
    "id",
    "recordStatus",
    "Name",
    "LastName",
    "CompanyName",
    "email",
    "mobile",
    "action_menu",
  ];
  tabledisplayedColumnsMobileSource: string[] = [
    "id",
    "recordStatus",
    "Name",
    "LastName",
    "action_menu",
  ];
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();
  private unsubscribe: Subscription[] = [];
  ngOnInit(): void {
    this.translate.get("TITLE.QUICK_VIEW").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
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
    this.onActionTableRowSelect(new CoreUserModel());
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

    // ** */
    this.contentService
      .ServiceGetAllResponsibleUserId(this.requestPropertyId, filterModel)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
          if (ret.isSuccess) {
            this.dataModelResult = ret;
            this.tableSource.data = ret.listItems;
          } else {
            this.cmsToastrService.typeErrorGetAll(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.publicHelper.processService.processStop(pName);
        },
      });
    // ** */
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

  onActionBackToParent(): void {
    this.router.navigate(["/ticketing/departemen/"]);
  }

  expandedElement: any;

  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
