import { Injectable, OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreAuthV3Service,
  DeviceTypeEnum,
  ErrorExceptionResult,
  ManageUserAccessUserTypesEnum,
  OperatingSystemTypeEnum,
  TokenDeviceClientInfoDtoModel,
  TokenDeviceModel,
  TokenInfoModelV3,
  TokenJWTModel,
} from "ntk-cms-api";
import {
  Observable,
  Subscription,
  catchError,
  finalize,
  firstValueFrom,
  map,
  of,
} from "rxjs";
import { environment } from "src/environments/environment";
import { CmsTranslationService } from "../i18n";
import { CmsStoreService } from "../reducers/cmsStore.service";
import { SET_TOKEN_DEVICE, SET_TOKEN_INFO } from "../reducers/reducer.factory";

@Injectable({
  providedIn: "root",
})
export class TokenHelper implements OnDestroy {
  constructor(
    public coreAuthService: CoreAuthV3Service,
    public translate: TranslateService,
    private cmsStoreService: CmsStoreService,
    private cmsTranslationService: CmsTranslationService,
  ) {
    // this.consoleLog = environment.ProgressConsoleLog;
  }
  public ctorAppMain() {
    this.userTokenCtor();
    this.deviceTokenCtor();
  }
  private unsubscribe: Subscription[] = [];
  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  public ngOnInitAppMain() {}
  private async userTokenCtor(): Promise<Observable<void>> {
    const tokenStr = this.coreAuthService.getUserToken();
    var tokenInfo = this.cmsStoreService.getStateSnapshot().tokenInfoStore;
    if (!tokenStr || tokenStr.length === 0) tokenInfo = new TokenInfoModelV3();
    //step 1
    if (tokenInfo && tokenInfo?.access) return new Observable<void>();
    //step 2
    tokenInfo = this.cmsStoreService.getStateSnapshot().tokenInfoStore;
    if (tokenInfo && tokenInfo?.access) return new Observable<void>();
    //step 3
    var retServiceRefreshToken: ErrorExceptionResult<TokenJWTModel>;
    if (
      this.coreAuthService.getJWT()?.tokenExpireDate &&
      new Date(this.coreAuthService.getJWT()?.tokenExpireDate) &&
      this.coreAuthService.getJWT()?.refreshToken?.length > 0
    ) {
      await firstValueFrom(
        this.coreAuthService.ServiceRefreshToken().pipe(
          map((ret: ErrorExceptionResult<TokenJWTModel>) => {
            if (environment.consoleLog)
              console.log("ServiceRefreshToken_getJWT_TOKEN_INFO");

            if (ret.isSuccess) {
              /** set token info */
              return firstValueFrom(
                this.coreAuthService.ServiceCurrentToken().pipe(
                  map((ret: ErrorExceptionResult<TokenInfoModelV3>) => {
                    tokenInfo = ret.item;
                    this.cmsStoreService.setState({
                      type: SET_TOKEN_INFO,
                      payload: ret.item,
                    });
                    return;
                  }),
                  catchError((err) => {
                    if (environment.consoleLog) console.log("Error_TOKEN_INFO");
                    return of(undefined);
                  }),
                  finalize(() => {}),
                ),
              );
              /** set token info */
            }
            return new Observable<void>();
          }),
          catchError((err) => {
            if (environment.consoleLog) console.log("Error_TOKEN_INFO");
            return of(undefined);
          }),
          finalize(() => {}),
        ),
      );
    } else {
      /** set token info */
      const value = await firstValueFrom(
        this.coreAuthService.ServiceCurrentToken().pipe(
          map((ret: ErrorExceptionResult<TokenInfoModelV3>) => {
            tokenInfo = ret.item;
            this.cmsStoreService.setState({
              type: SET_TOKEN_INFO,
              payload: ret.item,
            });
            return;
          }),
          catchError((err) => {
            if (environment.consoleLog) console.log("Error_TOKEN_INFO");
            return of(undefined);
          }),
          finalize(() => {}),
        ),
      );
      /** set token info */
    }
    return new Observable<void>();
  }

  private async deviceTokenCtor(): Promise<Observable<void>> {
    const tokenStr = this.coreAuthService.getDeviceToken();
    var deviceTokenInfo =
      this.cmsStoreService.getStateSnapshot().deviceTokenInfoStore;
    if (!tokenStr || tokenStr.length === 0)
      deviceTokenInfo = new TokenDeviceModel();
    //step 1
    if (deviceTokenInfo && deviceTokenInfo.deviceToken)
      return new Observable<void>();

    const model: TokenDeviceClientInfoDtoModel = {
      securityKey: environment.cmsTokenConfig.SecurityKey,
      clientMACAddress: "",
      osType: OperatingSystemTypeEnum.none,
      deviceType: DeviceTypeEnum.WebSite,
      packageName:
        environment.cmsTokenConfig.PackageName.length > 0
          ? environment.cmsTokenConfig.PackageName
          : environment.appName,
      appBuildVer: 0,
      appSourceVer: environment.appVersion,
      country: "",
      deviceBrand: "",
      language: this.cmsTranslationService.getSelectedLanguage,
      locationLat: "",
      locationLong: "",
      simCard: "",
      notificationId: "",
    };

    //step 2
    deviceTokenInfo =
      this.cmsStoreService.getStateSnapshot().deviceTokenInfoStore;
    if (deviceTokenInfo && deviceTokenInfo.deviceToken)
      return new Observable<void>();
    //step 3
    const value = await firstValueFrom(
      this.coreAuthService.ServiceGetTokenDevice(model).pipe(
        map((ret: ErrorExceptionResult<TokenDeviceModel>) => {
          deviceTokenInfo = ret.item;
          this.cmsStoreService.setState({
            type: SET_TOKEN_DEVICE,
            payload: ret.item,
          });
          return;
        }),
        catchError((err) => {
          if (environment.consoleLog) console.log("Error_TOKEN_INFO");
          return of(undefined);
        }),
        finalize(() => {}),
      ),
    );
    return new Observable<void>();
  }

  //private tokenInfo: TokenInfoModelV3 = new TokenInfoModelV3();
  //deviceTokenInfo: TokenDeviceModel = new TokenDeviceModel();

  isModelsDifferent(model1: any, model2: any): boolean {
    return JSON.stringify(model1) !== JSON.stringify(model2);
  }

  async getTokenDeviceState(): Promise<TokenDeviceModel> {
    const token = this.coreAuthService.getDeviceToken();
    if (!token || token.length === 0) return new TokenDeviceModel();
    var deviceTokenInfo =
      this.cmsStoreService.getStateSnapshot().deviceTokenInfoStore;
    return await firstValueFrom(
      this.coreAuthService.ServiceCurrentDeviceToken(),
    ).then((ret) => {
      deviceTokenInfo = ret.item;
      return ret.item;
    });
  }

  get isAdminSite(): boolean {
    var tokenInfo = this.cmsStoreService.getStateSnapshot().tokenInfoStore;
    if (
      tokenInfo?.access?.userAccessUserType ===
        ManageUserAccessUserTypesEnum.AdminCpSite ||
      tokenInfo?.access?.userAccessUserType ===
        ManageUserAccessUserTypesEnum.AdminMainCms ||
      tokenInfo?.access?.userAccessUserType ===
        ManageUserAccessUserTypesEnum.SupportCpSite ||
      tokenInfo?.access?.userAccessUserType ===
        ManageUserAccessUserTypesEnum.SupportMainCms
    ) {
      return true;
    }
    return false;
  }
  get isSupportSite(): boolean {
    var tokenInfo = this.cmsStoreService.getStateSnapshot().tokenInfoStore;
    if (
      tokenInfo?.access?.userAccessUserType ===
        ManageUserAccessUserTypesEnum.SupportCpSite ||
      tokenInfo?.access?.userAccessUserType ===
        ManageUserAccessUserTypesEnum.SupportMainCms
    ) {
      return true;
    }
    return false;
  }
}
function HostListener(
  arg0: string,
  arg1: string[],
): (
  target: TokenHelper,
  propertyKey: "onResize",
  descriptor: TypedPropertyDescriptor<(event: any) => void>,
) => void | TypedPropertyDescriptor<(event: any) => void> {
  throw new Error("Function not implemented.");
}
