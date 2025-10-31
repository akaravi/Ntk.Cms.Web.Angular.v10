import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewsConfigCheckSiteComponent } from "./check-site/check-site.component";
import { NewsConfigCheckUserComponent } from "./check-user/check-user.component";
import { NewsConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { NewsConfigSiteComponent } from "./site/config-site.component";
const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.NEWS" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: NewsConfigMainAdminComponent,
        data: { title: "ROUTE.NEWS" },
      },
      {
        path: "site",
        component: NewsConfigSiteComponent,
        data: { title: "ROUTE.NEWS" },
      },
      {
        path: "site/:LinkSiteId",
        component: NewsConfigSiteComponent,
        data: { title: "ROUTE.NEWS" },
      },
      {
        path: "checkuser",
        component: NewsConfigCheckUserComponent,
        data: { title: "ROUTE.NEWS" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: NewsConfigCheckUserComponent,
        data: { title: "ROUTE.NEWS" },
      },
      {
        path: "checksite",
        component: NewsConfigCheckSiteComponent,
        data: { title: "ROUTE.NEWS" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: NewsConfigCheckSiteComponent,
        data: { title: "ROUTE.NEWS" },
      },
      /*Config*/
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsConfigRouting {}
