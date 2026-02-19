import { Routes } from "@angular/router";
import { ArticleComponent } from "./article.component";
import { ArticleCommentListComponent } from "./comment/list/list.component";
import { ArticleContentAddComponent } from "./content/add/add.component";
import { ArticleContentEditComponent } from "./content/edit/edit.component";
import { ArticleContentListComponent } from "./content/list/list.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: ArticleComponent,
    data: { title: "ROUTE.ARTICLE" },
    children: [
      /* Config */
      {
        path: "config",
        loadChildren: () =>
          import("./config/article-config.module").then(
            (m) => m.ArticleConfigModule,
          ),
        data: { title: "ROUTE.ARTICLE" },
      },
      /* Config */
      {
        path: "content",
        component: ArticleContentListComponent,
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
        path: "comment",
        component: ArticleCommentListComponent,
        data: { title: "ROUTE.ARTICLE.COMMENT" },
      },
      {
        path: "comment/:ContentId",
        component: ArticleCommentListComponent,
        data: { title: "ROUTE.ARTICLE.COMMENT" },
      },
    ],
  },
];
