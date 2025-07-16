import { Routes } from '@angular/router';
import { CmsAuthSiteGuard } from '../core/services/cmsAuthSiteGuard.service';

const CmsModulesRoutes: Routes = [
  // ** cms */
  {
    path: 'core',
    loadChildren: () =>
      import('./core-main/core.module').then((m) => m.CoreModule),
    data: { title: 'ROUTE.CORE' },
  },
  {
    path: 'coremodule',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./core-module/coreModule.module').then(
        (m) => m.CoreModuleModule
      ),
    data: { title: 'ROUTE.COREMODULELOG' },
  },
  {
    path: 'coremodulelog',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./core-module-log/core-module-log.module').then(
        (m) => m.CoreModuleLogModule
      ),
  },
  {
    path: 'coremoduledata',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./core-module-data/core-module-data.module').then(
        (m) => m.CoreModuleDataModule
      ),
  },
  {
    path: 'coretoken',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./core-token/core-token.module').then(
        (m) => m.CoreTokenModule
      ),
  },
  {
    path: 'corelog',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./core-log/coreLog.module').then(
        (m) => m.CoreLogModule
      ),
  },
  {
    path: 'estate',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./estate/estate.module').then((m) => m.EstateModule),
    data: { title: 'ROUTE.ESTATE' },
  },

  {
    path: 'member',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./member/member.module').then((m) => m.MemberModule),
    data: { title: 'ROUTE.MEMBER' },
  },

  {
    path: 'application',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./application/application.module').then(
        (m) => m.ApplicationModule
      ),
    data: { title: 'ROUTE.APPLICATION' },
  },
  {
    path: 'apitelegram',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./api-telegram/api-telegram.module').then(
        (m) => m.ApiTelegramModule
      ),
  },

  {
    path: 'article',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./article/article.module').then(
        (m) => m.ArticleModule
      ),
    data: { title: 'ROUTE.ARTICLE' },
  },
  {
    path: 'bankpayment',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./bank-payment/bank-payment.module').then(
        (m) => m.BankPaymentModule
      ),
  },
  {
    path: 'biography',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./biography/biography.module').then(
        (m) => m.BiographyModule
      ),
  },
  {
    path: 'blog',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'catalog',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./catalog/catalog.module').then(
        (m) => m.CatalogModule
      ),
  },
  {
    path: 'hypershop',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./hyper-shop/hyper-shop.module').then(
        (m) => m.HyperShopModule
      ),
  },
  {
    path: 'linkmanagement',
    loadChildren: () =>
      import('./link-management/link-management.module').then(
        (m) => m.LinkManagementModule
      ),
  },

  {
    path: 'news',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./news/news.module').then((m) => m.NewsModule),
  },

  {
    path: 'chart',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./chart/chart.module').then((m) => m.ChartModule),
  },
  {
    path: 'filemanager',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./file-manager/file-manager.module').then(
        (m) => m.FileManagerModule
      ),
    data: { title: 'ROUTE.FILEMANAGER' },
  },
  {
    path: 'polling',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./polling/polling.module').then(
        (m) => m.PollingModule
      ),
  },
  {
    path: 'contact',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./contact/contact.module').then(
        (m) => m.ContactModule
      ),
  },
  {
    path: 'sms',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./sms/sms.module').then((m) => m.SmsModule),
  },
  {
    path: 'ticketing',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./ticketing/ticketing.module').then(
        (m) => m.TicketingModule
      ),
    data: { title: 'ROUTE.TICKETING' },
  },
  {
    path: 'universalmenu',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./universal-menu/universal-menu.module').then(
        (m) => m.UniversalMenuModule
      ),
  },
  {
    path: 'webdesigner',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./web-designer/web-designer.module').then(
        (m) => m.WebDesignerModule
      ),
  },
  {
    path: 'web-designer-builder',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import(
        './web-designer-builder/web-designer-builder.module'
      ).then((m) => m.WebDesignerBuilderModule),
  },

  {
    path: 'donate',
    loadChildren: () =>
      import('./donate/donate.module').then((m) => m.DonateModule),
  },
  {
    path: 'data-provider',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./data-provider/data-provider.module').then(
        (m) => m.DataProviderModule
      ),
  },
  {
    path: 'api-telegram',
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import('./api-telegram/api-telegram.module').then(
        (m) => m.ApiTelegramModule
      ),
  },
  // ** cms */
  // {
  //   path: 'dashboard',
  //   canActivate: [CmsAuthSiteGuard],
  //   component: PageDashboardComponent,
  // },
  // {
  //   path: 'menu',
  //   canActivate: [CmsAuthSiteGuard],
  //   component: PageMenuComponent,
  // },
  // {
  //   path: 'menu/LinkParentId/:LinkParentId',
  //   canActivate: [CmsAuthSiteGuard],
  //   component: PageMenuComponent,
  // },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },

];

export { CmsModulesRoutes };
