import { Routes } from "@angular/router";
import { DataProviderLogComponent } from "./data-provider-log.component";
// TODO: Import mobile components after creating them
// import { DataProviderLogClientListMobileComponent } from "./client/list/list.mobile.component";
// ... other mobile imports

export const routesMobile: Routes = [
  {
    path: "",
    component: DataProviderLogComponent,
    data: { title: "ROUTE.DATAPROVIDER.LOG" },
    children: [
      // TODO: Add mobile routes after creating mobile components
      // For now, use normal components as fallback
    ],
  },
];
