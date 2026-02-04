import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularEditorModule } from "@kolkov/angular-editor";
import {
  CoreModuleService,
  CoreModuleSiteService,
  CoreSiteCategoryCmsModuleService,
  CoreSiteCategoryService,
  CoreSiteDomainAliasService,
  CoreSiteService,
  CoreSiteUserService,
  CoreUserService,
  SmsActionService,
} from "ntk-cms-api";
import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { CmsTranslationService } from "src/app/core/i18n/cmsTranslation.service";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { NgxMatColorPickerModule } from "src/app/shared/color-picker.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../core.shared.module";
import { CoreModuleModule } from "../module/coreModule.module";
import { CoreSiteCategoryCmsModuleModule } from "../site-category-module/coreSiteCategoryCmsModule.module";
import { CoreSiteCategoryCmsModule } from "../site-category/coreSiteCategory.module";
import { CoreUserGroupCmsModule } from "../user-group/coreUserGroup.module";
import { CoreUserModule } from "../user/coreUser.module";
import { CoreSiteAddComponent } from "./add/add.component";
import { CoreSiteAddFirstComponent } from "./addFirst/addFirst.component";
import { CoreSiteComponent } from "./coreSite.component";
import { CoreSiteResolver } from "./coreSite.resolver";
import { CoreSiteRouting } from "./coreSite.routing";
import { CoreSiteDeleteComponent } from "./delete/delete.component";
import { CoreSiteEditComponent } from "./edit/edit.component";
import { CoreSiteListComponent } from "./list/list.component";
import { CoreSiteListMobileComponent } from "./list/list.mobile.component";
import { CoreSiteModuleSiteInfoComponent } from "./module-site-info/module-site-info.component";
import { CoreSiteModuleSiteOptimazeComponent } from "./module-site-optimaze/module-site-optimaze.component";
import { CoreSiteModuleAddComponent } from "./moduleAdd/moduleAdd.component";
import { CoreSiteModuleEditComponent } from "./moduleEdit/moduleEdit.component";
import { CoreSiteModuleListComponent } from "./moduleList/moduleList.component";
import { CoreSiteResellerChartComponent } from "./reseller-chart/reseller-chart.component";
import { CoreSiteSelectorComponent } from "./selector/selector.component";
import { CoreSiteSiteSelectComponent } from "./site-select/site-select.component";
import { CoreSiteTreeComponent } from "./tree/tree.component";
import { CoreSiteUserAddComponent } from "./user-add/user-add.component";
import { CoreSiteUserEditComponent } from "./user-edit/user-edit.component";
import { CoreSiteUserListComponent } from "./user-list/user-list.component";

@NgModule({
  declarations: [
    CoreSiteComponent,
    CoreSiteAddFirstComponent,
    CoreSiteSiteSelectComponent,
    CoreSiteListComponent,
    CoreSiteListMobileComponent,
    CoreSiteAddComponent,
    CoreSiteEditComponent,
    CoreSiteDeleteComponent,
    CoreSiteSelectorComponent,
    CoreSiteTreeComponent,
    CoreSiteModuleListComponent,
    CoreSiteModuleAddComponent,
    CoreSiteModuleEditComponent,
    CoreSiteUserListComponent,
    CoreSiteUserAddComponent,
    CoreSiteUserEditComponent,
    CoreSiteResellerChartComponent,
    CoreSiteModuleSiteInfoComponent,
    CoreSiteModuleSiteOptimazeComponent,
  ],
  providers: [
    CoreSiteService,
    CoreSiteCategoryCmsModuleService,
    CoreModuleService,
    CoreSiteCategoryService,
    CoreSiteResolver,
    CoreModuleSiteService,
    CoreSiteDomainAliasService,
    CmsConfirmationDialogService,
    CoreUserService,
    CoreSiteUserService,
    CmsTranslationService,
    SmsActionService,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreSiteRouting,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    AngularEditorModule,

    CoreSiteCategoryCmsModule,
    CoreSiteCategoryCmsModuleModule,
    CoreModuleModule,
    CoreUserModule,
    CoreUserGroupCmsModule,
    NgxMatColorPickerModule,
    CoreSharedModule,
    CmsFileManagerModule,
  ],
  exports: [
    CoreSiteComponent,
    CoreSiteAddFirstComponent,
    CoreSiteSiteSelectComponent,
    CoreSiteListComponent,
    CoreSiteListMobileComponent,
    CoreSiteAddComponent,
    CoreSiteEditComponent,
    CoreSiteDeleteComponent,
    CoreSiteSelectorComponent,
    CoreSiteTreeComponent,
    CoreSiteModuleListComponent,
    CoreSiteModuleAddComponent,
    CoreSiteModuleEditComponent,
    CoreSiteUserListComponent,
    CoreSiteUserAddComponent,
    CoreSiteUserEditComponent,
    CoreSiteResellerChartComponent,
    CoreSiteModuleSiteInfoComponent,
    CoreSiteModuleSiteOptimazeComponent,
  ],
})
export class CoreSiteModule {}
