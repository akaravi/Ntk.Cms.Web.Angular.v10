import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreSiteDomainAliasListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CORE.SITEDOMAINALIAS" },
    children: [
      {
        path: "",
        component: CoreSiteDomainAliasListComponent,
        data: { title: "ROUTE.CORE.SITEDOMAINALIAS" },
      },
      {
        path: ":Id",
        component: CoreSiteDomainAliasListComponent,
        data: { title: "ROUTE.CORE.SITEDOMAINALIAS" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreSiteDomainAliasRouting {}
