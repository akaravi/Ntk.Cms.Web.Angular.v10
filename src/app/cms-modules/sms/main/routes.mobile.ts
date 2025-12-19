import { Routes } from "@angular/router";
import { SmsMainApiNumberPermissionListComponent } from "./api-number-permission/list/list.component";
import { SmsMainApiNumberPermissionListMobileComponent } from "./api-number-permission/list/list.mobile.component";
import { SmsMainApiNumberListComponent } from "./api-number/list/list.component";
import { SmsMainApiNumberListMobileComponent } from "./api-number/list/list.mobile.component";
import { SmsMainApiPathCompanyListComponent } from "./api-path-company/list/list.component";
import { SmsMainApiPathCompanyListMobileComponent } from "./api-path-company/list/list.mobile.component";
import { SmsMainApiPathPermissionListComponent } from "./api-path-permission/list/list.component";
import { SmsMainApiPathPermissionListMobileComponent } from "./api-path-permission/list/list.mobile.component";
import { SmsMainApiPathPriceServiceListComponent } from "./api-path-price-service/list/list.component";
import { SmsMainApiPathPriceServiceListMobileComponent } from "./api-path-price-service/list/list.mobile.component";
import { SmsMainApiPathEditComponent } from "./api-path/edit/edit.component";
import { SmsMainApiPathListComponent } from "./api-path/list/list.component";
import { SmsMainApiPathListMobileComponent } from "./api-path/list/list.mobile.component";
import { SmsMainClientPermissionListComponent } from "./client-permission/list/list.component";
import { SmsMainClientPermissionListMobileComponent } from "./client-permission/list/list.mobile.component";
import { SmsMainMessageContentListComponent } from "./message-content/list/list.component";
import { SmsMainMessageContentListMobileComponent } from "./message-content/list/list.mobile.component";
import { SmsMainApiPathPublicConfigListComponent } from "./public-config/list/list.component";
import { SmsMainApiPathPublicConfigListMobileComponent } from "./public-config/list/list.mobile.component";
import { SmsMainComponent } from "./sms-main.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: SmsMainComponent,
    data: { title: "ROUTE.SMS.MAIN" },
    children: [
      {
        path: "api-path-company",
        component: SmsMainApiPathCompanyListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "publicconfig",
        component: SmsMainApiPathPublicConfigListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
          {
            path: "api-path",
            component: SmsMainApiPathListMobileComponent,
            data: { title: "ROUTE.SMS.MAIN" },
          },
          {
            path: "api-path/list",
            component: SmsMainApiPathListMobileComponent,
            data: { title: "ROUTE.SMS.MAIN" },
          },
          {
            path: "api-path/list/LinkCompanyId/:LinkCompanyId",
            component: SmsMainApiPathListMobileComponent,
            data: { title: "ROUTE.SMS.MAIN" },
          },
          {
            path: "api-path/list/LinkPublicConfigId/:LinkPublicConfigId",
            component: SmsMainApiPathListMobileComponent,
            data: { title: "ROUTE.SMS.MAIN" },
          },
          {
            path: "api-path/list/LinkSiteId/:LinkSiteId",
            component: SmsMainApiPathListMobileComponent,
            data: { title: "ROUTE.SMS.MAIN" },
          },
      {
        path: "api-path/edit/:id",
        component: SmsMainApiPathEditComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-permission",
        component: SmsMainApiPathPermissionListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-permission/LinkApiPathId/:LinkApiPathId",
        component: SmsMainApiPathPermissionListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-permission/LinkUserId/:LinkUserId",
        component: SmsMainApiPathPermissionListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-permission/LinkSiteId/:LinkSiteId",
        component: SmsMainApiPathPermissionListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-price-service",
        component: SmsMainApiPathPriceServiceListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-price-service/LinkApiPathId/:LinkApiPathId",
        component: SmsMainApiPathPriceServiceListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-number",
        component: SmsMainApiNumberListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-number/LinkApiPathId/:LinkApiPathId",
        component: SmsMainApiNumberListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-number-permission",
        component: SmsMainApiNumberPermissionListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-number-permission/LinkApiNumberId/:LinkApiNumberId",
        component: SmsMainApiNumberPermissionListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-number-permission/LinkUserId/:LinkUserId",
        component: SmsMainApiNumberPermissionListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-number-permission/LinkSiteId/:LinkSiteId",
        component: SmsMainApiNumberPermissionListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "client-permission",
        component: SmsMainClientPermissionListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "client-permission/LinkUserId/:LinkUserId",
        component: SmsMainClientPermissionListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "message",
        component: SmsMainMessageContentListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
    ],
  },
];
