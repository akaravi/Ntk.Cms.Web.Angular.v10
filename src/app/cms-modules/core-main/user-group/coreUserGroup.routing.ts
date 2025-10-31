import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreUserGroupListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CORE.USERGROUP" },
    children: [
      {
        path: "",
        component: CoreUserGroupListComponent,
        data: { title: "ROUTE.CORE.USERGROUP" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreUserGroupRouting {}
