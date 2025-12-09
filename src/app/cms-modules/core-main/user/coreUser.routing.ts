import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreUserComponent } from "./coreUser.component";
import { CoreUserEditComponent } from "./edit/edit.component";
import { CoreUserListComponent } from "./list/list.component";
import { CoreUserResellerChartComponent } from "./reseller-chart/reseller-chart.component";

const routes: Routes = [
  {
    path: "",
    component: CoreUserComponent,
    data: { title: "ROUTE.CORE.USER" },
    children: [
      {
        path: "",
        component: CoreUserListComponent,
        data: { title: "ROUTE.CORE.USER" },
      },
      {
        path: "siteuser/:LinkSiteId",
        component: CoreUserListComponent,
        data: { title: "ROUTE.CORE.USER" },
      },
      {
        path: "edit/:id",
        component: CoreUserEditComponent,
        data: { title: "ROUTE.CORE.USER" },
      },
      {
        path: "reseller-chart",
        component: CoreUserResellerChartComponent,
        data: { title: "ROUTE.CORE.USER" },
      },
      {
        path: "reseller-chart/LinkUserId/:LinkUserId",
        component: CoreUserResellerChartComponent,
        data: { title: "ROUTE.CORE.USER" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreUserRouting {}
