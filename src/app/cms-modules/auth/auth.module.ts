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
import { AuthSignInBySmsComponent } from "./signin-bysms/signin-bysms.component";
import { AuthSignInByUsernameComponent } from "./signin-byusername/signin-byusername.component";
import { AuthSignOutComponent } from "./signout/signout.component";
import { SignupRuleComponent } from "./signup-rule/signup-rule.component";
import { AuthSignUpComponent } from "./signup/signup.component";

@NgModule({
  declarations: [
    AuthSignInByUsernameComponent,
    AuthSignInBySmsComponent,
    AuthSignUpComponent,
    AuthForgotPasswordComponent,
    AuthSignOutComponent,
    AuthComponent,
    SignupRuleComponent,
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
