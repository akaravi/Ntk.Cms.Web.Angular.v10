import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreUserSupportAccessListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CORE.USERSUPPORT" },
    children: [
      {
        path: "",
        component: CoreUserSupportAccessListComponent,
        data: { title: "ROUTE.CORE.USERSUPPORT" },
      },
      {
        path: "list/LinkSiteId/:LinkSiteId/LinkUserId/:LinkUserId",
        component: CoreUserSupportAccessListComponent,
        data: { title: "ROUTE.CORE.USERSUPPORT" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreUserSupportAccessRouting {}
