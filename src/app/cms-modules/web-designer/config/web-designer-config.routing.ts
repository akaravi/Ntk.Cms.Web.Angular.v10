import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WebDesignerConfigCheckSiteComponent } from "./check-site/check-site.component";
import { WebDesignerConfigCheckUserComponent } from "./check-user/check-user.component";
import { WebDesignerConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { WebDesignerConfigSiteComponent } from "./site/config-site.component";
const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.WEBDESIGNER" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: WebDesignerConfigMainAdminComponent,
        data: { title: "ROUTE.WEBDESIGNER" },
      },
      {
        path: "site",
        component: WebDesignerConfigSiteComponent,
        data: { title: "ROUTE.WEBDESIGNER" },
      },
      {
        path: "site/:LinkSiteId",
        component: WebDesignerConfigSiteComponent,
        data: { title: "ROUTE.WEBDESIGNER" },
      },
      {
        path: "checkuser",
        component: WebDesignerConfigCheckUserComponent,
        data: { title: "ROUTE.WEBDESIGNER" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: WebDesignerConfigCheckUserComponent,
        data: { title: "ROUTE.WEBDESIGNER" },
      },
      {
        path: "checksite",
        component: WebDesignerConfigCheckSiteComponent,
        data: { title: "ROUTE.WEBDESIGNER" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: WebDesignerConfigCheckSiteComponent,
        data: { title: "ROUTE.WEBDESIGNER" },
      },
      /*Config*/
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebDesignerConfigRouting {}
