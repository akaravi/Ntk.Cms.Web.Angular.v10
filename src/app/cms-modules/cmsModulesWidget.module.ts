import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoreConfigurationService, CoreCpMainMenuService } from "ntk-cms-api";
import { ApplicationWidgetModule } from "src/app/cms-modules/application/shared/application-widget.module";
import { ArticleWidgetModule } from "src/app/cms-modules/article/shared/article-widget.module";
import { BiographyWidgetModule } from "src/app/cms-modules/biography/shared/biography-widget.module";
import { BlogWidgetModule } from "src/app/cms-modules/blog/shared/blog-widget.module";
import { CatalogWidgetModule } from "src/app/cms-modules/catalog/shared/catalog-widget.module";
import { ChartWidgetModule } from "src/app/cms-modules/chart/shared/chart-widget.module";
import { CoreMainWidgetModule } from "src/app/cms-modules/core-main/shared/core-main-widget.module";
import { CoreModuleWidgetModule } from "src/app/cms-modules/core-module/shared/core-module-widget.module";
import { EstateWidgetModule } from "src/app/cms-modules/estate/shared/estate-widget.module";
import { NewsWidgetModule } from "src/app/cms-modules/news/shared/news-widget.module";
import { SmsWidgetModule } from "src/app/cms-modules/sms/shared/sms-widget.module";
import { TicketingWidgetModule } from "src/app/cms-modules/ticketing/shared/ticketing-widget.module";
import { WebDesignerWidgetModule } from "src/app/cms-modules/web-designer/shared/web-designer-widget.module";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";

import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    /*widget*/
    /*widget*/
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SmsWidgetModule,
    EstateWidgetModule,
    ApplicationWidgetModule,
    ArticleWidgetModule,
    BiographyWidgetModule,
    BlogWidgetModule,
    CatalogWidgetModule,
    ChartWidgetModule,
    NewsWidgetModule,
    CoreMainWidgetModule,
    CoreModuleWidgetModule,
    TicketingWidgetModule,
    WebDesignerWidgetModule,
    // ComponentsModule,
  ],
  exports: [
    /*widget*/
    SmsWidgetModule,
    EstateWidgetModule,
    ApplicationWidgetModule,
    ArticleWidgetModule,
    BiographyWidgetModule,
    BlogWidgetModule,
    CatalogWidgetModule,
    ChartWidgetModule,
    NewsWidgetModule,
    CoreMainWidgetModule,
    CoreModuleWidgetModule,
    TicketingWidgetModule,
    WebDesignerWidgetModule,
    /*widget*/
  ],
  providers: [
    CmsConfirmationDialogService,
    CoreCpMainMenuService,
    CoreConfigurationService,
  ],
})
export class CmsModulesWidgetModule {}
