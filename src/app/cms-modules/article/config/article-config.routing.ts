import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticleConfigCheckSiteComponent } from "./check-site/check-site.component";
import { ArticleConfigCheckUserComponent } from "./check-user/check-user.component";
import { ArticleConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { ArticleConfigSiteComponent } from "./site/config-site.component";
const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.ARTICLE" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: ArticleConfigMainAdminComponent,
        data: { title: "ROUTE.ARTICLE" },
      },
      {
        path: "site",
        component: ArticleConfigSiteComponent,
        data: { title: "ROUTE.ARTICLE" },
      },
      {
        path: "site/:LinkSiteId",
        component: ArticleConfigSiteComponent,
        data: { title: "ROUTE.ARTICLE" },
      },
      {
        path: "checkuser",
        component: ArticleConfigCheckUserComponent,
        data: { title: "ROUTE.ARTICLE" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: ArticleConfigCheckUserComponent,
        data: { title: "ROUTE.ARTICLE" },
      },
      {
        path: "checksite",
        component: ArticleConfigCheckSiteComponent,
        data: { title: "ROUTE.ARTICLE" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: ArticleConfigCheckSiteComponent,
        data: { title: "ROUTE.ARTICLE" },
      },
      /*Config*/
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleConfigRouting {}
