import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
    ActionGoStepEnum,
    CoreCurrencyModel,
    EditStepDtoModel,
    ErrorExceptionResult,
    FilterDataModel,
    FilterModel,
    RecordStatusEnum,
    SmsMainApiPathCompanyModel,
    SmsMainApiPathCompanyService,
    SmsMainApiPathModel,
    SmsMainApiPathPublicConfigModel,
    SmsMainApiPathPublicConfigService,
    SmsMainApiPathService,
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
import { SmsMainApiPathAddComponent } from "../add/add.component";
import { SmsMainApiPathSendTestComponent } from "../sendTest/sendTest.component";

@Component({
  selector: "app-sms-apipath-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class SmsMainApiPathListMobileComponent
  extends ListBaseComponent<SmsMainApiPathService, SmsMainApiPathModel, string>
  implements OnInit, OnDestroy
{
  requestLinkSiteId = 0;
  requestLinkCompanyId = "";
  requestLinkPublicConfigId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public contentService: SmsMainApiPathService,
    private smsMainApiPathCompanyService: SmsMainApiPathCompanyService,
    private smsMainApiPathPublicConfigService: SmsMainApiPathPublicConfigService,
    private activatedRoute: ActivatedRoute,
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
      new SmsMainApiPathModel(),
      publicHelper,
      tokenHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };

    /*filter Sort*/
    this.filteModelContent.sortColumn = "priority";
    this.filteModelContent.sortType = SortTypeEnum.Ascending;
  }
  comment: string;
  author: string;
  dataSource: any;
  flag = false;
  tableContentSelected = [];

  filteModelContent = new FilterModel();
  filterDataModelQueryBuilder: FilterDataModel[] = [];

  dataModelCoreCurrencyResult: ErrorExceptionResult<CoreCurrencyModel> =
    new ErrorExceptionResult<CoreCurrencyModel>();
  dataModelCompanyResult: ErrorExceptionResult<SmsMainApiPathCompanyModel> =
    new ErrorExceptionResult<SmsMainApiPathCompanyModel>();
  dataModelPublicResult: ErrorExceptionResult<SmsMainApiPathPublicConfigModel> =
    new ErrorExceptionResult<SmsMainApiPathPublicConfigModel>();

  categoryModelSelected: SmsMainApiPathCompanyModel;

  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    "linkMainImageIdSrc",
    "recordStatus",
    "title",
    "LinkApiPathCompanyId",
    "LinkPublicConfigId",
    "position",
  ];

  tabledisplayedColumnsMobileSource: string[] = [
    "linkMainImageIdSrc",
    "recordStatus",
    "title",
    "LinkApiPathCompanyId",
    "LinkPublicConfigId",
    "position",
  ];

  expandedElement: SmsMainApiPathModel | null;
  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get("LinkCompanyId")) {
      this.requestLinkCompanyId =
        this.activatedRoute.snapshot.paramMap.get("LinkCompanyId");
    }
    if (this.activatedRoute.snapshot.paramMap.get("LinkSiteId")) {
      this.requestLinkSiteId =
        +this.activatedRoute.snapshot.paramMap.get("LinkSiteId") || 0;
    }
    if (this.activatedRoute.snapshot.paramMap.get("LinkPublicConfigId")) {
      this.requestLinkPublicConfigId =
        this.activatedRoute.snapshot.paramMap.get("LinkPublicConfigId");
    }
    const filter = new FilterDataModel();
    if (this.requestLinkPublicConfigId?.length > 0) {
      filter.propertyName = "LinkPublicConfigId";
      filter.value = this.requestLinkPublicConfigId;
      this.filteModelContent.filters.push(filter);
    }
    if (this.requestLinkCompanyId.length > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "LinkApiPathCompanyId";
      filter.value = this.requestLinkCompanyId;
      this.filteModelContent.filters.push(filter);
    }
    if (this.requestLinkSiteId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "linkSiteId";
      filter.value = this.requestLinkSiteId;
      this.filteModelContent.filters.push(filter);
    }
    this.filteModelContent.sortColumn = "priority";
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
    this.getApiCopmanyList();
    this.getPublicConfig();
  }
  getPublicConfig(): void {
    const filter = new FilterModel();
    filter.rowPerPage = 100;
    this.smsMainApiPathPublicConfigService.ServiceGetAll(filter).subscribe({
      next: (ret) => {
        this.dataModelPublicResult = ret;
      },
    });
  }
  getApiCopmanyList(): void {
    const filter = new FilterModel();
    filter.rowPerPage = 100;
    this.smsMainApiPathCompanyService.ServiceGetAll(filter).subscribe({
      next: (ret) => {
        this.dataModelCompanyResult = ret;
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
      ["position"],
      this.tokenInfo,
    );
    this.tableRowsSelected = [];
    this.onActionTableRowSelect(new SmsMainApiPathModel());
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
    /** filter Category */
    if (
      this.categoryModelSelected &&
      this.categoryModelSelected.id.length > 0
    ) {
      let fastfilter = new FilterDataModel();
      fastfilter.propertyName = "LinkApiPathCompanyId";
      fastfilter.value = this.categoryModelSelected.id;
      filterModel.filters.push(fastfilter);
    }
    /** filter Category */
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

  onTableDropRow(event: CdkDragDrop<SmsMainApiPathModel[]>): void {
    const previousIndex = this.tableSource.data.findIndex(
      (row) => row === event.item.data,
    );
    const model = new EditStepDtoModel<string>();
    model.id = this.tableSource.data[previousIndex].id;
    model.centerId = this.tableSource.data[event.currentIndex].id;
    if (previousIndex > event.currentIndex) {
      model.actionGo = ActionGoStepEnum.GoUp;
    } else {
      model.actionGo = ActionGoStepEnum.GoDown;
    }
    this.contentService.ServiceEditStep(model).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          moveItemInArray(
            this.tableSource.data,
            previousIndex,
            event.currentIndex,
          );
          this.tableSource.data = this.tableSource.data.slice();
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
      },
    });
  }

  onActionButtonNewRow(): void {
    if (
      !this.requestLinkCompanyId ||
      (this.requestLinkCompanyId && this.requestLinkCompanyId.length == 0)
    ) {
      if (
        this.categoryModelSelected == null ||
        this.categoryModelSelected.id.length === 0
      ) {
        this.translate
          .get("MESSAGE.Company_not_selected")
          .subscribe((message: string) => {
            this.cmsToastrService.typeErrorSelected(message);
          });
        return;
      }
    }

    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessAddRow
    ) {
      this.cmsToastrService.typeErrorAccessAdd();
      return;
    }
    var linkCompanyId = "";
    if (this.categoryModelSelected && this.categoryModelSelected.id.length > 0)
      linkCompanyId = this.categoryModelSelected.id;
    if (this.requestLinkCompanyId && this.requestLinkCompanyId.length > 0)
      linkCompanyId = this.requestLinkCompanyId;
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(SmsMainApiPathAddComponent, {
      height: "90%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { linkApiPathCompanyId: linkCompanyId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }

  onActionButtonEditRow(
    model: SmsMainApiPathModel = this.tableRowSelected,
  ): void {
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
    this.router.navigate(["/sms/main/api-path/edit", this.tableRowSelected.id]);
  }
  onActionButtonDeleteRow(
    model: SmsMainApiPathModel = this.tableRowSelected,
  ): void {
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
          this.tableRowSelected.title +
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

  onActionSelectorSelect(model: SmsMainApiPathCompanyModel | null): void {
    /*filter */
    var sortColumn = this.filteModelContent.sortColumn;
    var sortType = this.filteModelContent.sortType;
    this.filteModelContent = new FilterModel();

    this.filteModelContent.sortColumn = sortColumn;
    this.filteModelContent.sortType = sortType;
    /*filter */
    this.filteModelContent.sortColumn = "priority";
    this.categoryModelSelected = model;

    this.DataGetAll();
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

  onActionButtonGetBalance(
    model: SmsMainApiPathModel = this.tableRowSelected,
  ): any {
    if (!(model?.id?.length > 0)) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.typeErrorSelectedRow")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    const pName = this.constructor.name + "GetBalance";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    this.contentService.ServiceGetBalance(model.id).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.cmsToastrService.typeSuccessMessage(
            ret.item.info + " " + ret.item.status + " " + ret.item.credit,
          );
        } else {
          this.cmsToastrService.typeErrorMessage(
            ret.errorMessage + ret.item.info + " " + ret.item.status,
          );
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
    model: SmsMainApiPathModel = this.tableRowSelected,
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

    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessWatchRow
    ) {
      this.cmsToastrService.typeErrorSelected();
      return;
    }
    if (event?.ctrlKey) {
      const link =
        "/#/sms/action/send-message/LinkApiPathId/" + this.tableRowSelected.id;
      window.open(link, "_blank");
    } else {
      this.router.navigate([
        "/sms/action/send-message/LinkApiPathId",
        this.tableRowSelected.id,
      ]);
    }
  }
  onActionButtonNumbersList(
    model: SmsMainApiPathModel = this.tableRowSelected,
    event?: MouseEvent,
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
    if (event?.ctrlKey) {
      const link =
        "/#/sms/main/api-number/LinkApiPathId/" + this.tableRowSelected.id;
      window.open(link, "_blank");
    } else {
      this.router.navigate([
        "/sms/main/api-number/LinkApiPathId",
        this.tableRowSelected.id,
      ]);
    }
  }
  onActionButtonPermitionList(
    model: SmsMainApiPathModel = this.tableRowSelected,
    event?: MouseEvent,
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
      "/sms/main/api-path-permission/LinkApiPathId",
      this.tableRowSelected.id,
    ]);
  }
  onActionButtonOutBoxQueue(
    model: SmsMainApiPathModel = this.tableRowSelected,
    event?: MouseEvent,
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
    if (event?.ctrlKey) {
      const link =
        "/#/sms/log/outbox-queue/LinkApiPathId/" + this.tableRowSelected.id;
      window.open(link, "_blank");
    } else {
      this.router.navigate([
        "/sms/log/outbox-queue/LinkApiPathId",
        this.tableRowSelected.id,
      ]);
    }
  }
  onActionButtonCopy(model: SmsMainApiPathModel = this.tableRowSelected): void {
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
      this.cmsToastrService.typeErrorAccessAdd();
      return;
    }
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(SmsMainApiPathAddComponent, {
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
  onActionButtonPriceServicesList(
    model: SmsMainApiPathModel = this.tableRowSelected,
    event?: MouseEvent,
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
    if (event?.ctrlKey) {
      const link =
        "/#/sms/main/api-path-pagination/LinkApiPathId/" +
        this.tableRowSelected.id;
      window.open(link, "_blank");
    } else {
      this.router.navigate([
        "/sms/main/api-path-pagination/LinkApiPathId",
        this.tableRowSelected.id,
      ]);
    }
  }

  onActionButtonSendTest(
    model: SmsMainApiPathModel = this.tableRowSelected,
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

    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(SmsMainApiPathSendTestComponent, {
      height: "90%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { linkApiPathId: this.tableRowSelected.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }
  onActionButtonReportsRow(
    model: SmsMainApiPathModel = this.tableRowSelected,
    event?: MouseEvent,
  ): void {
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
    if (event?.ctrlKey) {
      const link =
        "/#/sms/log/api-path/LinkApiPathId/" + this.tableRowSelected.id;
      window.open(link, "_blank");
    } else {
      this.router.navigate([
        "/sms/log/api-path/LinkApiPathId",
        this.tableRowSelected.id,
      ]);
    }
  }
  onActionButtonReload(): void {
    this.filteModelContent.sortColumn = "priority";
    this.DataGetAll();
  }

  // Pull-to-Refresh functionality
  pullToRefreshState = {
    isRefreshing: false,
    startY: 0,
    currentY: 0,
    pullDistance: 0,
    threshold: 80, // Minimum distance to trigger refresh
  };

  // Expose Math to template
  Math = Math;

  // Swipe Actions functionality
  swipeState: Map<
    string,
    { startX: number; currentX: number; offset: number }
  > = new Map();
  readonly SWIPE_THRESHOLD = 100; // Minimum swipe distance to trigger action
  readonly SWIPE_MAX_OFFSET = 120; // Maximum swipe offset

  onItemTouchStart(event: TouchEvent, itemId: string): void {
    event.stopPropagation();
    const touch = event.touches[0];
    this.swipeState.set(itemId, {
      startX: touch.clientX,
      currentX: touch.clientX,
      offset: 0,
    });
  }

  onItemTouchMove(event: TouchEvent, itemId: string): void {
    event.stopPropagation();
    const state = this.swipeState.get(itemId);
    if (!state) return;

    const touch = event.touches[0];
    state.currentX = touch.clientX;
    const diff = state.currentX - state.startX;

    // Only allow left swipe (negative diff in LTR, positive in RTL)
    const isRTL = document.documentElement.dir === "rtl";
    const maxOffset = isRTL ? this.SWIPE_MAX_OFFSET : -this.SWIPE_MAX_OFFSET;
    const minOffset = isRTL ? -this.SWIPE_MAX_OFFSET : this.SWIPE_MAX_OFFSET;

    state.offset = Math.max(minOffset, Math.min(maxOffset, diff));
  }

  onItemTouchEnd(event: TouchEvent, itemId: string): void {
    event.stopPropagation();
    const state = this.swipeState.get(itemId);
    if (!state) return;

    const isRTL = document.documentElement.dir === "rtl";
    const threshold = isRTL ? this.SWIPE_THRESHOLD : -this.SWIPE_THRESHOLD;

    // If swipe distance exceeds threshold, keep it open, otherwise reset
    if (
      (isRTL && state.offset > threshold) ||
      (!isRTL && state.offset < threshold)
    ) {
      // Keep swipe open
    } else {
      // Reset swipe
      state.offset = 0;
    }

    this.swipeState.set(itemId, state);
  }

  onTouchStart(event: TouchEvent): void {
    const target = event.target as HTMLElement;
    const contentArea = target.closest(".cms-m-content");

    if (contentArea && (contentArea as HTMLElement).scrollTop === 0) {
      this.pullToRefreshState.startY = event.touches[0].clientY;
      this.pullToRefreshState.isRefreshing = false;
    }
  }

  onTouchMove(event: TouchEvent): void {
    const target = event.target as HTMLElement;
    const contentArea = target.closest(".cms-m-content");

    if (
      contentArea &&
      (contentArea as HTMLElement).scrollTop === 0 &&
      this.pullToRefreshState.startY > 0
    ) {
      this.pullToRefreshState.currentY = event.touches[0].clientY;
      this.pullToRefreshState.pullDistance = Math.max(
        0,
        this.pullToRefreshState.currentY - this.pullToRefreshState.startY,
      );

      // Prevent default scrolling when pulling down
      if (this.pullToRefreshState.pullDistance > 10) {
        event.preventDefault();
      }
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (
      this.pullToRefreshState.pullDistance >=
        this.pullToRefreshState.threshold &&
      !this.pullToRefreshState.isRefreshing
    ) {
      this.pullToRefreshState.isRefreshing = true;
      this.onActionButtonReload();

      // Reset after refresh
      setTimeout(() => {
        this.pullToRefreshState.isRefreshing = false;
        this.pullToRefreshState.pullDistance = 0;
        this.pullToRefreshState.startY = 0;
        this.pullToRefreshState.currentY = 0;
      }, 1000);
    } else {
      // Reset if not enough pull distance
      this.pullToRefreshState.pullDistance = 0;
      this.pullToRefreshState.startY = 0;
      this.pullToRefreshState.currentY = 0;
    }
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
    this.router.navigate(["/sms/main/api-path-company"]);
  }

  onActionTableRowSelect(row: SmsMainApiPathModel): void {
    this.tableRowSelected = row;
  }
}
