import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthRefreshTokenModel, TokenInfoModelV3 } from "ntk-cms-api";
import { filter, firstValueFrom, Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsTranslationService } from "src/app/core/i18n";
import { LanguageFlagModel } from "src/app/core/models/languageFlagModel";
import { ThemeStoreModel } from "src/app/core/models/themeStoreModel";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { SET_Theme_STATE } from "src/app/core/reducers/reducer.factory";
import { CmsAuthService } from "src/app/core/services/cmsAuth.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-menu-language",
  templateUrl: "./menu-language.component.html",
  standalone: false,
})
export class MenuLanguageComponent implements OnInit {
  static nextId = 0;
  id = ++MenuLanguageComponent.nextId;
  constructor(
    private cmsTranslationService: CmsTranslationService,
    public cmsAuthService: CmsAuthService,
    public cmsToastrService: CmsToastrService,
    private cmsStoreService: CmsStoreService,
    private tokenHelper: TokenHelper,
    private router: Router,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    this.tokenInfo = this.cmsStoreService.getStateSnapshot().tokenInfoStore;
    this.languages = environment.languages;
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.tokenInfo = value;
          if (value?.access?.language?.length > 0 && this.languages?.length > 0)
            this.actionSetLanguage(value.access.language);
        }),
    );

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.themeStore)
        .subscribe(async (value) => {
          this.themeStore = value;
        }),
    );
  }
  themeStore = new ThemeStoreModel();
  languages: LanguageFlagModel[];
  language: LanguageFlagModel;

  tokenInfo: TokenInfoModelV3 = new TokenInfoModelV3();
  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    this.setSelectedLanguage();
    this.unsubscribe.push(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationStart))
        .subscribe(() => {
          this.setSelectedLanguage();
        }),
    );
    var lastLang = this.cmsTranslationService.getSelectedLanguage;
    if (lastLang?.length > 0) {
      const indexId = this.languages.findIndex((x) => x.lang == lastLang);
      const to = 0;
      if (indexId > 0)
        this.languages.splice(to, 0, this.languages.splice(indexId, 1)[0]);
    }
  }
  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  setLanguageWithRefresh(lang: string): void {
    this.actionSetLanguage(lang);
    this.themeStore.dataMenu = "";
    /** */
    if (!(this.tokenInfo?.access?.userId > 0)) {
      return;
    }
    const authModel: AuthRefreshTokenModel = new AuthRefreshTokenModel();
    authModel.userAccessAdminAllowToProfessionalData =
      this.tokenInfo.access.userAccessAdminAllowToProfessionalData;
    authModel.userAccessAdminAllowToAllData =
      this.tokenInfo.access.userAccessAdminAllowToAllData;
    authModel.userId = this.tokenInfo.access.userId;
    authModel.siteId = this.tokenInfo.access.siteId;
    authModel.lang = lang;

    var title = "";
    var message = "";
    this.translate
      .get([
        "TITLE.Information",
        "MESSAGE.Request_to_change_site_was_sent_to_the_server",
      ])
      .subscribe((str: string) => {
        title = str["TITLE.Information"];
        message =
          str["MESSAGE.Request_to_change_site_was_sent_to_the_server"] + "?";
        this.cmsToastrService.toastr.info(message, title);
      });

    // this.loadingStatus = true;
    this.cmsAuthService.refreshToken(authModel).subscribe({
      next: (ret) => {
        // this.loadingStatus = false;
        if (ret?.isSuccess) {
          this.tokenInfo = ret.item;
          if (ret.item.access.language === lang) {
            this.translate
              .get("MESSAGE.New_language_acess_confirmed")
              .subscribe((str: string) => {
                this.cmsToastrService.toastr.success(str, title);
              });
            firstValueFrom(this.translate.use(ret.item.access.language));
          } else {
            this.translate
              .get("MESSAGE.New_language_acess_denied")
              .subscribe((str: string) => {
                this.cmsToastrService.toastr.warning(str, title);
              });
          }
        } else {
          this.cmsToastrService.typeErrorAccessChange(ret.errorMessage);
        }
        Promise.resolve().then(() => this.cdr.detectChanges());
      },
      error: (err) => {
        this.cmsToastrService.typeErrorAccessChange(err);
      },
    });

    /** */
  }

  actionSetLanguage(lang: string): void {
    this.languages.forEach((language: LanguageFlagModel) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    this.cmsStoreService.getStateAll.themeStore.themeLanguage =
      this.cmsTranslationService.setLanguage(lang);
    if (
      this.cmsStoreService.getStateAll.themeStore.themeLanguage === "fa" ||
      this.cmsStoreService.getStateAll.themeStore.themeLanguage === "ar"
    )
      this.cmsStoreService.getStateAll.themeStore.themeDirection = "rtl";
    else this.cmsStoreService.getStateAll.themeStore.themeDirection = "ltr";
    var newvar = { ...this.cmsStoreService.getStateAll.themeStore };
    this.cmsStoreService.setState({ type: SET_Theme_STATE, payload: newvar });
  }

  setSelectedLanguage(): any {
    this.actionSetLanguage(this.cmsTranslationService.getSelectedLanguage);
  }
}
