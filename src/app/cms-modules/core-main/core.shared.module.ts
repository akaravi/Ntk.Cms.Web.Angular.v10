import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  CoreModuleService,
  CoreSiteService,
  CoreUserService,
} from "ntk-cms-api";
import { NgOtpInputModule } from "src/app/core/cmsComponent/ng-otp-input/ng-otp-input.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreModuleHeaderComponent } from "./module/header/header.component";
import { CoreSiteHeaderComponent } from "./site/header/header.component";
import { CoreUserEmailConfirmComponent } from "./user/emailConfirm/emailConfirm.component";
import { CoreUserHeaderComponent } from "./user/header/header.component";
import { CoreUserMobileConfirmComponent } from "./user/mobileConfirm/mobileConfirm.component";

@NgModule({
  imports: [CommonModule, SharedModule, NgOtpInputModule],
  declarations: [
    CoreSiteHeaderComponent,
    CoreUserHeaderComponent,
    CoreModuleHeaderComponent,
    CoreUserEmailConfirmComponent,
    CoreUserMobileConfirmComponent,
  ],
  exports: [
    CoreSiteHeaderComponent,
    CoreUserHeaderComponent,
    CoreModuleHeaderComponent,
    CoreUserEmailConfirmComponent,
    CoreUserMobileConfirmComponent,
  ],
  providers: [CoreSiteService, CoreModuleService, CoreUserService],
})
export class CoreSharedModule {}
