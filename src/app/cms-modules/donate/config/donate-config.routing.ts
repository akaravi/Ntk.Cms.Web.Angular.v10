import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DonateConfigCheckSiteComponent } from "./check-site/check-site.component";
import { DonateConfigCheckUserComponent } from "./check-user/check-user.component";
import { DonateConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { DonateConfigSiteComponent } from "./site/config-site.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.DONATE" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: DonateConfigMainAdminComponent,
        data: { title: "ROUTE.DONATE" },
      },
      {
        path: "site",
        component: DonateConfigSiteComponent,
        data: { title: "ROUTE.DONATE" },
      },
      {
        path: "site/:LinkSiteId",
        component: DonateConfigSiteComponent,
        data: { title: "ROUTE.DONATE" },
      },
      {
        path: "checkuser",
        component: DonateConfigCheckUserComponent,
        data: { title: "ROUTE.DONATE" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: DonateConfigCheckUserComponent,
        data: { title: "ROUTE.DONATE" },
      },
      {
        path: "checksite",
        component: DonateConfigCheckSiteComponent,
        data: { title: "ROUTE.DONATE" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: DonateConfigCheckSiteComponent,
        data: { title: "ROUTE.DONATE" },
      },
      /*Config*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonateConfigRouting {}
