import { Routes } from "@angular/router";
import { ArticleComponent } from "./article.component";
import { ArticleCommentListMobileComponent } from "./comment/list/list.mobile.component";
import { ArticleContentAddComponent } from "./content/add/add.component";
import { ArticleContentEditComponent } from "./content/edit/edit.component";
import { ArticleContentListMobileComponent } from "./content/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: ArticleComponent,
    data: { title: "ROUTE.ARTICLE" },
    children: [
      {
        path: "content",
        component: ArticleContentListMobileComponent,
        data: { title: "ROUTE.ARTICLE.CONTENT" },
      },
      {
        path: "content/add/",
        component: ArticleContentAddComponent,
        data: { title: "ROUTE.ARTICLE.CONTENT" },
      },
      {
        path: "content/add/:CategoryId",
        component: ArticleContentAddComponent,
        data: { title: "ROUTE.ARTICLE.CONTENT" },
      },
      {
        path: "content/edit/:id",
        component: ArticleContentEditComponent,
        data: { title: "ROUTE.ARTICLE.CONTENT" },
      },
      {
        path: "content/LinkCategoryId/:LinkCategoryId",
        component: ArticleContentListMobileComponent,
        data: { title: "ROUTE.ARTICLE.CONTENT" },
      },
      {
        path: "comment",
        component: ArticleCommentListMobileComponent,
        data: { title: "ROUTE.ARTICLE.COMMENT" },
      },
      {
        path: "comment/:ContentId",
        component: ArticleCommentListMobileComponent,
        data: { title: "ROUTE.ARTICLE.COMMENT" },
      },
      {
        path: "config",
        loadChildren: () =>
          import("./config/article-config.module").then(
            (m) => m.ArticleConfigModule,
          ),
        data: { title: "ROUTE.ARTICLE" },
      },
    ],
  },
];
