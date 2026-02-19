import { Routes } from "@angular/router";
import { ChartComponent } from "./chart.component";
import { ChartCommentListComponent } from "./comment/list/list.component";
import { ChartContentAddComponent } from "./content/add/add.component";
import { ChartContentEditComponent } from "./content/edit/edit.component";
import { ChartContentListComponent } from "./content/list/list.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: ChartComponent,
    data: { title: "ROUTE.CHART" },
    children: [
      /* Config */
      {
        path: "config",
        loadChildren: () =>
          import("./config/chart-config.module").then(
            (m) => m.ChartConfigModule,
          ),
        data: { title: "ROUTE.CHART" },
      },
      /* Config */
      {
        path: "content",
        component: ChartContentListComponent,
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
        component: ChartCommentListComponent,
        data: { title: "ROUTE.CHART" },
      },
      {
        path: "comment/:ContentId",
        component: ChartCommentListComponent,
        data: { title: "ROUTE.CHART" },
      },
    ],
  },
];
