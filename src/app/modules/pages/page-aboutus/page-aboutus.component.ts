import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CoreSiteModel, CoreSiteService, ErrorExceptionResult, TokenInfoModelV3 } from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { PageInfoService } from 'src/app/core/services/page-info.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-aboutus',
  templateUrl: './page-aboutus.component.html',
  standalone: false
})
export class PageAboutusComponent implements OnInit {

  constructorInfoAreaId = this.constructor.name;
  constructor(public pageInfo: PageInfoService,
    public translate: TranslateService,
    private tokenHelper: TokenHelper,
    private coreSiteService: CoreSiteService,
    private cmsToastrService: CmsToastrService,
    private cmsStoreService: CmsStoreService,
    public publicHelper: PublicHelper,
  ) {

    this.tokenInfo = this.cmsStoreService.getStateSnapshot().tokenInfoStore;
    if (this.tokenInfo.access?.siteId > 0)
      this.SiteInfo(this.tokenInfo.access?.siteId);
    else
      this.SiteInfo(0);

    this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.tokenInfo = value;
      if (this.tokenInfo.access?.siteId > 0)
        this.SiteInfo(this.tokenInfo.access?.siteId);
      else
        this.SiteInfo(0);
    });

  }
  cmsApiStoreSubscribe: Subscription;
  tokenInfo = new TokenInfoModelV3();

  dataModelResult: ErrorExceptionResult<CoreSiteModel> = new ErrorExceptionResult<CoreSiteModel>();
  loadDemoTheme = environment.loadDemoTheme;
  ngOnInit(): void {
    this.translate.get('ACTION.ABOUT').subscribe((str: string) => { this.pageInfo.updateTitle(str); });
  }
  ngOnDestroy(): void {
    this.cmsApiStoreSubscribe.unsubscribe();
  }
  SiteInfo(linkSiteId: number): void {
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.coreSiteService.ServiceMasterSiteInfo(linkSiteId).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModelResult = ret;
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
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
