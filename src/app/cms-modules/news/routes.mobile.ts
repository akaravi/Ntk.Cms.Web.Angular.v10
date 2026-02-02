import { Routes } from "@angular/router";
import { NewsComponent } from "./news.component";
import { NewsCategoryListMobileComponent } from "./category/list/list.mobile.component";
import { NewsContentListMobileComponent } from "./content/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: NewsComponent,
    data: { title: "ROUTE.NEWS" },
    children: [
      {
        path: "content",
        component: NewsContentListMobileComponent,
        data: { title: "ROUTE.NEWS.CONTENT" },
      },
      {
        path: "content/LinkCategoryId/:LinkCategoryId",
        component: NewsContentListMobileComponent,
        data: { title: "ROUTE.NEWS.CONTENT" },
      },
      {
        path: "category",
        component: NewsCategoryListMobileComponent,
        data: { title: "ROUTE.NEWS.CATEGORY" },
      },
      {
        path: "config",
        loadChildren: () =>
          import("./config/news-config.module").then((m) => m.NewsConfigModule),
        data: { title: "ROUTE.NEWS" },
      },
    ],
  },
];
