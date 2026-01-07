import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DataProviderMainComponent } from "./data-provider-main.component";
import { DataProviderMainRoutes } from "./data-provider-main.routing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularEditorModule } from "@kolkov/angular-editor";
import { SharedModule } from "src/app/shared/shared.module";

import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTreeModule } from "@angular/material/tree";
import { CoreSharedModule } from "src/app/cms-modules/core-main/core.shared.module";
import { DataProviderSharedModule } from "../shared/data-provider-shared.module";

import { IconPickerModule } from "ngx-ntk-icon-picker";
import {
  CoreAuthV3Service,
  CoreEnumService,
  CoreModuleService,
  CoreModuleTagService,
  DataProviderClientApplicationService,
  DataProviderClientApplicationPermissionService,
  DataProviderClientService,
  DataProviderEnumService,
  DataProviderPlanCategoryService,
  DataProviderPlanClientService,
  DataProviderPlanPriceService,
  DataProviderPlanService,
  DataProviderPlanSourceService,
  DataProviderSourceCompanyService,
  DataProviderSourcePathService,
  DataProviderSourcePublicConfigService,
  DataProviderSourceService,
} from "ntk-cms-api";
import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
// Client
import { DataProviderClientAddComponent } from "./client/add/add.component";
import { DataProviderClientChargePaymentComponent } from "./client/charge-payment/charge-payment.component";
import { DataProviderClientChargeComponent } from "./client/charge/charge.component";
import { DataProviderClientDeleteComponent } from "./client/delete/delete.component";
import { DataProviderClientEditComponent } from "./client/edit/edit.component";
import { DataProviderClientListComponent } from "./client/list/list.component";
import { DataProviderClientListMobileComponent } from "./client/list/list.mobile.component";
import { DataProviderClientSelectorComponent } from "./client/selector/selector.component";
import { DataProviderClientTreeComponent } from "./client/tree/tree.component";
// Plan Category
import { DataProviderPlanCategoryAddComponent } from "./plan-category/add/add.component";
import { DataProviderPlanCategoryDeleteComponent } from "./plan-category/delete/delete.component";
import { DataProviderPlanCategoryEditComponent } from "./plan-category/edit/edit.component";
// Note: DataProviderPlanCategorySelectorComponent is in DataProviderSharedModule
import { DataProviderPlanCategoryTreeComponent } from "./plan-category/tree/tree.component";
// Plan
import { DataProviderPlanAddComponent } from "./plan/add/add.component";
import { DataProviderPlanDeleteComponent } from "./plan/delete/delete.component";
import { DataProviderPlanEditComponent } from "./plan/edit/edit.component";
// Note: DataProviderPlanHeaderComponent, DataProviderPlanSelectionlistComponent, DataProviderPlanTreeComponent are in DataProviderSharedModule
import { DataProviderPlanListComponent } from "./plan/list/list.component";
import { DataProviderPlanListMobileComponent } from "./plan/list/list.mobile.component";
import { DataProviderPlanSelectorComponent } from "./plan/selector/selector.component";
// Plan Client
import { DataProviderPlanClientAddComponent } from "./plan-client/add/add.component";
import { DataProviderPlanClientDeleteComponent } from "./plan-client/delete/delete.component";
import { DataProviderPlanClientEditComponent } from "./plan-client/edit/edit.component";
import { DataProviderPlanClientHeaderComponent } from "./plan-client/header/header.component";
import { DataProviderPlanClientListComponent } from "./plan-client/list/list.component";
import { DataProviderPlanClientListMobileComponent } from "./plan-client/list/list.mobile.component";
import { DataProviderPlanClientSelectorComponent } from "./plan-client/selector/selector.component";
import { DataProviderPlanClientTreeComponent } from "./plan-client/tree/tree.component";
// Plan Price
import { DataProviderPlanPriceAddComponent } from "./plan-price/add/add.component";
import { DataProviderPlanPriceChargePaymentComponent } from "./plan-price/charge-payment/charge-payment.component";
import { DataProviderPlanPriceChargeComponent } from "./plan-price/charge/charge.component";
import { DataProviderPlanPriceDeleteComponent } from "./plan-price/delete/delete.component";
import { DataProviderPlanPriceEditComponent } from "./plan-price/edit/edit.component";
import { DataProviderPlanPriceListComponent } from "./plan-price/list/list.component";
import { DataProviderPlanPriceListMobileComponent } from "./plan-price/list/list.mobile.component";
import { DataProviderPlanPriceSelectorComponent } from "./plan-price/selector/selector.component";
import { DataProviderPlanPriceTreeComponent } from "./plan-price/tree/tree.component";
// Plan Source
import { DataProviderPlanSourceAddComponent } from "./plan-source/add/add.component";
import { DataProviderPlanSourceDeleteComponent } from "./plan-source/delete/delete.component";
import { DataProviderPlanSourceEditComponent } from "./plan-source/edit/edit.component";
import { DataProviderPlanSourceHeaderComponent } from "./plan-source/header/header.component";
import { DataProviderPlanSourceListComponent } from "./plan-source/list/list.component";
import { DataProviderPlanSourceListMobileComponent } from "./plan-source/list/list.mobile.component";
import { DataProviderPlanSourceSelectorComponent } from "./plan-source/selector/selector.component";
import { DataProviderPlanSourceTreeComponent } from "./plan-source/tree/tree.component";
// Source
import { DataProviderSourceAddComponent } from "./source/add/add.component";
import { DataProviderSourceDeleteComponent } from "./source/delete/delete.component";
import { DataProviderSourceEditComponent } from "./source/edit/edit.component";
import { DataProviderSourceHeaderComponent } from "./source/header/header.component";
import { DataProviderSourceListComponent } from "./source/list/list.component";
import { DataProviderSourceListMobileComponent } from "./source/list/list.mobile.component";
import { DataProviderSourceSelectorComponent } from "./source/selector/selector.component";
import { DataProviderSourceTreeComponent } from "./source/tree/tree.component";
// Source Company
import { DataProviderSourceCompanyAddComponent } from "./source-company/add/add.component";
import { DataProviderSourceCompanyEditComponent } from "./source-company/edit/edit.component";
import { DataProviderSourceCompanyListComponent } from "./source-company/list/list.component";
import { DataProviderSourceCompanyListMobileComponent } from "./source-company/list/list.mobile.component";
import { DataProviderSourceCompanySelectorComponent } from "./source-company/selector/selector.component";
import { DataProviderSourceCompanyTreeComponent } from "./source-company/tree/tree.component";
// Source Public Config
import { DataProviderSourcePublicConfigAddComponent } from "./source-public-config/add/add.component";
import { DataProviderSourcePublicConfigEditComponent } from "./source-public-config/edit/edit.component";
import { DataProviderSourcePublicConfigListComponent } from "./source-public-config/list/list.component";
import { DataProviderSourcePublicConfigListMobileComponent } from "./source-public-config/list/list.mobile.component";
// Source Path
import { DataProviderSourcePathAddComponent } from "./source-path/add/add.component";
import { DataProviderSourcePathEditComponent } from "./source-path/edit/edit.component";
import { DataProviderSourcePathListComponent } from "./source-path/list/list.component";
import { DataProviderSourcePathListMobileComponent } from "./source-path/list/list.mobile.component";
import { DataProviderSourcePathSelectorComponent } from "./source-path/selector/selector.component";
// Client Application
import { DataProviderClientApplicationAddComponent } from "./client-application/add/add.component";
import { DataProviderClientApplicationEditComponent } from "./client-application/edit/edit.component";
import { DataProviderClientApplicationListComponent } from "./client-application/list/list.component";
import { DataProviderClientApplicationListMobileComponent } from "./client-application/list/list.mobile.component";
import { DataProviderClientApplicationSelectorComponent } from "./client-application/selector/selector.component";
// Client Application Permission
import { DataProviderClientApplicationPermissionAddComponent } from "./client-application-permission/add/add.component";
import { DataProviderClientApplicationPermissionEditComponent } from "./client-application-permission/edit/edit.component";
import { DataProviderClientApplicationPermissionListComponent } from "./client-application-permission/list/list.component";
import { DataProviderClientApplicationPermissionListMobileComponent } from "./client-application-permission/list/list.mobile.component";

@NgModule({
  declarations: [
    DataProviderMainComponent,
    /* Plan Category */
    DataProviderPlanCategoryAddComponent,
    DataProviderPlanCategoryDeleteComponent,
    DataProviderPlanCategoryEditComponent,
    // Note: DataProviderPlanCategorySelectorComponent is in DataProviderSharedModule
    DataProviderPlanCategoryTreeComponent,
    /* Plan */
    DataProviderPlanAddComponent,
    DataProviderPlanDeleteComponent,
    DataProviderPlanEditComponent,
    DataProviderPlanListComponent,
    DataProviderPlanListMobileComponent,
    DataProviderPlanSelectorComponent,
    // Note: DataProviderPlanSelectionlistComponent, DataProviderPlanTreeComponent, DataProviderPlanHeaderComponent are in DataProviderSharedModule
    /* Plan Source */
    DataProviderPlanSourceAddComponent,
    DataProviderPlanSourceDeleteComponent,
    DataProviderPlanSourceEditComponent,
    DataProviderPlanSourceHeaderComponent,
    DataProviderPlanSourceListComponent,
    DataProviderPlanSourceListMobileComponent,
    DataProviderPlanSourceSelectorComponent,
    DataProviderPlanSourceTreeComponent,
    /* Client */
    DataProviderClientAddComponent,
    DataProviderClientDeleteComponent,
    DataProviderClientEditComponent,
    DataProviderClientListComponent,
    DataProviderClientListMobileComponent,
    DataProviderClientSelectorComponent,
    DataProviderClientTreeComponent,
    DataProviderClientChargeComponent,
    DataProviderClientChargePaymentComponent,
    // Note: DataProviderClientHeaderComponent is in DataProviderSharedModule
    /* Source */
    DataProviderSourceAddComponent,
    DataProviderSourceDeleteComponent,
    DataProviderSourceEditComponent,
    DataProviderSourceHeaderComponent,
    DataProviderSourceListComponent,
    DataProviderSourceListMobileComponent,
    DataProviderSourceSelectorComponent,
    DataProviderSourceTreeComponent,
    /* Source Company */
    DataProviderSourceCompanyAddComponent,
    DataProviderSourceCompanyEditComponent,
    DataProviderSourceCompanyListComponent,
    DataProviderSourceCompanyListMobileComponent,
    DataProviderSourceCompanySelectorComponent,
    DataProviderSourceCompanyTreeComponent,
    /* Source Public Config */
    DataProviderSourcePublicConfigAddComponent,
    DataProviderSourcePublicConfigEditComponent,
    DataProviderSourcePublicConfigListComponent,
    DataProviderSourcePublicConfigListMobileComponent,
    /* Source Path */
    DataProviderSourcePathAddComponent,
    DataProviderSourcePathEditComponent,
    DataProviderSourcePathListComponent,
    DataProviderSourcePathListMobileComponent,
    DataProviderSourcePathSelectorComponent,
    /* Client Application */
    DataProviderClientApplicationAddComponent,
    DataProviderClientApplicationEditComponent,
    DataProviderClientApplicationListComponent,
    DataProviderClientApplicationListMobileComponent,
    DataProviderClientApplicationSelectorComponent,
    /* Client Application Permission */
    DataProviderClientApplicationPermissionAddComponent,
    DataProviderClientApplicationPermissionEditComponent,
    DataProviderClientApplicationPermissionListComponent,
    DataProviderClientApplicationPermissionListMobileComponent,
    /* Plan Client */
    DataProviderPlanClientAddComponent,
    DataProviderPlanClientDeleteComponent,
    DataProviderPlanClientEditComponent,
    DataProviderPlanClientHeaderComponent,
    DataProviderPlanClientListComponent,
    DataProviderPlanClientListMobileComponent,
    DataProviderPlanClientSelectorComponent,
    DataProviderPlanClientTreeComponent,
    /* Plan Price */
    DataProviderPlanPriceAddComponent,
    DataProviderPlanPriceDeleteComponent,
    DataProviderPlanPriceEditComponent,
    // Note: DataProviderPlanPriceHeaderComponent is in DataProviderSharedModule
    DataProviderPlanPriceListComponent,
    DataProviderPlanPriceListMobileComponent,
    DataProviderPlanPriceSelectorComponent,
    DataProviderPlanPriceTreeComponent,
    DataProviderPlanPriceChargeComponent,
    DataProviderPlanPriceChargePaymentComponent,
    /* */
  ],
  exports: [
    /* Plan Category */
    DataProviderPlanCategoryAddComponent,
    DataProviderPlanCategoryDeleteComponent,
    DataProviderPlanCategoryEditComponent,
    // Note: DataProviderPlanCategorySelectorComponent is exported from DataProviderSharedModule
    DataProviderPlanCategoryTreeComponent,
    /* Plan */
    DataProviderPlanAddComponent,
    DataProviderPlanDeleteComponent,
    DataProviderPlanEditComponent,
    DataProviderPlanListComponent,
    DataProviderPlanListMobileComponent,
    DataProviderPlanSelectorComponent,
    // Note: DataProviderPlanSelectionlistComponent, DataProviderPlanTreeComponent, DataProviderPlanHeaderComponent are exported from DataProviderSharedModule
    /* Plan Source */
    DataProviderPlanSourceAddComponent,
    DataProviderPlanSourceDeleteComponent,
    DataProviderPlanSourceEditComponent,
    DataProviderPlanSourceHeaderComponent,
    DataProviderPlanSourceListComponent,
    DataProviderPlanSourceListMobileComponent,
    DataProviderPlanSourceSelectorComponent,
    DataProviderPlanSourceTreeComponent,
    /* Client */
    DataProviderClientAddComponent,
    DataProviderClientDeleteComponent,
    DataProviderClientEditComponent,
    DataProviderClientListComponent,
    DataProviderClientListMobileComponent,
    DataProviderClientSelectorComponent,
    DataProviderClientTreeComponent,
    DataProviderClientChargeComponent,
    DataProviderClientChargePaymentComponent,
    // Note: DataProviderClientHeaderComponent is in DataProviderSharedModule
    /* Source */
    DataProviderSourceAddComponent,
    DataProviderSourceDeleteComponent,
    DataProviderSourceEditComponent,
    DataProviderSourceHeaderComponent,
    DataProviderSourceListComponent,
    DataProviderSourceListMobileComponent,
    DataProviderSourceSelectorComponent,
    DataProviderSourceTreeComponent,
    /* Source Company */
    DataProviderSourceCompanyAddComponent,
    DataProviderSourceCompanyEditComponent,
    DataProviderSourceCompanyListComponent,
    DataProviderSourceCompanyListMobileComponent,
    DataProviderSourceCompanySelectorComponent,
    DataProviderSourceCompanyTreeComponent,
    /* Source Public Config */
    DataProviderSourcePublicConfigAddComponent,
    DataProviderSourcePublicConfigEditComponent,
    DataProviderSourcePublicConfigListComponent,
    DataProviderSourcePublicConfigListMobileComponent,
    /* Source Path */
    DataProviderSourcePathAddComponent,
    DataProviderSourcePathEditComponent,
    DataProviderSourcePathListComponent,
    DataProviderSourcePathListMobileComponent,
    DataProviderSourcePathSelectorComponent,
    /* Client Application */
    DataProviderClientApplicationAddComponent,
    DataProviderClientApplicationEditComponent,
    DataProviderClientApplicationListComponent,
    DataProviderClientApplicationListMobileComponent,
    DataProviderClientApplicationSelectorComponent,
    /* Client Application Permission */
    DataProviderClientApplicationPermissionAddComponent,
    DataProviderClientApplicationPermissionEditComponent,
    DataProviderClientApplicationPermissionListComponent,
    DataProviderClientApplicationPermissionListMobileComponent,
    /* Plan Client */
    DataProviderPlanClientAddComponent,
    DataProviderPlanClientDeleteComponent,
    DataProviderPlanClientEditComponent,
    DataProviderPlanClientHeaderComponent,
    DataProviderPlanClientListComponent,
    DataProviderPlanClientListMobileComponent,
    DataProviderPlanClientSelectorComponent,
    DataProviderPlanClientTreeComponent,
    /* Plan Price */
    DataProviderPlanPriceAddComponent,
    DataProviderPlanPriceDeleteComponent,
    DataProviderPlanPriceEditComponent,
    // Note: DataProviderPlanPriceHeaderComponent is in DataProviderSharedModule
    DataProviderPlanPriceListComponent,
    DataProviderPlanPriceListMobileComponent,
    DataProviderPlanPriceSelectorComponent,
    DataProviderPlanPriceTreeComponent,
    DataProviderPlanPriceChargeComponent,
    DataProviderPlanPriceChargePaymentComponent,
    /* */
  ],
  imports: [
    CommonModule,
    DataProviderMainRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    CoreSharedModule,
    DataProviderSharedModule,
    AngularEditorModule,
    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
    MatTreeModule,
    IconPickerModule,
    DragDropModule,
    CmsFileManagerModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreAuthV3Service,
    /** */
    DataProviderEnumService,
    DataProviderPlanService,
    DataProviderSourceService,
    DataProviderClientService,
    DataProviderPlanCategoryService,
    DataProviderPlanClientService,
    DataProviderPlanPriceService,
    DataProviderPlanSourceService,
    DataProviderSourceCompanyService,
    DataProviderSourcePublicConfigService,
    DataProviderSourcePathService,
    DataProviderClientApplicationService,
  DataProviderClientApplicationPermissionService,
    /** */
    CmsConfirmationDialogService,
    CoreModuleTagService,
  ],
})
export class DataProviderMainModule {}
