import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApplicationConfigCheckSiteComponent } from "./check-site/check-site.component";
import { ApplicationConfigCheckUserComponent } from "./check-user/check-user.component";
import { ApplicationConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { ApplicationConfigSiteComponent } from "./site/config-site.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.APPLICATION" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: ApplicationConfigMainAdminComponent,
        data: { title: "ROUTE.APPLICATION" },
      },
      {
        path: "site",
        component: ApplicationConfigSiteComponent,
        data: { title: "ROUTE.APPLICATION" },
      },
      {
        path: "site/:LinkSiteId",
        component: ApplicationConfigSiteComponent,
        data: { title: "ROUTE.APPLICATION" },
      },
      {
        path: "checkuser",
        component: ApplicationConfigCheckUserComponent,
        data: { title: "ROUTE.APPLICATION" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: ApplicationConfigCheckUserComponent,
        data: { title: "ROUTE.APPLICATION" },
      },
      {
        path: "checksite",
        component: ApplicationConfigCheckSiteComponent,
        data: { title: "ROUTE.APPLICATION" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: ApplicationConfigCheckSiteComponent,
        data: { title: "ROUTE.APPLICATION" },
      },
      /*Config*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationConfigRouting {}
