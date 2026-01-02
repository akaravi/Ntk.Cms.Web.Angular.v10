import { Routes } from "@angular/router";
import { DataProviderTransactionComponent } from "./data-provider-transaction.component";
import { DataProviderTransactionListMobileComponent } from "./list/list.mobile.component";
import { DataProviderTransactionViewComponent } from "./view/view.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: DataProviderTransactionComponent,
    data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
    children: [
      {
        path: "",
        pathMatch: "full",
        component: DataProviderTransactionListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
      },
      {
        path: "list",
        component: DataProviderTransactionListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
      },
      {
        path: "list/LinkPlanId/:LinkPlanId",
        component: DataProviderTransactionListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
      },
      {
        path: "list/LinkCmsUserId/:LinkCmsUserId",
        component: DataProviderTransactionListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
      },
      {
        path: "list/LinkClientId/:LinkClientId",
        component: DataProviderTransactionListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
      },
      {
        path: "list/LinkSponsorId/:LinkSponsorId",
        component: DataProviderTransactionListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
      },
      {
        path: "list/LinkPlanPriceId/:LinkPlanPriceId",
        component: DataProviderTransactionListMobileComponent,
        data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
      },
      {
        path: "view/:id",
        component: DataProviderTransactionViewComponent,
        data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
      },
    ],
  },
];
