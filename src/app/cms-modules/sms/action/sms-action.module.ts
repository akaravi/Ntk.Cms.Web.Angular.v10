import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SmsActionComponent } from './sms-action.component';
import { SmsActionRoutes } from './sms-action.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CronEditorModule } from 'ngx-ntk-cron-editor';
import {
  ContactCategoryService,
  ContactContentService,
  CoreAuthV3Service,
  CoreEnumService,
  CoreModuleService,
  CoreModuleTagService,
  SmsMainApiPathService
} from 'ntk-cms-api';
import { CmsConfirmationDialogService } from 'src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service';
import { SmsMainModule } from '../main/sms-main.module';

import { SmsActionSendMessageApiComponent } from './send-message-api/send-message-api.component';
import { SmsActionSendMessageComponent } from './send-message/send-message.component';

@NgModule({
  declarations: [
    SmsActionComponent,
    SmsActionSendMessageComponent,
    SmsActionSendMessageApiComponent,
  ],
  exports: [
    SmsActionComponent,
    SmsActionSendMessageComponent,
    SmsActionSendMessageApiComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SmsActionRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),

    SmsMainModule,
    NgxMaterialTimepickerModule,
    CronEditorModule,
    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,

  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreAuthV3Service,
    CmsConfirmationDialogService,
    CoreModuleTagService,
    SmsMainApiPathService,
    ContactCategoryService,
    ContactContentService,
  ]
})
export class SmsActionModule { }
