import { Routes } from "@angular/router";
import { DataProviderTransactionComponent } from "./data-provider-transaction.component";
import { DataProviderTransactionListComponent } from "./list/list.component";
import { DataProviderTransactionViewComponent } from "./view/view.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: DataProviderTransactionComponent,
    data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
    children: [
      {
        path: "",
        component: DataProviderTransactionListComponent,
        data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
      },
      {
        path: "list",
        component: DataProviderTransactionListComponent,
        data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
      },
      {
        path: "list/LinkPlanId/:LinkPlanId",
        component: DataProviderTransactionListComponent,
        data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
      },
      {
        path: "list/LinkCmsUserId/:LinkCmsUserId",
        component: DataProviderTransactionListComponent,
        data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
      },
      {
        path: "list/LinkClientId/:LinkClientId",
        component: DataProviderTransactionListComponent,
        data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
      },
      {
        path: "list/LinkSponsorId/:LinkSponsorId",
        component: DataProviderTransactionListComponent,
        data: { title: "ROUTE.DATAPROVIDER.TRANSACTION" },
      },
      {
        path: "list/LinkPlanPriceId/:LinkPlanPriceId",
        component: DataProviderTransactionListComponent,
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
