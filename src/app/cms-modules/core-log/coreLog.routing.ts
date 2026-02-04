import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DesktopViewportCanMatchGuard, MobileViewportCanMatchGuard } from "src/app/core/guards/responsive-route.guard";
import { withResponsiveRouteVariants } from "src/app/core/helpers/responsive-routing.helper";
import { routesMobile } from "./routes.mobile";
import { routesNormal } from "./routes.normal";
/**توجه این روت دو بخش داد باید در هر دو بخش روت ها اضفا شود */

@NgModule({
  imports: [
    RouterModule.forChild(withResponsiveRouteVariants(routesMobile, routesNormal, MobileViewportCanMatchGuard, DesktopViewportCanMatchGuard)),
  ],
  exports: [RouterModule],
})
export class CoreLogRoutes {}
