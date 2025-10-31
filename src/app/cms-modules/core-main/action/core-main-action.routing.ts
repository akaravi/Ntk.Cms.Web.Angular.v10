import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreMainActionComponent } from "./core-main-action.component";
import { CoreMainActionSendNotificationComponent } from "./send-notification/send-notification.component";

const routes: Routes = [
  {
    path: "",
    component: CoreMainActionComponent,
    data: { title: "ROUTE.CORE.ACTION" },
    children: [
      {
        path: "send-notification",
        component: CoreMainActionSendNotificationComponent,
        data: { title: "ROUTE.CORE.ACTION" },
      },
      {
        path: "send-notification/inbox-extras",
        component: CoreMainActionSendNotificationComponent,
        data: { title: "ROUTE.CORE.ACTION" },
      },
      {
        path: "send-notification/outbox-extras",
        component: CoreMainActionSendNotificationComponent,
        data: { title: "ROUTE.CORE.ACTION" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreMainActionRoutes {}
