import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EstateDashboardComponent } from "./dashboard/dashboard.component";
import { EstateComponent } from "./estate.component";
import { EstateOverviewEventsComponent } from "./overview/events/events.component";
import { EstateOverviewSummaryComponent } from "./overview/summary/summary.component";

const routes: Routes = [
  {
    path: "",
    component: EstateComponent,
    data: { title: "ROUTE.ESTATE" },
    children: [
      /* Dashboard */
      {
        path: "dashboard",
        component: EstateDashboardComponent,
        data: { title: "ROUTE.ESTATE.MAIN" },
      },
      /* Dashboard */
      /* View */
      {
        path: "overview-events",
        component: EstateOverviewEventsComponent,
        data: { title: "ROUTE.ESTATE.EVENTS" },
      },
      {
        path: "overview-summary",
        component: EstateOverviewSummaryComponent,
        data: { title: "ROUTE.ESTATE.SUMMARY" },
      },
      /* View */
      {
        path: "main",
        loadChildren: () =>
          import("./main/estate-main.module").then((m) => m.EstateMainModule),
        data: { title: "ROUTE.ESTATE.MAIN" },
      },
      {
        path: "action",
        loadChildren: () =>
          import("./action/estate-action.module").then(
            (m) => m.EstateActionModule,
          ),
        data: { title: "ROUTE.ESTATE.ACTION" },
      },
      {
        path: "log",
        loadChildren: () =>
          import("./log/estate-log.module").then((m) => m.EstateLogModule),
        data: { title: "ROUTE.ESTATE.LOG" },
      },
      {
        path: "config",
        loadChildren: () =>
          import("./config/estate-config.module").then(
            (m) => m.EstateConfigModule,
          ),
        data: { title: "ROUTE.ESTATE" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstateRoutes {}
