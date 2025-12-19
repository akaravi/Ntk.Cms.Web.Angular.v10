import { Routes } from "@angular/router";
import { SmsLogApiPathListComponent } from "./api-path/list/list.component";
import { SmsLogApiPathListMobileComponent } from "./api-path/list/list.mobile.component";
import { SmsLogInBoxListMobileComponent } from "./inbox/list/list.mobile.component";
import { SmsLogOutBoxDetailListComponent } from "./outbox-detail/list/list.component";
import { SmsLogOutBoxDetailListMobileComponent } from "./outbox-detail/list/list.mobile.component";
import { SmsLogOutBoxQueueListMobileComponent } from "./outbox-queue/list/list.mobile.component";
import { SmsLogOutBoxTaskSchedulerListMobileComponent } from "./outbox-task-scheduler/list/list.mobile.component";
import { SmsLogOutBoxListMobileComponent } from "./outbox/list/list.mobile.component";
import { SmsLogComponent } from "./sms-log.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: SmsLogComponent,
    data: { title: "ROUTE.SMS.LOG" },
    children: [
      /**inbox */
      {
        path: "inbox",
        component: SmsLogInBoxListMobileComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "inbox/list/LinkPrivateConfigId/:LinkPrivateConfigId",
        component: SmsLogInBoxListMobileComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "inbox/list/LinkApiNumberId/:LinkApiNumberId",
        component: SmsLogInBoxListMobileComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "inbox/list/LinkSiteId/:LinkSiteId",
        component: SmsLogInBoxListMobileComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      /**outbox */
      {
        path: "outbox",
        component: SmsLogOutBoxListMobileComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox/list/LinkPrivateConfigId/:LinkPrivateConfigId",
        component: SmsLogOutBoxListMobileComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox/list/LinkApiNumberId/:LinkApiNumberId",
        component: SmsLogOutBoxListMobileComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox/list/LinkSiteId/:LinkSiteId",
        component: SmsLogOutBoxListMobileComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox-detail/LinkOutBoxId/:LinkOutBoxId",
        component: SmsLogOutBoxDetailListMobileComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "api-path/LinkApiPathId/:LinkApiPathId",
        component: SmsLogApiPathListMobileComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox-queue",
        component: SmsLogOutBoxQueueListMobileComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox-queue/LinkApiPathId/:LinkApiPathId",
        component: SmsLogOutBoxQueueListMobileComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox-task-scheduler",
        component: SmsLogOutBoxTaskSchedulerListMobileComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox-task-scheduler/LinkApiPathId/:LinkApiPathId",
        component: SmsLogOutBoxTaskSchedulerListMobileComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
    ],
  },
];
