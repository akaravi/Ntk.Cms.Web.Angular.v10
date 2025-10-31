import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BiographyConfigCheckSiteComponent } from "./check-site/check-site.component";
import { BiographyConfigCheckUserComponent } from "./check-user/check-user.component";
import { BiographyConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { BiographyConfigSiteComponent } from "./site/config-site.component";
const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.BIOGRAPHY" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: BiographyConfigMainAdminComponent,
        data: { title: "ROUTE.BIOGRAPHY" },
      },
      {
        path: "site",
        component: BiographyConfigSiteComponent,
        data: { title: "ROUTE.BIOGRAPHY" },
      },
      {
        path: "site/:LinkSiteId",
        component: BiographyConfigSiteComponent,
        data: { title: "ROUTE.BIOGRAPHY" },
      },
      {
        path: "checkuser",
        component: BiographyConfigCheckUserComponent,
        data: { title: "ROUTE.BIOGRAPHY" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: BiographyConfigCheckUserComponent,
        data: { title: "ROUTE.BIOGRAPHY" },
      },
      {
        path: "checksite",
        component: BiographyConfigCheckSiteComponent,
        data: { title: "ROUTE.BIOGRAPHY" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: BiographyConfigCheckSiteComponent,
        data: { title: "ROUTE.BIOGRAPHY" },
      },
      /*Config*/
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiographyConfigRouting {}
