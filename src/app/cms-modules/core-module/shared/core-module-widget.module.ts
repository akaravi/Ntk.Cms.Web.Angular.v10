import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  CoreModuleLogReportAbuseService,
  CoreModuleSiteCreditService,
  CoreModuleSiteUserCreditService,
} from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreModuleLogReportAbuseWidgetComponent } from "../../core-module-log/report-abuse/widget/widget.component";
import { CoreModuleSiteCreditWidgetCreditComponent } from "../site-credit/widget/widget-credit.component";
import { CoreModuleSiteUserCreditWidgetCreditComponent } from "../site-user-credit/widget/widget-credit.component";

@NgModule({
  declarations: [
    CoreModuleLogReportAbuseWidgetComponent,
    CoreModuleSiteCreditWidgetCreditComponent,
    CoreModuleSiteUserCreditWidgetCreditComponent,
  ],
  exports: [
    CoreModuleLogReportAbuseWidgetComponent,
    CoreModuleSiteCreditWidgetCreditComponent,
    CoreModuleSiteUserCreditWidgetCreditComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [
    CoreModuleLogReportAbuseService,
    CoreModuleSiteCreditService,
    CoreModuleSiteUserCreditService,
  ],
})
export class CoreModuleWidgetModule {}
