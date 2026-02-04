import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterOutlet, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError, Event } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { SwPush } from "@angular/service-worker";
import {
  CoreAuthV3Service,
  CoreSiteService,
  CoreConfigurationService,
  CoreModuleService,
  ErrorExceptionResult,
  CoreSiteSupportModel,
  TokenInfoModelV3,
  TokenDeviceSetNotificationIdDtoModel,
} from "ntk-cms-api";
import { Observable, Subscription, filter, map } from "rxjs";
import { ComponentsModule } from "./components/components.module";
import { SharedModule } from "./shared/shared.module";
import { PublicHelper } from "./core/helpers/publicHelper";
import { TokenHelper } from "./core/helpers/tokenHelper";
import { CmsStoreService } from "./core/reducers/cmsStore.service";
import { SET_Core_Module, SET_Connection_STATE } from "./core/reducers/reducer.factory";
import { PageInfoService } from "./core/services/page-info.service";
import { ProcessService } from "./core/services/process.service";
import { ProcessModel } from "./core/models/processModel";
import { ThemeService } from "./core/services/theme.service";
import { CmsToastrService } from "./core/services/cmsToastr.service";
import {
  SITE_ID_LOCAL_STORAGE_KEY,
  SITE_TYPE_ID_LOCAL_STORAGE_KEY,
  RESSELLER_SITE_ID_LOCAL_STORAGE_KEY,
  RESSELLER_USER_ID_LOCAL_STORAGE_KEY,
  KeyboardEventF9,
} from "./core/models/constModel";
import { ConnectionStatusModel } from "./core/models/connectionStatusModel";
import { HttpParams } from "@angular/common/http";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from "../environments/environment";

//start change title when route happened
//end change title when route happened

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ComponentsModule, CommonModule, SharedModule],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  //protected readonly title = signal('aaaa');
  private unsubscribe: Subscription[] = [];
  private lastViewportIsMobile: boolean =
    typeof window !== "undefined" ? window.innerWidth < 1000 : false;
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
        private cmsStoreService: CmsStoreService,
    private cdr: ChangeDetectorRef,
    public pageInfo: PageInfoService,
    public processService: ProcessService,
    private coreModuleService: CoreModuleService,
    public cmsToastrService: CmsToastrService,
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

    // Load module data after initial render
    if (this.tokenInfo?.access) {
      setTimeout(() => {
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
      }, 500);
    }

    const url = window.location.href;
    if (url.includes("?")) {
      const httpParams = new HttpParams({ fromString: url.split("?")[1] });
      const site = httpParams.get("site");
      const siteId = +site;
      if (siteId > 0) {
        localStorage.setItem(SITE_ID_LOCAL_STORAGE_KEY, site);
      }
      const siteType = httpParams.get("sitetype");
      const siteTypeId = +siteType;
      if (siteTypeId > 0) {
        localStorage.setItem(SITE_TYPE_ID_LOCAL_STORAGE_KEY, siteType);
      }
      const ResellerSite = httpParams.get("rsite");
      const ResellerSiteId = +ResellerSite;
      if (ResellerSiteId > 0) {
        localStorage.setItem(RESSELLER_SITE_ID_LOCAL_STORAGE_KEY, ResellerSite);
      }
      const ResellerUser = httpParams.get("ruser");
      const ResellerUserId = +ResellerUser;
      if (ResellerUserId > 0) {
        localStorage.setItem(RESSELLER_USER_ID_LOCAL_STORAGE_KEY, ResellerUser);
      }
    }

    this.publicHelper.getEnumRecordStatus();

    // Initialize Firebase lazily after page load
    if (environment.production) {
      setTimeout(() => {
        this.initializeFirebase();
      }, 2000);
    }

    // Load service version after initial render
    setTimeout(() => {
      this.getServiceVer();
    }, 1000);

    // Hide preloader after 5 seconds (reduced from 10)
    setTimeout(() => {
      this.themeService.updateMainPagePreloaderShow(false);
    }, 5000);
  }
  ngAfterViewInit(): void {
    this.themeService.ngAfterViewInitApp();
  }
  @HostListener("window:resize", ["$event"])
  onWindowResize(event: Event) {
    this.themeService.updateInnerSize();
    // Re-evaluate responsive routes when crossing the 1000px breakpoint
    // (routes are selected via canMatch guards in module routing files)
    const nowIsMobile = window.innerWidth < 1000;
    if (nowIsMobile !== this.lastViewportIsMobile) {
      this.lastViewportIsMobile = nowIsMobile;
      // Trigger a re-navigation to the current URL so Angular can re-match routes
      // with the new viewport size. This avoids requiring a full page reload.
      this.router.navigateByUrl(this.router.url, { replaceUrl: true });
    }
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
        this.cmsToastrService.toastr.success(
          str["ERRORMESSAGE.TITLE.Internetaccesswasconnected"],
          str["ERRORMESSAGE.TITLE.Youhavesuccessfullyconnectedtotheserver"],
        );
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
        this.toastId = this.cmsToastrService.toastr.error(
          str["ERRORMESSAGE.TITLE.Internetaccesswasinterrupted"],
          str["ERRORMESSAGE.TITLE.Pleasecheckyourinternetconnection"],
          {
            disableTimeOut: true,
          },
        ).toastId;
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

  initializeFirebase(): void {
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
    try {
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
    } catch (error) {
      if (environment.consoleLog)
        console.error("Firebase initialization error:", error);
    }
  }

  ngOnDestroy() {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
