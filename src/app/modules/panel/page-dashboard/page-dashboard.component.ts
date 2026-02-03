import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreCpMainMenuModel,
  CoreCpMainMenuService,
  CoreModuleModel,
  ErrorExceptionResult,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { ThemeStoreMenuModel } from "src/app/core/models/themeStoreModel";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { PageInfoService } from "src/app/core/services/page-info.service";
import { ThemeService } from "src/app/core/services/theme.service";
import { environment } from "src/environments/environment";

// مدل ویجت داشبورد
export interface DashboardWidgetModel {
  id: string;
  selector: string;
  moduleCondition?: string;
  customCondition?: () => boolean;
  colClass: string;
}

@Component({
  selector: "app-page-dashboard",
  templateUrl: "./page-dashboard.component.html",
  styleUrls: ["./page-dashboard.component.scss"],
  standalone: false,
})
export class PageDashboardComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    public tokenHelper: TokenHelper,
    public pageInfo: PageInfoService,
    private coreCpMainMenuService: CoreCpMainMenuService,
    public cmsToastrService: CmsToastrService,
    public themeService: ThemeService,
    private cmsStoreService: CmsStoreService,
    private router: Router,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  tokenInfo = new TokenInfoModelV3();
  ThemeMenuPin: boolean[] = [];

  env = environment;
  loadDemoTheme = environment.loadDemoTheme;
  dataCoreModuleModelResult: ErrorExceptionResult<CoreModuleModel> =
    new ErrorExceptionResult<CoreModuleModel>();
  dataModelResult: ErrorExceptionResult<CoreCpMainMenuModel> =
    new ErrorExceptionResult<CoreCpMainMenuModel>();
  dataPinListResult: CoreCpMainMenuModel[] = [];
  checkModuleExist: Map<string, CoreModuleModel> = new Map<
    string,
    CoreModuleModel
  >();

  // لیست ویجت‌های داشبورد
  dashboardWidgets: DashboardWidgetModel[] = [
    {
      id: "estate-customer-order",
      selector: "app-estate-customer-order-widget",
      moduleCondition: "estate",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "estate-property",
      selector: "app-estate-property-widget",
      moduleCondition: "estate",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "estate-property-history",
      selector: "app-estate-property-history-widget",
      moduleCondition: "estate",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "site-credit",
      selector: "app-coremodule-site-credit-widget-credit",
      customCondition: () => this.tokenHelper.isAdminSite,
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "site-user-credit",
      selector: "app-coremodule-site-user-credit-widget-credit",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "user-claim-content",
      selector: "app-core-userclaimcontent-widget-status",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "ticketing-task",
      selector: "app-ticketing-task-widget",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "sms-outbox-queue",
      selector: "app-sms-log-outbox-queue-widget",
      moduleCondition: "sms",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "sms-outbox-task-scheduler",
      selector: "app-sms-log-outbox-task-scheduler-widget",
      moduleCondition: "sms",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "sms-outbox",
      selector: "app-sms-log-outbox-widget",
      moduleCondition: "sms",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "sms-inbox",
      selector: "app-sms-log-inbox-widget",
      moduleCondition: "sms",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "core-site",
      selector: "app-core-site-widget-count",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "application-member-info",
      selector: "app-application-memberinfo-widget",
      moduleCondition: "application",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "report-abuse",
      selector: "app-report-abuse-widget",
      moduleCondition: "core",
      customCondition: () => this.tokenHelper.isAdminSite,
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "chart-content",
      selector: "app-chart-content-widget",
      moduleCondition: "chart",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "article-content",
      selector: "app-article-content-widget",
      moduleCondition: "article",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "blog-content",
      selector: "app-blog-content-widget",
      moduleCondition: "blog",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "biography-content",
      selector: "app-biography-content-widget",
      moduleCondition: "biography",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "news-content",
      selector: "app-news-content-widget",
      moduleCondition: "news",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
    {
      id: "application-app",
      selector: "app-application-app-widget",
      moduleCondition: "application",
      colClass: "col-12 col-sm-12 col-md-12 col-lg-6",
    },
  ];

  private readonly WIDGET_ORDER_STORAGE_KEY = "dashboard_widget_order";

  ngOnInit(): void {
    this.tokenInfo = this.cmsStoreService.getStateSnapshot().tokenInfoStore;
    this.dataCoreModuleModelResult =
      this.cmsStoreService.getStateSnapshot().coreModuleResultStore;
    if (this.tokenInfo?.access?.userId > 0) {
      this.getCurrentSiteModule();
      this.loadData();
      Promise.resolve().then(() => this.cdr.detectChanges());
    }
    var themeStore = this.cmsStoreService.getStateSnapshot().themeStore;
    if (themeStore?.themeMenuPin)
      this.ThemeMenuPin = this.convertListPinToBoolean(
        this.cmsStoreService.getStateSnapshot().themeStore?.themeMenuPin,
      );

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.tokenInfo = value;
          this.getCurrentSiteModule();
          this.loadData();
          Promise.resolve().then(() => this.cdr.detectChanges());
        }),
    );

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.coreModuleResultStore)
        .subscribe(async (value) => {
          this.dataCoreModuleModelResult = value;
          this.getCurrentSiteModule();
          this.loadData();
          Promise.resolve().then(() => this.cdr.detectChanges());
        }),
    );

    localStorage.removeItem("siteId");
    this.translate.get("ROUTE.DASHBOARD").subscribe((str: string) => {
      this.pageInfo.updateTitle(str);
    });
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.themeStore)
        .subscribe(async (value) => {
          if (value?.themeMenuPin) {
            this.ThemeMenuPin = this.convertListPinToBoolean(
              value.themeMenuPin,
            );
          } else {
            this.ThemeMenuPin = [];
          }
          this.loadData();
        }),
    );

    // بارگذاری ترتیب ویجت‌ها
    this.loadWidgetOrder();
  }

  /**
   * بارگذاری ترتیب ویجت‌ها از localStorage
   */
  loadWidgetOrder(): void {
    const savedOrder = localStorage.getItem(this.WIDGET_ORDER_STORAGE_KEY);
    if (savedOrder) {
      try {
        const orderArray: string[] = JSON.parse(savedOrder);
        const orderedWidgets: DashboardWidgetModel[] = [];

        orderArray.forEach((id) => {
          const widget = this.dashboardWidgets.find((w) => w.id === id);
          if (widget) {
            orderedWidgets.push(widget);
          }
        });

        // اضافه کردن ویجت‌های جدید
        this.dashboardWidgets.forEach((widget) => {
          if (!orderedWidgets.find((w) => w.id === widget.id)) {
            orderedWidgets.push(widget);
          }
        });

        this.dashboardWidgets = orderedWidgets;
      } catch (e) {
        console.error("خطا در بارگذاری ترتیب ویجت‌ها:", e);
      }
    }
  }

  /**
   * ذخیره ترتیب ویجت‌ها در localStorage
   */
  saveWidgetOrder(): void {
    const orderArray = this.dashboardWidgets.map((w) => w.id);
    localStorage.setItem(
      this.WIDGET_ORDER_STORAGE_KEY,
      JSON.stringify(orderArray),
    );
  }

  /**
   * مدیریت رویداد Drag & Drop
   */
  onWidgetDrop(event: CdkDragDrop<DashboardWidgetModel[]>): void {
    const previousIndex = this.dashboardWidgets.findIndex(
      (widget) => widget === event.item.data,
    );

    moveItemInArray(this.dashboardWidgets, previousIndex, event.currentIndex);
    this.dashboardWidgets = this.dashboardWidgets.slice();

    this.saveWidgetOrder();
    this.cdr.detectChanges();
  }

  /**
   * بررسی شرایط نمایش ویجت
   */
  shouldShowWidget(widget: DashboardWidgetModel): boolean {
    if (
      widget.moduleCondition &&
      !this.checkModuleExist[widget.moduleCondition]
    ) {
      return false;
    }
    if (widget.customCondition && !widget.customCondition()) {
      return false;
    }
    return true;
  }

  async getCurrentSiteModule(): Promise<void> {
    this.checkModuleExist = new Map<string, CoreModuleModel>();
    if (
      this.dataCoreModuleModelResult &&
      this.dataCoreModuleModelResult.listItems
    )
      this.dataCoreModuleModelResult.listItems.forEach(
        (el) => (this.checkModuleExist[el.className.toLowerCase()] = el),
      );
  }
  private unsubscribe: Subscription[] = [];
  ngOnDestroy() {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  loadData() {
    if (
      this.tokenInfo &&
      this.tokenInfo?.access?.userId > 0 &&
      this.tokenInfo?.access?.siteId > 0
    ) {
      setTimeout(() => {
        const storeSnapshot = this.cmsStoreService.getStateSnapshot();
        if (
          storeSnapshot?.coreCpMainResultStore?.isSuccess &&
          storeSnapshot?.coreCpMainResultStore?.listItems?.length > 0
        ) {
          this.dataModelResult = storeSnapshot.coreCpMainResultStore;
          this.DataPinListSelect();
        } else {
          this.DataGetCpMenu();
        }
      }, 200);
    }
  }
  DataGetCpMenu(): void {
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
    this.coreCpMainMenuService.ServiceGetAllMenu(null).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.DataPinListSelect();
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
  onActionClickMenu(item: CoreCpMainMenuModel, event?: MouseEvent) {
    if (!item) return;
    const pName = this.constructor.name + "menu";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    if (item.children?.length > 0) {
      if (event?.ctrlKey) {
        window.open("/#/menu/LinkParentId/" + item.id, "_blank");
      } else {
        this.router.navigate(["/menu/LinkParentId/", item.id]);
      }
      setTimeout(
        () => this.publicHelper.processService.processStop(pName),
        500,
      );
      return;
    }
    if (item.routeAddressLink?.length > 0) {
      if (event?.ctrlKey) {
        window.open("/#" + item.routeAddressLink, "_blank");
      } else {
        this.router.navigate([item.routeAddressLink]);
      }
      setTimeout(
        () => this.publicHelper.processService.processStop(pName),
        500,
      );

      return;
    }
  }
  convertListPinToBoolean(listPin: ThemeStoreMenuModel[]): boolean[] {
    var ret = [];
    if (listPin && listPin.length > 0)
      listPin.forEach((el) => {
        if (el.siteId == this.tokenInfo?.site?.id) ret[el.menuId] = true;
      });
    return ret;
  }
  updateThemeMenuPinToggel(id: number): void {
    this.themeService.updateThemeMenuPinToggel(
      this.tokenInfo?.site?.id ?? 0,
      id,
    );
    this.DataPinListSelect();
  }
  DataPinListSelect() {
    this.dataPinListResult = [];
    if (this.ThemeMenuPin?.length > 0) {
      this.dataModelResult.listItems.forEach((rowS1) => {
        rowS1["parentTitle"] = ".";
        if (this.ThemeMenuPin[rowS1.id]) this.dataPinListResult.push(rowS1);
        rowS1.children.forEach((rowS2) => {
          rowS2["parentTitle"] = rowS1.titleML;
          if (this.ThemeMenuPin[rowS2.id]) this.dataPinListResult.push(rowS2);
          rowS2.children.forEach((rowS3) => {
            rowS3["parentTitle"] = rowS2.titleML;
            if (this.ThemeMenuPin[rowS3.id]) this.dataPinListResult.push(rowS3);
          });
        });
      });
    }
  }
}
