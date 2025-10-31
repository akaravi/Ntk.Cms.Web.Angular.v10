import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreLocationListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CORE.LOCATION" },
    children: [
      {
        path: "",
        component: CoreLocationListComponent,
        data: { title: "ROUTE.CORE.LOCATION" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreLocationRouting {}
