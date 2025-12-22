import { Routes } from "@angular/router";
import { CmsAuthGuard } from "./core/services/cmsAuthGuard.service";
import { RouteRedirectGuard } from "./core/services/route-redirect.guard";



export const routes: Routes = [
  {
    path: "test",
    canActivate: [RouteRedirectGuard],
    loadChildren: () =>
      import("./modules/test/test.module").then((m) => m.TestModule),
  },
  {
    path: "error",
    canActivate: [RouteRedirectGuard],
    loadChildren: () =>
      import("./modules/errors/errors.module").then((m) => m.ErrorsModule),
  },
  {
    path: "page",
    canActivate: [RouteRedirectGuard],
    loadChildren: () =>
      import("./modules/pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "auth",
    canActivate: [RouteRedirectGuard],
    loadChildren: () =>
      import("./cms-modules/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "",
    canActivate: [RouteRedirectGuard, CmsAuthGuard],
    loadChildren: () =>
      import("./modules/panel/panel.module").then((m) => m.PanelModule),
  },

  { path: "**", redirectTo: "error/404" },
];
