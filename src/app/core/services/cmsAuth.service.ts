import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import {
  AuthRefreshTokenModel,
  AuthUserSignInModel,
  CoreAuthV3Service,
  CoreCpMainMenuModel,
  CoreSiteModel,
  ErrorExceptionResult,
  TokenInfoModelV3,
  TokenJWTModel,
} from "ntk-cms-api";
import {
  BehaviorSubject,
  Observable,
  Subscription,
  catchError,
  finalize,
  interval,
  map,
  of,
  switchMap,
} from "rxjs";
import { environment } from "src/environments/environment";
import { TokenInfoType } from "../models/tokenInfoType";
import { CmsStoreService } from "../reducers/cmsStore.service";
import {
  SET_Core_Site,
  SET_CpMain_Menu,
  SET_TOKEN_INFO,
  SET_Theme_STATE,
} from "../reducers/reducer.factory";

@Injectable({
  providedIn: "root",
})
export class CmsAuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // public fields
  currentUser$: Observable<TokenInfoModelV3> =
    new Observable<TokenInfoModelV3>();
  currentUserSubject: BehaviorSubject<TokenInfoModelV3> =
    new BehaviorSubject<TokenInfoModelV3>(new TokenInfoModelV3());
  isLoading$: Observable<boolean> = new Observable<boolean>();
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  get currentUserValue(): TokenInfoModelV3 {
    return this.currentUserSubject.value;
  }
  set currentUserValue(user: TokenInfoModelV3) {
    this.currentUserSubject.next(user);
  }
  constructor(
    private router: Router,
    private coreAuthService: CoreAuthV3Service,
    private cmsStoreService: CmsStoreService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<TokenInfoModelV3>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getTokenInfoType(): Observable<TokenInfoType> {
    const auth = this.coreAuthService.getJWT();
    if (!auth || !auth.accessToken) {
      return of(undefined);
    }
    this.isLoadingSubject.next(true);
    return this.coreAuthService.ServiceCurrentToken().pipe(
      map((ret: ErrorExceptionResult<TokenInfoModelV3>) => {
        if (ret.isSuccess) {
          this.currentUserSubject.next(ret.item as TokenInfoType);
          this.cmsStoreService.setState({
            type: SET_TOKEN_INFO,
            payload: ret.item,
          });
        } else {
          this.coreAuthService.setJWT(null);
          this.router.navigate(["/auth/login"], {
            queryParams: {},
          });
        }
        return ret.item;
      }),
      catchError((err) => {
        this.coreAuthService.setJWT(null);
        return of("error", err);
      }),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }
  getTokenInfo(): Observable<ErrorExceptionResult<TokenInfoModelV3>> {
    const auth = this.coreAuthService.getJWT();
    if (!auth || !auth.accessToken) {
      return of(undefined);
    }
    this.isLoadingSubject.next(true);
    return this.coreAuthService.ServiceCurrentToken().pipe(
      map((ret: ErrorExceptionResult<TokenInfoModelV3>) => {
        if (ret?.isSuccess) {
          this.currentUserSubject.next(ret.item);
          this.cmsStoreService.setState({
            type: SET_TOKEN_INFO,
            payload: ret.item,
          });
          if (ret.item.access) {
            if (ret.item.access.direction == "ltr")
              this.cmsStoreService.getStateAll.themeStore.themeDirection =
                "ltr";
            else
              this.cmsStoreService.getStateAll.themeStore.themeDirection =
                "rtl";
            if (ret.item.access.language?.length > 0)
              this.cmsStoreService.getStateAll.themeStore.themeLanguage =
                ret.item.access.language;
            this.cmsStoreService.setState({
              type: SET_Theme_STATE,
              payload: this.cmsStoreService.getStateAll.themeStore,
            });
          }
        } else {
          this.router.navigate(["/auth/login"], {
            queryParams: {},
          });
        }
        return ret;
      }),
      catchError((err) => {
        this.coreAuthService.setJWT(null);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  login(
    model: AuthUserSignInModel,
  ): Observable<ErrorExceptionResult<TokenInfoType>> {
    this.isLoadingSubject.next(true);

    return this.coreAuthService.ServiceSigninUser(model).pipe(
      map((auth: ErrorExceptionResult<TokenJWTModel>) => {
        if (auth) {
          const result = this.setAuthFromLocalStorage(auth.item);
          this.callRefreshToken(auth.item);
          return result;
        }
        return of(undefined);
      }),
      switchMap(() => this.getTokenInfo()),
      catchError((err) => {
        if (environment.consoleLog) console.error("err", err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  logout(): void {
    this.coreAuthService.ServiceCurrentToken().subscribe({
      next: (ret) => {
        this.cmsStoreService.setState({
          type: SET_TOKEN_INFO,
          payload: new TokenInfoModelV3(),
        });
        this.cmsStoreService.setState({
          type: SET_Core_Site,
          payload: new ErrorExceptionResult<CoreSiteModel>(),
        });
        this.cmsStoreService.setState({
          type: SET_CpMain_Menu,
          payload: new ErrorExceptionResult<CoreCpMainMenuModel>(),
        });
        this.coreAuthService.setJWT(null);
        this.router.navigate(["/auth"], {
          queryParams: {},
        });
      },
      error: (err) => {
        if (environment.consoleLog) console.error("err", err);

        this.router.navigate(["/auth"], {
          queryParams: {},
        });
      },
    });
  }
  // private methods
  private setAuthFromLocalStorage(auth: TokenJWTModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.accessToken) {
      return true;
    }
    return false;
  }

  selectLanguage(lang: string): Observable<TokenInfoType> {
    this.isLoadingSubject.next(true);
    var model: AuthRefreshTokenModel = {
      lang: lang,
      refreshToken: this.coreAuthService.getJWT()?.refreshToken,
      userId: this.currentUserValue.access.userId,
      siteId: this.currentUserValue.access.siteId,
      userAccessAdminAllowToProfessionalData:
        this.currentUserValue.access.userAccessAdminAllowToProfessionalData,
      userAccessAdminAllowToAllData:
        this.currentUserValue.access.userAccessAdminAllowToAllData,
    };
    return this.coreAuthService.ServiceRefreshToken(model).pipe(
      map((auth: ErrorExceptionResult<TokenJWTModel>) => {
        if (auth) {
          const result = this.setAuthFromLocalStorage(auth.item);
          this.callRefreshToken(auth.item);
          return result;
        }
        return of(undefined);
      }),
      switchMap(() => this.getTokenInfoType()),
      catchError((err) => {
        if (environment.consoleLog) console.error("err", err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }
  diffSecondsSubscribe: Subscription;
  private callRefreshToken(model: TokenJWTModel): void {
    if (this.diffSecondsSubscribe) this.diffSecondsSubscribe.unsubscribe();
    var diffSeconds =
      new Date(model.tokenExpireDate).getTime() - new Date().getTime();
    if (diffSeconds > 100000) diffSeconds = diffSeconds - 100000;
    console.log("token expire seconds", diffSeconds);
    this.diffSecondsSubscribe = interval(diffSeconds).subscribe((x) => {
      this.refreshToken();
    });
  }
  refreshToken(
    model?: AuthRefreshTokenModel,
  ): Observable<ErrorExceptionResult<TokenInfoType>> {
    this.isLoadingSubject.next(true);
    return this.coreAuthService.ServiceRefreshToken(model).pipe(
      map((auth: ErrorExceptionResult<TokenJWTModel>) => {
        if (auth) {
          const result = this.setAuthFromLocalStorage(auth.item);
          return result;
        }
        return of(undefined);
      }),
      switchMap(() => this.getTokenInfo()),
      catchError((err) => {
        if (environment.consoleLog) console.error("err", err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    if (this.diffSecondsSubscribe) this.diffSecondsSubscribe.unsubscribe();
  }
}
