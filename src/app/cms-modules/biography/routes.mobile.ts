import { Routes } from "@angular/router";
import { BiographyComponent } from "./biography.component";
import { BiographyCommentListMobileComponent } from "./comment/list/list.mobile.component";
import { BiographyContentAddComponent } from "./content/add/add.component";
import { BiographyContentEditComponent } from "./content/edit/edit.component";
import { BiographyContentListMobileComponent } from "./content/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: BiographyComponent,
    data: { title: "ROUTE.BIOGRAPHY" },
    children: [
      {
        path: "content",
        component: BiographyContentListMobileComponent,
        data: { title: "ROUTE.BIOGRAPHY" },
      },
      {
        path: "content/add/:CategoryId",
        component: BiographyContentAddComponent,
        data: { title: "ROUTE.BIOGRAPHY" },
      },
      {
        path: "content/edit/:id",
        component: BiographyContentEditComponent,
        data: { title: "ROUTE.BIOGRAPHY" },
      },
      {
        path: "comment",
        component: BiographyCommentListMobileComponent,
        data: { title: "ROUTE.BIOGRAPHY" },
      },
      {
        path: "comment/:ContentId",
        component: BiographyCommentListMobileComponent,
        data: { title: "ROUTE.BIOGRAPHY" },
      },
      {
        path: "config",
        loadChildren: () =>
          import("./config/biography-config.module").then(
            (m) => m.BiographyConfigModule,
          ),
        data: { title: "ROUTE.BIOGRAPHY" },
      },
    ],
  },
];
