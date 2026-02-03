import { Routes } from "@angular/router";
import { BankPaymentComponent } from "./bank-payment.component";
import { BankPaymentPrivateSiteConfigListMobileComponent } from "./private-site-config/list/list.mobile.component";
import { BankPaymentPublicConfigListMobileComponent } from "./public-config/list/list.mobile.component";
import { BankPaymentTransactionLogListMobileComponent } from "./transaction-log/list/list.mobile.component";
import { BankPaymentTransactionListMobileComponent } from "./transaction/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: BankPaymentComponent,
    data: { title: "ROUTE.BANKPAYMENT" },
    children: [
      /* Config */
      {
        path: "config",
        loadChildren: () =>
          import("./config/bank-payment-config.module").then(
            (m) => m.BankPaymentConfigModule,
          ),
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      /* Config */
      {
        path: "publicconfig",
        component: BankPaymentPublicConfigListMobileComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      {
        path: "privatesiteconfig",
        component: BankPaymentPrivateSiteConfigListMobileComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      {
        path: "privatesiteconfig/LinkPublicConfigId/:LinkPublicConfigId",
        component: BankPaymentPrivateSiteConfigListMobileComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      {
        path: "privatesiteconfig/LinkSiteId/:LinkSiteId",
        component: BankPaymentPrivateSiteConfigListMobileComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      {
        path: "transaction",
        component: BankPaymentTransactionListMobileComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      {
        path: "transaction/LinkTransactionId/:LinkTransactionId",
        component: BankPaymentTransactionListMobileComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      {
        path: "transaction/LinkPrivateSiteConfigId/:LinkPrivateSiteConfigId",
        component: BankPaymentTransactionListMobileComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      {
        path: "transaction/LinkUserId/:LinkUserId",
        component: BankPaymentTransactionListMobileComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      {
        path: "transactionlog",
        component: BankPaymentTransactionLogListMobileComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
      {
        path: "transactionlog/LinkTransactionId/:LinkTransactionId",
        component: BankPaymentTransactionLogListMobileComponent,
        data: { title: "ROUTE.BANKPAYMENT" },
      },
    ],
  },
];
