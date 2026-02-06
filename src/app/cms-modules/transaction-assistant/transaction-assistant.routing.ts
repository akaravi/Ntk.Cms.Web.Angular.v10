import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { routesNormal } from "./routes.normal";

@NgModule({
  imports: [
    RouterModule.forChild(routesNormal),
  ],
  exports: [RouterModule],
})
export class TransactionAssistantRoutes {}

