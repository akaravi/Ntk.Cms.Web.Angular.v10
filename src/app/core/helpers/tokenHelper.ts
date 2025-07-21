import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreAuthV3Service,
  ManageUserAccessUserTypesEnum,
  TokenDeviceClientInfoDtoModel,
  TokenDeviceModel,
  TokenInfoModelV3
} from 'ntk-cms-api';
import { Observable, catchError, finalize, firstValueFrom, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CmsStoreService } from '../reducers/cmsStore.service';
import { SET_TOKEN_DEVICE, SET_TOKEN_INFO } from '../reducers/reducer.factory';
import { DeviceTypeEnum, ErrorExceptionResult, OperatingSystemTypeEnum } from 'ntk-cms-api';
import { CmsTranslationService } from '../i18n';


@Injectable({
  providedIn: 'root',
})
export class TokenHelper {
  constructor(
    public coreAuthService: CoreAuthV3Service,
    public translate: TranslateService,
    private cmsStoreService: CmsStoreService,
    private cmsTranslationService: CmsTranslationService
  ) {
    // this.consoleLog = environment.ProgressConsoleLog;

  }
  public ctorAppMain() {
    this.userTokenCtor();
    this.deviceTokenCtor();
  }

  public ngOnInitAppMain() {

  }
  private userTokenCtor(): Observable<void> {
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

  private deviceTokenCtor(): Observable<void> {
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
      language: this.cmsTranslationService.getSelectedLanguage,
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
  get isMobile() {
    if (window.innerWidth < environment.cmsViewConfig.mobileWindowInnerWidth)
      return true;
    return false;
  };
  private tokenInfo: TokenInfoModelV3 = new TokenInfoModelV3();
  deviceTokenInfo: TokenDeviceModel = new TokenDeviceModel();



  isModelsDifferent(model1: any, model2: any): boolean {
    return JSON.stringify(model1) !== JSON.stringify(model2);
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


  CurrentTokenInfoRenew(): void {
    //برای تست ورژن ۳  مارک کردیم
    //todo:karavi this.coreAuthService.CurrentTokenInfoRenew();
  }
  get isAdminSite(): boolean {
    if (this.tokenInfo?.access?.userAccessUserType === ManageUserAccessUserTypesEnum.AdminCpSite
      || this.tokenInfo?.access?.userAccessUserType === ManageUserAccessUserTypesEnum.AdminMainCms

      || this.tokenInfo?.access?.userAccessUserType === ManageUserAccessUserTypesEnum.SupportCpSite
      || this.tokenInfo?.access?.userAccessUserType === ManageUserAccessUserTypesEnum.SupportMainCms
    ) {
      return true;
    }
    return false;
  }
  get isSupportSite(): boolean {
    if (this.tokenInfo?.access?.userAccessUserType === ManageUserAccessUserTypesEnum.SupportCpSite
      || this.tokenInfo?.access?.userAccessUserType === ManageUserAccessUserTypesEnum.SupportMainCms
    ) {
      return true;
    }
    return false;
  }


}
function HostListener(arg0: string, arg1: string[]): (target: TokenHelper, propertyKey: "onResize", descriptor: TypedPropertyDescriptor<(event: any) => void>) => void | TypedPropertyDescriptor<(event: any) => void> {
  throw new Error('Function not implemented.');
}

