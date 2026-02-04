import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DesktopViewportCanMatchGuard, MobileViewportCanMatchGuard } from "../../core/guards/responsive-route.guard";
import { withResponsiveRouteVariants } from "../../core/helpers/responsive-routing.helper";
import { routesMobile } from "./routes.mobile";
import { routesNormal } from "./routes.normal";
/**توجه این روت دو بخش داد باید در هر دو بخش روت ها اضفا شود */

@NgModule({
  imports: [
    RouterModule.forChild(withResponsiveRouteVariants(routesMobile, routesNormal, MobileViewportCanMatchGuard, DesktopViewportCanMatchGuard)),
    //RouterModule.forChild(routesNormal),
  ],
  exports: [RouterModule],
})
export class EstateLogRoutes {}
