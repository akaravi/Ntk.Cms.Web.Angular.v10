import { Routes } from "@angular/router";
import { BlogComponent } from "./blog.component";
import { BlogCommentListMobileComponent } from "./comment/list/list.mobile.component";
import { BlogContentAddComponent } from "./content/add/add.component";
import { BlogContentEditComponent } from "./content/edit/edit.component";
import { BlogContentListMobileComponent } from "./content/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: BlogComponent,
    data: { title: "ROUTE.BLOG" },
    children: [
      {
        path: "content",
        component: BlogContentListMobileComponent,
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
        component: BlogCommentListMobileComponent,
        data: { title: "ROUTE.BLOG" },
      },
      {
        path: "comment/:ContentId",
        component: BlogCommentListMobileComponent,
        data: { title: "ROUTE.BLOG" },
      },
      {
        path: "config",
        loadChildren: () =>
          import("./config/blog-config.module").then((m) => m.BlogConfigModule),
        data: { title: "ROUTE.BLOG" },
      },
    ],
  },
];
