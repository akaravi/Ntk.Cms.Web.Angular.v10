import { Routes } from "@angular/router";
import { CoreComponent } from "./core.component";
import { CoreCpMainMenuListMobileComponent } from "./cp-main-menu/list/list.mobile.component";
import { CoreCurrencyListMobileComponent } from "./currency/list/list.mobile.component";
import { CoreDeviceListMobileComponent } from "./device/list/list.mobile.component";
import { CoreGuideListMobileComponent } from "./guides/list/list.mobile.component";
import { CoreLocationListMobileComponent } from "./location/list/list.mobile.component";
import { CoreModuleEntityReportFileListMobileComponent } from "./module-entity-report-file/list/list.mobile.component";
import { CoreModuleEntityListMobileComponent } from "./module-entity/list/list.mobile.component";
import { CoreModuleSaleHeaderGroupListMobileComponent } from "./module-sale/header-group/list/list.mobile.component";
import { CoreModuleSaleHeaderListMobileComponent } from "./module-sale/header/list/list.mobile.component";
import { CoreModuleSaleInvoiceDetailListMobileComponent } from "./module-sale/invoice-detail/list/list.mobile.component";
import { CoreModuleSaleInvoiceListMobileComponent } from "./module-sale/invoice/list/list.mobile.component";
import { CoreModuleSaleItemListMobileComponent } from "./module-sale/Item/list/list.mobile.component";
import { CoreModuleSaleSerialListMobileComponent } from "./module-sale/serial/list/list.mobile.component";
import { CoreModuleListMobileComponent } from "./module/list/list.mobile.component";
import { CoreSiteCategoryCmsModuleListMobileComponent } from "./site-category-module/list/list.mobile.component";
import { CoreSiteCategoryListMobileComponent } from "./site-category/list/list.mobile.component";
import { CoreSiteDomainAliasListMobileComponent } from "./site-domain-alias/list/list.mobile.component";
import { CoreSiteListMobileComponent } from "./site/list/list.mobile.component";
import { CoreUserClaimContentListMobileComponent } from "./user-claim/content/list/list.mobile.component";
import { CoreUserClaimGroupDetailListMobileComponent } from "./user-claim/group-detail/list/list.mobile.component";
import { CoreUserClaimGroupListMobileComponent } from "./user-claim/group/list/list.mobile.component";
import { CoreUserClaimTypeListMobileComponent } from "./user-claim/type/list/list.mobile.component";
import { CoreUserGroupListMobileComponent } from "./user-group/list/list.mobile.component";
import { CoreUserSupportAccessListMobileComponent } from "./user-support-access/list/list.mobile.component";
import { CoreUserListMobileComponent } from "./user/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: CoreComponent,
    data: { title: "ROUTE.CORE" },
    children: [
      {
        path: "user",
        component: CoreUserListMobileComponent,
        data: { title: "ROUTE.CORE.USER" },
      },
      {
        path: "usergroup",
        component: CoreUserGroupListMobileComponent,
        data: { title: "ROUTE.CORE.USERGROUP" },
      },
      {
        path: "user-support-access",
        component: CoreUserSupportAccessListMobileComponent,
        data: { title: "ROUTE.CORE.USERSUPPORT" },
      },
      {
        path: "currency",
        component: CoreCurrencyListMobileComponent,
        data: { title: "ROUTE.CORE.CURRENCY" },
      },
      {
        path: "site",
        component: CoreSiteListMobileComponent,
        data: { title: "ROUTE.CORE.SITE" },
      },
      {
        path: "sitecategory",
        component: CoreSiteCategoryListMobileComponent,
        data: { title: "ROUTE.CORE.SITECATEGORY" },
      },
      {
        path: "sitecategorymodule",
        component: CoreSiteCategoryCmsModuleListMobileComponent,
        data: { title: "ROUTE.CORE.SITECATEGORYMODULE" },
      },
      {
        path: "sitedomainalias",
        component: CoreSiteDomainAliasListMobileComponent,
        data: { title: "ROUTE.CORE.SITEDOMAINALIAS" },
      },
      {
        path: "cpmainmenu",
        component: CoreCpMainMenuListMobileComponent,
        data: { title: "ROUTE.CORE.CPMAINMENU" },
      },
      {
        path: "module",
        component: CoreModuleListMobileComponent,
        data: { title: "ROUTE.CORE.MODULE" },
      },
      {
        path: "module-entity",
        component: CoreModuleEntityListMobileComponent,
        data: { title: "ROUTE.CORE.MODULEENTITY" },
      },
      {
        path: "module-entity-report-file",
        component: CoreModuleEntityReportFileListMobileComponent,
        data: { title: "ROUTE.CORE.ENTITYREPORTFILE" },
      },
      {
        path: "modulesale/serial",
        component: CoreModuleSaleSerialListMobileComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      {
        path: "modulesale/invoice",
        component: CoreModuleSaleInvoiceListMobileComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      {
        path: "modulesale/invoice-detail",
        component: CoreModuleSaleInvoiceDetailListMobileComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      {
        path: "modulesale/header",
        component: CoreModuleSaleHeaderListMobileComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      {
        path: "modulesale/header-group",
        component: CoreModuleSaleHeaderGroupListMobileComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      {
        path: "modulesale/item",
        component: CoreModuleSaleItemListMobileComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      {
        path: "userclaim/type",
        component: CoreUserClaimTypeListMobileComponent,
        data: { title: "ROUTE.CORE.USERCLAIM" },
      },
      {
        path: "userclaim/group",
        component: CoreUserClaimGroupListMobileComponent,
        data: { title: "ROUTE.CORE.USERCLAIM" },
      },
      {
        path: "userclaim/group-detail",
        component: CoreUserClaimGroupDetailListMobileComponent,
        data: { title: "ROUTE.CORE.USERCLAIM" },
      },
      {
        path: "userclaim/content",
        component: CoreUserClaimContentListMobileComponent,
        data: { title: "ROUTE.CORE.USERCLAIM" },
      },
      {
        path: "location",
        component: CoreLocationListMobileComponent,
        data: { title: "ROUTE.CORE.LOCATION" },
      },
      {
        path: "device",
        component: CoreDeviceListMobileComponent,
        data: { title: "ROUTE.CORE.DEVICE" },
      },
      {
        path: "guide",
        component: CoreGuideListMobileComponent,
        data: { title: "ROUTE.CORE.GUIDE" },
      },
      {
        path: "config",
        loadChildren: () =>
          import("./config/core-config.module").then((m) => m.CoreConfigModule),
        data: { title: "ROUTE.CORE" },
      },
      {
        path: "action",
        loadChildren: () =>
          import("./action/core-main-action.module").then(
            (m) => m.CoreMainActionModule,
          ),
        data: { title: "ROUTE.CORE.ACTION" },
      },
    ],
  },
];
