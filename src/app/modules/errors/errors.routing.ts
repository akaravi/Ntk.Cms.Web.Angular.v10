import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Error404Component } from "./error404/error404.component";
import { Error500Component } from "./error500/error500.component";
import { ErrorsComponent } from "./errors.component";

const routes: Routes = [
  {
    path: "",
    component: ErrorsComponent,
    data: { title: "ROUTE.ERROR" },
    children: [
      {
        path: "404",
        component: Error404Component,
        data: { title: "ROUTE.ERROR.404" },
      },
      {
        path: "500",
        component: Error500Component,
        data: { title: "ROUTE.ERROR.500" },
      },
      {
        path: "",
        redirectTo: "404",
        pathMatch: "full",
        data: { title: "ROUTE.ERROR" },
      },
      {
        path: "**",
        redirectTo: "404",
        pathMatch: "full",
        data: { title: "ROUTE.ERROR" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorsRoutingModule {}
