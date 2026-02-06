import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModuleService, CoreUserSupportAccessService } from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../core.shared.module";
import { CoreModuleEntityModule } from "../module-entity/core-module-entity.module";
import { CoreUserSupportAccessAddComponent } from "./add/add.component";
import { CoreUserSupportAccessComponent } from "./core-user-support-access.component";
import { CoreUserSupportAccessRouting } from "./core-user-support-access.routing";
import { CoreUserSupportAccessEditComponent } from "./edit/edit.component";
import { CoreUserSupportAccessListComponent } from "./list/list.component";
import { CoreUserSupportAccessListMobileComponent } from "./list/list.mobile.component";

@NgModule({
  declarations: [
    CoreUserSupportAccessComponent,
    CoreUserSupportAccessListComponent,
    CoreUserSupportAccessListMobileComponent,
    CoreUserSupportAccessAddComponent,
    CoreUserSupportAccessEditComponent,
  ],
  exports: [
    CoreUserSupportAccessComponent,
    CoreUserSupportAccessListComponent,
    CoreUserSupportAccessListMobileComponent,
    CoreUserSupportAccessAddComponent,
    CoreUserSupportAccessEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreUserSupportAccessRouting,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    CoreSharedModule,
    CoreModuleEntityModule,
  ],
  providers: [
    CoreUserSupportAccessService,
    CmsConfirmationDialogService,
    CoreModuleService,
  ],
})
export class CoreUserSupportAccessCmsModule {}
