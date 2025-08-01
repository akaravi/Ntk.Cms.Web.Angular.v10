import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { IApiCmsServerBase, TokenInfoModelV3 } from 'ntk-cms-api';
import { Observable, Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ContentInfoModel } from 'src/app/core/models/contentInfoModel';
import { PageLinkModel } from 'src/app/core/models/pageLinkModel';
import { ThemeStoreModel } from 'src/app/core/models/themeStoreModel';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { PageInfoService } from 'src/app/core/services/page-info.service';
import { ThemeModeType, ThemeService } from 'src/app/core/services/theme.service';
import { CmsDataCommentComponent } from 'src/app/shared/cms-data-comment/cms-data-comment.component';
import { CmsDataMemoComponent } from 'src/app/shared/cms-data-memo/cms-data-memo.component';
import { CmsDataPinComponent } from 'src/app/shared/cms-data-pin/cms-data-pin.component';
import { CmsDataTaskComponent } from 'src/app/shared/cms-data-task/cms-data-task.component';
import { CmsShowKeyComponent } from 'src/app/shared/cms-show-key/cms-show-key.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
  standalone: false
})
export class HeaderBarComponent implements OnInit {

  constructor(
    public tokenHelper: TokenHelper,
    public publicHelper: PublicHelper,
    private themeService: ThemeService,
    private pageInfoService: PageInfoService,
    private cmsStoreService: CmsStoreService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        //do something on start activity

      }
      if (event instanceof NavigationError) {
        // Handle error
        console.error(event.error);
      }

      if (event instanceof NavigationEnd) {
        //do something on end activity
        this.contentService = null;
      }
    });
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    this.unsubscribe.push(this.cmsStoreService.getState((state) => state.themeStore).subscribe(async (value) => {
      this.themeStore = value;
    }));
    this.unsubscribe.push(this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.tokenInfo = value;
    }));
  }

  cmsApiStoreSubscribe: Subscription;
  tokenInfo = new TokenInfoModelV3();
  themeStore = new ThemeStoreModel();
  title$: Observable<string>;
  description$: Observable<string>;
  bc$: Observable<Array<PageLinkModel>>;
  contentService: IApiCmsServerBase;
  contentInfo: ContentInfoModel;
  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    this.title$ = this.pageInfoService.title.asObservable();
    this.description$ = this.pageInfoService.description.asObservable();
    this.bc$ = this.pageInfoService.breadcrumbs.asObservable();

    this.pageInfoService.contentService.asObservable().subscribe({
      next: (ret) => {
        this.contentService = ret;
        this.cdr.detectChanges();
      }
    });
    this.pageInfoService.contentInfo.asObservable().subscribe({
      next: (ret) => {
        this.contentInfo = ret;
        this.cdr.detectChanges();
      }
    });
  }
  ngOnDestroy() {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
    if (this.unsubscribe)
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  get rootClass() {
    if (this.themeStore.themeDirection === 'ltr')
      return 'theme-direction-rtl';
    else
      return 'theme-direction-ltr'
  }
  get leftToRightClass(){
    if (this.themeStore.themeDirection === 'ltr')
      return 'left';
    else
      return 'right';
  }
  get rightToleftClass(){
    if (this.themeStore.themeDirection === 'ltr')
      return 'right';
    else
    return 'left';
  }
  onActionThemeSwitch(themeMode: ThemeModeType) {
    this.themeService.updateThemeModeType(themeMode);
  }
  onActionButtonMemo(): void {
    //open popup
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-wide';

    const dialogRef = this.dialog.open(CmsDataMemoComponent, {
      height: "70%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {
        service: this.contentService,
        id: this.contentInfo?.id,
        title: this.contentInfo?.title
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
    //open popup
  }
  onActionButtonPin(): void {
    //open popup
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-wide';

    const dialogRef = this.dialog.open(CmsDataPinComponent, {
      height: "70%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {
        service: this.contentService,
        id: this.contentInfo?.id,
        title: this.contentInfo?.title
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
    //open popup
  }
  onActionButtonTask(): void {

    //open popup
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-wide';
    const dialogRef = this.dialog.open(CmsDataTaskComponent, {
      height: "70%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {
        service: this.contentService,
        id: this.contentInfo?.id,
        title: this.contentInfo?.title
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
    //open popup
  }
  onActionButtonComment(): void {
    //open popup
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-wide';
    const dialogRef = this.dialog.open(CmsDataCommentComponent, {
      height: "70%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {
        service: this.contentService,
        id: this.contentInfo?.id,
        title: this.contentInfo?.title
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
    //open popup
  }
  onActionButtonShowKey(): void {
    if (!this.contentInfo || this.contentInfo.id?.length == 0)
      return;
    //open popup

    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(CmsShowKeyComponent, {
      height: "70%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {
        service: this.contentService,
        id: this.contentInfo?.id,
        title: this.contentInfo?.title,
        contentUrl: this.contentInfo?.contentUrl
      },
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
    //open popup
  }
}
