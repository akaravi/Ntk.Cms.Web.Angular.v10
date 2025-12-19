import { Routes } from "@angular/router";
import { SmsLogApiPathListComponent } from "./api-path/list/list.component";
import { SmsLogInBoxListComponent } from "./inbox/list/list.component";
import { SmsLogOutBoxDetailListComponent } from "./outbox-detail/list/list.component";
import { SmsLogOutBoxQueueListComponent } from "./outbox-queue/list/list.component";
import { SmsLogOutBoxTaskSchedulerListComponent } from "./outbox-task-scheduler/list/list.component";
import { SmsLogOutBoxListComponent } from "./outbox/list/list.component";
import { SmsLogComponent } from "./sms-log.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: SmsLogComponent,
    data: { title: "ROUTE.SMS.LOG" },
    children: [
      /**inbox */
      {
        path: "inbox",
        component: SmsLogInBoxListComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "inbox/list/LinkPrivateConfigId/:LinkPrivateConfigId",
        component: SmsLogInBoxListComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "inbox/list/LinkApiNumberId/:LinkApiNumberId",
        component: SmsLogInBoxListComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "inbox/list/LinkSiteId/:LinkSiteId",
        component: SmsLogInBoxListComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      /**outbox */
      {
        path: "outbox",
        component: SmsLogOutBoxListComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox/list/LinkPrivateConfigId/:LinkPrivateConfigId",
        component: SmsLogOutBoxListComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox/list/LinkApiNumberId/:LinkApiNumberId",
        component: SmsLogOutBoxListComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox/list/LinkSiteId/:LinkSiteId",
        component: SmsLogOutBoxListComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox-detail/LinkOutBoxId/:LinkOutBoxId",
        component: SmsLogOutBoxDetailListComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "api-path/LinkApiPathId/:LinkApiPathId",
        component: SmsLogApiPathListComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox-queue",
        component: SmsLogOutBoxQueueListComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox-queue/LinkApiPathId/:LinkApiPathId",
        component: SmsLogOutBoxQueueListComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox-task-scheduler",
        component: SmsLogOutBoxTaskSchedulerListComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
      {
        path: "outbox-task-scheduler/LinkApiPathId/:LinkApiPathId",
        component: SmsLogOutBoxTaskSchedulerListComponent,
        data: { title: "ROUTE.SMS.LOG" },
      },
    ],
  },
];
