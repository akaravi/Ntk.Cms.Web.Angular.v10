import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreModuleComponent } from "./coreModule.component";
import { CoreModuleSiteCreditChargeOnlineComponent } from "./site-credit/charge-online/charge-online.component";
import { CoreModuleSiteCreditListComponent } from "./site-credit/list/list.component";
import { CoreModuleSiteUserCreditChargeOnlineComponent } from "./site-user-credit/charge-online/charge-online.component";
import { CoreModuleSiteUserCreditListComponent } from "./site-user-credit/list/list.component";
import { CoreModuleSiteUserCreditMyselfListComponent } from "./site-user-credit/myself-list/myself-list.component";
import { CoreModuleTagListComponent } from "./tag/list/list.component";

const routes: Routes = [
  {
    path: "",
    component: CoreModuleComponent,
    data: { title: "ROUTE.COREMODULE" },

    children: [
      {
        path: "tag",
        component: CoreModuleTagListComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
      {
        path: "site-credit",
        component: CoreModuleSiteCreditListComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
      {
        path: "site-credit-charge-online/:LinkSiteId/:LinkModuleId",
        component: CoreModuleSiteCreditChargeOnlineComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
      {
        path: "site-user-credit-myself",
        component: CoreModuleSiteUserCreditMyselfListComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
      {
        path: "site-user-credit",
        component: CoreModuleSiteUserCreditListComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
      {
        path: "site-user-credit/LinkUserId/:LinkUserId",
        component: CoreModuleSiteUserCreditListComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
      {
        path: "site-user-credit/LinkSiteId/:LinkSiteId",
        component: CoreModuleSiteUserCreditListComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
      {
        path: "site-user-credit-charge-online/:LinkSiteId/:LinkUserId/:LinkModuleId",
        component: CoreModuleSiteUserCreditChargeOnlineComponent,
        data: { title: "ROUTE.COREMODULE" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreModuleRoutes {}
