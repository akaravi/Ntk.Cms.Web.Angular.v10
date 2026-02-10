import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { CoreAuthV3Service } from "ntk-cms-api";
import { CmsStoreService } from "../reducers/cmsStore.service";
import { CmsAuthService } from "./cmsAuth.service";
import { ROUTE_AUTH } from "../models/constModel";

@Injectable({
  providedIn: "root",
})
export class CmsAuthGuardChild implements CanActivateChild {
  constructor(
    private cmsStoreService: CmsStoreService,
    private authService: CoreAuthV3Service,
    private router: Router,
  ) {}
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.cmsStoreService.getStateAll.tokenInfoStore &&
      this.cmsStoreService.getStateAll.tokenInfoStore.access?.userId > 0
    ) {
      if (this.authService.getJWT()?.accessToken?.length > 0) return true;
    }
    setTimeout(() => {
      this.router.navigate([ROUTE_AUTH], {
        queryParams: {},
      });
    }, 10);

    return false;
  }
}
