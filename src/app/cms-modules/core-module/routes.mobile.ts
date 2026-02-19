import { Routes } from "@angular/router";
import { CoreModuleComponent } from "./coreModule.component";
import { CoreModuleSiteCreditChargeOnlineComponent } from "./site-credit/charge-online/charge-online.component";
import { CoreModuleSiteCreditListMobileComponent } from "./site-credit/list/list.mobile.component";
import { CoreModuleSiteUserCreditChargeOnlineComponent } from "./site-user-credit/charge-online/charge-online.component";
import { CoreModuleSiteUserCreditListMobileComponent } from "./site-user-credit/list/list.mobile.component";
import { CoreModuleSiteUserCreditMyselfListComponent } from "./site-user-credit/myself-list/myself-list.component";
import { CoreModuleTagListMobileComponent } from "./tag/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: CoreModuleComponent,
    data: { title: "ROUTE.COREMODULE" },
    children: [
      {
        path: "tag",
        component: CoreModuleTagListMobileComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
      {
        path: "site-credit",
        component: CoreModuleSiteCreditListMobileComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
      {
        path: "site-credit-charge-online/:LinkSiteId/:LinkModuleId",
        component: CoreModuleSiteCreditChargeOnlineComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
      {
        path: "site-user-credit-myself",
        component: CoreModuleSiteUserCreditMyselfListComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
      {
        path: "site-user-credit",
        component: CoreModuleSiteUserCreditListMobileComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
      {
        path: "site-user-credit/LinkUserId/:LinkUserId",
        component: CoreModuleSiteUserCreditListMobileComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
      {
        path: "site-user-credit/LinkSiteId/:LinkSiteId",
        component: CoreModuleSiteUserCreditListMobileComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
      {
        path: "site-user-credit-charge-online/:LinkSiteId/:LinkUserId/:LinkModuleId",
        component: CoreModuleSiteUserCreditChargeOnlineComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
    ],
  },
];
