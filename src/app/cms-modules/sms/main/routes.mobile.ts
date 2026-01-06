import { Routes } from "@angular/router";
import { SmsMainApiNumberPermissionListMobileComponent } from "./api-number-permission/list/list.mobile.component";
import { SmsMainApiNumberListMobileComponent } from "./api-number/list/list.mobile.component";
import { SmsMainApiPathCompanyListMobileComponent } from "./api-path-company/list/list.mobile.component";
import { SmsMainApiPathPermissionListMobileComponent } from "./api-path-permission/list/list.mobile.component";
import { SmsMainApiPathPaginationListMobileComponent } from "./api-path-pagination/list/list.mobile.component";
import { SmsMainApiPathEditComponent } from "./api-path/edit/edit.component";
import { SmsMainApiPathListMobileComponent } from "./api-path/list/list.mobile.component";
import { SmsMainClientApplicationListMobileComponent } from "./client-application/list/list.mobile.component";
import { SmsMainClientApplicationPermissionListComponent } from "./client-application-permission/list/list.component";
import { SmsMainMessageContentListMobileComponent } from "./message-content/list/list.mobile.component";
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
        path: "api-path-pagination",
        component: SmsMainApiPathPaginationListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-pagination/LinkApiPathId/:LinkApiPathId",
        component: SmsMainApiPathPaginationListMobileComponent,
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
        path: "client-application",
        component: SmsMainClientApplicationListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "client-application/LinkUserId/:LinkUserId",
        component: SmsMainClientApplicationListMobileComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "client-application-permission",
        component: SmsMainClientApplicationPermissionListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "client-application-permission/LinkClientApplicationId/:LinkClientApplicationId",
        component: SmsMainClientApplicationPermissionListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "client-application-permission/LinkApiPathId/:LinkApiPathId",
        component: SmsMainClientApplicationPermissionListComponent,
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
