import { Routes } from "@angular/router";
import { SmsActionSendMessageApiComponent } from "./send-message-api/send-message-api.component";
import { SmsActionSendMessageApiMobileComponent } from "./send-message-api/send-message-api.mobile.component";
import { SmsActionSendMessageComponent } from "./send-message/send-message.component";
import { SmsActionSendMessageMobileComponent } from "./send-message/send-message.mobile.component";
import { SmsActionComponent } from "./sms-action.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: SmsActionComponent,
    data: { title: "ROUTE.SMS.ACTION" },
    children: [
      {
        path: "send-message",
        component: SmsActionSendMessageMobileComponent,
        data: { title: "ROUTE.SMS.ACTION" },
      },
      {
        path: "send-message/LinkApiPathId/:LinkApiPathId",
        component: SmsActionSendMessageMobileComponent,
        data: { title: "ROUTE.SMS.ACTION" },
      },
      {
        path: "send-message/LinkApiNumberId/:LinkApiNumberId",
        component: SmsActionSendMessageMobileComponent,
        data: { title: "ROUTE.SMS.ACTION" },
      },
      {
        path: "send-api",
        component: SmsActionSendMessageApiMobileComponent,
        data: { title: "ROUTE.SMS.ACTION" },
      },
    ],
  },
];
