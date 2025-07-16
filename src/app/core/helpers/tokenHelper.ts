import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreAuthV3Service,
  ManageUserAccessUserTypesEnum,
  TokenDeviceClientInfoDtoModel,
  TokenDeviceModel,
  TokenInfoModelV3
} from 'ntk-cms-api';
import { Observable, catchError, finalize, first, firstValueFrom, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CmsStoreService } from '../reducers/cmsStore.service';
import { ProcessOrderModel, ReducerCmsStore, SET_TOKEN_DEVICE, SET_TOKEN_INFO } from '../reducers/reducer.factory';
import { CoreConfigurationService, CoreSiteService, CoreSiteSupportModel, DeviceTypeEnum, ErrorExceptionResult, OperatingSystemTypeEnum, TokenDeviceSetNotificationIdDtoModel } from 'ntk-cms-api';
import { CmsTranslationService } from '../i18n';

const LOCALIZATION_LOCAL_STORAGE_KEY = 'language';
@Injectable({
  providedIn: 'root',
})
export class TokenHelper {
  constructor(
    public coreAuthService: CoreAuthV3Service,
    public translate: TranslateService,
    //k:by karavi for test//   private themeService: ThemeService,
    private cmsStoreService: CmsStoreService,
    private cmsTranslationService: CmsTranslationService
  ) {
    this.consoleLog = environment.ProgressConsoleLog;

  }

  public init() {
    this.userTokenInit();
    this.deviceTokenInit();
  }
  private userTokenInit(): Observable<void> {
    const tokenStr = this.coreAuthService.getUserToken();
    if (!tokenStr || tokenStr.length === 0)
      this.tokenInfo = new TokenInfoModelV3();
    //step 1
    if (this.tokenInfo && this.tokenInfo?.access)
      return new Observable<void>;
    //step 2
    this.tokenInfo = this.cmsStoreService.getStateSnapshot().tokenInfoStore;
    if (this.tokenInfo && this.tokenInfo?.access)
      return new Observable<void>;
    //step 3
    return this.coreAuthService.ServiceCurrentToken().pipe(
      map((ret: ErrorExceptionResult<TokenInfoModelV3>) => {
        this.tokenInfo = ret.item;
        this.cmsStoreService.setState({ type: SET_TOKEN_INFO, payload: ret.item });
        return;
      }),
      catchError((err) => {
        if (environment.consoleLog)
          console.log("Error_TOKEN_INFO");
        return of(undefined);
      }),
      finalize(() => { })
    );

  }

  private deviceTokenInit(): Observable<void> {
    const tokenStr = this.coreAuthService.getDeviceToken();
    if (!tokenStr || tokenStr.length === 0)
      this.deviceTokenInfo = new TokenDeviceModel();
    //step 1
    if (this.deviceTokenInfo && this.deviceTokenInfo.deviceToken)
      return new Observable<void>;


    const model: TokenDeviceClientInfoDtoModel = {
      securityKey: environment.cmsTokenConfig.SecurityKey,
      clientMACAddress: '',
      osType: OperatingSystemTypeEnum.none,
      deviceType: DeviceTypeEnum.WebSite,
      packageName: environment.appName,
      appBuildVer: 0,
      appSourceVer: environment.appVersion,
      country: '',
      deviceBrand: '',
      language: this.cmsTranslationService.getSelectedLanguage(),
      locationLat: '',
      locationLong: '',
      simCard: '',
      notificationId: ''
    };

    //step 2
    this.deviceTokenInfo = this.cmsStoreService.getStateSnapshot().deviceTokenInfoStore;
    if (this.deviceTokenInfo && this.deviceTokenInfo.deviceToken)
      return new Observable<void>;
    //step 3
    return this.coreAuthService.ServiceGetTokenDevice(model).pipe(
      map((ret: ErrorExceptionResult<TokenDeviceModel>) => {
        this.deviceTokenInfo = ret.item;
        this.cmsStoreService.setState({ type: SET_TOKEN_DEVICE, payload: ret.item });
        return;
      }),
      catchError((err) => {
        if (environment.consoleLog)
          console.log("Error_TOKEN_INFO");
        return of(undefined);
      }),
      finalize(() => { })
    );
  }

  consoleLog = true;

  get isMobile() {
    if (window.innerWidth < environment.cmsViewConfig.mobileWindowInnerWidth)
      return true;
    return false;
  };
  tokenInfo: TokenInfoModelV3 = new TokenInfoModelV3();
  deviceTokenInfo: TokenDeviceModel = new TokenDeviceModel();

  isAdminSite = false;
  isSupportSite = false;


  /*
    /only use on main page
    */
  onInitAppComponentStateOnChange(): Observable<ReducerCmsStore> {
    return this.cmsStoreService.getState((state) => {
      if (environment.consoleLog)
        console.log("onInitAppComponentStateOnChange:tokenhelper");
      //this.tokenInfo = state.tokenInfoStore;
      this.setDirectionThemeBylanguage(this.tokenInfo?.access?.language);
      this.CheckIsAdmin();
      return state;
    });
  }
  getStateOnChange(): Observable<ReducerCmsStore> {
    return this.cmsStoreService.getState((state) => {
      if (environment.consoleLog)
        console.log("getStateOnChange");
      return state
    });
  }

  isModelsDifferent(model1: any, model2: any): boolean {
    return JSON.stringify(model1) !== JSON.stringify(model2);
  }
  setTokenInfoStateOnChange(model: TokenInfoModelV3): void {
    this.tokenInfo = model;
    this.cmsStoreService.setState({ type: SET_TOKEN_INFO, payload: model });
  }
  getTokenInfoStateOnChange(): Observable<TokenInfoModelV3> {
    return this.cmsStoreService.getState((state) => { return state.tokenInfoStore; });
  }
  getTokenDeviceStateOnChange(): Observable<TokenDeviceModel> {
    return this.cmsStoreService.getState((state) => { return state.deviceTokenInfoStore; });
  }

  async getTokenInfoState(): Promise<TokenInfoModelV3> {
    const token = this.coreAuthService.getUserToken();
    if (!token || token.length === 0)
      return new TokenInfoModelV3();
    //step 1
    if (this.tokenInfo && this.tokenInfo.access)
      return this.tokenInfo;
    //step 2
    this.tokenInfo = this.cmsStoreService.getStateSnapshot().tokenInfoStore

    if (this.tokenInfo && this.tokenInfo.access)
      return this.tokenInfo;
    return new TokenInfoModelV3();
  }

  async getTokenDeviceState(): Promise<TokenDeviceModel> {
    const token = this.coreAuthService.getDeviceToken();
    if (!token || token.length === 0)
      return new TokenDeviceModel();

    return await firstValueFrom(this.coreAuthService.ServiceCurrentDeviceToken())
      .then((ret) => {
        this.deviceTokenInfo = ret.item;
        return ret.item;
      });
  }

  setDirectionThemeBylanguage(language) {
    if (!language || language.length === 0)
      language = localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY) || this.translate.getDefaultLang() || 'fa';
    if (language === 'ar' || language === 'fa') {
      //k:by karavi for test//  this.themeService.updateThemeDirection("ltr");
    } else {
      //k:by karavi for test//  this.themeService.updateThemeDirection("rtl");
    }
    document.getElementsByTagName('html')[0].setAttribute('lang', language);
  }
  CurrentTokenInfoRenew(): void {
    //برای تست ورژن ۳  مارک کردیم
    //todo:karavi this.coreAuthService.CurrentTokenInfoRenew();
  }
  CheckIsAdmin(): boolean {
    if (this.tokenInfo?.access?.userAccessUserType === ManageUserAccessUserTypesEnum.AdminCpSite
      || this.tokenInfo?.access?.userAccessUserType === ManageUserAccessUserTypesEnum.AdminMainCms

      || this.tokenInfo?.access?.userAccessUserType === ManageUserAccessUserTypesEnum.SupportCpSite
      || this.tokenInfo?.access?.userAccessUserType === ManageUserAccessUserTypesEnum.SupportMainCms
    ) {
      this.isAdminSite = true;
      return true;
    }
    this.isAdminSite = false;
    return false;
  }
  CheckIsSupport(): boolean {
    if (this.tokenInfo?.access?.userAccessUserType === ManageUserAccessUserTypesEnum.SupportCpSite
      || this.tokenInfo?.access?.userAccessUserType === ManageUserAccessUserTypesEnum.SupportMainCms
    ) {
      this.isSupportSite = true;
      return true;
    }
    this.isSupportSite = false;
    return false;
  }


}
function HostListener(arg0: string, arg1: string[]): (target: TokenHelper, propertyKey: "onResize", descriptor: TypedPropertyDescriptor<(event: any) => void>) => void | TypedPropertyDescriptor<(event: any) => void> {
  throw new Error('Function not implemented.');
}

