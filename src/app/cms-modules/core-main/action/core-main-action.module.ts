import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {
  CoreAuthV3Service,
  CoreEnumService,
  CoreModuleService,
  CoreTokenConnectionService
} from 'ntk-cms-api';
import { CmsConfirmationDialogService } from 'src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreMainActionComponent } from './core-main-action.component';
import { CoreMainActionRoutes } from './core-main-action.routing';


import { CoreMainActionSendNotificationComponent } from './send-notification/send-notification.component';

@NgModule({
  declarations: [
    CoreMainActionComponent,
    CoreMainActionSendNotificationComponent,

  ],
  imports: [
    CommonModule,

    CoreMainActionRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),

    SharedModule,
    //AngularEditorModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreAuthV3Service,
    CmsConfirmationDialogService,
    CoreTokenConnectionService,
  ]
})
export class CoreMainActionModule { }
