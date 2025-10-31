import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreModuleListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CORE.MODULE" },
    children: [
      {
        path: "",
        component: CoreModuleListComponent,
        data: { title: "ROUTE.CORE.MODULE" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreModuleRouting {}
