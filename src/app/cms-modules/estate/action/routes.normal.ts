import { Routes } from "@angular/router";
import { EstateCustomerOrderEditComponent } from "../customer-order/edit/edit.component";
import { EstateCustomerOrderListComponent } from "../customer-order/list/list.component";
import { EstateActionComponent } from "./estate-action.component";

export const routesNormal: Routes = [
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
      {
        path: "customer-order/edit/:id",
        component: EstateCustomerOrderEditComponent,
        data: { title: "ROUTE.ESTATE.CUSTOMER.ORDER" },
      },
    ],
  },
];
