import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DataProviderTransactionComponent } from "./data-provider-transaction.component";
import { DataProviderTransactionRoutes } from "./data-provider-transaction.routing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularEditorModule } from "@kolkov/angular-editor";
import { SharedModule } from "src/app/shared/shared.module";

import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";

import { IconPickerModule } from "ngx-ntk-icon-picker";
import {
  CoreAuthV3Service,
  CoreEnumService,
  CoreModuleService,
  CoreModuleTagService,
  DataProviderTransactionService,
  DataProviderEnumService,
} from "ntk-cms-api";
import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
// Transaction
import { DataProviderTransactionListComponent } from "./list/list.component";
import { DataProviderTransactionViewComponent } from "./view/view.component";

@NgModule({
  declarations: [
    DataProviderTransactionComponent,
    /* Transaction */
    DataProviderTransactionListComponent,
    DataProviderTransactionViewComponent,
    /* */
  ],
  exports: [
    /* Transaction */
    DataProviderTransactionListComponent,
    DataProviderTransactionViewComponent,
    /* */
  ],
  imports: [
    CommonModule,
    DataProviderTransactionRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    AngularEditorModule,
    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
    IconPickerModule,
    DragDropModule,
    CmsFileManagerModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreAuthV3Service,
    /** */
    DataProviderEnumService,
    DataProviderTransactionService,
    /** */
    CmsConfirmationDialogService,
    CoreModuleTagService,
  ],
})
export class DataProviderTransactionModule {}
