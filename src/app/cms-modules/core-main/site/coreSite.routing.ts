import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CmsAuthSiteGuard } from "src/app/core/services/cmsAuthSiteGuard.service";
import { CoreSiteAddComponent } from "./add/add.component";
import { CoreSiteAddFirstComponent } from "./addFirst/addFirst.component";
import { CoreSiteEditComponent } from "./edit/edit.component";
import { CoreInfoComponent } from "./info/core-info.component";
import { CoreSiteListComponent } from "./list/list.component";
import { CoreSiteModuleAddComponent } from "./moduleAdd/moduleAdd.component";
import { CoreSiteModuleEditComponent } from "./moduleEdit/moduleEdit.component";
import { CoreSiteModuleListComponent } from "./moduleList/moduleList.component";
import { CoreSiteResellerChartComponent } from "./reseller-chart/reseller-chart.component";
import { CoreSiteSelectionComponent } from "./selection/selection.component";
import { CoreSiteUserListComponent } from "./userList/userList.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CORE.SITE" },
    children: [
      {
        path: "",
        component: CoreSiteListComponent,
        data: { title: "ROUTE.CORE.SITE" },
      },
      {
        path: "list/LinkUserId/:LinkUserId",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteListComponent,
        data: { title: "ROUTE.CORE.SITE" },
      },
      {
        path: "list/LinkSiteCategoryId/:LinkSiteCategoryId",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteListComponent,
        data: { title: "ROUTE.CORE.SITE" },
      },
      {
        path: "selection",
        component: CoreSiteSelectionComponent,
        data: { title: "ROUTE.CORE.SITE" },
      },
      {
        path: "addFirst",
        component: CoreSiteAddFirstComponent,
        data: { title: "ROUTE.CORE.SITE" },
      },
      {
        path: "add",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteAddComponent,
        data: { title: "ROUTE.CORE.SITE" },
      },
      {
        path: "edit",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteEditComponent,
        data: { title: "ROUTE.CORE.SITE" },
      },
      {
        path: "edit/:Id",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteEditComponent,
        data: { title: "ROUTE.CORE.SITE" },
      },
      /** modulelist */
      {
        path: "modulelist",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteModuleListComponent,
        data: { title: "ROUTE.CORE.MODULE" },
      },
      {
        path: "modulelist/LinkSiteId/:LinkSiteId",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteModuleListComponent,
        data: { title: "ROUTE.CORE.MODULE" },
      },
      {
        path: "modulelist/LinkModuleId/:LinkModuleId",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteModuleListComponent,
        data: { title: "ROUTE.CORE.MODULE" },
      },
      /** modulelist */
      {
        path: "moduleadd/:LinkSiteId",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteModuleAddComponent,
        data: { title: "ROUTE.CORE.MODULE" },
      },
      {
        path: "moduleadd/:LinkSiteId/:LinkModuleId",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteModuleAddComponent,
        data: { title: "ROUTE.CORE.MODULE" },
      },
      {
        path: "moduleedit/:LinkSiteId/:LinkModuleId",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteModuleEditComponent,
        data: { title: "ROUTE.CORE.MODULE" },
      },
      /** userlist */
      {
        path: "userlist",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteUserListComponent,
        data: { title: "ROUTE.CORE.USER" },
      },
      {
        path: "userlist/LinkSiteId/:LinkSiteId",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteUserListComponent,
        data: { title: "ROUTE.CORE.USER" },
      },
      {
        path: "userlist/LinkUserGroupId/:LinkUserGroupId",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteUserListComponent,
        data: { title: "ROUTE.CORE.USER" },
      },
      {
        path: "userlist/LinkUserId/:LinkUserId",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteUserListComponent,
        data: { title: "ROUTE.CORE.USER" },
      },
      /** userlist */
      {
        path: "info",
        canActivate: [CmsAuthSiteGuard],
        component: CoreInfoComponent,
        data: { title: "ROUTE.CORE.ADDRESS" },
      },
      {
        path: "reseller-chart",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteResellerChartComponent,
        data: { title: "ROUTE.CORE.SITE" },
      },
      {
        path: "reseller-chart/LinkSiteId/:LinkSiteId",
        canActivate: [CmsAuthSiteGuard],
        component: CoreSiteResellerChartComponent,
        data: { title: "ROUTE.CORE.SITE" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreSiteRouting {}
