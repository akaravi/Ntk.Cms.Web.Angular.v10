import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TokenInfoModelV3 } from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { TokenHelper } from '../helpers/tokenHelper';
import { CmsStoreService } from '../reducers/cmsStore.service';
import { CmsAuthService } from './cmsAuth.service';

@Injectable({
  providedIn: 'root'
})
export class CmsAuthSiteGuard {
  constructor(
    private cmsStoreService: CmsStoreService,
    private authService: CmsAuthService,
    private router: Router) {
  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    if (this.cmsStoreService?.getStateAll?.tokenInfoStore && this.cmsStoreService?.getStateAll?.tokenInfoStore?.access?.userId > 0 && this.cmsStoreService?.getStateAll?.tokenInfoStore?.access?.siteId > 0) {
      return true;
    }
    if (this.cmsStoreService?.getStateAll?.tokenInfoStore && this.cmsStoreService?.getStateAll?.tokenInfoStore?.access?.userId > 0) {
      this.router.navigate(['/core/site/selection'], { queryParams: { returnUrl: state.url } });
    }

    this.authService.logout();
    return false;



  }
  
}
