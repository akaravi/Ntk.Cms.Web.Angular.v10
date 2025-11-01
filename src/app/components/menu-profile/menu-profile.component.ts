import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  AuthRefreshTokenModel,
  CoreAuthV3Service,
  CoreSiteModel,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { ThemeStoreModel } from "src/app/core/models/themeStoreModel";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsAuthService } from "src/app/core/services/cmsAuth.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-menu-profile",
  templateUrl: "./menu-profile.component.html",
  standalone: false,
})
export class MenuProfileComponent implements OnInit {
  static nextId = 0;
  id = ++MenuProfileComponent.nextId;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreAuthService: CoreAuthV3Service,
    public cmsAuthService: CmsAuthService,

    private cmsToastrService: CmsToastrService,
    public translate: TranslateService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,

    private router: Router,
  ) {
    this.tokenInfo = this.cmsStoreService.getStateSnapshot().tokenInfoStore;
    this.cmsApiStoreSubscribe = this.cmsStoreService
      .getState((state) => state.tokenInfoStore)
      .subscribe(async (value) => {
        this.tokenInfo = value;
        Promise.resolve().then(() => this.cdr.detectChanges());
      });
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.themeStore)
        .subscribe(async (value) => {
          this.themeStore = value;
        }),
    );
  }

  cmsApiStoreSubscribe: Subscription;
  tokenInfo: TokenInfoModelV3 = new TokenInfoModelV3();
  inputSiteId?: number;
  inputUserId?: number;
  loadingStatus = false;
  disabledAllow = false;
  themeStore = new ThemeStoreModel();
  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  onActionButtonUserAccessAdminAllowToAllData(): void {
    const authModel: AuthRefreshTokenModel = new AuthRefreshTokenModel();
    const NewToall = !this.tokenInfo.access.userAccessAdminAllowToAllData;
    authModel.userAccessAdminAllowToProfessionalData =
      this.tokenInfo.access.userAccessAdminAllowToProfessionalData;
    authModel.userAccessAdminAllowToAllData = NewToall;
    authModel.siteId = this.tokenInfo.access.siteId;
    authModel.userId = this.tokenInfo.access.userId;
    authModel.lang = this.tokenInfo.access.language;

    if (this.cmsToastrService) {
      const title = "TITLE.Information";
      let message = "";
      if (authModel.userAccessAdminAllowToAllData) {
        message =
          "MESSAGE.Request_to_access_all_information_has_been_sent_to_the_server";
      } else {
        message =
          "MESSAGE.Request_to_terminate_access_to_all_information_has been_sent_to_the_server";
      }
      this.translate.get([title, message]).subscribe((str: string[]) => {
        this.cmsToastrService.toastr.warning(str[message], str[title]);
      });
    }
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.loadingStatus = true;
    this.disabledAllow = true;
    this.cmsAuthService.refreshToken(authModel).subscribe({
      next: (ret) => {
        this.loadingStatus = false;
        this.disabledAllow = false;
        if (ret.isSuccess) {
          const etitle = "TITLE.Information";
          let emessage = "";
          if (ret.item.access.userAccessAdminAllowToAllData === NewToall) {
            emessage = "MESSAGE.Access_is_approved";
            if (this.cmsToastrService) {
              this.translate
                .get([emessage, etitle])
                .subscribe((str: string[]) => {
                  this.cmsToastrService.toastr.success(
                    str[emessage],
                    str[etitle],
                  );
                });
            }
          } else {
            emessage = "MESSAGE.New_access_not_approved";
            if (this.cmsToastrService) {
              this.translate
                .get([emessage, etitle])
                .subscribe((str: string[]) => {
                  this.cmsToastrService.toastr.warning(
                    str[emessage],
                    str[etitle],
                  );
                });
            }
          }
        } else {
          if (this.cmsToastrService)
            this.cmsToastrService.typeErrorAccessChange(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.loadingStatus = false;
        this.disabledAllow = false;
        if (this.cmsToastrService)
          this.cmsToastrService.typeErrorAccessChange(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }

  onActionButtonUserAccessAdminAllowToProfessionalData(): void {
    const authModel: AuthRefreshTokenModel = new AuthRefreshTokenModel();
    const NewToPerf =
      !this.tokenInfo.access.userAccessAdminAllowToProfessionalData;
    authModel.userAccessAdminAllowToProfessionalData = NewToPerf;
    authModel.userAccessAdminAllowToAllData =
      this.tokenInfo.access.userAccessAdminAllowToAllData;
    authModel.siteId = this.tokenInfo.access.siteId;
    authModel.userId = this.tokenInfo.access.userId;
    authModel.lang = this.tokenInfo.access.language;

    const title = "TITLE.Information";
    let message = "";
    if (authModel.userAccessAdminAllowToProfessionalData) {
      message =
        "MESSAGE.Request_for_professional_access_to_the_server_has_been_sent";
    } else {
      message =
        "MESSAGE.Request_to_terminate_professional_access_has_been_sent_to_the_server";
    }
    if (this.cmsToastrService) {
      this.translate.get([message, title]).subscribe((str: string[]) => {
        this.cmsToastrService.toastr.warning(str[message], str[title]);
      });
    }
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.loadingStatus = true;
    this.disabledAllow = true;
    this.cmsAuthService.refreshToken(authModel).subscribe({
      next: (ret) => {
        this.loadingStatus = false;
        this.disabledAllow = false;
        if (ret.isSuccess) {
          const etitle = "TITLE.Information";
          if (
            ret.item.access.userAccessAdminAllowToProfessionalData === NewToPerf
          ) {
            const emessage = "MESSAGE.Access_is_approved";
            if (this.cmsToastrService) {
              this.translate
                .get([emessage, etitle])
                .subscribe((str: string[]) => {
                  this.cmsToastrService.toastr.success(
                    str[emessage],
                    str[etitle],
                  );
                });
            }
          } else {
            const emessage = "MESSAGE.New_access_not_approved";
            if (this.cmsToastrService) {
              this.translate
                .get([emessage, etitle])
                .subscribe((str: string[]) => {
                  this.cmsToastrService.toastr.warning(
                    str[emessage],
                    str[etitle],
                  );
                });
            }
          }
        } else {
          if (this.cmsToastrService)
            this.cmsToastrService.typeErrorAccessChange(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.loadingStatus = false;
        this.disabledAllow = false;
        if (this.cmsToastrService)
          this.cmsToastrService.typeErrorAccessChange(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }

  onActionButtonSelectUser(): void {
    if (this.inputUserId === this.tokenInfo.access.userId) {
      if (this.cmsToastrService) {
        this.translate
          .get([
            "TITLE.Warrning",
            "MESSAGE.The_ID_of_this_website_is_the_same_as_the_website_you_are_on",
          ])
          .subscribe((str: string[]) => {
            this.cmsToastrService.toastr.warning(
              str[
                "MESSAGE.The_ID_of_this_website_is_the_same_as_the_website_you_are_on"
              ],
              str["TITLE.Warrning"],
            );
          });
      }
      return;
    }
    const authModel: AuthRefreshTokenModel = new AuthRefreshTokenModel();
    authModel.userAccessAdminAllowToProfessionalData =
      this.tokenInfo.access.userAccessAdminAllowToProfessionalData;
    authModel.userAccessAdminAllowToAllData =
      this.tokenInfo.access.userAccessAdminAllowToAllData;
    authModel.siteId = this.tokenInfo.access.siteId;
    authModel.userId = this.inputUserId;
    authModel.lang = this.tokenInfo.access.language;

    var title = "";
    var message = "";
    this.translate
      .get([
        "TITLE.Information",
        "MESSAGE.Request_to_change_site_was_sent_to_the_server",
      ])
      .subscribe((str: string) => {
        title = str["TITLE.Information"];
        message =
          str["MESSAGE.Request_to_change_site_was_sent_to_the_server"] + "?";
        if (this.cmsToastrService)
          this.cmsToastrService.toastr.info(message, title);
      });

    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.loadingStatus = true;
    this.cmsAuthService.refreshToken(authModel).subscribe({
      next: (ret) => {
        this.loadingStatus = false;
        if (ret.isSuccess) {
          if (ret.item.access.userId === +this.inputUserId) {
            if (this.cmsToastrService) {
              this.translate
                .get([
                  "MESSAGE.Access_to_the_new_user_has_been_approved",
                  title,
                ])
                .subscribe((str: string[]) => {
                  this.cmsToastrService.toastr.success(
                    str["MESSAGE.Access_to_the_new_user_has_been_approved"],
                    str[title],
                  );
                });
            }
            this.inputSiteId = null;
            this.inputUserId = null;
          } else {
            if (this.cmsToastrService) {
              this.translate
                .get(["MESSAGE.Access_to_the_new_user_was_not_approved", title])
                .subscribe((str: string[]) => {
                  this.cmsToastrService.toastr.success(
                    str["MESSAGE.Access_to_the_new_user_was_not_approved"],
                    str[title],
                  );
                });
            }
          }
        } else {
          if (this.cmsToastrService)
            this.cmsToastrService.typeErrorAccessChange(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (err) => {
        this.loadingStatus = false;
        if (this.cmsToastrService)
          this.cmsToastrService.typeErrorAccessChange(err);
        this.publicHelper.processService.processStop(pName);
      },
    });
  }

  onActionButtonSelectSite(): void {
    if (this.inputSiteId === this.tokenInfo.access.siteId) {
      if (this.cmsToastrService) {
        this.translate
          .get([
            "TITLE.Warrning",
            "MESSAGE.The_ID_of_this_website_is_the_same_as_the_website_you_are_on",
          ])
          .subscribe((str: string[]) => {
            this.cmsToastrService.toastr.warning(
              str[
                "MESSAGE.The_ID_of_this_website_is_the_same_as_the_website_you_are_on"
              ],
              str["TITLE.Warrning"],
            );
          });
      }
      return;
    }
    const authModel: AuthRefreshTokenModel = new AuthRefreshTokenModel();
    authModel.userAccessAdminAllowToProfessionalData =
      this.tokenInfo.access.userAccessAdminAllowToProfessionalData;
    authModel.userAccessAdminAllowToAllData =
      this.tokenInfo.access.userAccessAdminAllowToAllData;
    authModel.userId = this.tokenInfo.access.userId;
    authModel.siteId = this.inputSiteId;
    authModel.lang = this.tokenInfo.access.language;

    var title = "";
    var message = "";
    this.translate
      .get([
        "TITLE.Information",
        "MESSAGE.Request_to_change_site_was_sent_to_the_server",
      ])
      .subscribe((str: string) => {
        title = str["TITLE.Information"];
        message =
          str["MESSAGE.Request_to_change_site_was_sent_to_the_server"] + "?";
        if (this.cmsToastrService)
          this.cmsToastrService.toastr.info(message, title);
      });

    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.loadingStatus = true;
    this.cmsAuthService.refreshToken(authModel).subscribe({
      next: (ret) => {
        this.loadingStatus = false;
        if (ret.isSuccess) {
          if (ret.item.access.siteId === +this.inputSiteId) {
            if (this.cmsToastrService) {
              this.translate
                .get("MESSAGE.New_site_acess_confirmed")
                .subscribe((str: string) => {
                  this.cmsToastrService.toastr.success(str, title);
                });
            }
            this.inputSiteId = null;
            this.inputUserId = null;
          } else {
            if (this.cmsToastrService) {
              this.translate
                .get("MESSAGE.New_site_acess_denied")
                .subscribe((str: string) => {
                  this.cmsToastrService.toastr.warning(str, title);
                });
            }
          }
        } else {
          this.inputSiteId = this.tokenInfo.access.siteId;
          if (this.cmsToastrService)
            this.cmsToastrService.typeErrorAccessChange(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (err) => {
        this.loadingStatus = false;
        if (this.cmsToastrService)
          this.cmsToastrService.typeErrorAccessChange(err);
      },
    });
  }
  onActionSiteSelect(model: CoreSiteModel): void {
    if (model && model.id > 0) {
      if (model.id !== this.tokenInfo.access.siteId) {
        this.inputSiteId = model.id;
        this.onActionButtonSelectSite();
      }
    }
  }
  async onActionLogout() {
    this.router.navigate(["/auth/signout"], {
      queryParams: {},
    });
  }
}
