import { Routes } from "@angular/router";
import { DataProviderMainComponent } from "./data-provider-main.component";
import { DataProviderClientListComponent } from "./client/list/list.component";
import { DataProviderClientChargeComponent } from "./client/charge/charge.component";
import { DataProviderPlanListComponent } from "./plan/list/list.component";
import { DataProviderPlanClientListComponent } from "./plan-client/list/list.component";
import { DataProviderPlanPriceListComponent } from "./plan-price/list/list.component";
import { DataProviderPlanSourceListComponent } from "./plan-source/list/list.component";
import { DataProviderSourceListComponent } from "./source/list/list.component";
import { DataProviderSourceCompanyListComponent } from "./source-company/list/list.component";
import { DataProviderSourcePathListComponent } from "./source-path/list/list.component";
import { DataProviderSourcePublicConfigListComponent } from "./source-public-config/list/list.component";
import { DataProviderClientApplicationListComponent } from "./client-application/list/list.component";
import { DataProviderClientApplicationPermissionListComponent } from "./client-application-permission/list/list.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: DataProviderMainComponent,
    data: { title: "ROUTE.DATAPROVIDER.MAIN" },
    children: [
      {
        path: "client",
        component: DataProviderClientListComponent,
        data: { title: "ROUTE.DATAPROVIDER.CLIENT" },
      },
      {
        path: "client-charge/:LinkClientId",
        component: DataProviderClientChargeComponent,
        data: { title: "ROUTE.DATAPROVIDER.CLIENTCHARGE" },
      },
      {
        path: "source",
        component: DataProviderSourceListComponent,
        data: { title: "ROUTE.DATAPROVIDER.SOURCE" },
      },
      {
        path: "source/list/LinkSourceCompanyId/:LinkSourceCompanyId",
        component: DataProviderSourceListComponent,
        data: { title: "ROUTE.DATAPROVIDER.SOURCE" },
      },
      {
        path: "source-company",
        component: DataProviderSourceCompanyListComponent,
        data: { title: "ROUTE.DATAPROVIDER.SOURCECOMPANY" },
      },
      {
        path: "source-public-config",
        component: DataProviderSourcePublicConfigListComponent,
        data: { title: "ROUTE.DATAPROVIDER.SOURCEPUBLICCONFIG" },
      },
      {
        path: "source-path",
        component: DataProviderSourcePathListComponent,
        data: { title: "ROUTE.DATAPROVIDER.SOURCEPATH" },
      },
      {
        path: "client-application",
        component: DataProviderClientApplicationListComponent,
        data: { title: "ROUTE.DATAPROVIDER.CLIENTAPPLICATION" },
      },
      {
        path: "client-application/LinkUserId/:LinkUserId",
        component: DataProviderClientApplicationListComponent,
        data: { title: "ROUTE.DATAPROVIDER.CLIENTAPPLICATION" },
      },
      {
        path: "client-application-permission",
        component: DataProviderClientApplicationPermissionListComponent,
        data: { title: "ROUTE.DATAPROVIDER.CLIENTAPPLICATIONPERMISSION" },
      },
      {
        path: "client-application-permission/LinkClientApplicationId/:LinkClientApplicationId",
        component: DataProviderClientApplicationPermissionListComponent,
        data: { title: "ROUTE.DATAPROVIDER.CLIENTAPPLICATIONPERMISSION" },
      },
      {
        path: "client-application-permission/LinkSourcePathId/:LinkSourcePathId",
        component: DataProviderClientApplicationPermissionListComponent,
        data: { title: "ROUTE.DATAPROVIDER.CLIENTAPPLICATIONPERMISSION" },
      },
      {
        path: "plan-client",
        component: DataProviderPlanClientListComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANCLIENT" },
      },
      {
        path: "plan-client/LinkPlanId/:LinkPlanId",
        component: DataProviderPlanClientListComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANCLIENT" },
      },
      {
        path: "plan-client/LinkClientId/:LinkClientId",
        component: DataProviderPlanClientListComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANCLIENT" },
      },
      {
        path: "plan",
        component: DataProviderPlanListComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLAN" },
      },
      {
        path: "plan/LinkPlanCategory/:LinkPlanCategory",
        component: DataProviderPlanListComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLAN" },
      },
      {
        path: "plan-source",
        component: DataProviderPlanSourceListComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANSOURCE" },
      },
      {
        path: "plan-source/LinkPlanId/:LinkPlanId",
        component: DataProviderPlanSourceListComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANSOURCE" },
      },
      {
        path: "plan-source/LinkSourceId/:LinkSourceId",
        component: DataProviderPlanSourceListComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANSOURCE" },
      },
      {
        path: "plan-price",
        component: DataProviderPlanPriceListComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANPRICE" },
      },
      {
        path: "plan-price/LinkPlanId/:LinkPlanId",
        component: DataProviderPlanPriceListComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANPRICE" },
      },
    ],
  },
];
