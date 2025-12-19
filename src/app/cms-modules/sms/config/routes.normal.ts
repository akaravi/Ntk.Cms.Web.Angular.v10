import { Routes } from "@angular/router";
import { SmsConfigCheckSiteComponent } from "./check-site/check-site.component";
import { SmsConfigCheckUserComponent } from "./check-user/check-user.component";
import { SmsConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { SmsConfigSiteComponent } from "./site/config-site.component";

export const routesNormal: Routes = [
  {
    path: "",
    data: { title: "ROUTE.SMS" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: SmsConfigMainAdminComponent,
        data: { title: "ROUTE.SMS" },
      },
      {
        path: "site",
        component: SmsConfigSiteComponent,
        data: { title: "ROUTE.SMS" },
      },
      {
        path: "site/:LinkSiteId",
        component: SmsConfigSiteComponent,
        data: { title: "ROUTE.SMS" },
      },
      {
        path: "checkuser",
        component: SmsConfigCheckUserComponent,
        data: { title: "ROUTE.SMS" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: SmsConfigCheckUserComponent,
        data: { title: "ROUTE.SMS" },
      },
      {
        path: "checksite",
        component: SmsConfigCheckSiteComponent,
        data: { title: "ROUTE.SMS" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: SmsConfigCheckSiteComponent,
        data: { title: "ROUTE.SMS" },
      },
      /*Config*/
    ],
  },
];
