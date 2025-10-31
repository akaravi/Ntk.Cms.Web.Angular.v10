import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreUserClaimContentCheckListComponent } from "./content/check-list/check-list.component";
import { CoreUserClaimContentListComponent } from "./content/list/list.component";
import { CoreUserClaimGroupDetailListComponent } from "./group-detail/list/list.component";
import { CoreUserClaimGroupListComponent } from "./group/list/list.component";
import { CoreUserClaimTypeListComponent } from "./type/list/list.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CORE.USERCLAIM" },
    children: [
      {
        path: "group",
        component: CoreUserClaimGroupListComponent,
        data: { title: "ROUTE.CORE.USERCLAIM" },
      },
      /** */
      {
        path: "groupdetail",
        component: CoreUserClaimGroupDetailListComponent,
        data: { title: "ROUTE.CORE.USERCLAIM" },
      },
      {
        path: "groupdetail/LinkUserClaimTypeId/:LinkUserClaimTypeId",
        component: CoreUserClaimGroupDetailListComponent,
        data: { title: "ROUTE.CORE.USERCLAIM" },
      },
      {
        path: "groupdetail/LinkUserClaimGroupId/:LinkUserClaimGroupId",
        component: CoreUserClaimGroupDetailListComponent,
        data: { title: "ROUTE.CORE.USERCLAIM" },
      },
      /** */
      {
        path: "type",
        component: CoreUserClaimTypeListComponent,
        data: { title: "ROUTE.CORE.USERCLAIM" },
      },
      /** */
      {
        path: "content",
        component: CoreUserClaimContentListComponent,
        data: { title: "ROUTE.CORE.USERCLAIM" },
      },
      {
        path: "content/LinkUserClaimTypeId/:LinkUserClaimTypeId",
        component: CoreUserClaimContentListComponent,
        data: { title: "ROUTE.CORE.USERCLAIM" },
      },
      {
        path: "content/LinkSiteId/:LinkSiteId",
        component: CoreUserClaimContentListComponent,
        data: { title: "ROUTE.CORE.USERCLAIM" },
      },
      {
        path: "content/LinkUserId/:LinkUserId",
        component: CoreUserClaimContentListComponent,
        data: { title: "ROUTE.CORE.USERCLAIM" },
      },
      /** */
      /** */
      {
        path: "checklist",
        component: CoreUserClaimContentCheckListComponent,
        data: { title: "ROUTE.CORE.USERCLAIM" },
      },
      {
        path: "checklist/:LinkSiteId/:LinkUserId",
        component: CoreUserClaimContentCheckListComponent,
        data: { title: "ROUTE.CORE.USERCLAIM" },
      },
      /** */
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreUserClaimRouting {}
