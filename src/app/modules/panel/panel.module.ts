import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  ApplicationAppService,
  ApplicationMemberInfoService,
  ArticleContentService,
  BiographyContentService,
  BlogContentService,
  CatalogContentService,
  ChartContentService,
  CoreConfigurationService,
  CoreCpMainMenuService,
  CoreModuleLogReportAbuseService,
  CoreModuleSiteCreditService,
  CoreSiteService,
  CoreUserClaimContentService,
  CoreUserClaimTypeService,
  CoreUserService,
  EstateCustomerOrderService,
  EstatePropertyHistoryService,
  EstatePropertyService,
  NewsContentService,
  TicketingTaskService,
  WebDesignerLogMemberInfoService,
} from "ntk-cms-api";
import { CmsModulesRoutes } from "src/app/cms-modules/cmsModules.routing";
import { CmsModulesWidgetModule } from "src/app/cms-modules/cmsModulesWidget.module";
import { ComponentsModule } from "src/app/components/components.module";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SharedModule } from "src/app/shared/shared.module";
import { PageDashboardComponent } from "./page-dashboard/page-dashboard.component";
import { PageMenuComponent } from "./page-menu/page-menu.component";
import { PanelComponent } from "./panel.component";
import { PanelRouting } from "./panel.routing";

@NgModule({
  declarations: [
    PanelComponent,
    PageDashboardComponent,
    PageMenuComponent,
    /*widget*/
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PanelRouting.concat(CmsModulesRoutes)),
    SharedModule,
    ComponentsModule,
    CmsModulesWidgetModule,
  ],
  exports: [RouterModule],
  providers: [
    CmsConfirmationDialogService,
    CoreCpMainMenuService,
    CoreConfigurationService,
    WebDesignerLogMemberInfoService,
    ApplicationAppService,
    ApplicationMemberInfoService,
    NewsContentService,
    BiographyContentService,
    BlogContentService,
    CatalogContentService,
    EstatePropertyService,
    EstateCustomerOrderService,
    TicketingTaskService,
    ChartContentService,
    ArticleContentService,
    CoreSiteService,
    CoreUserService,
    CoreUserClaimContentService,
    CoreUserClaimTypeService,
    CoreModuleLogReportAbuseService,
    CoreModuleSiteCreditService,
    EstatePropertyHistoryService,
  ],
})
export class PanelModule {}
