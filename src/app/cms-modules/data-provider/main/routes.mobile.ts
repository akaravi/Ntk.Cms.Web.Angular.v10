import { Routes } from "@angular/router";
import { DataProviderMainComponent } from "./data-provider-main.component";
// TODO: Import mobile components after creating them
// import { DataProviderClientListMobileComponent } from "./client/list/list.mobile.component";
// ... other mobile imports

export const routesMobile: Routes = [
  {
    path: "",
    component: DataProviderMainComponent,
    data: { title: "ROUTE.DATAPROVIDER.MAIN" },
    children: [
      // TODO: Add mobile routes after creating mobile components
      // For now, use normal components as fallback
      // {
      //   path: "client",
      //   component: DataProviderClientListMobileComponent,
      //   data: { title: "ROUTE.DATAPROVIDER.CLIENT" },
      // },
    ],
  },
];
