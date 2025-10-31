import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApiTelegramConfigCheckSiteComponent } from "./check-site/check-site.component";
import { ApiTelegramConfigCheckUserComponent } from "./check-user/check-user.component";
import { ApiTelegramConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { ApiTelegramConfigSiteComponent } from "./site/config-site.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.APITELEGRAM" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: ApiTelegramConfigMainAdminComponent,
        data: { title: "ROUTE.APITELEGRAM" },
      },
      {
        path: "site",
        component: ApiTelegramConfigSiteComponent,
        data: { title: "ROUTE.APITELEGRAM" },
      },
      {
        path: "site/:LinkSiteId",
        component: ApiTelegramConfigSiteComponent,
        data: { title: "ROUTE.APITELEGRAM" },
      },
      {
        path: "checkuser",
        component: ApiTelegramConfigCheckUserComponent,
        data: { title: "ROUTE.APITELEGRAM" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: ApiTelegramConfigCheckUserComponent,
        data: { title: "ROUTE.APITELEGRAM" },
      },
      {
        path: "checksite",
        component: ApiTelegramConfigCheckSiteComponent,
        data: { title: "ROUTE.APITELEGRAM" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: ApiTelegramConfigCheckSiteComponent,
        data: { title: "ROUTE.APITELEGRAM" },
      },
      /*Config*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiTelegramConfigRouting {}
