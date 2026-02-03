import { Routes } from "@angular/router";
import { HyperShopCategoryListMobileComponent } from "./category/list/list.mobile.component";
import { HyperShopContentListMobileComponent } from "./content/list/list.mobile.component";
import { HyperShopComponent } from "./hyper-shop.component";

export const routesMobile: Routes = [
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
        component: HyperShopCategoryListMobileComponent,
        data: { title: "ROUTE.HYPERSHOP.CATEGORY" },
      },
      /**/
      {
        path: "content",
        component: HyperShopContentListMobileComponent,
        data: { title: "ROUTE.HYPERSHOP.CONTENT" },
      },
      {
        path: "content/PareintId/:PareintId",
        component: HyperShopContentListMobileComponent,
        data: { title: "ROUTE.HYPERSHOP.CONTENT" },
      },
      /**/
    ],
  },
];
