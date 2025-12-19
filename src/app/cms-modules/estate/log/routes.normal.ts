import { Routes } from "@angular/router";
import { EstateCustomerOrderResultListComponent } from "../customer-order-result/list/list.component";
import { EstatePropertyExpertPriceListComponent } from "../property-expert-price/list/list.component";
import { EstatePropertyHistoryListComponent } from "../property-history/list/list.component";
import { EstateLogComponent } from "./estate-log.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: EstateLogComponent,
    data: { title: "ROUTE.ESTATE.LOG" },
    children: [
      {
        path: "property-history",
        component: EstatePropertyHistoryListComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/InCheckingOnDay/:InCheckingOnDay",
        component: EstatePropertyHistoryListComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/InCheckingPlanedToDay/:InCheckingPlanedToDay",
        component: EstatePropertyHistoryListComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/LinkPropertyId/:LinkPropertyId",
        component: EstatePropertyHistoryListComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/LinkEstateExpertId/:LinkEstateExpertId",
        component: EstatePropertyHistoryListComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/LinkCustomerOrderId/:LinkCustomerOrderId",
        component: EstatePropertyHistoryListComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/LinkEstateAgencyId/:LinkEstateAgencyId",
        component: EstatePropertyHistoryListComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/recordstatus/:RecordStatus",
        component: EstatePropertyHistoryListComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/responsibleUserId/:ResponsibleUserId",
        component: EstatePropertyHistoryListComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/activitystatus/:ActivityStatus",
        component: EstatePropertyHistoryListComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      {
        path: "property-history/action/:Action",
        component: EstatePropertyHistoryListComponent,
        data: { title: "ROUTE.ESTATE.HISTORY" },
      },
      /**/
      {
        path: "expert-price",
        component: EstatePropertyExpertPriceListComponent,
        data: { title: "ROUTE.EXPERT.PRICE" },
      },
      /**/
      {
        path: "customer-order-result/LinkCustomerOrder/:LinkCustomerOrder",
        component: EstateCustomerOrderResultListComponent,
        data: { title: "ROUTE.ESTATE.CUSTOMER.ORDERRESULT" },
      },
      {
        path: "customer-order-result/LinkProperty/:LinkProperty",
        component: EstateCustomerOrderResultListComponent,
        data: { title: "ROUTE.ESTATE.CUSTOMER.ORDERRESULT" },
      },
      /**/
    ],
  },
];
