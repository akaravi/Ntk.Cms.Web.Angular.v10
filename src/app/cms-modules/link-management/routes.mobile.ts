import { Routes } from "@angular/router";
import { LinkManagementComponent } from "./link-management.component";
import { LinkManagementAccountingDetailListMobileComponent } from "./accounting-detail/list/list.mobile.component";
import { LinkManagementAccountingListMobileComponent } from "./accounting/list/list.mobile.component";
import { LinkManagementBillboardPatternListMobileComponent } from "./billboard-pattern/list/list.mobile.component";
import { LinkManagementBillboardAddComponent } from "./billboard/add/add.component";
import { LinkManagementBillboardEditComponent } from "./billboard/edit/edit.component";
import { LinkManagementBillboardListMobileComponent } from "./billboard/list/list.mobile.component";
import { LinkManagementMemberListMobileComponent } from "./member/list/list.mobile.component";
import { LinkManagementTargetBillboardLogListMobileComponent } from "./target-billboard-log/list/list.mobile.component";
import { LinkManagementTargetAddComponent } from "./target/add/add.component";
import { LinkManagementTargetEditComponent } from "./target/edit/edit.component";
import { LinkManagementTargetListMobileComponent } from "./target/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: LinkManagementComponent,
    data: { title: "ROUTE.LINKMANAGMENT" },
    children: [
      /* Config */
      {
        path: "config",
        loadChildren: () =>
          import("./config/link-management-config.module").then(
            (m) => m.LinkManagementConfigModule,
          ),
        data: { title: "ROUTE.LINKMANAGMENT" },
      },
      /* Config */
      {
        path: "target",
        component: LinkManagementTargetListMobileComponent,
        data: { title: "ROUTE.LINKMANAGMENT.TARGET" },
      },
      {
        path: "target/list/LinkBillboardPatternId/:LinkBillboardPatternId",
        component: LinkManagementTargetListMobileComponent,
        data: { title: "ROUTE.LINKMANAGMENT.TARGET" },
      },
      {
        path: "target/add/:LinkBillboardPatternId",
        component: LinkManagementTargetAddComponent,
        data: { title: "ROUTE.LINKMANAGMENT.TARGET" },
      },
      {
        path: "target/edit/:id",
        component: LinkManagementTargetEditComponent,
        data: { title: "ROUTE.LINKMANAGMENT.TARGET" },
      },
      {
        path: "billboard",
        component: LinkManagementBillboardListMobileComponent,
        data: { title: "ROUTE.LINKMANAGMENT.BILLBOARD" },
      },
      {
        path: "billboard/list/LinkBillboardPatternId/:LinkBillboardPatternId",
        component: LinkManagementBillboardListMobileComponent,
        data: { title: "ROUTE.LINKMANAGMENT.BILLBOARD" },
      },
      {
        path: "billboard/add/:LinkBillboardPatternId",
        component: LinkManagementBillboardAddComponent,
        data: { title: "ROUTE.LINKMANAGMENT.BILLBOARD" },
      },
      {
        path: "billboard/edit/:id",
        component: LinkManagementBillboardEditComponent,
        data: { title: "ROUTE.LINKMANAGMENT.BILLBOARD" },
      },
      {
        path: "target-billboard-log",
        component: LinkManagementTargetBillboardLogListMobileComponent,
        data: { title: "ROUTE.LINKMANAGMENT.TARGETBILLBOARD" },
      },
      {
        path: "target-billboard-log/LinkManagementBillboardId/:LinkManagementBillboardId",
        component: LinkManagementTargetBillboardLogListMobileComponent,
        data: { title: "ROUTE.LINKMANAGMENT.TARGETBILLBOARD" },
      },
      {
        path: "target-billboard-log/LinkManagementTargetId/:LinkManagementTargetId",
        component: LinkManagementTargetBillboardLogListMobileComponent,
        data: { title: "ROUTE.LINKMANAGMENT.TARGETBILLBOARD" },
      },
      {
        path: "target-billboard-log/Key/:Key",
        component: LinkManagementTargetBillboardLogListMobileComponent,
        data: { title: "ROUTE.LINKMANAGMENT.TARGETBILLBOARD" },
      },
      {
        path: "billboard-pattern",
        component: LinkManagementBillboardPatternListMobileComponent,
        data: { title: "ROUTE.LINKMANAGMENT.BILLBOARDPATTERN" },
      },
      {
        path: "accounting",
        component: LinkManagementAccountingListMobileComponent,
        data: { title: "ROUTE.LINKMANAGMENT.ACCOUNTING" },
      },
      {
        path: "accountingdetail",
        component: LinkManagementAccountingDetailListMobileComponent,
        data: { title: "ROUTE.LINKMANAGMENT.ACCOUNTINGDETAIL" },
      },
      {
        path: "accountingdetail/LinkManagementAccountingId/:LinkManagementAccountingId",
        component: LinkManagementAccountingDetailListMobileComponent,
        data: { title: "ROUTE.LINKMANAGMENT.ACCOUNTINGDETAIL" },
      },
      {
        path: "member",
        component: LinkManagementMemberListMobileComponent,
        data: { title: "ROUTE.LINKMANAGMENT.MEMBER" },
      },
    ],
  },
];
