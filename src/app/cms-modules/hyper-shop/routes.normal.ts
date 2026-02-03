import { Routes } from "@angular/router";
import { HyperShopCategoryListComponent } from "./category/list/list.component";
import { HyperShopContentListComponent } from "./content/list/list.component";
import { HyperShopComponent } from "./hyper-shop.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: HyperShopComponent,
    data: { title: "ROUTE.HYPERSHOP" },
    children: [
      /* Config */
      {
        path: "config",
        loadChildren: () =>
          import("./config/hyper-shop-config.module").then(
            (m) => m.HyperShopConfigModule,
          ),
        data: { title: "ROUTE.HYPERSHOP" },
      },
      /* Config */
      {
        path: "category",
        component: HyperShopCategoryListComponent,
        data: { title: "ROUTE.HYPERSHOP.CATEGORY" },
      },
      /**/
      {
        path: "content",
        component: HyperShopContentListComponent,
        data: { title: "ROUTE.HYPERSHOP.CONTENT" },
      },
      {
        path: "content/PareintId/:PareintId",
        component: HyperShopContentListComponent,
        data: { title: "ROUTE.HYPERSHOP.CONTENT" },
      },
      /**/
    ],
  },
];
