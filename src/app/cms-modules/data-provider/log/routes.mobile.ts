import { Routes } from "@angular/router";
import { DataProviderLogComponent } from "./data-provider-log.component";
import { DataProviderLogClientListMobileComponent } from "./client/list/list.mobile.component";
import { DataProviderLogClientViewComponent } from "./client/view/view.component";
import { DataProviderLogPlanListMobileComponent } from "./plan/list/list.mobile.component";
import { DataProviderLogPlanViewComponent } from "./plan/view/view.component";
import { DataProviderLogSourceListMobileComponent } from "./source/list/list.mobile.component";
import { DataProviderLogSourceViewComponent } from "./source/view/view.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: DataProviderLogComponent,
    data: { title: "ROUTE.DATAPROVIDER.LOG" },
    children: [
      {
        path: "client",
        component: DataProviderLogClientListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGCLIENT" },
      },
      {
        path: "client/LinkClientId/:LinkClientId",
        component: DataProviderLogClientListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGCLIENT" },
      },
      {
        path: "client/LinkPlanId/:LinkPlanId",
        component: DataProviderLogClientListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGCLIENT" },
      },
      {
        path: "client/view/:id",
        component: DataProviderLogClientViewComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGCLIENT" },
      },
      {
        path: "plan",
        component: DataProviderLogPlanListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGPLAN" },
      },
      {
        path: "plan/LinkSourceId/:LinkSourceId",
        component: DataProviderLogPlanListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGPLAN" },
      },
      {
        path: "plan/LinkPlanId/:LinkPlanId",
        component: DataProviderLogPlanListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGPLAN" },
      },
      {
        path: "plan/view/:id",
        component: DataProviderLogPlanViewComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGPLAN" },
      },
      {
        path: "source",
        component: DataProviderLogSourceListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.LOGSOURCE" },
      },
      {
        path: "source/LinkSourceId/:LinkSourceId",
        component: DataProviderLogSourceListMobileComponent,
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
