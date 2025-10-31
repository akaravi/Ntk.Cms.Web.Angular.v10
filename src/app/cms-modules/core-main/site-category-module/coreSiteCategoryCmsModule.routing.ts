import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreSiteCategoryCmsModuleListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CORE.SITECATEGORYMODULE" },
    children: [
      {
        path: "",
        component: CoreSiteCategoryCmsModuleListComponent,
        data: { title: "ROUTE.CORE.SITECATEGORYMODULE" },
      },
      {
        path: "LinkCmsModuleId/:LinkCmsModuleId",
        component: CoreSiteCategoryCmsModuleListComponent,
        data: { title: "ROUTE.CORE.SITECATEGORYMODULE" },
      },
      {
        path: "LinkCmsSiteCategoryId/:LinkCmsSiteCategoryId",
        component: CoreSiteCategoryCmsModuleListComponent,
        data: { title: "ROUTE.CORE.SITECATEGORYMODULE" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreSiteCategoryCmsModuleRouting {}
