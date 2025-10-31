import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BankPaymentConfigCheckSiteComponent } from "./check-site/check-site.component";
import { BankPaymentConfigCheckUserComponent } from "./check-user/check-user.component";
import { BankPaymentConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { BankPaymentConfigSiteComponent } from "./site/config-site.component";
const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.BANKPAYMENT" },
    children: [
      /*Config*/
      {
        path: "mainadmin",
        component: BankPaymentConfigMainAdminComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      {
        path: "site",
        component: BankPaymentConfigSiteComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      {
        path: "site/:LinkSiteId",
        component: BankPaymentConfigSiteComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      {
        path: "checkuser",
        component: BankPaymentConfigCheckUserComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      {
        path: "checkuser/:LinkUserId",
        component: BankPaymentConfigCheckUserComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      {
        path: "checksite",
        component: BankPaymentConfigCheckSiteComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      {
        path: "checksite/:LinkSiteId",
        component: BankPaymentConfigCheckSiteComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      /*Config*/
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankPaymentConfigRouting {}
