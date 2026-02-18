import { Routes } from "@angular/router";
import { CoreLogAvoidDuplicateDataEntryListComponent } from "./avoid-duplicate/list/list.component";
import { CoreLogComponent } from "./coreLog.component";
import { CoreLogCurrencyListComponent } from "./currency/list/list.component";
import { CoreLogEmailListComponent } from "./email/list/list.component";
import { CoreLogErrorListComponent } from "./error/list/list.component";
import { CoreLogMemberListComponent } from "./member/list/list.component";
import { CoreLogMicroServicePingListComponent } from "./micro-service-ping/list/list.component";
import { CoreLogMicroServiceStatusListComponent } from "./micro-service-status/list/list.component";
import { CoreLogNotificationListComponent } from "./notification/list/list.component";
import { CoreLogReportDataListComponent } from "./report-data/list/list.component";
import { CoreLogSmsListComponent } from "./sms/list/list.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: CoreLogComponent,
    data: { title: "ROUTE.CORELOG" },
    children: [
      {
        path: "error",
        component: CoreLogErrorListComponent,
        data: { title: "ROUTE.CORELOG.ERROR" },
      },
      {
        path: "avoid-duplicate",
        component: CoreLogAvoidDuplicateDataEntryListComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "avoid-duplicate/:LinkUserId",
        component: CoreLogAvoidDuplicateDataEntryListComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "sms",
        component: CoreLogSmsListComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "email",
        component: CoreLogEmailListComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "notification",
        component: CoreLogNotificationListComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "report-data",
        component: CoreLogReportDataListComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "report-data/LinkSiteId/:LinkSiteId",
        component: CoreLogReportDataListComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "report-data/LinkUserId/:LinkUserId",
        component: CoreLogReportDataListComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "report-data/LinkModuleEntityId/:LinkModuleEntityId",
        component: CoreLogReportDataListComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "report-data/LinkModuleEntityReportFileId/:LinkModuleEntityReportFileId",
        component: CoreLogReportDataListComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "member",
        component: CoreLogMemberListComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "currency",
        component: CoreLogCurrencyListComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "currency/:LinkCurrencyId",
        component: CoreLogCurrencyListComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "micro-service-status",
        component: CoreLogMicroServiceStatusListComponent,
        data: { title: "ROUTE.CORELOG.MICROSERVICESTATUS" },
      },
      {
        path: "micro-service-ping",
        component: CoreLogMicroServicePingListComponent,
        data: { title: "ROUTE.CORELOG.MICROSERVICEPING" },
      },
    ],
  },
];
