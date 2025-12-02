import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
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
import { CoreModuleSiteUserCreditChargeDirectComponent } from "../charge-direct/charge-direct.component";

@Component({
  selector: "app-coremodule-site-user-credit-myself-list",
  templateUrl: "./myself-list.component.html",
  standalone: false,
})
export class CoreModuleSiteUserCreditMyselfListComponent
  extends ListBaseComponent<
    CoreModuleSiteUserCreditService,
    CoreModuleSiteUserCreditModel,
    number
  >
  implements OnInit, OnDestroy
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public contentService: CoreModuleSiteUserCreditService,
    private cmsToastrService: CmsToastrService,
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

    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };

    /*filter Sort*/
    this.filteModelContent.sortColumn = "id";
    this.filteModelContent.sortType = SortTypeEnum.Descending;
  }
  filteModelContent = new FilterModel();
  filterDataModelQueryBuilder: FilterDataModel[] = [];

  dataModelCoreModuleResult: ErrorExceptionResult<CoreModuleModel> =
    new ErrorExceptionResult<CoreModuleModel>();

  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    "RecordStatus",
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
    "RecordStatus",
    "linkSiteId",
    // 'LinkUserId',
    "LinkModuleId",
    "Credit",
    "SumCreditBlocked",
    // 'Action'
  ];
  searchonCheckMyAccount = true;
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
    if (this.searchonCheckMyAccount) {
      filterModel.filters.push({
        propertyName: "linkUserId",
        value: this.tokenInfo.user.id,
      });
    }
    this.contentService.ServiceGetAllCredit().subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.tableSource.data = ret.listItems;

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
  onActionButtonSiteUserCreditBuyAccountRow(
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

    this.router.navigate([
      "/coremodule/site-user-credit-charge-online/",
      model.linkSiteId,
      model.linkUserId,
      model.linkModuleId,
    ]);
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
}
