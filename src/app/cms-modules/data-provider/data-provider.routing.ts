import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DataProviderComponent } from "./data-provider.component";
import { DataProviderDashboardComponent } from "./dashboard/dashboard.component";
import { DataProviderOverviewEventsComponent } from "./overview/events/events.component";
import { DataProviderOverviewSummaryComponent } from "./overview/summary/summary.component";

const routes: Routes = [
  {
    path: "",
    component: DataProviderComponent,
    data: { title: "ROUTE.DATAPROVIDER" },

    children: [
      /* Dashboard */
      {
        path: "",
        pathMatch: "full",
        component: DataProviderDashboardComponent,
        data: { title: "ROUTE.DATAPROVIDER" },
      },
      {
        path: "dashboard",
        component: DataProviderDashboardComponent,
        data: { title: "ROUTE.DATAPROVIDER" },
      },
      /* Dashboard */
      /* Config */
      {
        path: "config",
        loadChildren: () =>
          import("./config/data-provider-config.module").then(
            (m) => m.DataProviderConfigModule,
          ),
        data: { title: "ROUTE.DATAPROVIDER" },
      },
      /* Main */
      {
        path: "main",
        loadChildren: () =>
          import("./main/data-provider-main.module").then(
            (m) => m.DataProviderMainModule,
          ),
        data: { title: "ROUTE.DATAPROVIDER.MAIN" },
      },
      /* Log */
      {
        path: "log",
        loadChildren: () =>
          import("./log/data-provider-log.module").then(
            (m) => m.DataProviderLogModule,
          ),
        data: { title: "ROUTE.DATAPROVIDER.LOG" },
      },
      /* Transaction */
      {
        path: "transaction",
        loadChildren: () =>
          import("./transaction/data-provider-transaction.module").then(
            (m) => m.DataProviderTransactionModule,
          ),
        data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
      },
      /* Overview */
      {
        path: "overview-summary",
        component: DataProviderOverviewSummaryComponent,
        data: { title: "ROUTE.DATAPROVIDER.SUMMARY" },
      },
      {
        path: "overview-events",
        component: DataProviderOverviewEventsComponent,
        data: { title: "ROUTE.DATAPROVIDER.EVENTS" },
      },
      /* Overview */
      /** */
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataProviderRoutes {}
