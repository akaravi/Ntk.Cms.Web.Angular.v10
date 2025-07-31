
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AuthRefreshTokenModel,
  CoreAuthV3Service,
  CoreSiteModel,
  CoreSiteService,
  FilterModel,
  TokenInfoModelV3
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { WidgetContentInfoModel, WidgetInfoModel } from 'src/app/core/models/widget-info-model';
import { PersianCalendarService } from 'src/app/core/pipe/persian-date/persian-date.service';
import { CmsAuthService } from 'src/app/core/services/cmsAuth.service';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';


@Component({
  selector: 'app-core-site-widget-status',
  templateUrl: './widget.component.html',
  standalone: false
})
export class CoreSiteWidgetStatusComponent implements OnInit, OnDestroy {
  tokenInfoModel = new TokenInfoModelV3();
  filteModelContent = new FilterModel();

  widgetInfoModel = new WidgetInfoModel();
  cmsApiStoreSubscribe: Subscription;
  indexTheme = ['symbol-light-success', 'symbol-light-warning', 'symbol-light-danger', 'symbol-light-info', 'symbol-light-info', 'symbol-light-info'];


  constructorInfoAreaId = this.constructor.name;
  constructor(
    private service: CoreSiteService,
    public translate: TranslateService,
    private persianCalendarService: PersianCalendarService,
    private cmsToastrService: CmsToastrService,
    private cmsAuthService: CmsAuthService,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
  ) { }
  ngOnInit(): void {
    this.widgetInfoModel.title = 'TITLE.ACTIVE.SYSTEM :';
    this.widgetInfoModel.description = 'TITLE.SUMMARY_SYSTEM_DESCRIPTION';
    this.widgetInfoModel.link = '/core/site';

    this.tokenInfoModel = this.cmsStoreService.getStateAll.tokenInfoStore;

    setTimeout(() => {

      this.onActionStatist();
    }, 1000);

    this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.tokenInfoModel = value;
      this.onActionStatist();
    });


  }

  onActionButtonReload(): void {
    this.onActionStatist();
  }

  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }

  }

  onActionStatist(): void {
    if (!this.tokenInfoModel.access.siteId || this.tokenInfoModel.access.siteId <= 0) {
      return;
    }
    this.widgetInfoModel.link = '/core/site/edit/' + this.tokenInfoModel.access.siteId;
    this.widgetInfoModel.setItem(new WidgetContentInfoModel('Id', 0, 0, '', '', this.tokenInfoModel.access.siteId + ''));
    this.widgetInfoModel.setItem(new WidgetContentInfoModel('Title', 1, 0, '', '', '...'));
    this.widgetInfoModel.setItem(new WidgetContentInfoModel('Domain', 2, 0, '', '', '...'));
    this.widgetInfoModel.setItem(new WidgetContentInfoModel('Sub Domain', 3, 0, '', '', '...'));
    this.widgetInfoModel.setItem(new WidgetContentInfoModel('Created Date', 4, 0, '', '', '...'));
    this.widgetInfoModel.setItem(new WidgetContentInfoModel('Expire Date', 5, 0, '', '', '...'));
    this.service.ServiceGetOneById(this.tokenInfoModel.access.siteId).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.widgetInfoModel.setItem(new WidgetContentInfoModel('Title', 1, 0, '', '', ret.item.title));
          this.widgetInfoModel.setItem(new WidgetContentInfoModel('Domain', 2, 0, '', '', ret.item.domain));
          this.widgetInfoModel.setItem(new WidgetContentInfoModel('Sub Domain', 3, 0, '', '', ret.item.subDomain));
          this.widgetInfoModel.setItem(new WidgetContentInfoModel('Created Date', 4, 0, '', '', this.persianCalendarService.PersianCalendar(ret.item.createdDate)));
          if (ret.item.expireDate) {
            this.widgetInfoModel.setItem(new WidgetContentInfoModel('Expire Date', 5, 0, '', '', this.persianCalendarService.PersianCalendar(ret.item.expireDate)));
          }
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
      },
      error: (er) => {
      }
    }
    );

  }
  onActionSiteSelect(model: CoreSiteModel): void {
    if (model && model.id > 0) {
      // this.inputSiteId = model.id;
      if (model.id !== this.tokenInfoModel.access.siteId) {
        if (model.id === this.tokenInfoModel.access.siteId) {
          this.translate.get([ 'MESSAGE.The_ID_of_this_website_is_the_same_as_the_website_you_are_on','TITLE.Warrning']).subscribe((str: string[]) => {
            this.cmsToastrService.toastr.warning(str[0], str[1]);
          });
          return;
        }
        const authModel: AuthRefreshTokenModel = new AuthRefreshTokenModel();
        authModel.userAccessAdminAllowToProfessionalData = this.tokenInfoModel.access.userAccessAdminAllowToProfessionalData;
        authModel.userAccessAdminAllowToAllData = this.tokenInfoModel.access.userAccessAdminAllowToAllData;
        authModel.userId = this.tokenInfoModel.access.userId;
        authModel.siteId = model.id;
        authModel.lang = this.tokenInfoModel.access.language;

        var title = "";
        var message = "";
        this.translate.get(['TITLE.Information', 'MESSAGE.Request_to_change_site_was_sent_to_the_server']).subscribe((str: string) => {
          title = str['TITLE.Information'];
          message = str['MESSAGE.Request_to_change_site_was_sent_to_the_server'] + '?';
          this.cmsToastrService.toastr.info(message, title);
        });


        this.cmsAuthService.refreshToken(authModel).subscribe({
          next: (ret) => {
            if (ret.isSuccess) {
              if (ret.item.access.siteId === +model.id) {
                this.translate.get('MESSAGE.New_site_acess_confirmed').subscribe((str: string) => {
          this.cmsToastrService.toastr.success(str, title);
        });

              } else {
                this.translate.get('ERRORMESSAGE.MESSAGE.New_site_acess_denied').subscribe((str: string) => {
          this.cmsToastrService.toastr.warning(str, title);
        });
              }
            } else {
              this.cmsToastrService.typeErrorAccessChange(ret.errorMessage);
            }

          },
          error: (er) => {
            this.cmsToastrService.typeErrorAccessChange(er);
          }
        }
        );
      }
    }
  }
}
