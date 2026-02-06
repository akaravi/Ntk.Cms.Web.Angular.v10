import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ApplicationComponent } from "./application.component";
import { ApplicationRoutes } from "./application.routing";
import { ApplicationAppListComponent } from "./content/list/list.component";
import { ApplicationIntroListComponent } from "./intro/list/list.component";
import { ApplicationMemberInfoListComponent } from "./memberInfo/list/list.component";
import { ApplicationLogNotificationListComponent } from "./notification/list/list.component";
import { ApplicationSourceListComponent } from "./source/list/list.component";
import { ApplicationThemeConfigListComponent } from "./themeConfig/list/list.component";

import { AngularEditorModule } from "@kolkov/angular-editor";
import { SharedModule } from "src/app/shared/shared.module";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import {
  ApplicationAppService,
  ApplicationConfigurationService,
  ApplicationEnumService,
  ApplicationIntroService,
  ApplicationLogNotificationService,
  ApplicationMemberInfoService,
  ApplicationSourceService,
  ApplicationSourceSiteCategoryService,
  ApplicationThemeConfigService,
  CoreAuthV3Service,
  CoreEnumService,
  CoreModuleService,
  CoreModuleTagService,
} from "ntk-cms-api";
import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { CmsFileUploaderModule } from "src/app/shared/cms-file-uploader/cms-file-uploader.module";
import { ApplicationAppAddComponent } from "./content/add/add.component";
import { ApplicationAppDownloadComponent } from "./content/download/download.component";
import { ApplicationAppEditComponent } from "./content/edit/edit.component";
import { ApplicationAppSelectorComponent } from "./content/selector/selector.component";
import { ApplicationAppTreeComponent } from "./content/tree/tree.component";
import { ApplicationAppUploadAppComponent } from "./content/uploadApp/uploadApp.component";
import { ApplicationAppUploadUpdateComponent } from "./content/uploadUpdate/uploadUpdate.component";
import { ApplicationIntroAddComponent } from "./intro/add/add.component";
import { ApplicationIntroEditComponent } from "./intro/edit/edit.component";
import { ApplicationMemberInfoSelectorComponent } from "./memberInfo/selector/selector.component";
import { ApplicationMemberInfoViewComponent } from "./memberInfo/view/view.component";
import { ApplicationLogNotificationActionSendComponent } from "./notification/action-send/action-send.component";
import { ApplicationLogNotificationViewComponent } from "./notification/view/view.component";
import { ApplicationSourceAddComponent } from "./source/add/add.component";
import { ApplicationSourceEditComponent } from "./source/edit/edit.component";
import { ApplicationSourceSelectorComponent } from "./source/selector/selector.component";
import { ApplicationSourceTreeComponent } from "./source/tree/tree.component";
import { ApplicationThemeConfigAddComponent } from "./themeConfig/add/add.component";
import { ApplicationThemeConfigEditComponent } from "./themeConfig/edit/edit.component";
import { ApplicationThemeConfigSelectorComponent } from "./themeConfig/selector/selector.component";
import { ApplicationConfigComponent } from "./config/application-config.component";
import { ApplicationConfigCheckSiteComponent } from "./config/check-site/check-site.component";
import { ApplicationConfigCheckUserComponent } from "./config/check-user/check-user.component";
import { ApplicationConfigMainAdminComponent } from "./config/main-admin/config-main-admin.component";
import { ApplicationConfigSiteComponent } from "./config/site/config-site.component";
import { ApplicationAppListMobileComponent } from "./content/list/list.mobile.component";
import { ApplicationAppWidgetComponent } from "./content/widget/widget.component";
import { ApplicationIntroListMobileComponent } from "./intro/list/list.mobile.component";
import { ApplicationMemberInfoListMobileComponent } from "./memberInfo/list/list.mobile.component";
import { ApplicationMemberInfoWidgetComponent } from "./memberInfo/widget/widget.component";
import { ApplicationLogNotificationListMobileComponent } from "./notification/list/list.mobile.component";
import { ApplicationSourceListMobileComponent } from "./source/list/list.mobile.component";
import { ApplicationThemeConfigListMobileComponent } from "./themeConfig/list/list.mobile.component";

@NgModule({
  declarations: [
    ApplicationComponent,

    ApplicationSourceListComponent,
    ApplicationSourceTreeComponent,
    ApplicationSourceAddComponent,
    ApplicationSourceEditComponent,
    ApplicationSourceSelectorComponent,

    ApplicationAppListComponent,
    ApplicationAppTreeComponent,
    ApplicationAppAddComponent,
    ApplicationAppEditComponent,
    ApplicationAppSelectorComponent,
    ApplicationAppDownloadComponent,
    ApplicationAppUploadAppComponent,
    ApplicationAppUploadUpdateComponent,

    ApplicationIntroListComponent,
    ApplicationIntroAddComponent,
    ApplicationIntroEditComponent,

    ApplicationMemberInfoListComponent,
    ApplicationMemberInfoViewComponent,
    ApplicationMemberInfoSelectorComponent,

    ApplicationLogNotificationListComponent,
    ApplicationLogNotificationViewComponent,
    ApplicationLogNotificationActionSendComponent,

    ApplicationThemeConfigListComponent,
    ApplicationThemeConfigSelectorComponent,
    ApplicationThemeConfigAddComponent,
    ApplicationThemeConfigEditComponent,
    ApplicationConfigComponent,
    ApplicationConfigCheckSiteComponent,
    ApplicationConfigCheckUserComponent,
    ApplicationConfigMainAdminComponent,
    ApplicationConfigSiteComponent,
    ApplicationAppListMobileComponent,
    ApplicationAppWidgetComponent,
    ApplicationIntroListMobileComponent,
    ApplicationMemberInfoListMobileComponent,
    ApplicationMemberInfoWidgetComponent,
    ApplicationLogNotificationListMobileComponent,
    ApplicationSourceListMobileComponent,
    ApplicationThemeConfigListMobileComponent,
  ],
  imports: [
    CommonModule,
    ApplicationRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    AngularEditorModule,
    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
    CmsFileUploaderModule,
    CmsFileManagerModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreAuthV3Service,
    CmsConfirmationDialogService,
    ApplicationEnumService,
    CoreModuleTagService,
    ApplicationAppService,
    ApplicationIntroService,
    ApplicationSourceService,
    ApplicationMemberInfoService,
    ApplicationLogNotificationService,
    ApplicationThemeConfigService,
    ApplicationConfigurationService,
    ApplicationSourceSiteCategoryService,
  ],
})
export class ApplicationModule {}
