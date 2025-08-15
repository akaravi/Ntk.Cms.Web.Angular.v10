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
import { CoreAuthV3Service } from "ntk-cms-api";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { CmsAuthService } from "../services/cmsAuth.service";
import { CmsToastrService } from "../services/cmsToastr.service";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    public cmsToastrService: CmsToastrService,
    private cmsAuthService: CmsAuthService,
    private coreAuthService: CoreAuthV3Service,

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
          this.cmsToastrService.typeError(error.status, error.message);
          return null;
        } else if (error.status === 500) {
          console.log("خطای برنامه نویسی در سرور");
          this.cmsToastrService.typeError(error.status, error.error.reason);
          return null;
        } else if (error.status === 401) {
          if (this.coreAuthService.getJWT()?.refreshToken?.length > 0) {
            /** */
            this.cmsAuthService.refreshToken().subscribe({
              next: (res) => {
                if (!res.isSuccess) {
                  this.cmsAuthService.logout();
                }
              },
              error: (er) => {
                this.cmsToastrService.typeError(er);
                this.cmsAuthService.logout();
              },
            });

            /** */
          } else {
            this.cmsAuthService.logout();
          }
          return null;
        } else if (error.status === 403) {
          if (this.coreAuthService.getJWT()?.refreshToken?.length > 0) {
            /** */
            this.cmsAuthService.refreshToken().subscribe({
              next: (res) => {
                if (!res.isSuccess) {
                  this.cmsAuthService.logout();
                }
              },
              error: (er) => {
                this.cmsToastrService.typeError(er);
                this.cmsAuthService.logout();
              },
            });

            /** */
          } else {
            this.cmsAuthService.logout();
          }
          return null;
        } else if (error && error.error && error.error.reason) {
          this.cmsToastrService.typeError(error.status, error.error.reason);
          return null;
        } else {
          this.cmsToastrService.typeError(error.status);
        }
        // let data = {};
        // data = {
        //   reason: error && error.error && error.error.reason ? error.error.reason : '',
        //   status: error.status
        // };
        // this.errorDialogService.openDialog(data);
        return throwError(error);
      }),
    );
  }
}
