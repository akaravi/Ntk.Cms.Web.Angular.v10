import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CrmComponent } from "./crm.component";

const routes: Routes = [
  {
    path: "",
    component: CrmComponent,
    data: { title: "ROUTE.CRM" },
    children: [
      {
        path: "main",
        loadChildren: () =>
          import("./main/crm-main.module").then((m) => m.CrmMainModule),
        data: { title: "ROUTE.CRM.MAIN" },
      },
      {
        path: "",
        redirectTo: "main",
        pathMatch: "full",
        data: { title: "ROUTE.CRM" },
      },
      {
        path: "**",
        redirectTo: "error/404",
        data: { title: "ROUTE.CRM.MAIN" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmRoutes {}


