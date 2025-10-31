import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BlogConfigCheckSiteComponent } from "./check-site/check-site.component";
import { BlogConfigCheckUserComponent } from "./check-user/check-user.component";
import { BlogConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { BlogConfigSiteComponent } from "./site/config-site.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.BLOG" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: BlogConfigMainAdminComponent,
        data: { title: "ROUTE.BLOG" },
      },
      {
        path: "site",
        component: BlogConfigSiteComponent,
        data: { title: "ROUTE.BLOG" },
      },
      {
        path: "site/:LinkSiteId",
        component: BlogConfigSiteComponent,
        data: { title: "ROUTE.BLOG" },
      },
      {
        path: "checkuser",
        component: BlogConfigCheckUserComponent,
        data: { title: "ROUTE.BLOG" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: BlogConfigCheckUserComponent,
        data: { title: "ROUTE.BLOG" },
      },
      {
        path: "checksite",
        component: BlogConfigCheckSiteComponent,
        data: { title: "ROUTE.BLOG" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: BlogConfigCheckSiteComponent,
        data: { title: "ROUTE.BLOG" },
      },
      /*Config*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogConfigRouting {}
