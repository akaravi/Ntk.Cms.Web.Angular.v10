import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AuthRefreshTokenModel,
  CoreAuthV3Service,
  CoreSiteModel,
  TokenInfoModelV3,
  TokenJWTModel
} from 'ntk-cms-api';
import { catchError, map, Subscription, switchMap } from 'rxjs';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { CmsAuthService } from 'src/app/core/services/cmsAuth.service';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';

@Component({
  selector: 'app-cms-token-access',
  templateUrl: './cmsTokenAccess.component.html',
  standalone: false
})
export class CmsTokenAccessComponent implements OnInit, OnDestroy {
  static nextId = 0;
  id = ++CmsTokenAccessComponent.nextId;
  constructor(
    public coreAuthService: CoreAuthV3Service,
    public translate: TranslateService,
    private cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    private cmsAuthService: CmsAuthService,
  ) {
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.cdr.detectChanges();
    }
    this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.tokenInfo = value;
      this.cdr.detectChanges();
    });
  }

  tokenInfo: TokenInfoModelV3 = new TokenInfoModelV3();
  loadingStatus = false;
  disabledAllow = false;
  inputSiteId?: number;
  inputUserId?: number;
  cmsApiStoreSubscribe: Subscription;

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }
  onActionButtonUserAccessAdminAllowToAllData(): void {
    const authModel: AuthRefreshTokenModel = new AuthRefreshTokenModel();
    const NewToall = !this.tokenInfo?.access?.userAccessAdminAllowToAllData;
    authModel.userAccessAdminAllowToProfessionalData = this.tokenInfo?.access?.userAccessAdminAllowToProfessionalData;
    authModel.userAccessAdminAllowToAllData = NewToall;
    authModel.siteId = this.tokenInfo?.access?.siteId;
    authModel.userId = this.tokenInfo?.access?.userId;
    authModel.lang = this.tokenInfo?.access?.language;

    const title = this.translate.instant('TITLE.Information');
    let message = '';
    if (authModel.userAccessAdminAllowToAllData) {
      message = this.translate.instant('MESSAGE.Request_to_access_all_information_has_been_sent_to_the_server');
    } else {
      message = this.translate.instant('MESSAGE.Request_to_terminate_access_to_all_information_has been_sent_to_the_server');
    }
    if (this.cmsToastrService) this.cmsToastrService.toastr.info(message, title);
    this.loadingStatus = true;
    this.disabledAllow = true;

    this.cmsAuthService.refreshToken(authModel).subscribe({
      next: (ret) => {
        this.loadingStatus = false;
        this.disabledAllow = false;
        if (ret) {
          const etitle = this.translate.instant('TITLE.Information');
          let emessage = '';
          if (ret.item.access.userAccessAdminAllowToAllData === NewToall) {
            emessage = this.translate.instant('MESSAGE.Access_is_approved');
            if (this.cmsToastrService) this.cmsToastrService.toastr.success(emessage, etitle);
          } else {
            emessage = this.translate.instant('MESSAGE.New_access_not_approved');
            if (this.cmsToastrService) this.cmsToastrService.toastr.warning(emessage, etitle);
          }
        } else {
          if (this.cmsToastrService) this.cmsToastrService.typeErrorAccessChange(ret.errorMessage);
        }
      },
      error: (er) => {
        this.loadingStatus = false;
        this.disabledAllow = false;
        if (this.cmsToastrService) this.cmsToastrService.typeErrorAccessChange(er);
      }
    }
    );
  }

  onActionButtonUserAccessAdminAllowToProfessionalData(): void {
    const authModel: AuthRefreshTokenModel = new AuthRefreshTokenModel();
    const NewToPerf = !this.tokenInfo?.access?.userAccessAdminAllowToProfessionalData;
    authModel.userAccessAdminAllowToProfessionalData = NewToPerf;
    authModel.userAccessAdminAllowToAllData = this.tokenInfo?.access?.userAccessAdminAllowToAllData;
    authModel.siteId = this.tokenInfo?.access?.siteId;
    authModel.userId = this.tokenInfo?.access?.userId;
    authModel.lang = this.tokenInfo?.access?.language;

    const title = this.translate.instant('TITLE.Information');
    let message = '';
    if (authModel.userAccessAdminAllowToProfessionalData) {
      message = this.translate.instant('MESSAGE.Request_for_professional_access_to_the_server_has_been_sent');
    } else {
      message = this.translate.instant('MESSAGE.Request_to_terminate_professional_access_has_been_sent_to_the_server');
    }
    if (this.cmsToastrService) this.cmsToastrService.toastr.info(message, title);
    this.loadingStatus = true;
    this.disabledAllow = true;
    this.cmsAuthService.refreshToken(authModel).subscribe({
      next: (ret) => {
        this.loadingStatus = false;
        this.disabledAllow = false;
        if (ret.isSuccess) {
          const etitle = this.translate.instant('TITLE.Information');
          if (ret.item.access.userAccessAdminAllowToProfessionalData === NewToPerf) {
            const emessage = this.translate.instant('MESSAGE.Access_is_approved');
            if (this.cmsToastrService) this.cmsToastrService.toastr.success(emessage, etitle);
          } else {
            const emessage = this.translate.instant('MESSAGE.New_access_not_approved');
            if (this.cmsToastrService) this.cmsToastrService.toastr.warning(emessage, etitle);
          }
        } else {
          if (this.cmsToastrService) this.cmsToastrService.typeErrorAccessChange(ret.errorMessage);
        }
      },
      error: (er) => {
        this.loadingStatus = false;
        this.disabledAllow = false;
        if (this.cmsToastrService) this.cmsToastrService.typeErrorAccessChange(er);
      }
    }
    );
  }

  onActionButtonSelectUser(): void {
    if (this.inputUserId === this.tokenInfo?.access?.userId) {
      const etitle = this.translate.instant('TITLE.Warrning');
      const emessage = this.translate.instant('MESSAGE.The_ID_of_this_website_is_the_same_as_the_website_you_are_on');
      if (this.cmsToastrService) this.cmsToastrService.toastr.warning(emessage, etitle);
      return;
    }
    const authModel: AuthRefreshTokenModel = new AuthRefreshTokenModel();
    authModel.userAccessAdminAllowToProfessionalData = this.tokenInfo?.access?.userAccessAdminAllowToProfessionalData;
    authModel.userAccessAdminAllowToAllData = this.tokenInfo?.access?.userAccessAdminAllowToAllData;
    authModel.siteId = this.tokenInfo?.access?.siteId;
    authModel.userId = this.inputUserId;
    authModel.lang = this.tokenInfo?.access?.language;


    var title = "";
    var message = "";
    this.translate.get(['TITLE.Information', 'MESSAGE.Request_to_change_site_was_sent_to_the_server']).subscribe((str: string) => {
      title = str['TITLE.Information'];
      message = str['MESSAGE.Request_to_change_site_was_sent_to_the_server'] + '?';
    });

    if (this.cmsToastrService) this.cmsToastrService.toastr.info(message, title);
    this.loadingStatus = true;
    this.cmsAuthService.refreshToken(authModel).subscribe(
      {
        next: (ret) => {
          this.loadingStatus = false;
          if (ret.isSuccess) {
            if (ret.item.access.userId === +this.inputUserId) {

              if (this.cmsToastrService) this.cmsToastrService.toastr.success(this.translate.instant('MESSAGE.Access_to_the_new_user_has_been_approved'), title);
              this.inputSiteId = null;
              this.inputUserId = null;
            } else {
              if (this.cmsToastrService) this.cmsToastrService.toastr.warning(this.translate.instant('MESSAGE.Access_to_the_new_user_was_not_approved'), title);
            }
          } else {
            if (this.cmsToastrService) this.cmsToastrService.typeErrorAccessChange(ret.errorMessage);
          }
        },
        error: (err) => {
          this.loadingStatus = false;
          if (this.cmsToastrService) this.cmsToastrService.typeErrorAccessChange(err);
        }
      }
    );
  }

  onActionButtonSelectSite(): void {
    if (this.inputSiteId === this.tokenInfo?.access?.siteId) {
      const etitle = this.translate.instant('TITLE.Warrning');
      const emessage = this.translate.instant('MESSAGE.The_ID_of_this_website_is_the_same_as_the_website_you_are_on');
      if (this.cmsToastrService) this.cmsToastrService.toastr.warning(emessage, etitle);
      return;
    }
    const authModel: AuthRefreshTokenModel = new AuthRefreshTokenModel();
    authModel.userAccessAdminAllowToProfessionalData = this.tokenInfo?.access?.userAccessAdminAllowToProfessionalData;
    authModel.userAccessAdminAllowToAllData = this.tokenInfo?.access?.userAccessAdminAllowToAllData;
    authModel.userId = this.tokenInfo?.access?.userId;
    authModel.siteId = this.inputSiteId;
    authModel.lang = this.tokenInfo?.access?.language;


    var title = "";
    var message = "";
    this.translate.get(['TITLE.Information', 'MESSAGE.Request_to_change_site_was_sent_to_the_server']).subscribe((str: string) => {
      title = str['TITLE.Information'];
      message = str['MESSAGE.Request_to_change_site_was_sent_to_the_server'] + '?';
    });

    if (this.cmsToastrService) this.cmsToastrService.toastr.info(message, title);
    this.loadingStatus = true;
    this.cmsAuthService.refreshToken(authModel).subscribe({
      next: (ret) => {
        this.loadingStatus = false;
        if (ret.isSuccess) {
          if (ret.item.access.siteId === +this.inputSiteId) {
            if (this.cmsToastrService) this.cmsToastrService.toastr.success(this.translate.instant('MESSAGE.New_site_acess_confirmed'), title);
            this.inputSiteId = null;
            this.inputUserId = null;
          } else {
            if (this.cmsToastrService) this.cmsToastrService.toastr.warning(this.translate.instant('ERRORMESSAGE.MESSAGE.New_site_acess_denied'), title);
          }
        } else {
          this.inputSiteId = this.tokenInfo?.access?.siteId;
          if (this.cmsToastrService) this.cmsToastrService.typeErrorAccessChange(ret.errorMessage);
        }

      },
      error: (err) => {
        this.loadingStatus = false;
        if (this.cmsToastrService) this.cmsToastrService.typeErrorAccessChange(err);
      }
    }
    );
  }
  onActionSiteSelect(model: CoreSiteModel): void {
    if (model && model.id > 0) {
      if (model.id !== this.tokenInfo?.access?.siteId) {
        this.inputSiteId = model.id;
        this.onActionButtonSelectSite();
      }
    }
  }
}
