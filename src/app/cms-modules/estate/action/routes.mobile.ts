import { Routes } from "@angular/router";
import { EstateCustomerOrderEditComponent } from "../customer-order/edit/edit.component";
import { EstateCustomerOrderListComponent } from "../customer-order/list/list.component";
import { EstateActionComponent } from "./estate-action.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: EstateActionComponent,
    data: { title: "ROUTE.ESTATE.ACTION" },
    children: [
      {
        path: "customer-order",
        component: EstateCustomerOrderListComponent,
        data: { title: "ROUTE.ESTATE.CUSTOMER.ORDER" },
      },
      {
        path: "customer-order/recordstatus/:RecordStatus",
        component: EstateCustomerOrderListComponent,
        data: { title: "ROUTE.ESTATE.CUSTOMER.ORDER" },
      },
      {
        path: "customer-order/recordstatus/:RecordStatus/:ResponsibleUserId",
        component: EstateCustomerOrderListComponent,
        data: { title: "ROUTE.ESTATE.CUSTOMER.ORDER" },
      },
      {
        path: "customer-order/responsibleUserId/:ResponsibleUserId",
        component: EstateCustomerOrderListComponent,
        data: { title: "ROUTE.ESTATE.CUSTOMER.ORDER" },
      },
      // {
      //   path: 'customer-order/add',
      //   component: EstateCustomerOrderAddMobileComponent,
      //   data: { title: 'ROUTE.ESTATE.CUSTOMER.ORDER' },
      // },
      // {
      //   path: 'customer-order/add-copy/:id',
      //   component: EstateCustomerOrderAddMobileComponent,
      //   data: { title: 'ROUTE.ESTATE.CUSTOMER.ORDER' },
      // },

      // {
      //   path: 'customer-order/edit/:id',
      //   component: EstateCustomerOrderEditMobileComponent,
      //   data: { title: 'ROUTE.ESTATE.CUSTOMER.ORDER' },
      // },
    ],
  },
];
