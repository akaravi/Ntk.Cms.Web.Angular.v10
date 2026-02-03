import { Routes } from "@angular/router";
import { DonateComponent } from "./donate.component";
import { DonateLogViewListMobileComponent } from "./log-view/list/list.mobile.component";
import { DonateSponserListMobileComponent } from "./sponser/list/list.mobile.component";
import { DonateTargetPeriodSponserListMobileComponent } from "./target-period-sponsor/list/list.mobile.component";
import { DonateTargetPeriodChargeComponent } from "./target-period/charge/charge.component";
import { DonateTargetPeriodListMobileComponent } from "./target-period/list/list.mobile.component";
import { DonateTargetAddComponent } from "./target/add/add.component";
import { DonateTargetDeleteComponent } from "./target/delete/delete.component";
import { DonateTargetEditComponent } from "./target/edit/edit.component";
import { DonateTargetListMobileComponent } from "./target/list/list.mobile.component";
import { DonateTransactionListMobileComponent } from "./transaction/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: DonateComponent,
    data: { title: "ROUTE.DONATE" },
    children: [
      /* Config */
      {
        path: "config",
        loadChildren: () =>
          import("./config/donate-config.module").then(
            (m) => m.DonateConfigModule,
          ),
        data: { title: "ROUTE.DONATE" },
      },
      /* Config */
      {
        path: "target",
        component: DonateTargetListMobileComponent,
        data: { title: "ROUTE.DONATE.TARGET" },
      },
      {
        path: "target/add/:CategoryId",
        component: DonateTargetAddComponent,
        data: { title: "ROUTE.DONATE.TARGET" },
      },
      {
        path: "target/edit/:id",
        component: DonateTargetEditComponent,
        data: { title: "ROUTE.DONATE.TARGET" },
      },
      {
        path: "target/Delete/:id",
        component: DonateTargetDeleteComponent,
        data: { title: "ROUTE.DONATE.TARGET" },
      },
      {
        path: "log-view",
        component: DonateLogViewListMobileComponent,
        data: { title: "ROUTE.DONATE.LOGVIEW" },
      },
      {
        path: "log-view/:id",
        component: DonateLogViewListMobileComponent,
        data: { title: "ROUTE.DONATE.LOGVIEW" },
      },
      {
        path: "sponser",
        component: DonateSponserListMobileComponent,
        data: { title: "ROUTE.DONATE.SPONSER" },
      },
      {
        path: "target-period",
        component: DonateTargetPeriodListMobileComponent,
        data: { title: "ROUTE.DONATE.TARGETPERIOD" },
      },
      {
        path: "target-period/LinkTargeId/:LinkTargeId",
        component: DonateTargetPeriodListMobileComponent,
        data: { title: "ROUTE.DONATE.TARGETPERIOD" },
      },
      {
        path: "target-period-charge/:LinkTargetPeriodId",
        component: DonateTargetPeriodChargeComponent,
        data: { title: "ROUTE.DONATE.TARGETPERIODSPONSER" },
      },
      {
        path: "target-period-sponser",
        component: DonateTargetPeriodSponserListMobileComponent,
        data: { title: "ROUTE.DONATE.TARGETPERIODSPONSER" },
      },
      {
        path: "target-period-sponser/LinkTargetPeriodId/:LinkTargetPeriodId",
        component: DonateTargetPeriodSponserListMobileComponent,
        data: { title: "ROUTE.DONATE.TARGETPERIODSPONSER" },
      },
      {
        path: "target-period-sponser/LinkSponserId/:LinkSponserId",
        component: DonateTargetPeriodSponserListMobileComponent,
        data: { title: "ROUTE.DONATE.TARGETPERIODSPONSER" },
      },
      /** */
      {
        path: "transaction",
        component: DonateTransactionListMobileComponent,
        data: { title: "ROUTE.DONATE.TRANSACTION" },
      },
      {
        path: "transaction/LinkCmsUserId/:LinkCmsUserId",
        component: DonateTransactionListMobileComponent,
        data: { title: "ROUTE.DONATE.TRANSACTION" },
      },
      {
        path: "transaction/LinkSponsorId/:LinkSponsorId",
        component: DonateTransactionListMobileComponent,
        data: { title: "ROUTE.DONATE.TRANSACTION" },
      },
      {
        path: "transaction/LinkTargetPeriodId/:LinkTargetPeriodId",
        component: DonateTransactionListMobileComponent,
        data: { title: "ROUTE.DONATE.TRANSACTION" },
      },
      /** */
    ],
  },
];
