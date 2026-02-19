import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routesMobile } from "./routes.mobile";
import { routesNormal } from "./routes.normal";

@NgModule({
  imports: [
    RouterModule.forChild(
      window.innerWidth < 1000 ? routesMobile : routesNormal,
    ),
  ],
  exports: [RouterModule],
})
export class CatalogRouting {}
