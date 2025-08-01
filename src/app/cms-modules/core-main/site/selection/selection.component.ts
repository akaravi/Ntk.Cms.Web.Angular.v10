
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  AuthRefreshTokenModel,
  CoreAuthV3Service,
  CoreSiteUserModel,
  CoreSiteUserService,
  ErrorExceptionResult,
  FilterModel,
  FormInfoModel
} from 'ntk-cms-api';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { CmsTranslationService } from 'src/app/core/i18n/cmsTranslation.service';
import { CmsImageThumbnailPipe } from 'src/app/core/pipe/cms-image-thumbnail.pipe';
import { CmsToastrService } from '../../../../core/services/cmsToastr.service';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsAuthService } from 'src/app/core/services/cmsAuth.service';


@Component({
    selector: 'app-site-selection',
    templateUrl: './selection.component.html',
    styleUrls: ['./selection.component.scss'],
    standalone: false
})
export class CoreSiteSelectionComponent implements OnInit {

  constructorInfoAreaId = this.constructor.name;
  constructor(
    private cmsAuthService: CmsAuthService,
    private cmsTranslationService: CmsTranslationService,
    private coreSiteUserService: CoreSiteUserService,
    private cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public tokenHelper: TokenHelper,
    private router: Router,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;


    if (localStorage.getItem(this.SELECT_SITE_LOCAL_STORAGE_KEY)) {
      this.lastSelectSiteId = localStorage.getItem(this.SELECT_SITE_LOCAL_STORAGE_KEY).split(',').map(function (item) {
        return parseInt(item, 10);
      });
    }

  }
  cmsImageThumbnailPipe = new CmsImageThumbnailPipe();



  today = new Date();
  filterModel = new FilterModel();
  dataModelResult: ErrorExceptionResult<CoreSiteUserModel>;
  formInfo: FormInfoModel = new FormInfoModel();
  statusCheckExistWebSite = true;
  selectSiteId = 0;
  SELECT_SITE_LOCAL_STORAGE_KEY = 'lastSelectSiteId';
  lastSelectSiteId: number[] = [];
  ngOnInit(): void {
    // this.dataModel = this.activatedRoute.snapshot.data.list;
    this.DataGetAll();
  }
  DataGetAll(): void {
    const pName = this.constructor.name + 'ServiceGetAll';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.coreSiteUserService.ServiceGetAllSiteCurrentUser().subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.statusCheckExistWebSite = false;
          if (this.dataModelResult.listItems?.length === 1) {
            setTimeout(() => {
              this.onActionClickSelectSite(this.dataModelResult.listItems[0].linkSiteId);
            }, 1000);
          }
          else if (this.lastSelectSiteId && this.lastSelectSiteId.length > 0) {
            this.lastSelectSiteId.forEach(element => {
              const indexId = this.dataModelResult.listItems.findIndex(x => x.linkSiteId == element);
              if (indexId > 0) {
                const to = 0;
                this.dataModelResult.listItems.splice(to, 0, this.dataModelResult.listItems.splice(indexId, 1)[0]);
              }
            });

          }
        }
        else {
          this.cmsToastrService.typeError(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);

      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      }
    }
    );
  }
  onActionClickSelectSite(id: number): void {
    if (!this.formInfo.buttonSubmittedEnabled) {
      return;
    }
    this.selectSiteId = id;
    this.formInfo.buttonSubmittedEnabled = false;
    let authModel: AuthRefreshTokenModel;
    authModel = new AuthRefreshTokenModel();
    authModel.siteId = id;
    authModel.lang = this.cmsTranslationService.getSelectedLanguage;


    const pName = this.constructor.name + '.ServiceRefreshToken';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.cmsAuthService.refreshToken(authModel).subscribe({
      next: (res) => {
        if (res.isSuccess && res.item.access.siteId > 0) {
          this.cmsToastrService.typeSuccessSelected();
          this.publicHelper.processService.processStop(pName);
          setTimeout(() => this.router.navigate(['/']), 5000);
          /**Select Site */
          if (!this.lastSelectSiteId)
            this.lastSelectSiteId = [];
          const indexId = this.lastSelectSiteId.findIndex(x => x == res.item.access.siteId);
          if (indexId >= 0)
            this.lastSelectSiteId.splice(indexId, 1);
          this.lastSelectSiteId.push(res.item.access.siteId);
          localStorage.setItem(this.SELECT_SITE_LOCAL_STORAGE_KEY, this.lastSelectSiteId + '');
          /**Select Site */
        }
        else {
          this.cmsToastrService.typeErrorSelected();
          this.formInfo.buttonSubmittedEnabled = true;
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.formInfo.buttonSubmittedEnabled = true;
        this.publicHelper.processService.processStop(pName);
      }
    }
    );

  }

  onActionAddFirstSite(model: ErrorExceptionResult<any>): void {
    if (model.isSuccess) {
      let authModel: AuthRefreshTokenModel;
      authModel = new AuthRefreshTokenModel();

      const pName = this.constructor.name + '.onActionAddFirstSite';
      this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
        this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
      });

      this.cmsAuthService.refreshToken(authModel).subscribe({
        next: (ret) => {
          if (ret.isSuccess) {

            setTimeout(() => this.router.navigate(['/dashboard/']), 5000);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.publicHelper.processService.processStop(pName, false);
        }
      }
      );
    }
  }
}
