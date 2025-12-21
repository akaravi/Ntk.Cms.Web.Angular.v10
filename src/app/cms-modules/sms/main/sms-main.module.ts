import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SmsMainComponent } from "./sms-main.component";
import { SmsMainRoutes } from "./sms-main.routing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DragDropModule } from "@angular/cdk/drag-drop";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import {
  CoreEnumService,
  CoreModuleService,
  SmsConfigurationService,
  SmsEnumService,
  SmsMainApiNumberPermissionService,
  SmsMainApiNumberService,
  SmsMainApiPathAndApiNumberService,
  SmsMainApiPathCompanyService,
  SmsMainApiPathPermissionService,
  SmsMainApiPathPublicConfigService,
  SmsMainApiPathService,
  SmsMainClientPermissionService,
  SmsMainMessageCategoryService,
  SmsMainMessageContentService,
} from "ntk-cms-api";
import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { DynamicFormBuilderModule } from "src/app/core/dynamic-form-builder/dynamic-form-builder.module";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../../core-main/core.shared.module";
import { SmsSharedModule } from "../shared/sms.shared.module";
import { SmsMainApiNumberPermissionAddComponent } from "./api-number-permission/add/add.component";
import { SmsMainApiNumberPermissionAddMobileComponent } from "./api-number-permission/add/add.mobile.component";
import { SmsMainApiNumberPermissionEditComponent } from "./api-number-permission/edit/edit.component";
import { SmsMainApiNumberPermissionEditMobileComponent } from "./api-number-permission/edit/edit.mobile.component";
import { SmsMainApiNumberPermissionListComponent } from "./api-number-permission/list/list.component";
import { SmsMainApiNumberPermissionListMobileComponent } from "./api-number-permission/list/list.mobile.component";
import { SmsMainApiNumberAddComponent } from "./api-number/add/add.component";
import { SmsMainApiNumberAddMobileComponent } from "./api-number/add/add.mobile.component";
import { SmsMainApiNumberEditComponent } from "./api-number/edit/edit.component";
import { SmsMainApiNumberEditMobileComponent } from "./api-number/edit/edit.mobile.component";
import { SmsMainApiNumberHeaderComponent } from "./api-number/header/header.component";
import { SmsMainApiNumberListComponent } from "./api-number/list/list.component";
import { SmsMainApiNumberListMobileComponent } from "./api-number/list/list.mobile.component";
import { SmsMainApiNumberSelectorComponent } from "./api-number/selector/selector.component";
import { SmsMainApiPathCompanyAddComponent } from "./api-path-company/add/add.component";
import { SmsMainApiPathCompanyAddMobileComponent } from "./api-path-company/add/add.mobile.component";
import { SmsMainApiPathCompanyEditComponent } from "./api-path-company/edit/edit.component";
import { SmsMainApiPathCompanyEditMobileComponent } from "./api-path-company/edit/edit.mobile.component";
import { SmsMainApiPathCompanyListComponent } from "./api-path-company/list/list.component";
import { SmsMainApiPathCompanyListMobileComponent } from "./api-path-company/list/list.mobile.component";
import { SmsMainApiPathCompanySelectorComponent } from "./api-path-company/selector/selector.component";
import { SmsMainApiPathCompanyTreeComponent } from "./api-path-company/tree/tree.component";
import { SmsMainApiPathCompanyTreeMobileComponent } from "./api-path-company/tree/tree.mobile.component";
import { SmsMainApiPathPermissionAddComponent } from "./api-path-permission/add/add.component";
import { SmsMainApiPathPermissionAddMobileComponent } from "./api-path-permission/add/add.mobile.component";
import { SmsMainApiPathPermissionEditComponent } from "./api-path-permission/edit/edit.component";
import { SmsMainApiPathPermissionEditMobileComponent } from "./api-path-permission/edit/edit.mobile.component";
import { SmsMainApiPathPermissionListComponent } from "./api-path-permission/list/list.component";
import { SmsMainApiPathPermissionListMobileComponent } from "./api-path-permission/list/list.mobile.component";
import { SmsMainApiPathPriceServiceAddComponent } from "./api-path-price-service/add/add.component";
import { SmsMainApiPathPriceServiceAddMobileComponent } from "./api-path-price-service/add/add.mobile.component";
import { SmsMainApiPathPriceServiceEditComponent } from "./api-path-price-service/edit/edit.component";
import { SmsMainApiPathPriceServiceEditMobileComponent } from "./api-path-price-service/edit/edit.mobile.component";
import { SmsMainApiPathPriceServiceListComponent } from "./api-path-price-service/list/list.component";
import { SmsMainApiPathPriceServiceListMobileComponent } from "./api-path-price-service/list/list.mobile.component";
import { SmsMainApiPathAddComponent } from "./api-path/add/add.component";
import { SmsMainApiPathAddMobileComponent } from "./api-path/add/add.mobile.component";
import { SmsMainApiPathEditComponent } from "./api-path/edit/edit.component";
import { SmsMainApiPathEditMobileComponent } from "./api-path/edit/edit.mobile.component";
import { SmsMainApiPathHeaderComponent } from "./api-path/header/header.component";
import { SmsMainApiPathListComponent } from "./api-path/list/list.component";
import { SmsMainApiPathListMobileComponent } from "./api-path/list/list.mobile.component";
import { SmsMainApiPathSelectionlistComponent } from "./api-path/selectionlist/selectionlist.component";
import { SmsMainApiPathSelectorComponent } from "./api-path/selector/selector.component";
import { SmsMainApiPathSendTestComponent } from "./api-path/sendTest/sendTest.component";
import { SmsMainApiPathTreeMobileComponent } from "./api-path/tree/tree.mobile.component";
import { SmsMainClientPermissionAddComponent } from "./client-permission/add/add.component";
import { SmsMainClientPermissionAddMobileComponent } from "./client-permission/add/add.mobile.component";
import { SmsMainClientPermissionEditComponent } from "./client-permission/edit/edit.component";
import { SmsMainClientPermissionEditMobileComponent } from "./client-permission/edit/edit.mobile.component";
import { SmsMainClientPermissionListComponent } from "./client-permission/list/list.component";
import { SmsMainClientPermissionListMobileComponent } from "./client-permission/list/list.mobile.component";
import { SmsMainMessageCategoryAddComponent } from "./message-category/add/add.component";
import { SmsMainMessageCategoryDeleteComponent } from "./message-category/delete/delete.component";
import { SmsMainMessageCategoryEditComponent } from "./message-category/edit/edit.component";
import { SmsMainMessageCategorySelectorComponent } from "./message-category/selector/selector.component";
import { SmsMainMessageCategoryTreeComponent } from "./message-category/tree/tree.component";
import { SmsMainMessageCategoryTreeMobileComponent } from "./message-category/tree/tree.mobile.component";
import { SmsMainMessageContentAddComponent } from "./message-content/add/add.component";
import { SmsMainMessageContentAddMobileComponent } from "./message-content/add/add.mobile.component";
import { SmsMainMessageContentEditComponent } from "./message-content/edit/edit.component";
import { SmsMainMessageContentEditMobileComponent } from "./message-content/edit/edit.mobile.component";
import { SmsMainMessageContentListComponent } from "./message-content/list/list.component";
import { SmsMainMessageContentListMobileComponent } from "./message-content/list/list.mobile.component";
import { SmsMainMessageContentSelectorComponent } from "./message-content/selector/selector.component";
import { SmsMainApiPathPublicConfigAddComponent } from "./public-config/add/add.component";
import { SmsMainApiPathPublicConfigAddMobileComponent } from "./public-config/add/add.mobile.component";
import { SmsMainApiPathPublicConfigEditComponent } from "./public-config/edit/edit.component";
import { SmsMainApiPathPublicConfigEditMobileComponent } from "./public-config/edit/edit.mobile.component";
import { SmsMainApiPathPublicConfigHeaderComponent } from "./public-config/header/header.component";
import { SmsMainApiPathPublicConfigListComponent } from "./public-config/list/list.component";
import { SmsMainApiPathPublicConfigListMobileComponent } from "./public-config/list/list.mobile.component";
import { SmsMainApiPathPublicConfigSelectorComponent } from "./public-config/selector/selector.component";
import { SmsMainApiPathPublicConfigTreeComponent } from "./public-config/tree/tree.component";
import { SmsMainApiPathPublicConfigTreeMobileComponent } from "./public-config/tree/tree.mobile.component";

@NgModule({
  declarations: [
    SmsMainComponent,
    SmsMainApiPathPublicConfigAddComponent,
    SmsMainApiPathPublicConfigAddMobileComponent,
    SmsMainApiPathPublicConfigEditComponent,
    SmsMainApiPathPublicConfigEditMobileComponent,
    SmsMainApiPathPublicConfigListComponent,
    SmsMainApiPathPublicConfigListMobileComponent,
    SmsMainApiPathPublicConfigSelectorComponent,
    SmsMainApiPathPublicConfigTreeComponent,
    SmsMainApiPathPublicConfigTreeMobileComponent,
    SmsMainApiPathPublicConfigHeaderComponent,
    /* */

    /*company*/
    SmsMainApiPathCompanyListComponent,
    SmsMainApiPathCompanyListMobileComponent,
    SmsMainApiPathCompanyAddComponent,
    SmsMainApiPathCompanyAddMobileComponent,
    SmsMainApiPathCompanyEditComponent,
    SmsMainApiPathCompanyEditMobileComponent,
    SmsMainApiPathCompanySelectorComponent,
    SmsMainApiPathCompanyTreeComponent,
    SmsMainApiPathCompanyTreeMobileComponent,
    /*api*/
    SmsMainApiPathListComponent,
    SmsMainApiPathListMobileComponent,
    SmsMainApiPathAddComponent,
    SmsMainApiPathAddMobileComponent,
    SmsMainApiPathEditComponent,
    SmsMainApiPathEditMobileComponent,
    SmsMainApiPathSelectorComponent,
    SmsMainApiPathTreeMobileComponent,
    SmsMainApiPathHeaderComponent,

    SmsMainApiPathSendTestComponent,
    SmsMainApiPathSelectionlistComponent,
    /*Permission*/
    SmsMainApiPathPermissionListComponent,
    SmsMainApiPathPermissionListMobileComponent,
    SmsMainApiPathPermissionAddComponent,
    SmsMainApiPathPermissionAddMobileComponent,
    SmsMainApiPathPermissionEditComponent,
    SmsMainApiPathPermissionEditMobileComponent,
    /*PriceService*/
    SmsMainApiPathPriceServiceListComponent,
    SmsMainApiPathPriceServiceListMobileComponent,
    SmsMainApiPathPriceServiceAddComponent,
    SmsMainApiPathPriceServiceAddMobileComponent,
    SmsMainApiPathPriceServiceEditComponent,
    SmsMainApiPathPriceServiceEditMobileComponent,
    /*ApiNumber*/
    SmsMainApiNumberListComponent,
    SmsMainApiNumberListMobileComponent,
    SmsMainApiNumberAddComponent,
    SmsMainApiNumberAddMobileComponent,
    SmsMainApiNumberEditComponent,
    SmsMainApiNumberEditMobileComponent,
    SmsMainApiNumberSelectorComponent,
    SmsMainApiNumberHeaderComponent,
    /*Permission*/
    SmsMainApiNumberPermissionListComponent,
    SmsMainApiNumberPermissionListMobileComponent,
    SmsMainApiNumberPermissionAddComponent,
    SmsMainApiNumberPermissionAddMobileComponent,
    SmsMainApiNumberPermissionEditComponent,
    SmsMainApiNumberPermissionEditMobileComponent,

    /*Permission*/
    SmsMainClientPermissionListComponent,
    SmsMainClientPermissionListMobileComponent,
    SmsMainClientPermissionAddComponent,
    SmsMainClientPermissionAddMobileComponent,
    SmsMainClientPermissionEditComponent,
    SmsMainClientPermissionEditMobileComponent,

    /** */
    SmsMainMessageCategoryAddComponent,
    SmsMainMessageCategoryDeleteComponent,
    SmsMainMessageCategoryEditComponent,
    SmsMainMessageCategorySelectorComponent,
    SmsMainMessageCategoryTreeComponent,
    SmsMainMessageCategoryTreeMobileComponent,
    /** */
    SmsMainMessageContentAddComponent,
    SmsMainMessageContentAddMobileComponent,
    SmsMainMessageContentEditComponent,
    SmsMainMessageContentEditMobileComponent,
    SmsMainMessageContentListComponent,
    SmsMainMessageContentListMobileComponent,
    SmsMainMessageContentSelectorComponent,
    /** */
  ],
  exports: [
    SmsMainApiPathPublicConfigAddComponent,
    SmsMainApiPathPublicConfigAddMobileComponent,
    SmsMainApiPathPublicConfigEditComponent,
    SmsMainApiPathPublicConfigEditMobileComponent,
    SmsMainApiPathPublicConfigListComponent,
    SmsMainApiPathPublicConfigListMobileComponent,
    SmsMainApiPathPublicConfigSelectorComponent,
    SmsMainApiPathPublicConfigTreeComponent,
    SmsMainApiPathPublicConfigTreeMobileComponent,
    SmsMainApiPathPublicConfigHeaderComponent,
    /* */

    /*company*/
    SmsMainApiPathCompanyListComponent,
    SmsMainApiPathCompanyListMobileComponent,
    SmsMainApiPathCompanyAddComponent,
    SmsMainApiPathCompanyAddMobileComponent,
    SmsMainApiPathCompanyEditComponent,
    SmsMainApiPathCompanyEditMobileComponent,
    SmsMainApiPathCompanySelectorComponent,
    SmsMainApiPathCompanyTreeComponent,
    SmsMainApiPathCompanyTreeMobileComponent,
    /*api*/
    SmsMainApiPathListComponent,
    SmsMainApiPathAddComponent,
    SmsMainApiPathAddMobileComponent,
    SmsMainApiPathEditComponent,
    SmsMainApiPathSelectorComponent,
    SmsMainApiPathTreeMobileComponent,
    SmsMainApiPathHeaderComponent,
    SmsMainApiPathSendTestComponent,
    SmsMainApiPathSelectionlistComponent,
    /*Permission*/
    SmsMainApiPathPermissionListComponent,
    SmsMainApiPathPermissionListMobileComponent,
    SmsMainApiPathPermissionAddComponent,
    SmsMainApiPathPermissionAddMobileComponent,
    SmsMainApiPathPermissionEditComponent,
    SmsMainApiPathPermissionEditMobileComponent,
    /*PriceService*/
    SmsMainApiPathPriceServiceListComponent,
    SmsMainApiPathPriceServiceListMobileComponent,
    SmsMainApiPathPriceServiceAddComponent,
    SmsMainApiPathPriceServiceAddMobileComponent,
    SmsMainApiPathPriceServiceEditComponent,
    SmsMainApiPathPriceServiceEditMobileComponent,
    /*ApiNumber*/
    SmsMainApiNumberListComponent,
    SmsMainApiNumberListMobileComponent,
    SmsMainApiNumberAddComponent,
    SmsMainApiNumberAddMobileComponent,
    SmsMainApiNumberEditComponent,
    SmsMainApiNumberEditMobileComponent,
    SmsMainApiNumberSelectorComponent,
    SmsMainApiNumberHeaderComponent,
    /*Permission*/
    SmsMainApiNumberPermissionListComponent,
    SmsMainApiNumberPermissionListMobileComponent,
    SmsMainApiNumberPermissionAddComponent,
    SmsMainApiNumberPermissionAddMobileComponent,
    SmsMainApiNumberPermissionEditComponent,
    SmsMainApiNumberPermissionEditMobileComponent,
    /*Permission*/
    SmsMainClientPermissionListComponent,
    SmsMainClientPermissionListMobileComponent,
    SmsMainClientPermissionAddComponent,
    SmsMainClientPermissionAddMobileComponent,
    SmsMainClientPermissionEditComponent,
    SmsMainClientPermissionEditMobileComponent,
    /** */
    SmsMainMessageCategoryAddComponent,
    SmsMainMessageCategoryDeleteComponent,
    SmsMainMessageCategoryEditComponent,
    SmsMainMessageCategorySelectorComponent,
    SmsMainMessageCategoryTreeComponent,
    SmsMainMessageCategoryTreeMobileComponent,
    /** */
    SmsMainMessageContentAddComponent,
    SmsMainMessageContentAddMobileComponent,
    SmsMainMessageContentEditComponent,
    SmsMainMessageContentEditMobileComponent,
    SmsMainMessageContentListComponent,
    SmsMainMessageContentListMobileComponent,
    SmsMainMessageContentSelectorComponent,
    /** */
  ],
  imports: [
    CommonModule,
    SmsMainRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    CoreSharedModule,

    AngularEditorModule,
    CmsFileManagerModule,
    DynamicFormBuilderModule,
    NgxMaterialTimepickerModule,
    SmsSharedModule,
    DragDropModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    SmsEnumService,
    CmsConfirmationDialogService,
    /*Config*/
    SmsConfigurationService,
    /*Config*/
    SmsMainApiPathService,
    SmsMainApiPathCompanyService,
    SmsMainApiPathPermissionService,
    SmsMainApiNumberPermissionService,
    SmsMainApiPathPublicConfigService,
    SmsMainApiNumberService,
    SmsMainApiPathAndApiNumberService,
    SmsMainMessageContentService,
    SmsMainMessageCategoryService,
    SmsMainClientPermissionService,
  ],
})
export class SmsMainModule {}
