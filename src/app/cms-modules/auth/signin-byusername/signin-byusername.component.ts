import { FormInfoModel } from "../../../core/models/formInfoModel";
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {AuthUserSignInModel,
  CaptchaModel,
  CoreAuthV3Service} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsTranslationService } from "src/app/core/i18n/cmsTranslation.service";
import { ConnectionStatusModel } from "src/app/core/models/connectionStatusModel";
import {
  ROUTE_SELECT_SITE,
  SELECT_SITE_LOCAL_STORAGE_KEY,
  themeAuthPageLSKey,
} from "src/app/core/models/constModel";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { SET_TOKEN_INFO } from "src/app/core/reducers/reducer.factory";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { PageInfoService } from "src/app/core/services/page-info.service";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-auth-signin-byusername",
  templateUrl: "./signin-byusername.component.html",
  standalone: false,
})
export class AuthSignInByUsernameComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  private destroyRef = inject(DestroyRef);
  constructor(
    private cmsToastrService: CmsToastrService,
    private cmsStoreService: CmsStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private coreAuthService: CoreAuthV3Service,
    private cmsTranslationService: CmsTranslationService,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public pageInfo: PageInfoService,
    public tokenHelper: TokenHelper,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
    if (localStorage)
      localStorage.setItem(themeAuthPageLSKey, "signinbyusername");
    this.firstRun = true;
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.connectionStatusStore)
        .subscribe(async (value) => {
          this.connectionStatus = value;
        }),
    );
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          if (
            this.cmsStoreService?.getStateAll?.tokenInfoStore &&
            this.cmsStoreService?.getStateAll?.tokenInfoStore?.access?.userId >
              0 &&
            this.cmsStoreService?.getStateAll?.tokenInfoStore?.access?.siteId >
              0
          ) {
            this.router.navigate(["/dashboard"], {});
          }
          if (
            this.cmsStoreService?.getStateAll?.tokenInfoStore &&
            this.cmsStoreService?.getStateAll?.tokenInfoStore?.access?.userId >
              0
          ) {
            this.router.navigate([ROUTE_SELECT_SITE], {});
          }
        }),
    );
  }

  loadDemoTheme = environment.loadDemoTheme;
  connectionStatus = new ConnectionStatusModel();
  firstRun = true;
  hidePassword = true;

  formInfo: FormInfoModel = new FormInfoModel();
  dataModel: AuthUserSignInModel = new AuthUserSignInModel();
  captchaModel: CaptchaModel = new CaptchaModel();
  expireDate: Date;
  countAutoCaptchaOrder = 1;
  // KeenThemes mock, change it to:
  hasError: boolean;
  returnUrl: string;
  loginType = "email";
  onCaptchaOrderInProcess = false;
  onNavigate = false;
  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    this.onCaptchaOrder();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams["returnUrl".toString()] || "/";
    if (this.firstRun) {
      this.dataModel.captchaText = "0000";
    }
    this.translate.get("AUTH.SIGNINBYSMS.TITLE").subscribe((str: string) => {
      this.pageInfo.updateTitle(str);
    });
  }
  ngOnDestroy() {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  onActionSubmit(): void {
    this.formInfo.submitButtonEnabled = false;
    this.hasError = false;
    this.dataModel.captchaKey = this.captchaModel.key;
    this.dataModel.lang = this.cmsTranslationService.getSelectedLanguage;
    const pName = this.constructor.name + ".ServiceSigninUser";
    this.translate
      .get("MESSAGE.login_to_user_account")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    if (localStorage.getItem(SELECT_SITE_LOCAL_STORAGE_KEY)) {
      const sitelist = localStorage
        .getItem(SELECT_SITE_LOCAL_STORAGE_KEY)
        .split(",");
      if (sitelist && sitelist.length > 0)
        this.dataModel.siteId = +sitelist[sitelist.length - 1];
    }

    this.coreAuthService.ServiceSigninUser(this.dataModel).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.cmsToastrService.typeSuccessLogin();
          this.coreAuthService.ServiceCurrentToken().subscribe({
            next: (ret) => {
              if (ret.isSuccess) {
                this.cmsStoreService.setState({
                  type: SET_TOKEN_INFO,
                  payload: ret.item,
                });
                if (ret.item.access.siteId > 0) {
                  this.onNavigate = true;
                  setTimeout(() => {
                    if (!this.destroyRef.destroyed)
                      this.router.navigate(["/dashboard"]);
                  }, 10);
                } else {
                  this.onNavigate = true;
                  setTimeout(() => {
                    if (!this.destroyRef.destroyed)
                      this.router.navigate([ROUTE_SELECT_SITE]);
                  }, 10);
                }
              }
            },
          });
        } else {
          this.firstRun = false;
          this.formInfo.submitButtonEnabled = true;
          this.cmsToastrService.typeErrorLogin(res.errorMessage);
          this.onCaptchaOrder();
        }

        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.firstRun = false;
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.onCaptchaOrder();
        this.publicHelper.processService.processStop(pName);
      },
    });
  }
  onloginTypeChange(model: string): void {
    this.loginType = model;
  }
  onCaptchaOrder(): void {
    if (this.onCaptchaOrderInProcess) {
      return;
    }
    this.countAutoCaptchaOrder = this.countAutoCaptchaOrder + 1;
    this.dataModel.captchaText = "";
    const pName = this.constructor.name + ".ServiceCaptcha";
    this.translate
      .get("MESSAGE.get_security_photo_content")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.coreAuthService.ServiceCaptcha().subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.captchaModel = ret.item;
          this.expireDate = ret.item.expire; //.split('+')[1];
          const startDate = new Date();
          const endDate = new Date(ret.item.expire);
          const seconds = endDate.getTime() - startDate.getTime();
          if (this.countAutoCaptchaOrder < 10) {
            setTimeout(() => {
              if (!this.firstRun) this.onCaptchaOrder();
            }, seconds);
          }
        } else {
          this.cmsToastrService.typeErrorGetCpatcha(ret.errorMessage);
        }
        this.onCaptchaOrderInProcess = false;
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.onCaptchaOrderInProcess = false;
        this.publicHelper.processService.processStop(pName);
      },
    });
  }
}
