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


    ],
  },
];
