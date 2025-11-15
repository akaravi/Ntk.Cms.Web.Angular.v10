import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  AuthUserSignInModel,
  AuthUserSignUpModel,
  CaptchaModel,
  CoreAuthV3Service,
  FormInfoModel,
} from "ntk-cms-api";
import { Observable, Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import {
  RESSELLER_SITE_ID_LOCAL_STORAGE_KEY,
  RESSELLER_USER_ID_LOCAL_STORAGE_KEY,
  SELECT_SITE_LOCAL_STORAGE_KEY,
} from "src/app/core/models/constModel";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { SET_TOKEN_INFO } from "src/app/core/reducers/reducer.factory";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { PageInfoService } from "src/app/core/services/page-info.service";
import { environment } from "src/environments/environment";
import { SignupRuleComponent } from "../signup-rule/signup-rule.component";
@Component({
  selector: "app-auth-signup",
  templateUrl: "./signup.component.html",
  standalone: false,
})
export class AuthSignUpComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private cmsToastrService: CmsToastrService,
    private router: Router,
    private coreAuthService: CoreAuthV3Service,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    public pageInfo: PageInfoService,
    private cmsStoreService: CmsStoreService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
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
            this.router.navigate(["/core/site/selection"], {});
          }
        }),
    );
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  private unsubscribe: Subscription[] = [];

  formInfo: FormInfoModel = new FormInfoModel();
  roulaccespt = "";
  isLoading$: Observable<boolean>;
  captchaModel: CaptchaModel = new CaptchaModel();
  expireDate: Date;
  countAutoCaptchaOrder = 1;
  passwordIsValid = false;
  dataModel: AuthUserSignUpModel = new AuthUserSignUpModel();
  onCaptchaOrderInProcess = false;
  RePasswordModel = "";
  PasswordView = false;
  loginAuto = true;
  hidePassword = true;
  loadDemoTheme = environment.loadDemoTheme;
  onNavigate = false;

  ngOnInit(): void {
    this.onCaptchaOrder();
    this.translate.get("AUTH.REGISTER.SIGNUP").subscribe((str: string) => {
      this.pageInfo.updateTitle(str);
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  onActionSubmit(): void {
    if (!this.dataModel.email || this.dataModel.email.length === 0) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.enter_your_email_address")
        .subscribe((str: string) => {
          this.formInfo.formError = str;
          this.formInfo.formErrorStatus = true;
          this.cmsToastrService.typeErrorRegistery(this.formInfo.formError);
        });
      return;
    }
    if (!this.dataModel.name || this.dataModel.name.length === 0) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.enter_your_name")
        .subscribe((str: string) => {
          this.formInfo.formError = str;
          this.formInfo.formErrorStatus = true;
          this.cmsToastrService.typeErrorRegistery(this.formInfo.formError);
        });
      return;
    }
    if (!this.dataModel.family || this.dataModel.family.length === 0) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.enter_your_last_name")
        .subscribe((str: string) => {
          this.formInfo.formError = str;
          this.formInfo.formErrorStatus = true;
          this.cmsToastrService.typeErrorRegistery(this.formInfo.formError);
        });
      return;
    }
    if (!this.dataModel.password || this.dataModel.password.length === 0) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.enter_the_password")
        .subscribe((str: string) => {
          this.formInfo.formError = str;
          this.formInfo.formErrorStatus = true;
          this.cmsToastrService.typeErrorRegistery(this.formInfo.formError);
        });
      return;
    }
    if (!this.RePasswordModel || this.RePasswordModel.length === 0) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.re_enter_the_password")
        .subscribe((str: string) => {
          this.formInfo.formError = str;
          this.formInfo.formErrorStatus = true;
          this.cmsToastrService.typeErrorRegistery(this.formInfo.formError);
        });
      return;
    }
    if (
      !this.dataModel.captchaText ||
      this.dataModel.captchaText.length === 0
    ) {
      this.formInfo.formErrorStatus = true;
      this.cmsToastrService.typeErrorRegistery(this.formInfo.formError);
      return;
    }
    if (this.dataModel.password !== this.RePasswordModel) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.password_and_re_password_are_different")
        .subscribe((str: string) => {
          this.formInfo.formError = str;
          this.dataModel.password = "";
          this.RePasswordModel = "";
          this.formInfo.formErrorStatus = true;
          this.cmsToastrService.typeErrorRegistery(this.formInfo.formError);
        });
      return;
    }
    this.formInfo.formErrorStatus = false;
    this.dataModel.captchaKey = this.captchaModel.key;
    const pName = this.constructor.name + ".ServiceSignupUser";
    this.translate
      .get("MESSAGE.Creating_new_account")
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
        this.dataModel.siteId = +sitelist[sitelist.length - 1];
    }
    const ResellerSiteId = +localStorage.getItem(
      RESSELLER_SITE_ID_LOCAL_STORAGE_KEY,
    );
    if (ResellerSiteId > 0) {
      this.dataModel.resellerSiteId = ResellerSiteId;
    }
    const ResellerUserId = +localStorage.getItem(
      RESSELLER_USER_ID_LOCAL_STORAGE_KEY,
    );
    if (ResellerUserId > 0) {
      this.dataModel.resellerUserId = ResellerUserId;
    }
    /** read storage */
    this.coreAuthService.ServiceSignupUser(this.dataModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.cmsToastrService.typeSuccessRegistery();
          this.formInfo.formErrorStatus = false;
          if (!this.loginAuto) {
            setTimeout(() => this.router.navigate(["/"]), 500);
          }
          /** Login */
          if (this.loginAuto) {
            const dataLoginModel = new AuthUserSignInModel();
            dataLoginModel.captchaKey = this.dataModel.captchaKey;
            dataLoginModel.captchaText = this.dataModel.captchaText;
            dataLoginModel.email = this.dataModel.email;
            dataLoginModel.password = this.dataModel.password;
            dataLoginModel.siteId = this.dataModel.siteId;
            dataLoginModel.mobile = this.dataModel.mobile;
            const pName2 = this.constructor.name + "ServiceSigninUser";
            this.translate
              .get("MESSAGE.login_to_user_account")
              .subscribe((str: string) => {
                this.publicHelper.processService.processStart(
                  pName,
                  str,
                  this.constructorInfoAreaId,
                );
              });
            this.coreAuthService.ServiceSigninUser(dataLoginModel).subscribe({
              next: (res) => {
                if (res.isSuccess) {
                  this.cmsToastrService.typeSuccessLogin();
                  this.cmsStoreService.setState({
                    type: SET_TOKEN_INFO,
                    payload: ret.item,
                  });
                  if (ret.item.access.siteId > 0) {
                    this.onNavigate = true;
                    //setTimeout(() => this.router.navigate(['/dashboard']), 500);
                    this.router.navigate(["/dashboard"]);
                  } else {
                    this.onNavigate = true;
                    //setTimeout(() => this.router.navigate(['/core/site/selection']), 500);
                    this.router.navigate(["/core/site/selection"]);
                  }
                } else {
                  this.formInfo.buttonSubmittedEnabled = true;
                  this.cmsToastrService.typeErrorLogin(res.errorMessage);
                  setTimeout(() => this.router.navigate(["/"]), 500);
                }
                this.publicHelper.processService.processStop(pName2);
              },
              error: (err) => {
                this.formInfo.buttonSubmittedEnabled = true;
                this.cmsToastrService.typeError(err);
                this.publicHelper.processService.processStop(pName2);
              },
            });
          }
          /** Login */
        } else {
          this.cmsToastrService.typeErrorRegistery(ret.errorMessage);
          this.formInfo.buttonSubmittedEnabled = true;
          this.formInfo.formErrorStatus = true;
          this.onCaptchaOrder();
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (err) => {
        this.cmsToastrService.typeError(err);
        this.formInfo.formErrorStatus = true;
        this.formInfo.buttonSubmittedEnabled = true;
        this.onCaptchaOrder();
        this.publicHelper.processService.processStop(pName);
      },
    });
  }
  onRoulaccespt(): void {
    if (this.roulaccespt) return;
    const dialogRef = this.dialog.open(SignupRuleComponent, {
      height: "90%",
      width: "90%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      this.roulaccespt = result;
      //console.log(result);
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
            this.countAutoCaptchaOrder = this.countAutoCaptchaOrder + 1;
            setTimeout(() => {
              this.onCaptchaOrder();
            }, seconds);
          }
        } else {
          this.cmsToastrService.typeErrorGetCpatcha(ret.errorMessage);
        }
        this.onCaptchaOrderInProcess = false;
        this.publicHelper.processService.processStop(pName);
      },
      error: (err) => {
        this.onCaptchaOrderInProcess = false;
        this.publicHelper.processService.processStop(pName);
      },
    });
  }
  ActionPasswordGenerator(): void {
    // const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    const passwordLength = 10;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    this.dataModel.password = password;
    this.RePasswordModel = password;
    this.PasswordView = true;
  }
}
