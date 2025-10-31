import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  CoreAuthV3Service,
  CoreConfigurationService,
  CoreModuleService,
} from "ntk-cms-api";
import { NgOtpInputModule } from "src/app/core/cmsComponent/ng-otp-input/ng-otp-input.module";
import { CmsTranslationService } from "src/app/core/i18n/cmsTranslation.service";
import { SharedModule } from "src/app/shared/shared.module";
import { AuthComponent } from "./auth.component";
import { AuthRoutingModule } from "./auth.routing";
import { AuthForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { AuthSingInBySmsComponent } from "./singin-bysms/singin-bysms.component";
import { AuthSingInByUsernameComponent } from "./singin-byusername/singin-byusername.component";
import { AuthSingoutComponent } from "./singout/singout.component";
import { AuthSingUpComponent } from "./singup/singup.component";
import { SingupRuleComponent } from "./singupRule/singupRule.Component";

@NgModule({
  declarations: [
    AuthSingInByUsernameComponent,
    AuthSingInBySmsComponent,
    AuthSingUpComponent,
    AuthForgotPasswordComponent,
    AuthSingoutComponent,
    AuthComponent,
    SingupRuleComponent,
  ],
  providers: [
    CoreModuleService,
    CoreConfigurationService,
    CoreAuthV3Service,
    CmsTranslationService,
  ],
  imports: [
    CommonModule,

    SharedModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
  ],
})
export class AuthModule {}
