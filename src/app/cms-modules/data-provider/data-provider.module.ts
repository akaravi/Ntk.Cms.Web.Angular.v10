import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DataProviderComponent } from "./data-provider.component";
import { DataProviderRoutes } from "./data-provider.routing";

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
  DataProviderClientService,
  DataProviderConfigurationService,
  DataProviderEnumService,
  DataProviderPlanCategoryService,
  DataProviderPlanPriceService,
  DataProviderPlanService,
  DataProviderSourceService,
  DataProviderTransactionService,
} from "ntk-cms-api";
import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
// Dashboard
import { DataProviderDashboardComponent } from "./dashboard/dashboard.component";
// Overview
import { DataProviderOverviewEventsComponent } from "./overview/events/events.component";
import { DataProviderOverviewSummaryComponent } from "./overview/summary/summary.component";
// Log components moved to log module
// Transaction components moved to transaction module
// Plan, Source, Client components moved to main module
@NgModule({
  declarations: [
    DataProviderComponent,
    /* Dashboard */
    DataProviderDashboardComponent,
    /* Dashboard */
    /* Overview */
    DataProviderOverviewSummaryComponent,
    DataProviderOverviewEventsComponent,
    /* Overview */
    /* Main components moved to DataProviderMainModule */
    /* Log components moved to DataProviderLogModule */
    /* Transaction components moved to DataProviderTransactionModule */
    /* */
  ],
  imports: [
    CommonModule,
    DataProviderRoutes,
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
    /*Config - DataProviderConfigurationService is provided in DataProviderConfigModule */
    /*Config*/
    /** Services for Dashboard and Overview */
    DataProviderEnumService,
    DataProviderClientService,
    DataProviderPlanService,
    DataProviderSourceService,
    DataProviderTransactionService,
    DataProviderPlanCategoryService,
    DataProviderPlanPriceService,
    /** */
    CmsConfirmationDialogService,
    CoreModuleTagService,
  ],
})
export class DataProviderModule {}
