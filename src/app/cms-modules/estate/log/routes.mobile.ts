import { Routes } from "@angular/router";
import { EstateCustomerOrderResultListMobileComponent } from "./customer-order-result/list/list.mobile.component";
import { EstateCustomerOrderAddMobileComponent } from "./customer-order/add/add.mobile.component";
import { EstateCustomerOrderEditMobileComponent } from "./customer-order/edit/edit.mobile.component";
import { EstateLogComponent } from "./estate-log.component";
import { EstatePropertyExpertPriceListMobileComponent } from "./property-expert-price/list/list.mobile.component";
import { EstatePropertyExpertPriceAddMobileComponent } from "./property-expert-price/add/add.mobile.component";
import { EstatePropertyExpertPriceEditMobileComponent } from "./property-expert-price/edit/edit.mobile.component";
import { EstatePropertyHistoryAddMobileComponent } from "./property-history/add/add.mobile.component";
import { EstatePropertyHistoryEditMobileComponent } from "./property-history/edit/edit.mobile.component";
import { EstatePropertyHistoryListMobileComponent } from "./property-history/list/list.mobile.component";
import { EstateCustomerOrderListMobileComponent } from "./customer-order/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: EstateLogComponent,
    data: { title: "ROUTE.ESTATE.LOG" },
    children: [
      {
        path: "property-history",
        component: EstatePropertyHistoryListMobileComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/InCheckingOnDay/:InCheckingOnDay",
        component: EstatePropertyHistoryListMobileComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/InCheckingPlanedToDay/:InCheckingPlanedToDay",
        component: EstatePropertyHistoryListMobileComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/LinkPropertyId/:LinkPropertyId",
        component: EstatePropertyHistoryListMobileComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/LinkEstateExpertId/:LinkEstateExpertId",
        component: EstatePropertyHistoryListMobileComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/LinkCustomerOrderId/:LinkCustomerOrderId",
        component: EstatePropertyHistoryListMobileComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/LinkEstateAgencyId/:LinkEstateAgencyId",
        component: EstatePropertyHistoryListMobileComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/recordstatus/:RecordStatus",
        component: EstatePropertyHistoryListMobileComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/responsibleUserId/:ResponsibleUserId",
        component: EstatePropertyHistoryListMobileComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/activitystatus/:ActivityStatus",
        component: EstatePropertyHistoryListMobileComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/action/:Action",
        component: EstatePropertyHistoryListMobileComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/add",
        component: EstatePropertyHistoryAddMobileComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/edit/:id",
        component: EstatePropertyHistoryEditMobileComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      /**/
      {
        path: "expert-price",
        component: EstatePropertyExpertPriceListMobileComponent,
        data: { title: "ROUTE.EXPERT.PRICE" },
      },
      {
        path: "expert-price/add",
        component: EstatePropertyExpertPriceAddMobileComponent,
        data: { title: "ROUTE.EXPERT.PRICE" },
      },
      {
        path: "expert-price/edit/:id",
        component: EstatePropertyExpertPriceEditMobileComponent,
        data: { title: "ROUTE.EXPERT.PRICE" },
      },
      /**/
      {
        path: "customer-order-result/LinkCustomerOrder/:LinkCustomerOrder",
        component: EstateCustomerOrderResultListMobileComponent,
        data: { title: "ROUTE.ESTATE.CUSTOMER.ORDERRESULT" },
      },
      {
        path: "customer-order-result/LinkProperty/:LinkProperty",
        component: EstateCustomerOrderResultListMobileComponent,
        data: { title: "ROUTE.ESTATE.CUSTOMER.ORDERRESULT" },
      },
      {
        path: "customer-order",
        component: EstateCustomerOrderListMobileComponent,
        data: { title: "ROUTE.ESTATE.CUSTOMER.ORDER" },
      },
      {
        path: "customer-order/recordstatus/:RecordStatus",
        component: EstateCustomerOrderListMobileComponent,
        data: { title: "ROUTE.ESTATE.CUSTOMER.ORDER" },
      },
      {
        path: "customer-order/recordstatus/:RecordStatus/:ResponsibleUserId",
        component: EstateCustomerOrderListMobileComponent,
        data: { title: "ROUTE.ESTATE.CUSTOMER.ORDER" },
      },
      {
        path: "customer-order/responsibleUserId/:ResponsibleUserId",
        component: EstateCustomerOrderListMobileComponent,
        data: { title: "ROUTE.ESTATE.CUSTOMER.ORDER" },
      },
      {
        path: "customer-order/add",
        component: EstateCustomerOrderAddMobileComponent,
        data: { title: "ROUTE.ESTATE.CUSTOMER.ORDER" },
      },
      {
        path: "customer-order/edit/:id",
        component: EstateCustomerOrderEditMobileComponent,
        data: { title: "ROUTE.ESTATE.CUSTOMER.ORDER" },
      },
      /**/
    ],
  },
];
