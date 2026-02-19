import { Routes } from "@angular/router";
import { CatalogComponent } from "./catalog.component";
import { CatalogContentAddComponent } from "./content/add/add.component";
import { CatalogContentEditComponent } from "./content/edit/edit.component";
import { CatalogContentListComponent } from "./content/list/list.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: CatalogComponent,
    data: { title: "ROUTE.CATALOG" },
    children: [
      /* Config */
      {
        path: "config",
        loadChildren: () =>
          import("./config/catalog-config.module").then(
            (m) => m.CatalogConfigModule,
          ),
        data: { title: "ROUTE.CATALOG" },
      },
      /* Config */
      {
        path: "content",
        component: CatalogContentListComponent,
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
    ],
  },
];
