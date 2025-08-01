import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CoreAuthV3Service, CoreCpMainMenuModel, CoreCpMainMenuService, ErrorExceptionResult, TokenInfoModelV3 } from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ThemeStoreModel } from 'src/app/core/models/themeStoreModel';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { SET_CpMain_Menu } from 'src/app/core/reducers/reducer.factory';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { ThemeModeType, ThemeService } from 'src/app/core/services/theme.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-main',
  templateUrl: './menu-main.component.html',
  standalone: false
})
export class MenuMainComponent implements OnInit {
  env = environment;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public tokenHelper: TokenHelper,
    public publicHelper: PublicHelper,
    private cmsToastrService: CmsToastrService,
    public coreAuthService: CoreAuthV3Service,
    private coreCpMainMenuService: CoreCpMainMenuService,
    private cmsStoreService: CmsStoreService,
    private router: Router,
    public translate: TranslateService,
    public themeService: ThemeService,
    private cdr: ChangeDetectorRef,) {
    this.publicHelper.processService.cdr = this.cdr;

    this.tokenInfo = this.cmsStoreService.getStateSnapshot().tokenInfoStore;
    if (this.tokenInfo && this.tokenInfo?.access?.userId > 0 && this.tokenInfo?.access?.siteId > 0)
      this.DataGetCpMenu();

    this.unsubscribe.push(this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.tokenInfo = value;
      if (this.tokenInfo && this.tokenInfo?.access?.userId > 0 && this.tokenInfo?.access?.siteId > 0) {
        this.DataGetCpMenu();
      }
    }));
    this.unsubscribe.push(this.cmsStoreService.getState((state) => state.themeStore).subscribe(async (value) => {
      this.themeStore = value;
    }));
  }
  appAngularVersion: string = environment.appVersion;
  get rootClass(): string {
    var ret = '';
    if (this.themeStore.dataMenu === 'menu-main')
      ret = 'menu-active ';
    if (this.themeStore.themeDirection === 'ltr')
      ret = ret + ' menu menu-box-left rounded-0';
    else
      ret = ret + ' menu menu-box-right rounded-0'

    return ret;
  }
  get faAngleleftClass() {
    if (this.themeStore.themeDirection === 'ltr')
      return 'fa fa-angle-right';
    else
      return 'fa fa-angle-left'
  }

  tokenInfo = new TokenInfoModelV3();
  cmsApiStoreSubscribe: Subscription;
  dataModelResult: ErrorExceptionResult<CoreCpMainMenuModel> = new ErrorExceptionResult<CoreCpMainMenuModel>();
  themeStore = new ThemeStoreModel();
  private unsubscribe: Subscription[] = [];
  ngOnInit(): void { }
  ngOnDestroy() {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
    if (this.unsubscribe)
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  DataGetCpMenu(): void {
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.get_information_list').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    this.coreCpMainMenuService.ServiceGetAllMenu(null).subscribe({
      next: (ret) => {

        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.cmsStoreService.setState({ type: SET_CpMain_Menu, payload: ret });
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
  onActionCleanDataMenu(routerAddress: string = ''): void {
    if (routerAddress?.length > 0)
      this.router.navigate([routerAddress]);
    this.themeService.cleanDataMenu();
  }
  onActionClickMenu(item: CoreCpMainMenuModel, event?: MouseEvent) {
    // setTimeout(() => {
    //   this.themeStore.dataMenu = '';
    // }, 200);

    if (!item)
      return;
    const pName = this.constructor.name + "menu";
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    if (item.children?.length > 0) {
      //setTimeout(() => {
      if (event?.ctrlKey) {
        window.open('/#/menu/LinkParentId/' + item.id, "_blank");
      } else {
        this.router.navigate(['/menu/LinkParentId/', item.id]);
      }
      this.publicHelper.processService.processStop(pName);
      //}, 100);
      return;
    }
    if (item.routeAddressLink?.length > 0) {
      //setTimeout(() => {
      if (event?.ctrlKey) {
        window.open('/#' + item.routeAddressLink, "_blank");
      } else {
        this.router.navigate([item.routeAddressLink]);
      }
      this.publicHelper.processService.processStop(pName);
      //}, 100);
      return;
    }
  }
  onActionThemeSwitch(themeMode: ThemeModeType) {
    this.themeService.updateThemeModeType(themeMode);
  }

  async onActionLogout() {
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Sign_out_of_user_account').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.cmsToastrService.typeOrderActionLogout();

    this.coreAuthService.ServiceLogout().subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.cmsToastrService.typeSuccessLogout();
          document.location.reload();
        } else {
          this.cmsToastrService.typeErrorLogout();
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (err) => {
        if (this.cmsToastrService) this.cmsToastrService.typeErrorAccessChange(err);
        this.publicHelper.processService.processStop(pName);
      }
    }
    );

  }
}
