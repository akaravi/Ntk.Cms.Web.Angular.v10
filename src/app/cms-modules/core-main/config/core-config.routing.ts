import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreConfigCheckSiteComponent } from "./check-site/check-site.component";
import { CoreConfigCheckUserComponent } from "./check-user/check-user.component";
import { CoreConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { CoreConfigSiteComponent } from "./site/config-site.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CORE" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: CoreConfigMainAdminComponent,
        data: { title: "ROUTE.CORE" },
      },
      {
        path: "site",
        component: CoreConfigSiteComponent,
        data: { title: "ROUTE.CORE" },
      },
      {
        path: "site/:LinkSiteId",
        component: CoreConfigSiteComponent,
        data: { title: "ROUTE.CORE" },
      },
      {
        path: "checkuser",
        component: CoreConfigCheckUserComponent,
        data: { title: "ROUTE.CORE" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: CoreConfigCheckUserComponent,
        data: { title: "ROUTE.CORE" },
      },
      {
        path: "checksite",
        component: CoreConfigCheckSiteComponent,
        data: { title: "ROUTE.CORE" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: CoreConfigCheckSiteComponent,
        data: { title: "ROUTE.CORE" },
      },
      /*Config*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreConfigRouting {}
