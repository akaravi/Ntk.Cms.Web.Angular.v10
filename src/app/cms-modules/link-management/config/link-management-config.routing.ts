import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LinkManagementConfigCheckSiteComponent } from "./check-site/check-site.component";
import { LinkManagementConfigCheckUserComponent } from "./check-user/check-user.component";
import { LinkManagementConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { LinkManagementConfigSiteComponent } from "./site/config-site.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.LINKMANAGMENT" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: LinkManagementConfigMainAdminComponent,
        data: { title: "ROUTE.LINKMANAGMENT" },
      },
      {
        path: "site",
        component: LinkManagementConfigSiteComponent,
        data: { title: "ROUTE.LINKMANAGMENT" },
      },
      {
        path: "site/:LinkSiteId",
        component: LinkManagementConfigSiteComponent,
        data: { title: "ROUTE.LINKMANAGMENT" },
      },
      {
        path: "checkuser",
        component: LinkManagementConfigCheckUserComponent,
        data: { title: "ROUTE.LINKMANAGMENT" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: LinkManagementConfigCheckUserComponent,
        data: { title: "ROUTE.LINKMANAGMENT" },
      },
      {
        path: "checksite",
        component: LinkManagementConfigCheckSiteComponent,
        data: { title: "ROUTE.LINKMANAGMENT" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: LinkManagementConfigCheckSiteComponent,
        data: { title: "ROUTE.LINKMANAGMENT" },
      },
      /*Config*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkManagementConfigRouting {}
