import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DataProviderConfigCheckSiteComponent } from "./check-site/check-site.component";
import { DataProviderConfigCheckUserComponent } from "./check-user/check-user.component";
import { DataProviderConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { DataProviderConfigSiteComponent } from "./site/config-site.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.DATAPROVIDER" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: DataProviderConfigMainAdminComponent,
        data: { title: "ROUTE.DATAPROVIDER" },
      },
      {
        path: "site",
        component: DataProviderConfigSiteComponent,
        data: { title: "ROUTE.DATAPROVIDER" },
      },
      {
        path: "site/:LinkSiteId",
        component: DataProviderConfigSiteComponent,
        data: { title: "ROUTE.DATAPROVIDER" },
      },
      {
        path: "checkuser",
        component: DataProviderConfigCheckUserComponent,
        data: { title: "ROUTE.DATAPROVIDER" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: DataProviderConfigCheckUserComponent,
        data: { title: "ROUTE.DATAPROVIDER" },
      },
      {
        path: "checksite",
        component: DataProviderConfigCheckSiteComponent,
        data: { title: "ROUTE.DATAPROVIDER" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: DataProviderConfigCheckSiteComponent,
        data: { title: "ROUTE.DATAPROVIDER" },
      },
      /*Config*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataProviderConfigRouting {}
