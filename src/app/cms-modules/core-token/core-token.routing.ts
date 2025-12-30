import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreTokenActivationListComponent } from "./activation/list/list.component";
import { CoreTokenComponent } from "./core-token.component";
import { CoreLogTokenMicroServiceListComponent } from "./micro-service-log/list/list.component";
import { CoreTokenMicroServiceListComponent } from "./micro-service/list/list.component";
import { CoreLogTokenConnectionListComponent } from "./notification-log/list/list.component";
import { CoreTokenConnectionListOnlineComponent } from "./notification/list-online/list-online.component";
import { CoreTokenConnectionListComponent } from "./notification/list/list.component";
import { CoreTokenUserBadLoginListComponent } from "./userBadLogin/list/list.component";
import { CoreTokenAuthUserListComponent } from "./auth-user/list/list.component";
import { CoreTokenAuthUserLogListComponent } from "./auth-user-log/list/list.component";


const routes: Routes = [
  {
    path: "",
    component: CoreTokenComponent,
    data: { title: "ROUTE.CORETOKEN" },
    children: [
      /** */
      {
        path: "auth-user",
        component: CoreTokenAuthUserListComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      {
        path: "auth-user/LinkSiteId/:LinkSiteId",
        component: CoreTokenAuthUserListComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      {
        path: "auth-user/LinkUserId/:LinkUserId",
        component: CoreTokenAuthUserListComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      {
        path: "auth-user/LinkDeviceId/:LinkDeviceId",
        component: CoreTokenAuthUserListComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      /** */
      {
        path: "auth-user-log",
        component: CoreTokenAuthUserLogListComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      {
        path: "auth-user-log/LinkSiteId/:LinkSiteId",
        component: CoreTokenAuthUserLogListComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      {
        path: "auth-user-log/LinkUserId/:LinkUserId",
        component: CoreTokenAuthUserLogListComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      {
        path: "auth-user-log/LinkDeviceId/:LinkDeviceId",
        component: CoreTokenAuthUserLogListComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      /** */
      {
        path: "userbadlogin",
        component: CoreTokenUserBadLoginListComponent,
        data: { title: "ROUTE.CORETOKEN.USERBADLOGIN" },
      },
      {
        path: "userbadlogin/LinkSiteId/:LinkSiteId",
        component: CoreTokenUserBadLoginListComponent,
        data: { title: "ROUTE.CORETOKEN.USERBADLOGIN" },
      },
      {
        path: "userbadlogin/LinkUserId/:LinkUserId",
        component: CoreTokenUserBadLoginListComponent,
        data: { title: "ROUTE.CORETOKEN.USERBADLOGIN" },
      },
      {
        path: "userbadlogin/LinkDeviceId/:LinkDeviceId",
        component: CoreTokenUserBadLoginListComponent,
        data: { title: "ROUTE.CORETOKEN.USERBADLOGIN" },
      },
      /** */
      {
        path: "activation",
        component: CoreTokenActivationListComponent,
        data: { title: "ROUTE.CORETOKEN.ACTIVATION" },
      },
      /** */
      {
        path: "microservice",
        component: CoreTokenMicroServiceListComponent,
        data: { title: "ROUTE.CORETOKEN.MICROSERVICE" },
      },
      /** */
      {
        path: "microservicelog",
        component: CoreLogTokenMicroServiceListComponent,
        data: { title: "ROUTE.CORETOKEN.MICROSERVICELOG" },
      },
      /** */
      {
        path: "notification",
        component: CoreTokenConnectionListComponent,
        data: { title: "ROUTE.CORETOKEN.NOTIFICATION" },
      },
      /** */
      {
        path: "online",
        component: CoreTokenConnectionListOnlineComponent,
        data: { title: "ROUTE.CORETOKEN.NOTIFICATION" },
      },

      /** */
      {
        path: "notificationlog",
        component: CoreLogTokenConnectionListComponent,
        data: { title: "ROUTE.CORETOKEN.NOTIFICATIONLOG" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreTokenRoutes {}
