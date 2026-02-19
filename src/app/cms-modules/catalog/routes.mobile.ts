import { Routes } from "@angular/router";
import { CatalogComponent } from "./catalog.component";
import { CatalogContentAddComponent } from "./content/add/add.component";
import { CatalogContentEditComponent } from "./content/edit/edit.component";
import { CatalogContentListMobileComponent } from "./content/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: CatalogComponent,
    data: { title: "ROUTE.CATALOG" },
    children: [
      {
        path: "content",
        component: CatalogContentListMobileComponent,
        data: { title: "ROUTE.CATALOG" },
      },
      {
        path: "content/add/:CategoryId",
        component: CatalogContentAddComponent,
        data: { title: "ROUTE.CATALOG" },
      },
      {
        path: "content/edit/:id",
        component: CatalogContentEditComponent,
        data: { title: "ROUTE.CATALOG" },
      },
      {
        path: "config",
        loadChildren: () =>
          import("./config/catalog-config.module").then(
            (m) => m.CatalogConfigModule,
          ),
        data: { title: "ROUTE.CATALOG" },
      },
    ],
  },
];
