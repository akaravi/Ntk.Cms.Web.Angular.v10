import { Routes } from "@angular/router";
import { CmsAuthSiteGuard } from "../core/services/cmsAuthSiteGuard.service";

const CmsModulesRoutes: Routes = [
  // ** cms */
  {
    path: "core",
    loadChildren: () =>
      import("./core-main/core.module").then((m) => m.CoreModule),
    data: { title: "ROUTE.CORE" },
  },
  {
    path: "coremodule",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./core-module/coreModule.module").then((m) => m.CoreModuleModule),
    data: { title: "ROUTE.COREMODULELOG" },
  },
  {
    path: "coremodulelog",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./core-module-log/core-module-log.module").then(
        (m) => m.CoreModuleLogModule,
      ),
    data: { title: "ROUTE.COREMODULELOG" },
  },
  {
    path: "coremoduledata",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./core-module-data/core-module-data.module").then(
        (m) => m.CoreModuleDataModule,
      ),
    data: { title: "ROUTE.COREMODULELOG" },
  },
  {
    path: "coretoken",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./core-token/core-token.module").then((m) => m.CoreTokenModule),
    data: { title: "ROUTE.CORETOKEN" },
  },
  {
    path: "corelog",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./core-log/coreLog.module").then((m) => m.CoreLogModule),
    data: { title: "ROUTE.CORELOG" },
  },
  {
    path: "estate",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./estate/estate.module").then((m) => m.EstateModule),
    data: { title: "ROUTE.ESTATE" },
  },
  {
    path: "transactionassistant",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./transaction-assistant/transaction-assistant.module").then((m) => m.TransactionAssistantModule),
    data: { title: "ROUTE.TRANSACTIONASSISTANT" },
  },

  {
    path: "member",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./member/member.module").then((m) => m.MemberModule),
    data: { title: "ROUTE.MEMBER" },
  },

  {
    path: "application",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./application/application.module").then(
        (m) => m.ApplicationModule,
      ),
    data: { title: "ROUTE.APPLICATION" },
  },
  {
    path: "apitelegram",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./api-telegram/api-telegram.module").then(
        (m) => m.ApiTelegramModule,
      ),
    data: { title: "ROUTE.APITELEGRAM" },
  },

  {
    path: "article",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./article/article.module").then((m) => m.ArticleModule),
    data: { title: "ROUTE.ARTICLE" },
  },
  {
    path: "bankpayment",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./bank-payment/bank-payment.module").then(
        (m) => m.BankPaymentModule,
      ),
    data: { title: "ROUTE.BANKPAYMENT" },
  },
  {
    path: "biography",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./biography/biography.module").then((m) => m.BiographyModule),
    data: { title: "ROUTE.BIOGRAPHY" },
  },
  {
    path: "blog",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () => import("./blog/blog.module").then((m) => m.BlogModule),
    data: { title: "ROUTE.BLOG" },
  },
  {
    path: "catalog",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./catalog/catalog.module").then((m) => m.CatalogModule),
    data: { title: "ROUTE.CATALOG" },
  },
  {
    path: "hypershop",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./hyper-shop/hyper-shop.module").then((m) => m.HyperShopModule),
    data: { title: "ROUTE.HYPERSHOP" },
  },
  {
    path: "linkmanagement",
    loadChildren: () =>
      import("./link-management/link-management.module").then(
        (m) => m.LinkManagementModule,
      ),
    data: { title: "ROUTE.LINKMANAGMENT" },
  },

  {
    path: "crm",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./crm/crm.module").then((m) => m.CrmModule),
    data: { title: "ROUTE.CRM" },
  },

  {
    path: "news",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () => import("./news/news.module").then((m) => m.NewsModule),
    data: { title: "ROUTE.NEWS" },
  },

  {
    path: "chart",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./chart/chart.module").then((m) => m.ChartModule),
    data: { title: "ROUTE.CHART" },
  },
  {
    path: "filemanager",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./file-manager/file-manager.module").then(
        (m) => m.FileManagerModule,
      ),
    data: { title: "ROUTE.FILEMANAGER" },
  },
  {
    path: "polling",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./polling/polling.module").then((m) => m.PollingModule),
    data: { title: "ROUTE.POLLING" },
  },
  {
    path: "contact",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./contact/contact.module").then((m) => m.ContactModule),
    data: { title: "ROUTE.CONTACT" },
  },
  {
    path: "sms",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () => import("./sms/sms.module").then((m) => m.SmsModule),
    data: { title: "ROUTE.SMS" },
  },
  {
    path: "ticketing",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./ticketing/ticketing.module").then((m) => m.TicketingModule),
    data: { title: "ROUTE.TICKETING" },
  },
  {
    path: "universalmenu",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./universal-menu/universal-menu.module").then(
        (m) => m.UniversalMenuModule,
      ),
    data: { title: "ROUTE.UNIVERSALMENU" },
  },
  {
    path: "webdesigner",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./web-designer/web-designer.module").then(
        (m) => m.WebDesignerModule,
      ),
    data: { title: "ROUTE.WEBDESIGNER" },
  },
  {
    path: "web-designer-builder",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./web-designer-builder/web-designer-builder.module").then(
        (m) => m.WebDesignerBuilderModule,
      ),
    data: { title: "ROUTE.WEBDESIGNERBUILDER" },
  },

  {
    path: "donate",
    loadChildren: () =>
      import("./donate/donate.module").then((m) => m.DonateModule),
    data: { title: "ROUTE.DONATE" },
  },
  {
    path: "data-provider",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./data-provider/data-provider.module").then(
        (m) => m.DataProviderModule,
      ),
    data: { title: "ROUTE.DATAPROVIDER" },
  },
  {
    path: "api-telegram",
    canActivate: [CmsAuthSiteGuard],
    loadChildren: () =>
      import("./api-telegram/api-telegram.module").then(
        (m) => m.ApiTelegramModule,
      ),
    data: { title: "ROUTE.APITELEGRAM" },
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
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
    data: { title: "ROUTE.DASHBOARD" },
  },
  {
    path: "**",
    redirectTo: "error/404",
    data: { title: "ROUTE.ERROR" },
  },
];

export { CmsModulesRoutes };
