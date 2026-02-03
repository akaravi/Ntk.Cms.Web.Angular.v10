import { Routes } from "@angular/router";
import { CoreModuleDataCommentListMobileComponent } from "./comment/list/list.mobile.component";
import { CoreModuleDataComponent } from "./core-module-data.component";
import { CoreModuleDataMemoListMobileComponent } from "./memo/list/list.mobile.component";
import { CoreModuleDataPinListMobileComponent } from "./pin/list/list.mobile.component";
import { CoreModuleDataTaskListMobileComponent } from "./task/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: CoreModuleDataComponent,
    data: { title: "ROUTE.COREMODULELOG" },
    children: [
      {
        path: "memo",
        component: CoreModuleDataMemoListMobileComponent,
        data: { title: "ROUTE.COREMODULELOG.MEMO" },
      },
      {
        path: "pin",
        component: CoreModuleDataPinListMobileComponent,
        data: { title: "ROUTE.COREMODULELOG.PIN" },
      },
      {
        path: "task",
        component: CoreModuleDataTaskListMobileComponent,
        data: { title: "ROUTE.COREMODULELOG.TASK" },
      },
      {
        path: "comment",
        component: CoreModuleDataCommentListMobileComponent,
        data: { title: "ROUTE.COREMODULELOG.COMMENT" },
      },
    ],
  },
];
