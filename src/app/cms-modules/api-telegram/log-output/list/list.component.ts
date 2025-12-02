import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  ApiTelegramLogOutputModel,
  ApiTelegramLogOutputService,
  ErrorExceptionResult,
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
import { ApiTelegramActionSendMessageComponent } from "../../action/send-message/send-message.component";

@Component({
  selector: "app-apitelegram-bot-config-list",
  templateUrl: "./list.component.html",
  standalone: false,
})
export class ApiTelegramLogOutputListComponent
  extends ListBaseComponent<
    ApiTelegramLogOutputService,
    ApiTelegramLogOutputModel,
    string
  >
  implements OnInit, OnDestroy
{
  requestLinkBotConfigId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private contentService: ApiTelegramLogOutputService,
    private cmsToastrService: CmsToastrService,
    private activatedRoute: ActivatedRoute,
    public tokenHelper: TokenHelper,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
    public pageInfo: PageInfoService,
    public publicHelper: PublicHelper,
    public dialog: MatDialog,
  ) {
    super(
      contentService,
      new ApiTelegramLogOutputModel(),
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
    this.filteModelContent.sortType = SortTypeEnum.Ascending;
  }
  comment: string;
  author: string;
  dataSource: any;
  flag = false;
  tableContentSelected = [];

  filteModelContent = new FilterModel();
  filterDataModelQueryBuilder: FilterDataModel[] = [];

  dataModelResult: ErrorExceptionResult<ApiTelegramLogOutputModel> =
    new ErrorExceptionResult<ApiTelegramLogOutputModel>();

  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    "id",
    "recordStatus",
    "LinkBotConfigId",
    "Username",
    "ChatId",
    "StatusWebhook",
    "createdDate",
    "updatedDate",
    // 'Action',
  ];

  tabledisplayedColumnsMobileSource: string[] = [
    "id",
    "recordStatus",
    "LinkBotConfigId",
    "Username",
    "ChatId",
    "StatusWebhook",
    "createdDate",
    "updatedDate",
    // 'Action',
  ];
  expandedElement: ApiTelegramLogOutputModel | null;
  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    this.requestLinkBotConfigId = +Number(
      this.activatedRoute.snapshot.paramMap.get("LinkBotConfigId"),
    );
    const filter = new FilterDataModel();
    if (this.requestLinkBotConfigId > 0) {
      filter.propertyName = "LinkBotConfigId";
      filter.value = this.requestLinkBotConfigId;
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
    this.onActionTableRowSelect(new ApiTelegramLogOutputModel());
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

  onActionButtonNewRow(): void {}

  onActionButtonEditRow(
    model: ApiTelegramLogOutputModel = this.tableRowSelected,
  ): void {}
  onActionButtonDeleteRow(
    model: ApiTelegramLogOutputModel = this.tableRowSelected,
  ): void {}

  onActionButtonGoToModuleList(
    model: ApiTelegramLogOutputModel = this.tableRowSelected,
  ): void {}
  onActionButtonStatist(view = !this.optionsStatist.data.show): void {
    this.optionsStatist.data.show = view;
    if (!this.optionsStatist.data.show) {
      return;
    }
    const statist = new Map<string, number>();
    this.translate.get("MESSAGE.Active").subscribe((str: string) => {
      statist.set(str, 0);
    });
    statist.set("All", 0);
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
  onActionButtonSendMessage(
    model: ApiTelegramLogOutputModel = this.tableRowSelected,
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
    //open popup
    const dialogRef = this.dialog.open(ApiTelegramActionSendMessageComponent, {
      // height: "90%",
      data: {
        linkBotConfigId: model.linkBotConfigId,
        ChatId: model.chatId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.DataGetAll();
    });
    //open popup
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

  onActionButtonLinkTo(
    model: ApiTelegramLogOutputModel = this.tableRowSelected,
  ): void {}
  onActionBackToParent(): void {
    this.router.navigate(["api-telegram/bot-config"]);
  }
}
