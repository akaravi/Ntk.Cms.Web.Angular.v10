import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot
} from '@angular/router';
import { CoreAuthV3Service, TokenInfoModelV3 } from 'ntk-cms-api';
import { TokenHelper } from '../helpers/tokenHelper';
import { CmsAuthService } from './cmsAuth.service';
import { CmsStoreService } from '../reducers/cmsStore.service';


@Injectable({
  providedIn: 'root'
})
export class CmsAuthGuardChild implements CanActivateChild {
  constructor(
    private cmsStoreService: CmsStoreService,
    private authService: CoreAuthV3Service,
    private cmsAuthService: CmsAuthService) { }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.cmsStoreService.getStateAll.tokenInfoStore && this.cmsStoreService.getStateAll.tokenInfoStore.access?.userId > 0) {
      if (this.authService.getJWT()?.accessToken?.length > 0)
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.cmsAuthService.logout();
    return false;
  }
}
