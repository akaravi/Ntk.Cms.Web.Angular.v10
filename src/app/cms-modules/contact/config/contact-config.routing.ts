import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactConfigCheckSiteComponent } from "./check-site/check-site.component";
import { ContactConfigCheckUserComponent } from "./check-user/check-user.component";
import { ContactConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { ContactConfigSiteComponent } from "./site/config-site.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CONTACT" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: ContactConfigMainAdminComponent,
        data: { title: "ROUTE.CONTACT" },
      },
      {
        path: "site",
        component: ContactConfigSiteComponent,
        data: { title: "ROUTE.CONTACT" },
      },
      {
        path: "site/:LinkSiteId",
        component: ContactConfigSiteComponent,
        data: { title: "ROUTE.CONTACT" },
      },
      {
        path: "checkuser",
        component: ContactConfigCheckUserComponent,
        data: { title: "ROUTE.CONTACT" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: ContactConfigCheckUserComponent,
        data: { title: "ROUTE.CONTACT" },
      },
      {
        path: "checksite",
        component: ContactConfigCheckSiteComponent,
        data: { title: "ROUTE.CONTACT" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: ContactConfigCheckSiteComponent,
        data: { title: "ROUTE.CONTACT" },
      },
      /*Config*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactConfigRouting {}
