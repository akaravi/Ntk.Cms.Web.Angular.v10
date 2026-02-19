import { Routes } from "@angular/router";
import { CoreModuleLogComponent } from "./core-module-log.component";
import { CoreModuleLogFavoriteListMobileComponent } from "./favorite/list/list.mobile.component";
import { CoreModuleLogLikeListMobileComponent } from "./like/list/list.mobile.component";
import { CoreModuleLogReportAbuseListMobileComponent } from "./report-abuse/list/list.mobile.component";
import { CoreModuleLogScoreListMobileComponent } from "./score/list/list.mobile.component";
import { CoreModuleLogShowKeyListMobileComponent } from "./show-key/list/list.mobile.component";
import { CoreModuleLogSiteCreditBlockedListMobileComponent } from "./site-credit-blocked/list/list.mobile.component";
import { CoreModuleLogSiteCreditListMobileComponent } from "./site-credit/list/list.mobile.component";
import { CoreModuleLogSiteUserCreditBlockedListMobileComponent } from "./site-user-credit-blocked/list/list.mobile.component";
import { CoreModuleLogSiteUserCreditListMobileComponent } from "./site-user-credit/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: CoreModuleLogComponent,
    data: { title: "ROUTE.COREMODULELOG" },
    children: [
      {
        path: "report-abuse",
        component: CoreModuleLogReportAbuseListMobileComponent,
        data: { title: "ROUTE.COREMODULELOG" },
      },
      {
        path: "show-key",
        component: CoreModuleLogShowKeyListMobileComponent,
        data: { title: "ROUTE.COREMODULELOG" },
      },
      {
        path: "favorite",
        component: CoreModuleLogFavoriteListMobileComponent,
        data: { title: "ROUTE.COREMODULELOG.FAVORITE" },
      },
      {
        path: "like",
        component: CoreModuleLogLikeListMobileComponent,
        data: { title: "ROUTE.COREMODULELOG.LIKE" },
      },
      {
        path: "score",
        component: CoreModuleLogScoreListMobileComponent,
        data: { title: "ROUTE.COREMODULELOG.SCORE" },
      },
      {
        path: "site-credit",
        component: CoreModuleLogSiteCreditListMobileComponent,
        data: { title: "ROUTE.COREMODULELOG" },
      },
      {
        path: "site-user-credit",
        component: CoreModuleLogSiteUserCreditListMobileComponent,
        data: { title: "ROUTE.COREMODULELOG" },
      },
      {
        path: "site-user-credit/:LinkSiteId/:LinkUserId/:LinkModuleId",
        component: CoreModuleLogSiteUserCreditListMobileComponent,
        data: { title: "ROUTE.COREMODULELOG" },
      },
      {
        path: "site-credit-blocked",
        component: CoreModuleLogSiteCreditBlockedListMobileComponent,
        data: { title: "ROUTE.COREMODULELOG" },
      },
      {
        path: "site-user-credit-blocked",
        component: CoreModuleLogSiteUserCreditBlockedListMobileComponent,
        data: { title: "ROUTE.COREMODULELOG" },
      },
    ],
  },
];
