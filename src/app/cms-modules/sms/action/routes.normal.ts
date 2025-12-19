import { Routes } from "@angular/router";
import { SmsActionSendMessageApiComponent } from "./send-message-api/send-message-api.component";
import { SmsActionSendMessageComponent } from "./send-message/send-message.component";
import { SmsActionComponent } from "./sms-action.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: SmsActionComponent,
    data: { title: "ROUTE.SMS.ACTION" },
    children: [
      {
        path: "send-message",
        component: SmsActionSendMessageComponent,
        data: { title: "ROUTE.SMS.ACTION" },
      },
      {
        path: "send-message/LinkApiPathId/:LinkApiPathId",
        component: SmsActionSendMessageComponent,
        data: { title: "ROUTE.SMS.ACTION" },
      },
      {
        path: "send-message/LinkApiNumberId/:LinkApiNumberId",
        component: SmsActionSendMessageComponent,
        data: { title: "ROUTE.SMS.ACTION" },
      },
      {
        path: "send-api",
        component: SmsActionSendMessageApiComponent,
        data: { title: "ROUTE.SMS.ACTION" },
      },
    ],
  },
];
