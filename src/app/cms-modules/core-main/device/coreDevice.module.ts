import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { CoreDeviceService, CoreModuleService } from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreDeviceAddComponent } from "./add/add.component";
import { CoreDeviceComponent } from "./coreDevice.component";
import { CoreDeviceRouting } from "./coreDevice.routing";
import { CoreDeviceEditComponent } from "./edit/edit.component";
import { CoreDeviceListComponent } from "./list/list.component";
import { CoreDeviceSelectorComponent } from "./selector/selector.component";

@NgModule({
  declarations: [
    CoreDeviceComponent,
    CoreDeviceListComponent,
    CoreDeviceAddComponent,
    CoreDeviceEditComponent,
    CoreDeviceSelectorComponent,
  ],
  exports: [
    CoreDeviceComponent,
    CoreDeviceListComponent,
    CoreDeviceAddComponent,
    CoreDeviceEditComponent,
    CoreDeviceSelectorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreDeviceRouting,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    AngularEditorModule,
  ],
  providers: [
    CoreDeviceService,
    CoreModuleService,
    CmsConfirmationDialogService,
  ],
})
export class CoreDeviceModule {}
