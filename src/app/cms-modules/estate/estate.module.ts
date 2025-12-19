import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { EstateComponent } from "./estate.component";
import { EstateRoutes } from "./estate.routing";


@NgModule({
  declarations: [EstateComponent],
  imports: [CommonModule, EstateRoutes, SharedModule],
  exports: [],
})
export class EstateModule {}
