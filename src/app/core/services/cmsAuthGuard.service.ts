import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CmsAuthService } from './cmsAuth.service';
import { CmsStoreService } from '../reducers/cmsStore.service';

@Injectable({
  providedIn: 'root'
})
export class CmsAuthGuard {
  constructor(
    private cmsStoreService: CmsStoreService,
    private authService: CmsAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.cmsStoreService.getStateAll.tokenInfoStore && this.cmsStoreService.getStateAll.tokenInfoStore.access?.userId > 0) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.authService.logout();
    return false;
  }
}
