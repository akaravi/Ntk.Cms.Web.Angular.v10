import { Routes } from "@angular/router";
import { CoreLogAvoidDuplicateDataEntryListMobileComponent } from "./avoid-duplicate/list/list.mobile.component";
import { CoreLogComponent } from "./coreLog.component";
import { CoreLogCurrencyListMobileComponent } from "./currency/list/list.mobile.component";
import { CoreLogEmailListMobileComponent } from "./email/list/list.mobile.component";
import { CoreLogErrorListMobileComponent } from "./error/list/list.mobile.component";
import { CoreLogMemberListMobileComponent } from "./member/list/list.mobile.component";
import { CoreLogNotificationListMobileComponent } from "./notification/list/list.mobile.component";
import { CoreLogReportDataListMobileComponent } from "./report-data/list/list.mobile.component";
import { CoreLogSmsListMobileComponent } from "./sms/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: CoreLogComponent,
    data: { title: "ROUTE.CORELOG" },
    children: [
      {
        path: "error",
        component: CoreLogErrorListMobileComponent,
        data: { title: "ROUTE.CORELOG.ERROR" },
      },
      {
        path: "avoid-duplicate",
        component: CoreLogAvoidDuplicateDataEntryListMobileComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "avoid-duplicate/:LinkUserId",
        component: CoreLogAvoidDuplicateDataEntryListMobileComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "sms",
        component: CoreLogSmsListMobileComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "email",
        component: CoreLogEmailListMobileComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "notification",
        component: CoreLogNotificationListMobileComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "report-data",
        component: CoreLogReportDataListMobileComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "report-data/LinkSiteId/:LinkSiteId",
        component: CoreLogReportDataListMobileComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "report-data/LinkUserId/:LinkUserId",
        component: CoreLogReportDataListMobileComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "report-data/LinkModuleEntityId/:LinkModuleEntityId",
        component: CoreLogReportDataListMobileComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "report-data/LinkModuleEntityReportFileId/:LinkModuleEntityReportFileId",
        component: CoreLogReportDataListMobileComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "member",
        component: CoreLogMemberListMobileComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "currency",
        component: CoreLogCurrencyListMobileComponent,
        data: { title: "ROUTE.CORELOG" },
      },
      {
        path: "currency/:LinkCurrencyId",
        component: CoreLogCurrencyListMobileComponent,
        data: { title: "ROUTE.CORELOG" },
      },
    ],
  },
];
