import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CatalogConfigCheckSiteComponent } from "./check-site/check-site.component";
import { CatalogConfigCheckUserComponent } from "./check-user/check-user.component";
import { CatalogConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { CatalogConfigSiteComponent } from "./site/config-site.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CATALOG" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: CatalogConfigMainAdminComponent,
        data: { title: "ROUTE.CATALOG" },
      },
      {
        path: "site",
        component: CatalogConfigSiteComponent,
        data: { title: "ROUTE.CATALOG" },
      },
      {
        path: "site/:LinkSiteId",
        component: CatalogConfigSiteComponent,
        data: { title: "ROUTE.CATALOG" },
      },
      {
        path: "checkuser",
        component: CatalogConfigCheckUserComponent,
        data: { title: "ROUTE.CATALOG" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: CatalogConfigCheckUserComponent,
        data: { title: "ROUTE.CATALOG" },
      },
      {
        path: "checksite",
        component: CatalogConfigCheckSiteComponent,
        data: { title: "ROUTE.CATALOG" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: CatalogConfigCheckSiteComponent,
        data: { title: "ROUTE.CATALOG" },
      },
      /*Config*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogConfigRouting {}
