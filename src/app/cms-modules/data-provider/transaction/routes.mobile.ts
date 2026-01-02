import { Routes } from "@angular/router";
import { DataProviderTransactionComponent } from "./data-provider-transaction.component";
// TODO: Import mobile components after creating them
// import { DataProviderTransactionListMobileComponent } from "./list/list.mobile.component";
// ... other mobile imports

export const routesMobile: Routes = [
  {
    path: "",
    component: DataProviderTransactionComponent,
    data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
    children: [
      // TODO: Add mobile routes after creating mobile components
      // For now, use normal components as fallback
    ],
  },
];
