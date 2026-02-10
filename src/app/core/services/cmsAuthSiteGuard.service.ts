import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { CoreAuthV3Service } from "ntk-cms-api";
import { ROUTE_AUTH, ROUTE_SELECT_SITE } from "../models/constModel";
import { CmsStoreService } from "../reducers/cmsStore.service";

@Injectable({
  providedIn: "root",
})
export class CmsAuthSiteGuard {
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
      if (this.authService.getJWT()?.accessToken?.length > 0) return true;
    }
    if (
      this.cmsStoreService?.getStateAll?.tokenInfoStore &&
      this.cmsStoreService?.getStateAll?.tokenInfoStore?.access?.userId > 0
    ) {
      if (this.authService.getJWT()?.accessToken?.length > 0)
        this.router.navigate([ROUTE_SELECT_SITE], {
          queryParams: { returnUrl: state.url },
        });
    }
    setTimeout(() => {
      this.router.navigate([ROUTE_AUTH], {
        queryParams: {},
      });
    }, 10);
    return false;
  }
}
