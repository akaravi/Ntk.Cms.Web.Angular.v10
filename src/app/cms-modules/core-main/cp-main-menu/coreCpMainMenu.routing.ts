import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreCpMainMenuComponent } from "./coreCpMainMenu.component";
import { CoreCpMainMenuEditComponent } from "./edit/edit.component";
import { CoreCpMainMenuListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    component: CoreCpMainMenuComponent,
    data: { title: "ROUTE.CORE.CPMAINMENU" },
    children: [
      {
        path: "",
        component: CoreCpMainMenuListComponent,
        data: { title: "ROUTE.CORE.CPMAINMENU" },
      },
      {
        path: "edit/:id",
        component: CoreCpMainMenuEditComponent,
        data: { title: "ROUTE.CORE.CPMAINMENU" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreCpMainMenuRouting {}
