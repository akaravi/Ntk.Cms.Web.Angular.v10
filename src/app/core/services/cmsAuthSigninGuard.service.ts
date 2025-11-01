import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { CoreAuthV3Service } from "ntk-cms-api";
import { CmsStoreService } from "../reducers/cmsStore.service";

@Injectable({
  providedIn: "root",
})
export class CmsAuthSigninGuard {
  constructor(
    private cmsStoreService: CmsStoreService,
    private authService: CoreAuthV3Service,
    private router: Router,
  ) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    if (
      this.cmsStoreService?.getStateAll?.tokenInfoStore &&
      this.cmsStoreService?.getStateAll?.tokenInfoStore?.access?.userId > 0 &&
      this.cmsStoreService?.getStateAll?.tokenInfoStore?.access?.siteId > 0
    ) {
      if (this.authService.getJWT()?.accessToken?.length > 0) {
        setTimeout(() => {
          this.router.navigate(["/dashboard"], {
            queryParams: {},
          });
        }, 10);
        return false;
      }
    }
    if (
      this.cmsStoreService?.getStateAll?.tokenInfoStore &&
      this.cmsStoreService?.getStateAll?.tokenInfoStore?.access?.userId > 0
    ) {
      if (this.authService.getJWT()?.accessToken?.length > 0) {
        setTimeout(() => {
          this.router.navigate(["/core/site/selection"], {
            queryParams: {},
          });
        }, 10);
        return false;
      }
    }
    return true;
  }
}
