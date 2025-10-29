import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { themeAuthPageLSKey } from "src/app/core/models/constModel";
import { AuthComponent } from "./auth.component";
import { AuthForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { AuthSingInBySmsComponent } from "./singin-bysms/singin-bysms.component";
import { AuthSingInComponent } from "./singin/singin.component";
import { AuthSingoutComponent } from "./singout/singout.component";
import { AuthSingUpComponent } from "./singup/singup.component";

function lastAuthPage(): string {
  const data = localStorage.getItem(themeAuthPageLSKey);
  if (data) {
    if (data === "singinbyusername") {
      return "singinbyusername";
    } else if (data === "singinbysms") {
      return "singinbysms";
    }
  }
  return "singinbysms";
}
const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "singinbyusername",
        component: AuthSingInComponent,
        data: { title: "ROUTE.REGISTER.SIGNINBYUSERNAME" },
      },
      {
        path: "singinbysms",
        component: AuthSingInBySmsComponent,
        data: { title: "ROUTE.REGISTER.SIGNINBYSMS" },
      },
      {
        path: "singout",
        component: AuthSingoutComponent,
        data: { title: "ROUTE.REGISTER.SIGNOUT" },
      },
      {
        path: "singup",
        component: AuthSingUpComponent,
        data: {
          title: "ROUTE.REGISTER.SIGNUP",
        },
      },
      {
        path: "forgot-password",
        component: AuthForgotPasswordComponent,
        data: { title: "ROUTE.REGISTER.FORGETPASSWORD" },
      },
      { path: "", redirectTo: lastAuthPage(), pathMatch: "full" },
      { path: "**", redirectTo: lastAuthPage(), pathMatch: "full" },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
