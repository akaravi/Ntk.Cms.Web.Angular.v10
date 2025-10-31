import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SmsMainApiNumberPermissionListComponent } from "./api-number-permission/list/list.component";
import { SmsMainApiNumberListComponent } from "./api-number/list/list.component";
import { SmsMainApiPathCompanyListComponent } from "./api-path-company/list/list.component";
import { SmsMainApiPathPermissionListComponent } from "./api-path-permission/list/list.component";
import { SmsMainApiPathPriceServiceListComponent } from "./api-path-price-service/list/list.component";
import { SmsMainApiPathEditComponent } from "./api-path/edit/edit.component";
import { SmsMainApiPathListComponent } from "./api-path/list/list.component";
import { SmsMainCustomerCreditListComponent } from "./customer-credit/list/list.component";
import { SmsMainMessageContentListComponent } from "./message-content/list/list.component";
import { SmsMainApiPathPublicConfigListComponent } from "./public-config/list/list.component";
import { SmsMainComponent } from "./sms-main.component";

const routes: Routes = [
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
        path: "api-path/edit/:Id",
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
        path: "api-path-price-service",
        component: SmsMainApiPathPriceServiceListComponent,
        data: { title: "ROUTE.SMS.MAIN" },
      },
      {
        path: "api-path-price-service/LinkApiPathId/:LinkApiPathId",
        component: SmsMainApiPathPriceServiceListComponent,
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
        path: "customer-credit",
        component: SmsMainCustomerCreditListComponent,
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsMainRoutes {}
