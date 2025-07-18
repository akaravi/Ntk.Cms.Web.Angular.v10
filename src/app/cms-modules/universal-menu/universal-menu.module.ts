import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from 'src/app/shared/shared.module';
import { UniversalMenuComponent } from './universal-menu.component';
import { UniversalMenuRoutes } from './universal-menu.routing';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import {
  ApplicationEnumService, CoreAuthV3Service,
  CoreEnumService, CoreModuleService, CoreModuleTagService
} from 'ntk-cms-api';
import { CmsConfirmationDialogService } from 'src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service';
@NgModule({
  declarations: [
    UniversalMenuComponent,
  ],
  imports: [
    CommonModule,
    UniversalMenuRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    SharedModule,
    AngularEditorModule,

    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreAuthV3Service,
    CmsConfirmationDialogService,
    ApplicationEnumService,
    CoreModuleTagService,
  ]
})
export class UniversalMenuModule { }
