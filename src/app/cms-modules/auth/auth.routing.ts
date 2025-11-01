import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { themeAuthPageLSKey } from "src/app/core/models/constModel";
import { CmsAuthSigninGuard } from "src/app/core/services/cmsAuthSigninGuard.service";
import { AuthComponent } from "./auth.component";
import { AuthForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { AuthSignInBySmsComponent } from "./signin-bysms/signin-bysms.component";
import { AuthSignInByUsernameComponent } from "./signin-byusername/signin-byusername.component";
import { AuthSignOutComponent } from "./signout/signout.component";
import { AuthSignUpComponent } from "./signup/signup.component";

function lastAuthPage(): string {
  const data = localStorage.getItem(themeAuthPageLSKey);
  if (data) {
    if (data === "signinbyusername") {
      return "signinbyusername";
    } else if (data === "signinbysms") {
      return "signinbysms";
    }
  }
  return "signinbysms";
}
const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    data: { title: "ROUTE.REGISTER" },
    children: [
      {
        path: "signinbyusername",
        component: AuthSignInByUsernameComponent,
        canActivate: [CmsAuthSigninGuard],
        data: { title: "ROUTE.REGISTER.SIGNINBYUSERNAME" },
      },
      {
        path: "signinbysms",
        component: AuthSignInBySmsComponent,
        canActivate: [CmsAuthSigninGuard],
        data: { title: "ROUTE.REGISTER.SIGNINBYSMS" },
      },
      {
        path: "signout",
        component: AuthSignOutComponent,
        data: { title: "ROUTE.REGISTER.SIGNOUT" },
      },
      {
        path: "signup",
        component: AuthSignUpComponent,
        canActivate: [CmsAuthSigninGuard],
        data: {
          title: "ROUTE.REGISTER.SIGNUP",
        },
      },
      {
        path: "forgot-password",
        component: AuthForgotPasswordComponent,
        canActivate: [CmsAuthSigninGuard],
        data: { title: "ROUTE.REGISTER.FORGETPASSWORD" },
      },
      {
        path: "",
        redirectTo: lastAuthPage(),
        pathMatch: "full",
        data: { title: "ROUTE.REGISTER" },
      },
      {
        path: "**",
        redirectTo: lastAuthPage(),
        pathMatch: "full",
        data: { title: "ROUTE.REGISTER" },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
