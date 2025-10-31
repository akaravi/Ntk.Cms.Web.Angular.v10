import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HyperShopConfigCheckSiteComponent } from "./check-site/check-site.component";
import { HyperShopConfigCheckUserComponent } from "./check-user/check-user.component";
import { HyperShopConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { HyperShopConfigSiteComponent } from "./site/config-site.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.HYPERSHOP" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: HyperShopConfigMainAdminComponent,
        data: { title: "ROUTE.HYPERSHOP" },
      },
      {
        path: "site",
        component: HyperShopConfigSiteComponent,
        data: { title: "ROUTE.HYPERSHOP" },
      },
      {
        path: "site/:LinkSiteId",
        component: HyperShopConfigSiteComponent,
        data: { title: "ROUTE.HYPERSHOP" },
      },
      {
        path: "checkuser",
        component: HyperShopConfigCheckUserComponent,
        data: { title: "ROUTE.HYPERSHOP" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: HyperShopConfigCheckUserComponent,
        data: { title: "ROUTE.HYPERSHOP" },
      },
      {
        path: "checksite",
        component: HyperShopConfigCheckSiteComponent,
        data: { title: "ROUTE.HYPERSHOP" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: HyperShopConfigCheckSiteComponent,
        data: { title: "ROUTE.HYPERSHOP" },
      },
      /*Config*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HyperShopConfigRouting {}
