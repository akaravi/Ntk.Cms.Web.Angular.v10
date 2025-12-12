import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TransactionAssistantConfigCheckSiteComponent } from "./check-site/check-site.component";
import { TransactionAssistantConfigCheckUserComponent } from "./check-user/check-user.component";
import { TransactionAssistantConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { TransactionAssistantConfigSiteComponent } from "./site/config-site.component";
const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.TRANSACTIONASSISTANT" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: TransactionAssistantConfigMainAdminComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT" },
      },
      {
        path: "site",
        component: TransactionAssistantConfigSiteComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT" },
      },
      {
        path: "site/:LinkSiteId",
        component: TransactionAssistantConfigSiteComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT" },
      },
      {
        path: "checkuser",
        component: TransactionAssistantConfigCheckUserComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: TransactionAssistantConfigCheckUserComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT" },
      },
      {
        path: "checksite",
        component: TransactionAssistantConfigCheckSiteComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: TransactionAssistantConfigCheckSiteComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT" },
      },
      /*Config*/
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionAssistantConfigRouting {}

