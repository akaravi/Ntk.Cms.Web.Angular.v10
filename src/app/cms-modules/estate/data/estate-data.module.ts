import { CommonModule, NgOptimizedImage } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import { AngularEditorModule } from "@kolkov/angular-editor";
import {
  CoreAuthV3Service,
  CoreEnumService,
  CoreModuleService,
  CoreModuleTagService,
  EstateEnumService,
  FileCategoryService,
} from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../../core-main/core.shared.module";
import { EstateDataRoutes } from "./estate-data.routing";
import { EstateDataComponent } from "./estate-data.component";

import { DragDropModule } from "@angular/cdk/drag-drop";

import { IconPickerModule } from "ngx-ntk-icon-picker";

import { EstateSharedModule } from "../shared/estate-shared.module";

import { CurrencyMaskModule } from "ng2-currency-mask";
import { CmsFileManagerModule } from "ntk-cms-filemanager";

import { NgxMatColorPickerModule } from "src/app/shared/color-picker.module";

@NgModule({
  declarations: [EstateDataComponent],
  imports: [
    CommonModule,
    SharedModule,
    EstateDataRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    EstateSharedModule,
    AngularEditorModule,
    CurrencyMaskModule,
    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
    IconPickerModule,
    DragDropModule,
    NgxMatColorPickerModule,
    NgOptimizedImage,
    CmsFileManagerModule,
    CoreSharedModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreAuthV3Service,
    CmsConfirmationDialogService,
    CoreModuleTagService,

    EstateEnumService,
    FileCategoryService,
  ],
  exports: [EstateDataComponent],
})
export class EstateDataModule {}
