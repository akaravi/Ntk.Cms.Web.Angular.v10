import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PollingConfigCheckSiteComponent } from "./check-site/check-site.component";
import { PollingConfigCheckUserComponent } from "./check-user/check-user.component";
import { PollingConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { PollingConfigSiteComponent } from "./site/config-site.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.POLLING" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: PollingConfigMainAdminComponent,
        data: { title: "ROUTE.POLLING" },
      },
      {
        path: "site",
        component: PollingConfigSiteComponent,
        data: { title: "ROUTE.POLLING" },
      },
      {
        path: "site/:LinkSiteId",
        component: PollingConfigSiteComponent,
        data: { title: "ROUTE.POLLING" },
      },
      {
        path: "checkuser",
        component: PollingConfigCheckUserComponent,
        data: { title: "ROUTE.POLLING" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: PollingConfigCheckUserComponent,
        data: { title: "ROUTE.POLLING" },
      },
      {
        path: "checksite",
        component: PollingConfigCheckSiteComponent,
        data: { title: "ROUTE.POLLING" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: PollingConfigCheckSiteComponent,
        data: { title: "ROUTE.POLLING" },
      },
      /*Config*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollingConfigRouting {}
