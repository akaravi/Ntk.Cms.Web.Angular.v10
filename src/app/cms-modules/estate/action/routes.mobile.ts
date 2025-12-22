import { Routes } from "@angular/router";
import { EstateActionComponent } from "./estate-action.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: EstateActionComponent,
    data: { title: "ROUTE.ESTATE.ACTION" },
    children: [],
  },
];
