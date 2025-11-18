import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
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
import { ApplicationAppWidgetComponent } from "src/app/cms-modules/application/content/widget/widget.component";
import { ApplicationMemberInfoWidgetComponent } from "src/app/cms-modules/application/memberInfo/widget/widget.component";
import { ArticleContentWidgetComponent } from "src/app/cms-modules/article/content/widget/widget.component";
import { BiographyContentWidgetComponent } from "src/app/cms-modules/biography/content/widget/widget.component";
import { BlogContentWidgetComponent } from "src/app/cms-modules/blog/content/widget/widget.component";
import { CatalogContentWidgetComponent } from "src/app/cms-modules/catalog/content/widget/widget.component";
import { ChartContentWidgetComponent } from "src/app/cms-modules/chart/content/widget/widget.component";
import { CoreSiteWidgetCountComponent } from "src/app/cms-modules/core-main/site/widget/count/widget.component";
import { CoreSiteWidgetModuleComponent } from "src/app/cms-modules/core-main/site/widget/module/widget.component";
import { CoreSiteWidgetStatusComponent } from "src/app/cms-modules/core-main/site/widget/status/widget.component";
import { CoreUserClaimContentWidgetStatusComponent } from "src/app/cms-modules/core-main/user-claim/content/widget/widget-status.component";
import { CoreUserWidgetComponent } from "src/app/cms-modules/core-main/user/widget/widget.component";
import { CoreModuleLogReportAbuseWidgetComponent } from "src/app/cms-modules/core-module-log/report-abuse/widget/widget.component";
import { CoreModuleSiteCreditWidgetCreditComponent } from "src/app/cms-modules/core-module/site-credit/widget/widget-credit.component";
import { CoreModuleSiteUserCreditWidgetCreditComponent } from "src/app/cms-modules/core-module/site-user-credit/widget/widget-credit.component";
import { EstateCustomerOrderWidgetComponent } from "src/app/cms-modules/estate/customer-order/widget/widget.component";
import { EstatePropertyHistoryWidgetComponent } from "src/app/cms-modules/estate/property-history/widget/widget.component";
import { EstatePropertyWidgetComponent } from "src/app/cms-modules/estate/property/widget/widget.component";
import { NewsContentWidgetComponent } from "src/app/cms-modules/news/content/widget/widget.component";
import { WebDesignerLogMemberInfoWidgetComponent } from "src/app/cms-modules/web-designer/log-member-info/widget/widget.component";
import { ComponentsModule } from "src/app/components/components.module";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";

import { SharedModule } from "src/app/shared/shared.module";
import { TicketingTaskWidgetComponent } from "src/app/cms-modules/ticketing/task/widget/widget.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    /*widget*/
    TicketingTaskWidgetComponent,
    WebDesignerLogMemberInfoWidgetComponent,
    ApplicationAppWidgetComponent,
    ApplicationMemberInfoWidgetComponent,
    NewsContentWidgetComponent,
    ChartContentWidgetComponent,
    ArticleContentWidgetComponent,
    BiographyContentWidgetComponent,
    BlogContentWidgetComponent,
    CatalogContentWidgetComponent,
    CatalogContentWidgetComponent,
    CoreSiteWidgetCountComponent,
    CoreSiteWidgetStatusComponent,
    CoreSiteWidgetModuleComponent,
    CoreUserWidgetComponent,
    CoreUserClaimContentWidgetStatusComponent,
    EstatePropertyWidgetComponent,
    EstateCustomerOrderWidgetComponent,
    EstatePropertyHistoryWidgetComponent,
    CoreModuleLogReportAbuseWidgetComponent,
    CoreModuleSiteCreditWidgetCreditComponent,
    CoreModuleSiteUserCreditWidgetCreditComponent,
    /*widget*/
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    // ComponentsModule,
  ],
  exports: [
    /*widget*/
    TicketingTaskWidgetComponent,
    WebDesignerLogMemberInfoWidgetComponent,
    ApplicationAppWidgetComponent,
    ApplicationMemberInfoWidgetComponent,
    NewsContentWidgetComponent,
    ChartContentWidgetComponent,
    ArticleContentWidgetComponent,
    BiographyContentWidgetComponent,
    BlogContentWidgetComponent,
    CatalogContentWidgetComponent,
    CatalogContentWidgetComponent,
    CoreSiteWidgetCountComponent,
    CoreSiteWidgetStatusComponent,
    CoreSiteWidgetModuleComponent,
    CoreUserWidgetComponent,
    CoreUserClaimContentWidgetStatusComponent,
    EstatePropertyWidgetComponent,
    EstateCustomerOrderWidgetComponent,
    EstatePropertyHistoryWidgetComponent,
    CoreModuleLogReportAbuseWidgetComponent,
    CoreModuleSiteCreditWidgetCreditComponent,
    CoreModuleSiteUserCreditWidgetCreditComponent,
    /*widget*/
  ],
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
export class CmsModulesWidgetModule {}
