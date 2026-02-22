import { Routes } from "@angular/router";
import { NewsCategoryListComponent } from "./category/list/list.component";
import { NewsCommentListComponent } from "./comment/list/list.component";
import { NewsContentAddComponent } from "./content/add/add.component";
import { NewsContentEditComponent } from "./content/edit/edit.component";
import { NewsContentListComponent } from "./content/list/list.component";
import { NewsComponent } from "./news.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: NewsComponent,
    data: { title: "ROUTE.NEWS" },
    children: [
      {
        path: "content",
        component: NewsContentListComponent,
        data: { title: "ROUTE.NEWS.CONTENT" },
      },
      {
        path: "content/add/",
        component: NewsContentAddComponent,
        data: { title: "ROUTE.NEWS.CONTENT" },
      },
      {
        path: "content/add/:CategoryId",
        component: NewsContentAddComponent,
        data: { title: "ROUTE.NEWS.CONTENT" },
      },
      {
        path: "content/edit/:id",
        component: NewsContentEditComponent,
        data: { title: "ROUTE.NEWS.CONTENT" },
      },
      {
        path: "content/LinkCategoryId/:LinkCategoryId",
        component: NewsContentListComponent,
        data: { title: "ROUTE.NEWS.CONTENT" },
      },
      {
        path: "category",
        component: NewsCategoryListComponent,
        data: { title: "ROUTE.NEWS.CATEGORY" },
      },
      {
        path: "comment",
        component: NewsCommentListComponent,
        data: { title: "ROUTE.NEWS.COMMENT" },
      },
      {
        path: "comment/:ContentId",
        component: NewsCommentListComponent,
        data: { title: "ROUTE.NEWS.COMMENT" },
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
