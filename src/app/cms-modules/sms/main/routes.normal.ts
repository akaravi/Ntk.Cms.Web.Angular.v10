import { Routes } from "@angular/router";
import { SmsMainApiNumberPermissionListComponent } from "./api-number-permission/list/list.component";
import { SmsMainApiNumberListComponent } from "./api-number/list/list.component";
import { SmsMainApiPathCompanyListComponent } from "./api-path-company/list/list.component";
import { SmsMainApiPathPaginationListComponent } from "./api-path-pagination/list/list.component";
import { SmsMainApiPathPermissionListComponent } from "./api-path-permission/list/list.component";
import { SmsMainApiPathPricePermissionListComponent } from "./api-path-price-permission/list/list.component";
import { SmsMainApiPathEditComponent } from "./api-path/edit/edit.component";
import { SmsMainApiPathListComponent } from "./api-path/list/list.component";
import { SmsMainClientApplicationListComponent } from "./client-application/list/list.component";
import { SmsMainClientApplicationPermissionListComponent } from "./client-application-permission/list/list.component";
import { SmsMainMessageContentListComponent } from "./message-content/list/list.component";
import { SmsMainApiPathPublicConfigListComponent } from "./public-config/list/list.component";
import { SmsMainComponent } from "./sms-main.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: SmsMainComponent,
    data: { title: "ROUTE.SMS.MAIN" },
    children: [
      {
        path: "api-path-company",
        component: SmsMainApiPathCompanyListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "publicconfig",
        component: SmsMainApiPathPublicConfigListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path",
        component: SmsMainApiPathListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path/list",
        component: SmsMainApiPathListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path/list/LinkCompanyId/:LinkCompanyId",
        component: SmsMainApiPathListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path/list/LinkPublicConfigId/:LinkPublicConfigId",
        component: SmsMainApiPathListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path/list/LinkSiteId/:LinkSiteId",
        component: SmsMainApiPathListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path/edit/:id",
        component: SmsMainApiPathEditComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-permission",
        component: SmsMainApiPathPermissionListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-permission/LinkApiPathId/:LinkApiPathId",
        component: SmsMainApiPathPermissionListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-permission/LinkUserId/:LinkUserId",
        component: SmsMainApiPathPermissionListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-permission/LinkSiteId/:LinkSiteId",
        component: SmsMainApiPathPermissionListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-pagination",
        component: SmsMainApiPathPaginationListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-pagination/LinkApiPathId/:LinkApiPathId",
        component: SmsMainApiPathPaginationListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-price-permission",
        component: SmsMainApiPathPricePermissionListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-price-permission/LinkApiPathId/:LinkApiPathId",
        component: SmsMainApiPathPricePermissionListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-price-permission/LinkApiPathPaginationId/:LinkApiPathPaginationId",
        component: SmsMainApiPathPricePermissionListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-number",
        component: SmsMainApiNumberListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-number/LinkApiPathId/:LinkApiPathId",
        component: SmsMainApiNumberListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-number-permission",
        component: SmsMainApiNumberPermissionListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-number-permission/LinkApiNumberId/:LinkApiNumberId",
        component: SmsMainApiNumberPermissionListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-number-permission/LinkUserId/:LinkUserId",
        component: SmsMainApiNumberPermissionListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-number-permission/LinkSiteId/:LinkSiteId",
        component: SmsMainApiNumberPermissionListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "client-application",
        component: SmsMainClientApplicationListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "client-application/LinkUserId/:LinkUserId",
        component: SmsMainClientApplicationListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "client-application/LinkSiteId/:LinkSiteId",
        component: SmsMainClientApplicationListComponent,
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
        component: SmsMainMessageContentListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
    ],
  },
];
