import { FormInfoModel } from "../../../core/models/formInfoModel";
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {AuthUserSignInBySmsDtoModel,
  CaptchaModel,
  CoreAuthV3Service} from "ntk-cms-api";
import { interval, Observable, Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsTranslationService } from "src/app/core/i18n/cmsTranslation.service";
import { ConnectionStatusModel } from "src/app/core/models/connectionStatusModel";
import {
  RESSELLER_SITE_ID_LOCAL_STORAGE_KEY,
  RESSELLER_USER_ID_LOCAL_STORAGE_KEY,
  ROUTE_SELECT_SITE,
  SELECT_SITE_LOCAL_STORAGE_KEY,
  themeAuthPageLSKey,
} from "src/app/core/models/constModel";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { SET_TOKEN_INFO } from "src/app/core/reducers/reducer.factory";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { PageInfoService } from "src/app/core/services/page-info.service";
enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}
export class processModel {
  progressBarValue: number;
  progressBarMaxValue: number;
  message: string;
}
@Component({
  selector: "app-auth-signin-bysms",
  templateUrl: "./signin-bysms.component.html",
  standalone: false,
})
export class AuthSignInBySmsComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  private destroyRef = inject(DestroyRef);
  constructor(
    private coreAuthService: CoreAuthV3Service,
    private cmsToastrService: CmsToastrService,
    public translate: TranslateService,
    private router: Router,
    private cmsTranslationService: CmsTranslationService,
    private cmsStoreService: CmsStoreService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public pageInfo: PageInfoService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
    if (localStorage) localStorage.setItem(themeAuthPageLSKey, "signinbysms");
    this.RePasswordModel = "";
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
  connectionStatus = new ConnectionStatusModel();
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;
  dataModelAuthUserSignInBySms: AuthUserSignInBySmsDtoModel =
    new AuthUserSignInBySmsDtoModel();
  captchaModel: CaptchaModel = new CaptchaModel();
  diffSecondsSubscribe: Subscription;
  // private fields
  forgetState = "sms";
  countAutoCaptchaOrder = 1;
  formInfo: FormInfoModel = new FormInfoModel();
  passwordIsValid = false;
  RePasswordModel = "";
  onCaptchaOrderInProcess = false;
  diffSeconds: number;
  onNavigate = false;
  private unsubscribe: Subscription[] = [];
  ngOnInit(): void {
    this.onCaptchaOrder();
    this.translate.get("AUTH.SIGNINBYSMS.TITLE").subscribe((str: string) => {
      this.pageInfo.updateTitle(str);
    });
  }
  prorocess: processModel;
  buttonnResendSmsDisable = true;
  otpConfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "50px",
      height: "50px",
      margin: "5px",
    },
  };
  onOtpChange(otp) {
    this.dataModelAuthUserSignInBySms.code = otp;
  }
  private downloadTimer: any;

  onActionSubmitOrderCodeBySms(): void {
    if (this.forgetState == "entrycode") {
      if (
        !this.dataModelAuthUserSignInBySms.captchaText ||
        this.dataModelAuthUserSignInBySms.captchaText.length == 0
      ) {
        this.translate
          .get("ERRORMESSAGE.MESSAGE.typeErrorSetCpatcha")
          .subscribe((str: string) => {
            this.cmsToastrService.typeWarningMessage(str);
          });
        return;
      }
      this.dataModelAuthUserSignInBySms.code = "";
    }

    this.formInfo.submitButtonEnabled = false;
    this.errorState = ErrorStates.NotSubmitted;
    this.dataModelAuthUserSignInBySms.captchaKey = this.captchaModel.key;
    this.dataModelAuthUserSignInBySms.lang =
      this.cmsTranslationService.getSelectedLanguage;
    const pName = this.constructor.name + ".ServiceSigninUserBySMS";

    this.translate
      .get("MESSAGE.Send_login_request_with_one_time_password")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.coreAuthService
      .ServiceSigninUserBySMS(this.dataModelAuthUserSignInBySms)
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.translate
              .get("MESSAGE.The_login_code_was_texted_with_you")
              .subscribe((str: string) => {
                this.cmsToastrService.typeSuccessMessage(str);
              });
            this.forgetState = "entrycode";
            //TimeDown
            this.prorocess = new processModel();
            this.prorocess.progressBarValue = 0;
            this.prorocess.progressBarMaxValue = 60;
            this.prorocess.message = "";
            this.buttonnResendSmsDisable = true;
            var timeleft = this.prorocess.progressBarMaxValue;
            this.translate.get("MESSAGE.SECONDS").subscribe((str: string) => {
              this.downloadTimer = setInterval(() => {
                this.prorocess.progressBarValue =
                  this.prorocess.progressBarMaxValue - timeleft;
                this.prorocess.message = "(" + timeleft + " " + str + ")";
                timeleft -= 1;
                if (timeleft <= 0) {
                  this.buttonnResendSmsDisable = false;
                  this.prorocess.message = "";
                  clearInterval(this.downloadTimer);
                }
                Promise.resolve().then(() => this.cdr.detectChanges());
              }, 500);
            });
            //TimeDown
          } else {
            this.cmsToastrService.typeErrorMessage(res.errorMessage);
          }
          this.formInfo.submitButtonEnabled = true;
          if (this.countAutoCaptchaOrder < 10) {
            if (!this.captchaModel || this.diffSeconds < 2) {
              this.onCaptchaOrder();
            }
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.formInfo.submitButtonEnabled = true;
          this.onCaptchaOrder();
          this.publicHelper.processService.processStop(pName);
        },
      });
  }
  ngOnDestroy() {
    clearInterval(this.downloadTimer);
    if (this.diffSecondsSubscribe) this.diffSecondsSubscribe.unsubscribe();
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  onActionSubmitEntryPinCode(): void {
    this.formInfo.submitButtonEnabled = false;
    this.errorState = ErrorStates.NotSubmitted;
    this.dataModelAuthUserSignInBySms.captchaKey = this.captchaModel.key;
    this.dataModelAuthUserSignInBySms.lang =
      this.cmsTranslationService.getSelectedLanguage;
    const pName = this.constructor.name + ".ServiceSigninUserBySMS";
    this.translate
      .get("MESSAGE.Send_login_request_with_one_time_password")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    /** read storage */

    if (localStorage.getItem(SELECT_SITE_LOCAL_STORAGE_KEY)) {
      const sitelist = localStorage
        .getItem(SELECT_SITE_LOCAL_STORAGE_KEY)
        .split(",");
      if (sitelist && sitelist.length > 0)
        this.dataModelAuthUserSignInBySms.siteId =
          +sitelist[sitelist.length - 1];
    }
    const ResellerSiteId = +localStorage.getItem(
      RESSELLER_SITE_ID_LOCAL_STORAGE_KEY,
    );
    if (ResellerSiteId > 0) {
      this.dataModelAuthUserSignInBySms.resellerSiteId = ResellerSiteId;
    }
    const ResellerUserId = +localStorage.getItem(
      RESSELLER_USER_ID_LOCAL_STORAGE_KEY,
    );
    if (ResellerUserId > 0) {
      this.dataModelAuthUserSignInBySms.resellerUserId = ResellerUserId;
    }
    /** read storage */
    this.coreAuthService
      .ServiceSigninUserBySMS(this.dataModelAuthUserSignInBySms)
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.cmsToastrService.typeSuccessLogin();
            this.formInfo.submitButtonEnabled = false;
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
            this.onCaptchaOrder();
            this.cmsToastrService.typeErrorMessage(res.errorMessage);
          }
          this.formInfo.submitButtonEnabled = true;
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.formInfo.submitButtonEnabled = true;
          this.onCaptchaOrder();
          this.publicHelper.processService.processStop(pName);
        },
      });
  }
  passwordValid(event): void {
    this.passwordIsValid = event;
  }
  onCaptchaOrder(): void {
    if (this.onCaptchaOrderInProcess) {
      return;
    }
    this.countAutoCaptchaOrder = this.countAutoCaptchaOrder + 1;
    if (this.diffSecondsSubscribe) this.diffSecondsSubscribe.unsubscribe();
    this.dataModelAuthUserSignInBySms.captchaText = "";
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
        this.captchaModel = ret.item;
        this.onCaptchaOrderInProcess = false;
        this.diffSecondsSubscribe = interval(500).subscribe((x) => {
          this.diffSeconds =
            new Date(this.captchaModel.expire).getTime() - new Date().getTime();

          if (this.diffSeconds < 0 && this.countAutoCaptchaOrder < 10) {
            this.diffSecondsSubscribe.unsubscribe();
            this.onCaptchaOrder();
          }
        });
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.onCaptchaOrderInProcess = false;
        this.publicHelper.processService.processStop(pName);
      },
    });
  }

  changeforgetState(model: string): void {
    this.forgetState = model;
  }
}
