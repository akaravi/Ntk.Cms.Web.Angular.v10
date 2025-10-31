import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreModuleEntityListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CORE.MODULEENTITY" },
    children: [
      {
        path: "",
        component: CoreModuleEntityListComponent,
        data: { title: "ROUTE.CORE.MODULEENTITY" },
      },
      {
        path: "LinkModuleId/:LinkModuleId",
        component: CoreModuleEntityListComponent,
        data: { title: "ROUTE.CORE.MODULEENTITY" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreModuleEntityRouting {}
