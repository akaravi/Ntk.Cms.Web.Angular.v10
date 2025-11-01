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
export class CmsAuthGuard {
  constructor(
    private cmsStoreService: CmsStoreService,
    private authService: CoreAuthV3Service,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.cmsStoreService.getStateAll.tokenInfoStore &&
      this.cmsStoreService.getStateAll.tokenInfoStore.access?.userId > 0
    ) {
      if (this.authService.getJWT()?.accessToken?.length > 0) return true;
    }
    setTimeout(() => {
      this.router.navigate(["/auth/signout"], {
        queryParams: {},
      });
    }, 10);
    return false;
  }
}
