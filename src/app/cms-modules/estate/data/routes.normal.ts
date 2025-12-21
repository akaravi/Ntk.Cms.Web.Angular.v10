import { Routes } from "@angular/router";
import { EstateDataComponent } from "./estate-data.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: EstateDataComponent,
    data: { title: "ROUTE.ESTATE.DATA" },
    children: [],
  },
];
