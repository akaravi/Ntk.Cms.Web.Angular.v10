import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
//start change title when route happened
import { Title } from "@angular/platform-browser";
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { Observable, Subscription, filter, map } from "rxjs";
//end change title when route happened
import { CommonModule } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { SwPush } from "@angular/service-worker";
import { TranslateService } from "@ngx-translate/core";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  CoreAuthV3Service,
  CoreConfigurationService,
  CoreModuleService,
  CoreSiteService,
  CoreSiteSupportModel,
  ErrorExceptionResult,
  TokenDeviceSetNotificationIdDtoModel,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { environment } from "src/environments/environment";
import { ComponentsModule } from "./components/components.module";
import { PublicHelper } from "./core/helpers/publicHelper";
import { TokenHelper } from "./core/helpers/tokenHelper";
import { ConnectionStatusModel } from "./core/models/connectionStatusModel";
import { KeyboardEventF9 } from "./core/models/constModel";
import { ProcessModel } from "./core/models/processModel";
import { CmsStoreService } from "./core/reducers/cmsStore.service";
import {
  SET_Connection_STATE,
  SET_Core_Module,
} from "./core/reducers/reducer.factory";
import { CmsToastrService } from "./core/services/cmsToastr.service";
import { PageInfoService } from "./core/services/page-info.service";
import { ProcessService } from "./core/services/process.service";
import { ThemeService } from "./core/services/theme.service";
import { SharedModule } from "./shared/shared.module";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ComponentsModule, CommonModule, SharedModule],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  //protected readonly title = signal('aaaa');
  private unsubscribe: Subscription[] = [];
  constructor(
    private router: Router,
    private titleService: Title,
    private translate: TranslateService,
    private coreAuthService: CoreAuthV3Service,
    private coreSiteService: CoreSiteService,
    private configService: CoreConfigurationService,
    public themeService: ThemeService,
    public publicHelper: PublicHelper,
    public tokenHelper: TokenHelper,
    private swPush: SwPush,
    private cmsToastrService: CmsToastrService,
    private cmsStoreService: CmsStoreService,
    private cdr: ChangeDetectorRef,
    public pageInfo: PageInfoService,
    public processService: ProcessService,
    private coreModuleService: CoreModuleService,
  ) {
    if (
      environment.cmsServerConfig.configApiServerPath &&
      environment.cmsServerConfig.configApiServerPath.length > 0
    ) {
      this.coreAuthService.setConfig(
        environment.cmsServerConfig.configApiServerPath,
        environment.appVersion,
      );
    }
    this.tokenHelper.ctorAppMain();
    this.themeService.ctorAppMain();

    /**MAIN cmsStoreService.getState MAIN*/
    this.tokenInfo = this.cmsStoreService.getStateSnapshot().tokenInfoStore;
    if (this.tokenInfo?.access) {
      if (environment.production) {
        this.getSupport();
      }
      /**CoreModuleModel */
      this.coreModuleService.ServiceGetAllModuleName(null).subscribe({
        next: (ret) => {
          if (ret.isSuccess)
            this.cmsStoreService.setState({
              type: SET_Core_Module,
              payload: ret,
            });
        },
      });
      /**CoreModuleModel */
    }

    /**MAIN cmsStoreService.getState MAIN*/
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          if (this.tokenInfo?.access)
            if (
              this.tokenInfo.access != value.access &&
              this.tokenInfo?.access?.siteId != value?.access?.siteId
            ) {
              if (environment.production) {
                this.getSupport();
              }
              /**CoreModuleModel */
              this.coreModuleService.ServiceGetAllModuleName(null).subscribe({
                next: (ret) => {
                  if (ret.isSuccess)
                    this.cmsStoreService.setState({
                      type: SET_Core_Module,
                      payload: ret,
                    });
                },
              });
              /**CoreModuleModel */
            }
          this.tokenInfo = value;
        }),
    );
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        //do something on start activity
        if (environment.consoleLog) console.log("NavigationStart");
        this.themeService.onNavigationStartAppComponent();
      }
      if (event instanceof NavigationError) {
        // Handle error
        if (event.error) console.error(event.error);
      }

      if (event instanceof NavigationEnd) {
        //do something on end activity
        if (environment.consoleLog) console.log("NavigationEnd");
        this.themeService.onNavigationEndAppComponent();
      }
    });

    this.publicHelper.processService.cdr = this.cdr;
    //start change title when route happened
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = environment.mainTitle;
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data["title"]) {
            routeTitle = route!.snapshot.data["title"];
          }
          return routeTitle;
        }),
      )
      .subscribe((title: string) => {
        if (title) {
          if (title.indexOf(".") > 0) {
            this.translate.get(title).subscribe((str: string) => {
              this.titleService.setTitle(str);
              this.pageInfo.updateTitle(str);
            });
          } else {
            this.titleService.setTitle(title);
            this.pageInfo.updateTitle(title);
          }
        } //set title that defines in routing's files
      });
    //end change title when route happened

    this.process$ = processService.processSubject;
  }
  title = "ntk-cms-web";
  constructorInfoAreaId = this.constructor.name;
  process$: Observable<ProcessModel>;
  dataSupportModelResult: ErrorExceptionResult<CoreSiteSupportModel>;
  tokenInfo: TokenInfoModelV3 = new TokenInfoModelV3();
  ngOnInit() {
    this.tokenHelper.ngOnInitAppMain();
    this.themeService.ngOnInitApp();

    const url = window.location.href;
    if (url.includes("?")) {
      const httpParams = new HttpParams({ fromString: url.split("?")[1] });
      const site = httpParams.get("site");
      const siteId = +site;
      if (siteId > 0) {
        localStorage.setItem("siteId", site);
      }
      const siteType = httpParams.get("sitetype");
      const siteTypeId = +siteType;
      if (siteTypeId > 0) {
        localStorage.setItem("siteTypeId", siteType);
      }
      const ResellerSite = httpParams.get("rsite");
      const ResellerSiteId = +ResellerSite;
      if (ResellerSiteId > 0) {
        localStorage.setItem("ResellerSiteId", ResellerSite);
      }
      const ResellerUser = httpParams.get("ruser");
      const ResellerUserId = +ResellerUser;
      if (ResellerUserId > 0) {
        localStorage.setItem("ResellerUserId", ResellerUser);
      }
    }

    this.publicHelper.getEnumRecordStatus();

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyA3lqa_xiaWGm5rh-IHNQaTt8FN67Y828g",
      authDomain: "ntk-cms.firebaseapp.com",
      databaseURL: "https://ntk-cms.firebaseio.com",
      projectId: "ntk-cms",
      storageBucket: "ntk-cms.appspot.com",
      messagingSenderId: "893852902485",
      appId: "1:893852902485:web:b58b55c1510532e9d2e0dc",
      measurementId: "G-45G43ESXQJ",
    };
    // Initialize Firebase
    if (environment.production) {
      const app = initializeApp(firebaseConfig);
      //todo: karavi
      const analytics = getAnalytics(app);
    }
    this.getServiceVer();
    setTimeout(() => {
      this.themeService.updateMainPagePreloaderShow(false);
    }, 10000);
  }
  ngAfterViewInit(): void {
    this.themeService.ngAfterViewInitApp();
  }
  @HostListener("window:resize", ["$event"])
  onWindowResize(event: Event) {
    this.themeService.updateInnerSize();
  }
  getServiceVer(): void {
    const pName = this.constructor.name + "ServiceIp";

    this.translate
      .get("MESSAGE.Receiving_Information_From_The_Server")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.configService.ServiceIp().subscribe({
      next: (ret) => {
        this.publicHelper.appServerVersion = ret.appVersion;
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeErrorGetOne(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }

  subscribeToNotifications(notificationFCMPublicKey) {
    this.swPush
      .requestSubscription({ serverPublicKey: notificationFCMPublicKey })
      .then((sub) => {
        var model = new TokenDeviceSetNotificationIdDtoModel();
        this.pushSubscription = sub;
        ((model.notificationId = sub.getKey + ""),
          (model.ClientMACAddress = ""));
        this.coreAuthService
          .ServiceSetTokenDeviceNotificationId(model)
          .subscribe({
            next: (ret) => {},
            error: (er) => {},
          });
      })
      .catch((err) =>
        console.error("Could not subscribe to notifications", err),
      );
  }
  pushSubscription: PushSubscription;
  getSupport() {
    this.coreSiteService.ServiceSupportSite().subscribe({
      next: (ret) => {
        this.dataSupportModelResult = ret;
      },
      error: (er) => {},
    });
  }
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event?.key === "F9") {
      if (localStorage.getItem(KeyboardEventF9))
        localStorage.removeItem(KeyboardEventF9);
      else localStorage.setItem(KeyboardEventF9, "F9");
    }
  }
  firstOnonline: boolean = true;
  toastId = 0;
  @HostListener("window:online", ["$event"])
  ononline(event: Event) {
    var model = new ConnectionStatusModel();
    model.internetConnection = true;
    model.serverConnection = true;
    this.cmsStoreService.setState({
      type: SET_Connection_STATE,
      payload: model,
    });
    if (this.firstOnonline) {
      this.firstOnonline = false;
      return;
    }
    if (this.toastId > 0) {
      this.cmsToastrService.toastr.clear(this.toastId);
    }
    this.translate
      .get([
        "ERRORMESSAGE.TITLE.Youhavesuccessfullyconnectedtotheserver",
        "ERRORMESSAGE.TITLE.Internetaccesswasconnected",
      ])
      .subscribe((str: string[]) => {
        this.cmsToastrService.toastr.success(str[0], str[1]);
      });
  }
  @HostListener("window:offline", ["$event"])
  onoffline(event: Event) {
    var model = new ConnectionStatusModel();
    model.internetConnection = false;
    model.serverConnection = false;
    this.cmsStoreService.setState({
      type: SET_Connection_STATE,
      payload: model,
    });
    this.firstOnonline = false;
    this.translate
      .get([
        "ERRORMESSAGE.TITLE.Pleasecheckyourinternetconnection",
        "ERRORMESSAGE.TITLE.Internetaccesswasinterrupted",
      ])
      .subscribe((str: string[]) => {
        this.toastId = this.cmsToastrService.toastr.error(str[0], str[1], {
          disableTimeOut: true,
        }).toastId;
      });
  }

  @HostListener("document:dblclick", ["$event"])
  onDoubleClick(event: MouseEvent): void {
    const element = event.target as HTMLElement;
    // بررسی می‌کنیم که آیا المان یا والدین آن کلاس مورد نظر را دارند
    if (element.closest(".ntk-allow-text-selection")) {
      element.classList.add("ntk-allow-select-text");
      setTimeout(() => {
        element.classList.remove("ntk-allow-select-text");
      }, 5000);
    }
  }

  ngOnDestroy() {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
