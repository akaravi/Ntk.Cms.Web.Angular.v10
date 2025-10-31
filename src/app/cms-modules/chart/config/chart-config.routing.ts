import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChartConfigCheckSiteComponent } from "./check-site/check-site.component";
import { ChartConfigCheckUserComponent } from "./check-user/check-user.component";
import { ChartConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { ChartConfigSiteComponent } from "./site/config-site.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CHART" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: ChartConfigMainAdminComponent,
        data: { title: "ROUTE.CHART" },
      },
      {
        path: "site",
        component: ChartConfigSiteComponent,
        data: { title: "ROUTE.CHART" },
      },
      {
        path: "site/:LinkSiteId",
        component: ChartConfigSiteComponent,
        data: { title: "ROUTE.CHART" },
      },
      {
        path: "checkuser",
        component: ChartConfigCheckUserComponent,
        data: { title: "ROUTE.CHART" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: ChartConfigCheckUserComponent,
        data: { title: "ROUTE.CHART" },
      },
      {
        path: "checksite",
        component: ChartConfigCheckSiteComponent,
        data: { title: "ROUTE.CHART" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: ChartConfigCheckSiteComponent,
        data: { title: "ROUTE.CHART" },
      },
      /*Config*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartConfigRouting {}
