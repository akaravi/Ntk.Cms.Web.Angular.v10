import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CmsAuthService } from './cmsAuth.service';
import { CmsStoreService } from '../reducers/cmsStore.service';
import { CoreAuthV3Service } from 'ntk-cms-api';

@Injectable({
  providedIn: 'root'
})
export class CmsAuthGuard {
  constructor(
    private cmsStoreService: CmsStoreService,
    private authService: CoreAuthV3Service,
    private cmsAuthService: CmsAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.cmsStoreService.getStateAll.tokenInfoStore && this.cmsStoreService.getStateAll.tokenInfoStore.access?.userId > 0) {
      if (this.authService.getJWT()?.accessToken?.length > 0)
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.cmsAuthService.logout();
    return false;
  }
}
