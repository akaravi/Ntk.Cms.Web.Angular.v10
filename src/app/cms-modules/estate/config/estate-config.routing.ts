import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EstateConfigCheckSiteComponent } from "./check-site/check-site.component";
import { EstateConfigCheckUserComponent } from "./check-user/check-user.component";
import { EstateConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { EstateConfigSiteComponent } from "./site/config-site.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.ESTATE" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: EstateConfigMainAdminComponent,
        data: { title: "ROUTE.ESTATE" },
      },
      {
        path: "site",
        component: EstateConfigSiteComponent,
        data: { title: "ROUTE.ESTATE" },
      },
      {
        path: "site/:LinkSiteId",
        component: EstateConfigSiteComponent,
        data: { title: "ROUTE.ESTATE" },
      },
      {
        path: "checkuser",
        component: EstateConfigCheckUserComponent,
        data: { title: "ROUTE.ESTATE" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: EstateConfigCheckUserComponent,
        data: { title: "ROUTE.ESTATE" },
      },
      {
        path: "checksite",
        component: EstateConfigCheckSiteComponent,
        data: { title: "ROUTE.ESTATE" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: EstateConfigCheckSiteComponent,
        data: { title: "ROUTE.ESTATE" },
      },
      /*Config*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstateConfigRouting {}
