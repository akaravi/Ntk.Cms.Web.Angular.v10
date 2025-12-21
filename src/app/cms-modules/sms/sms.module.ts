import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SmsComponent } from "./sms.component";
import { SmsRoutes } from "./sms.routing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularEditorModule } from "@kolkov/angular-editor";
import { SharedModule } from "src/app/shared/shared.module";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import {
  CoreAuthV3Service,
  CoreEnumService,
  CoreModuleService,
  CoreModuleTagService,
  SmsActionService,
  SmsEnumService,
  SmsLogInBoxService,
  SmsLogOutBoxService,
  SmsLogOutBoxQueueService,
  SmsLogOutBoxTaskSchedulerService,
  SmsMainApiPathPriceServiceService,
  SmsMainApiPathService,
  SmsMainMessageContentService,
} from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SmsDashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
  declarations: [SmsComponent, SmsDashboardComponent],
  imports: [
    CommonModule,
    SmsRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),

    SharedModule,
    AngularEditorModule,

    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
    RouterModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreAuthV3Service,
    /*Config*/
    CmsConfirmationDialogService,
    /*Config*/
    CmsConfirmationDialogService,
    SmsEnumService,
    SmsActionService,
    CoreModuleTagService,
    SmsMainApiPathPriceServiceService,
    /*Dashboard*/
    SmsLogInBoxService,
    SmsLogOutBoxService,
    SmsLogOutBoxQueueService,
    SmsLogOutBoxTaskSchedulerService,
    SmsMainApiPathService,
    SmsMainMessageContentService,
    /*Dashboard*/
  ],
})
export class SmsModule {}
