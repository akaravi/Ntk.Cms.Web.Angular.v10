import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { routesMobile } from "./routes.mobile";
import { routesNormal } from "./routes.normal";
/**توجه این روت دو بخش داد باید در هر دو بخش روت ها اضفا شود */

@NgModule({
  imports: [
    RouterModule.forChild(window.innerWidth < 1000 ? routesMobile : routesNormal),
    //RouterModule.forChild(routesNormal),
  ],
  exports: [RouterModule],
})
export class DataProviderTransactionRoutes {}
