import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreUserRouting } from './coreUser.routing';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from 'src/app/shared/shared.module';

import { CoreAuthV3Service, CoreEnumService, CoreModuleService, CoreSiteUserService, CoreUserGroupService, CoreUserService } from 'ntk-cms-api';
import { CmsFileManagerModule } from 'ntk-cms-filemanager';
import { NgOtpInputModule } from 'src/app/core/cmsComponent/ng-otp-input/ng-otp-input.module';
import { CmsConfirmationDialogService } from 'src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service';
import { CoreUserAddComponent } from './add/add.component';
import { CoreUserChangePasswordComponent } from './changePassword/changePassword.component';
import { CoreUserComponent } from './coreUser.component';
import { CoreUserEditComponent } from './edit/edit.component';
import { CoreUserEmailConfirmComponent } from './emailConfirm/emailConfirm.component';
import { CoreUserListComponent } from './list/list.component';
import { CoreUserMobileConfirmComponent } from './mobileConfirm/mobileConfirm.component';
import { CoreUserResellerChartComponent } from './reseller-chart/reseller-chart.component';
import { CoreUserSelectorComponent } from './selector/selector.component';
import { CoreUserViewComponent } from './view/view.component';



@NgModule({
  declarations: [
    CoreUserComponent,
    CoreUserListComponent,
    CoreUserAddComponent,
    CoreUserEditComponent,
    CoreUserChangePasswordComponent,
    CoreUserSelectorComponent,
    CoreUserViewComponent,
    CoreUserResellerChartComponent,
    CoreUserEmailConfirmComponent,
    CoreUserMobileConfirmComponent,
  ],
  exports: [
    CoreUserComponent,
    CoreUserListComponent,
    CoreUserAddComponent,
    CoreUserEditComponent,
    CoreUserChangePasswordComponent,
    CoreUserSelectorComponent,
    CoreUserViewComponent,
    CoreUserResellerChartComponent,
    CoreUserEmailConfirmComponent,
    CoreUserMobileConfirmComponent,
  ],
  imports: [
    CommonModule,
    CoreUserRouting,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),

    SharedModule,
    AngularEditorModule,
    NgOtpInputModule,
    CmsFileManagerModule
  ],
  providers: [
    CoreAuthV3Service,
    CoreModuleService,
    CoreEnumService,
    CoreUserService,
    CoreUserGroupService,
    CoreSiteUserService,
    CmsConfirmationDialogService
  ]
})
export class CoreUserModule { }
