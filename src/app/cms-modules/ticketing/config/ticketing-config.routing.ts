import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TicketingConfigCheckSiteComponent } from "./check-site/check-site.component";
import { TicketingConfigCheckUserComponent } from "./check-user/check-user.component";
import { TicketingConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { TicketingConfigSiteComponent } from "./site/config-site.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.TICKETING" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: TicketingConfigMainAdminComponent,
        data: { title: "ROUTE.TICKETING" },
      },
      {
        path: "site",
        component: TicketingConfigSiteComponent,
        data: { title: "ROUTE.TICKETING" },
      },
      {
        path: "site/:LinkSiteId",
        component: TicketingConfigSiteComponent,
        data: { title: "ROUTE.TICKETING" },
      },
      {
        path: "checkuser",
        component: TicketingConfigCheckUserComponent,
        data: { title: "ROUTE.TICKETING" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: TicketingConfigCheckUserComponent,
        data: { title: "ROUTE.TICKETING" },
      },
      {
        path: "checksite",
        component: TicketingConfigCheckSiteComponent,
        data: { title: "ROUTE.TICKETING" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: TicketingConfigCheckSiteComponent,
        data: { title: "ROUTE.TICKETING" },
      },
      /*Config*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketingConfigRouting {}
