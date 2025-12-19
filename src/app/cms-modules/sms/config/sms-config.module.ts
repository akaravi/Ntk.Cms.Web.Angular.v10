import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModuleService, SmsConfigurationService } from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";

import { AngularEditorModule } from "@kolkov/angular-editor";
import { SmsConfigCheckSiteComponent } from "./check-site/check-site.component";
import { SmsConfigCheckSiteMobileComponent } from "./check-site/check-site.mobile.component";
import { SmsConfigCheckUserComponent } from "./check-user/check-user.component";
import { SmsConfigCheckUserMobileComponent } from "./check-user/check-user.mobile.component";
import { SmsConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { SmsConfigMainAdminMobileComponent } from "./main-admin/config-main-admin.mobile.component";
import { SmsConfigSiteComponent } from "./site/config-site.component";
import { SmsConfigSiteMobileComponent } from "./site/config-site.mobile.component";
import { SmsConfigRouting } from "./sms-config.routing";
import { SmsSharedModule } from "../shared/sms.shared.module";
import { SmsConfigComponent } from "./sms-config.component";

@NgModule({
  declarations: [
    SmsConfigComponent,
    /*Config*/
    SmsConfigMainAdminComponent,
    SmsConfigMainAdminMobileComponent,
    SmsConfigSiteComponent,
    SmsConfigSiteMobileComponent,
    SmsConfigCheckUserComponent,
    SmsConfigCheckUserMobileComponent,
    SmsConfigCheckSiteComponent,
    SmsConfigCheckSiteMobileComponent,
    /*Config*/
  ],
  exports: [
    /*Config*/
    SmsConfigMainAdminComponent,
    SmsConfigMainAdminMobileComponent,
    SmsConfigSiteComponent,
    SmsConfigSiteMobileComponent,
    SmsConfigCheckUserComponent,
    SmsConfigCheckUserMobileComponent,
    SmsConfigCheckSiteComponent,
    SmsConfigCheckSiteMobileComponent,
    /*Config*/
  ],
  imports: [
    CommonModule,
    FormsModule,
    SmsConfigRouting,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    AngularEditorModule,
    SmsSharedModule,
  ],
  providers: [CoreModuleService, SmsConfigurationService],
})
export class SmsConfigModule {}
