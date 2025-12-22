import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  CoreModuleSiteService,
  CoreSiteService,
  CoreUserClaimContentService,
  CoreUserService,
} from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSiteWidgetCountComponent } from "../site/widget/count/widget.component";
import { CoreSiteWidgetModuleComponent } from "../site/widget/module/widget.component";
import { CoreSiteWidgetStatusComponent } from "../site/widget/status/widget.component";
import { CoreUserClaimContentWidgetStatusComponent } from "../user-claim/content/widget/widget-status.component";
import { CoreUserWidgetComponent } from "../user/widget/widget.component";

@NgModule({
  declarations: [
    CoreSiteWidgetCountComponent,
    CoreSiteWidgetStatusComponent,
    CoreSiteWidgetModuleComponent,
    CoreUserWidgetComponent,
    CoreUserClaimContentWidgetStatusComponent,
  ],
  exports: [
    CoreSiteWidgetCountComponent,
    CoreSiteWidgetStatusComponent,
    CoreSiteWidgetModuleComponent,
    CoreUserWidgetComponent,
    CoreUserClaimContentWidgetStatusComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [
    CoreSiteService,
    CoreModuleSiteService,
    CoreUserService,
    CoreUserClaimContentService,
  ],
})
export class CoreMainWidgetModule {}
