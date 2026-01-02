import { Routes } from "@angular/router";
import { DataProviderLogComponent } from "./data-provider-log.component";
import { DataProviderLogClientListComponent } from "./client/list/list.component";
import { DataProviderLogClientViewComponent } from "./client/view/view.component";
import { DataProviderLogPlanListComponent } from "./plan/list/list.component";
import { DataProviderLogPlanViewComponent } from "./plan/view/view.component";
import { DataProviderLogSourceListComponent } from "./source/list/list.component";
import { DataProviderLogSourceViewComponent } from "./source/view/view.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: DataProviderLogComponent,
    data: { title: "ROUTE.DATAPROVIDER.LOG" },
    children: [
      {
        path: "client",
        component: DataProviderLogClientListComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGCLIENT" },
      },
      {
        path: "client/LinkClientId/:LinkClientId",
        component: DataProviderLogClientListComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGCLIENT" },
      },
      {
        path: "client/LinkPlanId/:LinkPlanId",
        component: DataProviderLogClientListComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGCLIENT" },
      },
      {
        path: "client/view/:id",
        component: DataProviderLogClientViewComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGCLIENT" },
      },
      {
        path: "plan",
        component: DataProviderLogPlanListComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGPLAN" },
      },
      {
        path: "plan/LinkSourceId/:LinkSourceId",
        component: DataProviderLogPlanListComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGPLAN" },
      },
      {
        path: "plan/LinkPlanId/:LinkPlanId",
        component: DataProviderLogPlanListComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGPLAN" },
      },
      {
        path: "plan/view/:id",
        component: DataProviderLogPlanViewComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGPLAN" },
      },
      {
        path: "source",
        component: DataProviderLogSourceListComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGSOURCE" },
      },
      {
        path: "source/LinkSourceId/:LinkSourceId",
        component: DataProviderLogSourceListComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGSOURCE" },
      },
      {
        path: "source/view/:id",
        component: DataProviderLogSourceViewComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGSOURCE" },
      },
    ],
  },
];
