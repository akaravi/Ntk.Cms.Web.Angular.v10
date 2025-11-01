import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoreModuleService, CoreSiteService, CoreUserService } from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreModuleHeaderComponent } from "./module/header/header.component";
import { CoreSiteHeaderComponent } from "./site/header/header.component";
import { CoreUserHeaderComponent } from "./user/header/header.component";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    CoreSiteHeaderComponent,
    CoreUserHeaderComponent,
    CoreModuleHeaderComponent,
  ],
  exports: [
    CoreSiteHeaderComponent,
    CoreUserHeaderComponent,
    CoreModuleHeaderComponent,
  ],
  providers: [
    CoreSiteService,
    CoreModuleService,
    CoreUserService,
  ],
})
export class CoreSharedModule {}
