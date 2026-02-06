import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ApiTelegramComponent } from "./api-telegram.component";
import { ApiTelegramRoutes } from "./api-telegram.routing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularEditorModule } from "@kolkov/angular-editor";
import { SharedModule } from "src/app/shared/shared.module";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import {
  ApiTelegramBotConfigService,
  ApiTelegramConfigurationService,
  ApiTelegramEnumService,
  ApiTelegramLogInputService,
  ApiTelegramLogOutputService,
  ApiTelegramMemberInfoService,
  ApiTelegramReceivedFileService,
  ApiTelegramUploadedFileService,
  CoreAuthV3Service,
  CoreEnumService,
  CoreModuleService,
} from "ntk-cms-api";

import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { CmsFileUploaderModule } from "src/app/shared/cms-file-uploader/cms-file-uploader.module";
import { ApiTelegramActionSendMessageSimpleComponent } from "./action/send-message-simple/send-message-simple.component";
import { ApiTelegramActionSendMessageComponent } from "./action/send-message/send-message.component";
import { ApiTelegramBotConfigAddComponent } from "./bot-config/add/add.component";
import { ApiTelegramBotConfigEditComponent } from "./bot-config/edit/edit.component";
import { ApiTelegramBotConfigListComponent } from "./bot-config/list/list.component";
import { ApiTelegramBotConfigListMobileComponent } from "./bot-config/list/list.mobile.component";
import { ApiTelegramBotConfigSelectorComponent } from "./bot-config/selector/selector.component";
import { ApiTelegramLogInputListComponent } from "./log-input/list/list.component";
import { ApiTelegramLogOutputListComponent } from "./log-output/list/list.component";
import { ApiTelegramMemberInfoListComponent } from "./member-info/list/list.component";
import { ApiTelegramReceivedFileListComponent } from "./received-file/list/list.component";
import { ApiTelegramUploadedFileListComponent } from "./uploaded-file/list/list.component";
import { ApiTelegramConfigComponent } from "./config/api-telegram-config.component";
import { ApiTelegramConfigCheckSiteComponent } from "./config/check-site/check-site.component";
import { ApiTelegramConfigCheckUserComponent } from "./config/check-user/check-user.component";
import { ApiTelegramConfigMainAdminComponent } from "./config/main-admin/config-main-admin.component";
import { ApiTelegramConfigSiteComponent } from "./config/site/config-site.component";
import { ApiTelegramLogInputListMobileComponent } from "./log-input/list/list.mobile.component";
import { ApiTelegramLogOutputListMobileComponent } from "./log-output/list/list.mobile.component";
import { ApiTelegramMemberInfoListMobileComponent } from "./member-info/list/list.mobile.component";
import { ApiTelegramReceivedFileListMobileComponent } from "./received-file/list/list.mobile.component";
import { ApiTelegramUploadedFileListMobileComponent } from "./uploaded-file/list/list.mobile.component";

@NgModule({
  declarations: [
    ApiTelegramComponent,
    //
    ApiTelegramBotConfigListComponent,
    ApiTelegramBotConfigListMobileComponent,
    ApiTelegramBotConfigAddComponent,
    ApiTelegramBotConfigEditComponent,
    ApiTelegramBotConfigSelectorComponent,
    //
    ApiTelegramLogInputListComponent,
    //
    ApiTelegramLogOutputListComponent,
    //
    ApiTelegramMemberInfoListComponent,
    //
    ApiTelegramReceivedFileListComponent,
    //
    ApiTelegramUploadedFileListComponent,
    //
    ApiTelegramActionSendMessageComponent,
    ApiTelegramActionSendMessageSimpleComponent,
    ApiTelegramConfigComponent,
    ApiTelegramConfigCheckSiteComponent,
    ApiTelegramConfigCheckUserComponent,
    ApiTelegramConfigMainAdminComponent,
    ApiTelegramConfigSiteComponent,
    ApiTelegramLogInputListMobileComponent,
    ApiTelegramLogOutputListMobileComponent,
    ApiTelegramMemberInfoListMobileComponent,
    ApiTelegramReceivedFileListMobileComponent,
    ApiTelegramUploadedFileListMobileComponent,
  ],
  imports: [
    CommonModule,
    ApiTelegramRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),

    SharedModule,
    AngularEditorModule,

    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
    CmsFileUploaderModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreAuthV3Service,
    CmsConfirmationDialogService,
    ApiTelegramConfigurationService,
    ApiTelegramBotConfigService,
    ApiTelegramEnumService,
    ApiTelegramLogInputService,
    ApiTelegramLogOutputService,
    ApiTelegramMemberInfoService,
    ApiTelegramReceivedFileService,
    ApiTelegramUploadedFileService,
  ],
})
export class ApiTelegramModule {}
