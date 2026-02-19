import { Routes } from "@angular/router";
import { BlogComponent } from "./blog.component";
import { BlogCommentListComponent } from "./comment/list/list.component";
import { BlogContentAddComponent } from "./content/add/add.component";
import { BlogContentEditComponent } from "./content/edit/edit.component";
import { BlogContentListComponent } from "./content/list/list.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: BlogComponent,
    data: { title: "ROUTE.BLOG" },
    children: [
      /* Config */
      {
        path: "config",
        loadChildren: () =>
          import("./config/blog-config.module").then((m) => m.BlogConfigModule),
        data: { title: "ROUTE.BLOG" },
      },
      /* Config */
      {
        path: "content",
        component: BlogContentListComponent,
        data: { title: "ROUTE.BLOG" },
      },
      {
        path: "content/add/:CategoryId",
        component: BlogContentAddComponent,
        data: { title: "ROUTE.BLOG" },
      },
      {
        path: "content/edit/:id",
        component: BlogContentEditComponent,
        data: { title: "ROUTE.BLOG" },
      },
      {
        path: "comment",
        component: BlogCommentListComponent,
        data: { title: "ROUTE.BLOG" },
      },
      {
        path: "comment/:ContentId",
        component: BlogCommentListComponent,
        data: { title: "ROUTE.BLOG" },
      },
    ],
  },
];
