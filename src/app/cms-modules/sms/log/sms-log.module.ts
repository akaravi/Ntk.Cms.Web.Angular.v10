import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SmsLogComponent } from "./sms-log.component";
import { SmsLogRoutes } from "./sms-log.routing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularEditorModule } from "@kolkov/angular-editor";
import { SharedModule } from "src/app/shared/shared.module";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";

import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import {
  ApplicationEnumService,
  CoreAuthV3Service,
  CoreEnumService,
  CoreModuleService,
  CoreModuleTagService,
  SmsLogApiPathService,
  SmsLogInBoxService,
  SmsLogOutBoxDetailService,
  SmsLogOutBoxQueueService,
  SmsLogOutBoxService,
  SmsLogOutBoxTaskSchedulerService,
  SmsMainApiPathCompanyService,
  SmsMainApiPathPublicConfigService,
  SmsMainApiPathService,
} from "ntk-cms-api";
import { DynamicFormBuilderModule } from "src/app/core/dynamic-form-builder/dynamic-form-builder.module";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SmsSharedModule } from "../shared/sms.shared.module";
import { SmsLogApiPathListComponent } from "./api-path/list/list.component";
import { SmsLogApiPathListMobileComponent } from "./api-path/list/list.mobile.component";
import { SmsLogInBoxEditComponent } from "./inbox/edit/edit.component";
import { SmsLogInBoxListComponent } from "./inbox/list/list.component";
import { SmsLogInBoxListMobileComponent } from "./inbox/list/list.mobile.component";
import { SmsLogInBoxViewComponent } from "./inbox/view/view.component";
import { SmsLogInBoxViewMobileComponent } from "./inbox/view/view.mobile.component";
import { SmsLogInBoxWidgetMobileComponent } from "./inbox/widget/widget.mobile.component";
import { SmsLogOutBoxDetailListComponent } from "./outbox-detail/list/list.component";
import { SmsLogOutBoxDetailListMobileComponent } from "./outbox-detail/list/list.mobile.component";
import { SmsLogOutBoxDetailViewComponent } from "./outbox-detail/view/view.component";
import { SmsLogOutBoxDetailViewMobileComponent } from "./outbox-detail/view/view.mobile.component";
import { SmsLogOutBoxQueueEditComponent } from "./outbox-queue/edit/edit.component";
import { SmsLogOutBoxQueueListComponent } from "./outbox-queue/list/list.component";
import { SmsLogOutBoxQueueListMobileComponent } from "./outbox-queue/list/list.mobile.component";
import { SmsLogOutBoxQueueViewComponent } from "./outbox-queue/view/view.component";
import { SmsLogOutBoxQueueViewMobileComponent } from "./outbox-queue/view/view.mobile.component";
import { SmsLogOutBoxQueueWidgetMobileComponent } from "./outbox-queue/widget/widget.mobile.component";
import { SmsLogOutBoxTaskSchedulerEditComponent } from "./outbox-task-scheduler/edit/edit.component";
import { SmsLogOutBoxTaskSchedulerListComponent } from "./outbox-task-scheduler/list/list.component";
import { SmsLogOutBoxTaskSchedulerListMobileComponent } from "./outbox-task-scheduler/list/list.mobile.component";
import { ScheduleRunInfoListComponent } from "./outbox-task-scheduler/schedule-run-info-list/schedule-run-info-list.component";
import { SmsLogOutBoxTaskSchedulerViewComponent } from "./outbox-task-scheduler/view/view.component";
import { SmsLogOutBoxTaskSchedulerViewMobileComponent } from "./outbox-task-scheduler/view/view.mobile.component";
import { SmsLogOutBoxTaskSchedulerWidgetMobileComponent } from "./outbox-task-scheduler/widget/widget.mobile.component";
import { SmsLogOutBoxEditComponent } from "./outbox/edit/edit.component";
import { SmsLogOutBoxHeaderComponent } from "./outbox/header/header.component";
import { SmsLogOutBoxListComponent } from "./outbox/list/list.component";
import { SmsLogOutBoxListMobileComponent } from "./outbox/list/list.mobile.component";
import { SmsLogOutBoxViewComponent } from "./outbox/view/view.component";
import { SmsLogOutBoxViewMobileComponent } from "./outbox/view/view.mobile.component";
import { SmsLogOutBoxWidgetMobileComponent } from "./outbox/widget/widget.mobile.component";

@NgModule({
  declarations: [
    SmsLogComponent,
    SmsLogInBoxListComponent,
    SmsLogInBoxListMobileComponent,
    SmsLogInBoxEditComponent,
    SmsLogInBoxViewComponent,
    SmsLogInBoxViewMobileComponent,
    SmsLogOutBoxListComponent,
    SmsLogOutBoxListMobileComponent,
    SmsLogOutBoxEditComponent,
    SmsLogOutBoxHeaderComponent,
    SmsLogOutBoxViewComponent,
    SmsLogOutBoxViewMobileComponent,
    SmsLogOutBoxQueueListComponent,
    SmsLogOutBoxQueueListMobileComponent,
    SmsLogOutBoxQueueEditComponent,
    SmsLogOutBoxQueueViewComponent,
    SmsLogOutBoxQueueViewMobileComponent,
    SmsLogOutBoxTaskSchedulerListComponent,
    SmsLogOutBoxTaskSchedulerListMobileComponent,
    SmsLogOutBoxTaskSchedulerEditComponent,
    SmsLogOutBoxTaskSchedulerViewComponent,
    SmsLogOutBoxTaskSchedulerViewMobileComponent,
    ScheduleRunInfoListComponent,
    SmsLogOutBoxDetailListComponent,
    SmsLogOutBoxDetailListMobileComponent,
    SmsLogOutBoxDetailViewComponent,
    SmsLogOutBoxDetailViewMobileComponent,
    SmsLogApiPathListComponent,
    SmsLogApiPathListMobileComponent,
    SmsLogInBoxWidgetMobileComponent,
    SmsLogOutBoxWidgetMobileComponent,
    SmsLogOutBoxQueueWidgetMobileComponent,
    SmsLogOutBoxTaskSchedulerWidgetMobileComponent,
  ],
  imports: [
    CommonModule,
    SmsLogRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),

    SharedModule,
    AngularEditorModule,

    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
    DynamicFormBuilderModule,
    NgxMaterialTimepickerModule,
    SmsSharedModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreAuthV3Service,
    CmsConfirmationDialogService,
    ApplicationEnumService,
    CoreModuleTagService,
    SmsLogInBoxService,
    SmsLogOutBoxService,
    SmsLogOutBoxDetailService,
    SmsLogOutBoxQueueService,
    SmsLogOutBoxTaskSchedulerService,
    SmsLogApiPathService,
    SmsMainApiPathCompanyService, //بررسی شود آیا نیاز است
    SmsMainApiPathPublicConfigService, //بررسی شود آیا نیاز است
    SmsMainApiPathService, //بررسی شود آیا نیاز است
  ],
})
export class SmsLogModule {}
