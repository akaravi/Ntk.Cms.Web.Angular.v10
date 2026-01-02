import { Routes } from "@angular/router";
import { DataProviderMainComponent } from "./data-provider-main.component";
import { DataProviderClientListMobileComponent } from "./client/list/list.mobile.component";
import { DataProviderClientPermissionListMobileComponent } from "./client-permission/list/list.mobile.component";
import { DataProviderPlanListMobileComponent } from "./plan/list/list.mobile.component";
import { DataProviderPlanClientListMobileComponent } from "./plan-client/list/list.mobile.component";
import { DataProviderPlanPriceListMobileComponent } from "./plan-price/list/list.mobile.component";
import { DataProviderPlanSourceListMobileComponent } from "./plan-source/list/list.mobile.component";
import { DataProviderSourceListMobileComponent } from "./source/list/list.mobile.component";
import { DataProviderSourceCompanyListMobileComponent } from "./source-company/list/list.mobile.component";
import { DataProviderSourcePathListMobileComponent } from "./source-path/list/list.mobile.component";
import { DataProviderSourcePublicConfigListMobileComponent } from "./source-public-config/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: DataProviderMainComponent,
    data: { title: "ROUTE.DATAPROVIDER.MAIN" },
    children: [
      {
        path: "client",
        component: DataProviderClientListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.CLIENT" },
      },
      {
        path: "plan",
        component: DataProviderPlanListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLAN" },
      },
      {
        path: "source",
        component: DataProviderSourceListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.SOURCE" },
      },
      {
        path: "source/list/LinkSourceCompanyId/:LinkSourceCompanyId",
        component: DataProviderSourceListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.SOURCE" },
      },
      {
        path: "plan-client",
        component: DataProviderPlanClientListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANCLIENT" },
      },
      {
        path: "plan-client/LinkPlanId/:LinkPlanId",
        component: DataProviderPlanClientListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANCLIENT" },
      },
      {
        path: "plan-client/LinkClientId/:LinkClientId",
        component: DataProviderPlanClientListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANCLIENT" },
      },
      {
        path: "plan/LinkPlanCategory/:LinkPlanCategory",
        component: DataProviderPlanListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLAN" },
      },
      {
        path: "plan-source",
        component: DataProviderPlanSourceListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANSOURCE" },
      },
      {
        path: "plan-source/LinkPlanId/:LinkPlanId",
        component: DataProviderPlanSourceListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANSOURCE" },
      },
      {
        path: "plan-source/LinkSourceId/:LinkSourceId",
        component: DataProviderPlanSourceListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANSOURCE" },
      },
      {
        path: "plan-price",
        component: DataProviderPlanPriceListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANPRICE" },
      },
      {
        path: "plan-price/LinkPlanId/:LinkPlanId",
        component: DataProviderPlanPriceListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.PLANPRICE" },
      },
      {
        path: "source-company",
        component: DataProviderSourceCompanyListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.SOURCECOMPANY" },
      },
      {
        path: "source-public-config",
        component: DataProviderSourcePublicConfigListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.SOURCEPUBLICCONFIG" },
      },
      {
        path: "source-path",
        component: DataProviderSourcePathListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.SOURCEPATH" },
      },
      {
        path: "client-permission",
        component: DataProviderClientPermissionListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.CLIENTPERMISSION" },
      },
      {
        path: "client-permission/LinkUserId/:LinkUserId",
        component: DataProviderClientPermissionListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.CLIENTPERMISSION" },
      },
    ],
  },
];
