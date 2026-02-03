import { Routes } from "@angular/router";
import { CoreTokenActivationListMobileComponent } from "./activation/list/list.mobile.component";
import { CoreTokenAuthUserLogListMobileComponent } from "./auth-user-log/list/list.mobile.component";
import { CoreTokenAuthUserListMobileComponent } from "./auth-user/list/list.mobile.component";
import { CoreTokenComponent } from "./core-token.component";
import { CoreLogTokenMicroServiceListMobileComponent } from "./micro-service-log/list/list.mobile.component";
import { CoreTokenMicroServiceListMobileComponent } from "./micro-service/list/list.mobile.component";
import { CoreLogTokenConnectionListMobileComponent } from "./notification-log/list/list.mobile.component";
import { CoreTokenConnectionListOnlineComponent } from "./notification/list-online/list-online.component";
import { CoreTokenConnectionListMobileComponent } from "./notification/list/list.mobile.component";
import { CoreTokenUserBadLoginListMobileComponent } from "./userBadLogin/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: CoreTokenComponent,
    data: { title: "ROUTE.CORETOKEN" },
    children: [
      /** */
      {
        path: "auth-user",
        component: CoreTokenAuthUserListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      {
        path: "auth-user/LinkSiteId/:LinkSiteId",
        component: CoreTokenAuthUserListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      {
        path: "auth-user/LinkUserId/:LinkUserId",
        component: CoreTokenAuthUserListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      {
        path: "auth-user/LinkDeviceId/:LinkDeviceId",
        component: CoreTokenAuthUserListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      /** */
      {
        path: "auth-user-log",
        component: CoreTokenAuthUserLogListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      {
        path: "auth-user-log/LinkSiteId/:LinkSiteId",
        component: CoreTokenAuthUserLogListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      {
        path: "auth-user-log/LinkUserId/:LinkUserId",
        component: CoreTokenAuthUserLogListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      {
        path: "auth-user-log/LinkDeviceId/:LinkDeviceId",
        component: CoreTokenAuthUserLogListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.USERLOG" },
      },
      /** */
      {
        path: "userbadlogin",
        component: CoreTokenUserBadLoginListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.USERBADLOGIN" },
      },
      {
        path: "userbadlogin/LinkSiteId/:LinkSiteId",
        component: CoreTokenUserBadLoginListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.USERBADLOGIN" },
      },
      {
        path: "userbadlogin/LinkUserId/:LinkUserId",
        component: CoreTokenUserBadLoginListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.USERBADLOGIN" },
      },
      {
        path: "userbadlogin/LinkDeviceId/:LinkDeviceId",
        component: CoreTokenUserBadLoginListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.USERBADLOGIN" },
      },
      /** */
      {
        path: "activation",
        component: CoreTokenActivationListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.ACTIVATION" },
      },
      /** */
      {
        path: "microservice",
        component: CoreTokenMicroServiceListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.MICROSERVICE" },
      },
      /** */
      {
        path: "microservicelog",
        component: CoreLogTokenMicroServiceListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.MICROSERVICELOG" },
      },
      /** */
      {
        path: "notification",
        component: CoreTokenConnectionListMobileComponent,
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
        component: CoreLogTokenConnectionListMobileComponent,
        data: { title: "ROUTE.CORETOKEN.NOTIFICATIONLOG" },
      },
    ],
  },
];
