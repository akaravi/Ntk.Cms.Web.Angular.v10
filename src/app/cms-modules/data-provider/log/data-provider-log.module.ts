import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DataProviderLogComponent } from "./data-provider-log.component";
import { DataProviderLogRoutes } from "./data-provider-log.routing";

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
  DataProviderLogClientService,
  DataProviderLogPlanService,
  DataProviderLogSourceService,
  DataProviderEnumService,
} from "ntk-cms-api";
import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
// Log Client
import { DataProviderLogClientListComponent } from "./client/list/list.component";
import { DataProviderLogClientListMobileComponent } from "./client/list/list.mobile.component";
import { DataProviderLogClientViewComponent } from "./client/view/view.component";
// Log Plan
import { DataProviderLogPlanListComponent } from "./plan/list/list.component";
import { DataProviderLogPlanListMobileComponent } from "./plan/list/list.mobile.component";
import { DataProviderLogPlanViewComponent } from "./plan/view/view.component";
// Log Source
import { DataProviderLogSourceListComponent } from "./source/list/list.component";
import { DataProviderLogSourceListMobileComponent } from "./source/list/list.mobile.component";
import { DataProviderLogSourceViewComponent } from "./source/view/view.component";

@NgModule({
  declarations: [
    DataProviderLogComponent,
    /* Log Client */
    DataProviderLogClientListComponent,
    DataProviderLogClientListMobileComponent,
    DataProviderLogClientViewComponent,
    /* Log Plan */
    DataProviderLogPlanListComponent,
    DataProviderLogPlanListMobileComponent,
    DataProviderLogPlanViewComponent,
    /* Log Source */
    DataProviderLogSourceListComponent,
    DataProviderLogSourceListMobileComponent,
    DataProviderLogSourceViewComponent,
    /* */
  ],
  exports: [
    /* Log Client */
    DataProviderLogClientListComponent,
    DataProviderLogClientListMobileComponent,
    DataProviderLogClientViewComponent,
    /* Log Plan */
    DataProviderLogPlanListComponent,
    DataProviderLogPlanListMobileComponent,
    DataProviderLogPlanViewComponent,
    /* Log Source */
    DataProviderLogSourceListComponent,
    DataProviderLogSourceListMobileComponent,
    DataProviderLogSourceViewComponent,
    /* */
  ],
  imports: [
    CommonModule,
    DataProviderLogRoutes,
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
    DataProviderLogClientService,
    DataProviderLogPlanService,
    DataProviderLogSourceService,
    /** */
    CmsConfirmationDialogService,
    CoreModuleTagService,
  ],
})
export class DataProviderLogModule {}
