import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SmsLogComponent } from './sms-log.component';
import { SmsLogRoutes } from './sms-log.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {
  ApplicationEnumService, CoreAuthV3Service,
  CoreEnumService, CoreModuleService, CoreModuleTagService, SmsLogApiPathService, SmsLogInBoxService, SmsLogOutBoxDetailService,
  SmsLogOutBoxQueueService, SmsLogOutBoxService, SmsLogOutBoxTaskSchedulerService, SmsMainApiPathCompanyService,
  SmsMainApiPathPublicConfigService,
  SmsMainApiPathService
} from 'ntk-cms-api';
import { DynamicFormBuilderModule } from 'src/app/core/dynamic-form-builder/dynamic-form-builder.module';
import { CmsConfirmationDialogService } from 'src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service';
import { SmsLogApiPathListComponent } from './api-path/list/list.component';
import { SmsLogInBoxEditComponent } from './inbox/edit/edit.component';
import { SmsLogInBoxListComponent } from './inbox/list/list.component';
import { SmsLogInBoxViewComponent } from './inbox/view/view.component';
import { SmsLogOutBoxDetailListComponent } from './outbox-detail/list/list.component';
import { SmsLogOutBoxDetailViewComponent } from './outbox-detail/view/view.component';
import { SmsLogOutBoxQueueEditComponent } from './outbox-queue/edit/edit.component';
import { SmsLogOutBoxQueueListComponent } from './outbox-queue/list/list.component';
import { SmsLogOutBoxQueueViewComponent } from './outbox-queue/view/view.component';
import { SmsLogOutBoxTaskSchedulerEditComponent } from './outbox-task-scheduler/edit/edit.component';
import { SmsLogOutBoxTaskSchedulerListComponent } from './outbox-task-scheduler/list/list.component';
import { SmsLogOutBoxTaskSchedulerViewComponent } from './outbox-task-scheduler/view/view.component';
import { SmsLogOutBoxEditComponent } from './outbox/edit/edit.component';
import { SmsLogOutBoxHeaderComponent } from './outbox/header/header.component';
import { SmsLogOutBoxListComponent } from './outbox/list/list.component';
import { SmsLogOutBoxViewComponent } from './outbox/view/view.component';
import { SmsSharedModule } from '../shared/sms.shared.module';


@NgModule({
  declarations: [
    SmsLogComponent,
    SmsLogInBoxListComponent,
    SmsLogInBoxEditComponent,
    SmsLogInBoxViewComponent,
    SmsLogOutBoxListComponent,
    SmsLogOutBoxEditComponent,
    SmsLogOutBoxHeaderComponent,
    SmsLogOutBoxViewComponent,
    SmsLogOutBoxQueueListComponent,
    SmsLogOutBoxQueueEditComponent,
    SmsLogOutBoxQueueViewComponent,
    SmsLogOutBoxTaskSchedulerListComponent,
    SmsLogOutBoxTaskSchedulerEditComponent,
    SmsLogOutBoxTaskSchedulerViewComponent,
    SmsLogOutBoxDetailListComponent,
    SmsLogOutBoxDetailViewComponent,
    SmsLogApiPathListComponent,
  ],
  imports: [
    CommonModule,
    SmsLogRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),

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
    SmsMainApiPathCompanyService,//بررسی شود آیا نیاز است
    SmsMainApiPathPublicConfigService,//بررسی شود آیا نیاز است
    SmsMainApiPathService,//بررسی شود آیا نیاز است
  ]
})
export class SmsLogModule { }
