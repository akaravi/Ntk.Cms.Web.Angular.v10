import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { CoreAuthV3Service } from "ntk-cms-api";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ROUTE_SIGNOUT } from "../models/constModel";
import { CmsAuthService } from "../services/cmsAuth.service";
import { CmsToastrService } from "../services/cmsToastr.service";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    public cmsToastrService: CmsToastrService,
    private cmsAuthService: CmsAuthService,
    private coreAuthService: CoreAuthV3Service,
    private translate: TranslateService,
    // public errorDialogService: ErrorDialogService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // check to see if there's internet
    if (!window.navigator.onLine) {
      // if there is no internet, throw a HttpErrorResponse error
      // since an error is thrown, the function will terminate here
      this.cmsToastrService.typeErrorInternetConnection();
      // tslint:disable-next-line: deprecation
      // return Observable.throw(new HttpErrorResponse({ error: 'Internet is required.' }));
      return null;
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          //Error 0
          console.log("خطای برنامه در سرور", error.status, error.error.reason);

          return null;
          //Error 0
        } else if (error.status === 500) {
          //Error 500
          console.log("خطای برنامه در سرور", error.status, error.error.reason);
          this.translate
            .get([
              "ERRORMESSAGE.MESSAGE.typeError500",
              "ERRORMESSAGE.TITLE.typeError500",
            ])
            .subscribe((str: string[]) => {
              this.cmsToastrService.typeErrorMessage(
                str["ERRORMESSAGE.MESSAGE.typeError500"],
                str["ERRORMESSAGE.TITLE.typeError500"],
              );
            });
          return null;
          //Error 500
        } else if (error.status === 401) {
          //Error 401
          const isRefreshingToken = localStorage.getItem("isRefreshingToken");
          if (isRefreshingToken === "true") {
            localStorage.removeItem("isRefreshingToken");
            this.cmsAuthService.logout();
            this.router.navigate([ROUTE_SIGNOUT], {
              queryParams: {},
            });
            return null;
          }
          if (this.coreAuthService.getJWT()?.refreshToken?.length > 0) {
            /** */
            localStorage.setItem("isRefreshingToken", "true");
            this.cmsAuthService.refreshToken().subscribe({
              next: (res) => {
                if (res?.isSuccess) {
                  this.router.navigate(["/dashboard"], {
                    queryParams: {},
                  });
                } else {
                  this.router.navigate(["/auth/login"], {
                    queryParams: {},
                  });
                }
              },
              error: (er) => {
                this.cmsToastrService.typeError(er);
              },
            });
            /** */
          } else {
            this.router.navigate(["/auth"], {
              queryParams: {},
            });
          }
          return null;
          //Error 401
        } else if (error.status === 403) {
          //Error 403
          if (this.coreAuthService.getJWT()?.refreshToken?.length > 0) {
            /** */
            this.cmsAuthService.refreshToken().subscribe({
              next: (res) => {
                if (res?.isSuccess) {
                  this.router.navigate(["/dashboard"], {
                    queryParams: {},
                  });
                } else {
                  this.router.navigate(["/auth/login"], {
                    queryParams: {},
                  });
                }
              },
              error: (er) => {
                this.cmsToastrService.typeError(er);
              },
            });
            /** */
          } else {
            this.router.navigate(["/auth"], {
              queryParams: {},
            });
          }
          return null;
          //Error 403
        } else if (error && error.error && error.error.reason) {
          this.cmsToastrService.typeError(error.status, error.error.reason);
          return null;
        } else {
          this.cmsToastrService.typeError(error.status);
        }

        return throwError(error);
      }),
    );
  }
}
