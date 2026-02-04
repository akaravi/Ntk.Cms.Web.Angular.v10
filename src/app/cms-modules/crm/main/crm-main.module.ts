import { CommonModule } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { TranslateModule } from "@ngx-translate/core";
import {
  CoreAuthV3Service,
  CoreEnumService,
  CoreModuleService,
  CoreModuleTagService,
  CrmAccountService,
  CrmActivityService,
  CrmCampaignService,
  CrmContactService,
  CrmDealService,
  CrmEnumService,
  CrmLeadService,
  CrmOpportunityService,
  // CrmOpportunityStageHistoryService, // Commented: Service not available in API
  CrmPipelineService,
  CrmStageService,
  CrmSupplierPriceListService,
  CrmSupplierRatingService,
} from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../../core-main/core.shared.module";
import { CrmMainComponent } from "./crm-main.component";
import { CrmMainRoutes } from "./crm-main.routing";

import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgOptimizedImage } from "@angular/common";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { IconPickerModule } from "ngx-ntk-icon-picker";
import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { NgxMatColorPickerModule } from "src/app/shared/color-picker.module";

import { CrmSupplierPriceListAddComponent } from "../supplier-price-list/add/add.component";
import { CrmSupplierPriceListComponent } from "../supplier-price-list/list/list.component";
import { CrmSupplierPriceListMobileComponent } from "../supplier-price-list/list/list.mobile.component";
import { CrmSupplierRatingAddComponent } from "../supplier-rating/add/add.component";
import { CrmSupplierRatingListComponent } from "../supplier-rating/list/list.component";
import { CrmSupplierRatingListMobileComponent } from "../supplier-rating/list/list.mobile.component";
import { CrmAccountAddComponent } from "./account/add/add.component";
import { CrmAccountEditComponent } from "./account/edit/edit.component";
import { CrmAccountHeaderComponent } from "./account/header/header.component";
import { CrmAccountListComponent } from "./account/list/list.component";
import { CrmAccountListMobileComponent } from "./account/list/list.mobile.component";
import { CrmAccountSelectorComponent } from "./account/selector/selector.component";
import { CrmActivityAddComponent } from "./activity/add/add.component";
import { CrmActivityEditComponent } from "./activity/edit/edit.component";
import { CrmActivityListComponent } from "./activity/list/list.component";
import { CrmActivityListMobileComponent } from "./activity/list/list.mobile.component";
import { CrmCampaignAddComponent } from "./campaign/add/add.component";
import { CrmCampaignEditComponent } from "./campaign/edit/edit.component";
import { CrmCampaignHeaderComponent } from "./campaign/header/header.component";
import { CrmCampaignListComponent } from "./campaign/list/list.component";
import { CrmCampaignListMobileComponent } from "./campaign/list/list.mobile.component";
import { CrmCampaignSelectorComponent } from "./campaign/selector/selector.component";
import { CrmContactAddComponent } from "./contact/add/add.component";
import { CrmContactEditComponent } from "./contact/edit/edit.component";
import { CrmContactHeaderComponent } from "./contact/header/header.component";
import { CrmContactListComponent } from "./contact/list/list.component";
import { CrmContactListMobileComponent } from "./contact/list/list.mobile.component";
import { CrmContactSelectorComponent } from "./contact/selector/selector.component";
import { CrmDealAddComponent } from "./deal/add/add.component";
import { CrmDealEditComponent } from "./deal/edit/edit.component";
import { CrmDealListComponent } from "./deal/list/list.component";
import { CrmDealListMobileComponent } from "./deal/list/list.mobile.component";
import { CrmDealSelectorComponent } from "./deal/selector/selector.component";
import { CrmLeadAddComponent } from "./lead/add/add.component";
import { CrmLeadEditComponent } from "./lead/edit/edit.component";
import { CrmLeadListComponent } from "./lead/list/list.component";
import { CrmLeadListMobileComponent } from "./lead/list/list.mobile.component";
import { CrmLeadSelectorComponent } from "./lead/selector/selector.component";
import { CrmOpportunityAddComponent } from "./opportunity/add/add.component";
import { CrmOpportunityEditComponent } from "./opportunity/edit/edit.component";
import { CrmOpportunityListComponent } from "./opportunity/list/list.component";
import { CrmOpportunityListMobileComponent } from "./opportunity/list/list.mobile.component";
import { CrmOpportunitySelectorComponent } from "./opportunity/selector/selector.component";
// import { CrmOpportunityStageHistoryListComponent } from "./opportunity/stage-history/list/list.component"; // Commented: Service and Model not available in API
import { CrmPipelineAddComponent } from "./pipeline/add/add.component";
import { CrmPipelineEditComponent } from "./pipeline/edit/edit.component";
import { CrmPipelineListComponent } from "./pipeline/list/list.component";
import { CrmPipelineListMobileComponent } from "./pipeline/list/list.mobile.component";
import { CrmPipelineSelectorComponent } from "./pipeline/selector/selector.component";
import { CrmStageAddComponent } from "./stage/add/add.component";
import { CrmStageEditComponent } from "./stage/edit/edit.component";
import { CrmStageListComponent } from "./stage/list/list.component";
import { CrmStageListMobileComponent } from "./stage/list/list.mobile.component";
import { CrmStageSelectorComponent } from "./stage/selector/selector.component";

/**
 * ماژول اصلی CRM Main.
 * این ماژول شامل تمام componentهای اصلی CRM است.
 */
@NgModule({
  declarations: [
    CrmMainComponent,
    CrmAccountHeaderComponent,
    CrmContactHeaderComponent,
    CrmCampaignHeaderComponent,
    CrmAccountSelectorComponent,
    CrmContactSelectorComponent,
    CrmPipelineSelectorComponent,
    CrmStageSelectorComponent,
    CrmCampaignSelectorComponent,
    CrmLeadSelectorComponent,
    CrmOpportunitySelectorComponent,
    CrmDealSelectorComponent,
    CrmLeadListComponent,
    CrmLeadListMobileComponent,
    CrmLeadAddComponent,
    CrmLeadEditComponent,
    CrmAccountListComponent,
    CrmAccountListMobileComponent,
    CrmAccountAddComponent,
    CrmAccountEditComponent,
    CrmContactListComponent,
    CrmContactListMobileComponent,
    CrmContactAddComponent,
    CrmContactEditComponent,
    CrmOpportunityListComponent,
    CrmOpportunityListMobileComponent,
    CrmOpportunityAddComponent,
    CrmOpportunityEditComponent,
    // CrmOpportunityStageHistoryListComponent, // Commented: Service and Model not available in API
    CrmPipelineListComponent,
    CrmPipelineListMobileComponent,
    CrmPipelineAddComponent,
    CrmPipelineEditComponent,
    CrmStageListComponent,
    CrmStageListMobileComponent,
    CrmStageAddComponent,
    CrmStageEditComponent,
    CrmDealListComponent,
    CrmDealListMobileComponent,
    CrmDealAddComponent,
    CrmDealEditComponent,
    CrmActivityListComponent,
    CrmActivityListMobileComponent,
    CrmActivityAddComponent,
    CrmActivityEditComponent,
    CrmCampaignListComponent,
    CrmCampaignListMobileComponent,
    CrmCampaignAddComponent,
    CrmCampaignEditComponent,
    CrmSupplierPriceListComponent,
    CrmSupplierPriceListMobileComponent,
    CrmSupplierPriceListAddComponent,
    CrmSupplierRatingListComponent,
    CrmSupplierRatingListMobileComponent,
    CrmSupplierRatingAddComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule,
    CrmMainRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    TranslateModule,
    SharedModule,
    CoreSharedModule,
    AngularEditorModule,
    CurrencyMaskModule,
    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    IconPickerModule,
    DragDropModule,
    NgxMatColorPickerModule,
    NgOptimizedImage,
    CmsFileManagerModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreAuthV3Service,
    /*Config*/
    /*Config*/
    /** CRM Services */
    CrmLeadService,
    CrmAccountService,
    CrmContactService,
  CrmOpportunityService,
  // CrmOpportunityStageHistoryService, // Commented: Service not available in API
  CrmPipelineService,
  CrmStageService,
  CrmDealService,
  CrmActivityService,
    CrmCampaignService,
    CrmSupplierRatingService,
    CrmSupplierPriceListService,
    CrmEnumService,
    // CrmOpportunityStageHistoryService, // Commented: Service not available in API
    /** */
    CmsConfirmationDialogService,
    CoreModuleTagService,
  ],
  exports: [],
})
export class CrmMainModule {}
