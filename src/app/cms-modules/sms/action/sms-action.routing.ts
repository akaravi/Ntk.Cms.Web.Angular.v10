import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { routesNormal } from "./routes.normal";
import { routesMobile } from "./routes.mobile";
/**توجه این روت دو بخش داد باید در هر دو بخش روت ها اضفا شود */

@NgModule({
  imports: [
    RouterModule.forChild(getResponsiveRoutes(routesMobile, routesNormal)),
    //RouterModule.forChild(routesNormal),
  ],
  exports: [RouterModule],
})
export class SmsActionRoutes {}
