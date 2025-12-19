import { Routes } from "@angular/router";
import { SmsConfigCheckSiteMobileComponent } from "./check-site/check-site.mobile.component";
import { SmsConfigCheckUserMobileComponent } from "./check-user/check-user.mobile.component";
import { SmsConfigMainAdminMobileComponent } from "./main-admin/config-main-admin.mobile.component";
import { SmsConfigSiteMobileComponent } from "./site/config-site.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    data: { title: "ROUTE.SMS" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: SmsConfigMainAdminMobileComponent,
        data: { title: "ROUTE.SMS" },
      },
      {
        path: "site",
        component: SmsConfigSiteMobileComponent,
        data: { title: "ROUTE.SMS" },
      },
      {
        path: "site/:LinkSiteId",
        component: SmsConfigSiteMobileComponent,
        data: { title: "ROUTE.SMS" },
      },
      {
        path: "checkuser",
        component: SmsConfigCheckUserMobileComponent,
        data: { title: "ROUTE.SMS" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: SmsConfigCheckUserMobileComponent,
        data: { title: "ROUTE.SMS" },
      },
      {
        path: "checksite",
        component: SmsConfigCheckSiteMobileComponent,
        data: { title: "ROUTE.SMS" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: SmsConfigCheckSiteMobileComponent,
        data: { title: "ROUTE.SMS" },
      },
      /*Config*/
    ],
  },
];
