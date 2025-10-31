import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreCurrencyListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CORE.CURRENCY" },
    children: [
      {
        path: "",
        component: CoreCurrencyListComponent,
        data: { title: "ROUTE.CORE.CURRENCY" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreCurrencyRouting {}
