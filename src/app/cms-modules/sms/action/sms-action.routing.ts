import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SmsActionSendMessageApiComponent } from "./send-message-api/send-message-api.component";
import { SmsActionSendMessageComponent } from "./send-message/send-message.component";
import { SmsActionComponent } from "./sms-action.component";

const routes: Routes = [
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
        path: "send-message/inbox-extras",
        component: SmsActionSendMessageComponent,
        data: { title: "ROUTE.SMS.ACTION" },
      },
      {
        path: "send-message/outbox-extras",
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsActionRoutes {}
