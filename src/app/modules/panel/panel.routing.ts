import { Routes } from "@angular/router";
import { CmsAuthSiteGuard } from "src/app/core/services/cmsAuthSiteGuard.service";
import { PageDashboardComponent } from "./page-dashboard/page-dashboard.component";
import { PageMenuComponent } from "./page-menu/page-menu.component";
import { PanelComponent } from "./panel.component";

const PanelRouting: Routes = [
  {
    path: "",
    component: PanelComponent,
    data: { title: "ROUTE.PANEL" },
    children: [
      // ** cms */
      {
        path: "dashboard",
        canActivate: [CmsAuthSiteGuard],
        component: PageDashboardComponent,
        data: { title: "ROUTE.DASHBOARD" },
      },
      {
        path: "menu",
        canActivate: [CmsAuthSiteGuard],
        component: PageMenuComponent,
        data: { title: "ROUTE.PANEL.MENU" },
      },
      {
        path: "menu/LinkParentId/:LinkParentId",
        canActivate: [CmsAuthSiteGuard],
        component: PageMenuComponent,
        data: { title: "ROUTE.PANEL.MENU" },
      },
      {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full",
        data: { title: "ROUTE.PANEL" },
      },
      {
        path: "**",
        redirectTo: "error/404",
        data: { title: "ROUTE.ERROR" },
      },
    ],
  },
];

export { PanelRouting };
