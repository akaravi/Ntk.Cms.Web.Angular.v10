import { Routes } from "@angular/router";
import { ChartComponent } from "./chart.component";
import { ChartCommentListMobileComponent } from "./comment/list/list.mobile.component";
import { ChartContentAddComponent } from "./content/add/add.component";
import { ChartContentEditComponent } from "./content/edit/edit.component";
import { ChartContentListMobileComponent } from "./content/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: ChartComponent,
    data: { title: "ROUTE.CHART" },
    children: [
      {
        path: "content",
        component: ChartContentListMobileComponent,
        data: { title: "ROUTE.CHART" },
      },
      {
        path: "content/add/:CategoryId",
        component: ChartContentAddComponent,
        data: { title: "ROUTE.CHART" },
      },
      {
        path: "content/edit/:id",
        component: ChartContentEditComponent,
        data: { title: "ROUTE.CHART" },
      },
      {
        path: "comment",
        component: ChartCommentListMobileComponent,
        data: { title: "ROUTE.CHART" },
      },
      {
        path: "comment/:ContentId",
        component: ChartCommentListMobileComponent,
        data: { title: "ROUTE.CHART" },
      },
      {
        path: "config",
        loadChildren: () =>
          import("./config/chart-config.module").then(
            (m) => m.ChartConfigModule,
          ),
        data: { title: "ROUTE.CHART" },
      },
    ],
  },
];
