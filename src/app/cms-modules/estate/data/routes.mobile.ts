import { Routes } from "@angular/router";
import { EstateDataComponent } from "./estate-data.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: EstateDataComponent,
    data: { title: "ROUTE.ESTATE.DATA" },
    children: [],
  },
];
