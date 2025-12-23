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
import { CrmAccountAddComponent } from "./account/add/add.component";
import { CrmAccountEditComponent } from "./account/edit/edit.component";
import { CrmAccountHeaderComponent } from "./account/header/header.component";
import { CrmAccountListComponent } from "./account/list/list.component";
import { CrmAccountSelectorComponent } from "./account/selector/selector.component";
import { CrmActivityAddComponent } from "./activity/add/add.component";
import { CrmActivityEditComponent } from "./activity/edit/edit.component";
import { CrmActivityListComponent } from "./activity/list/list.component";
import { CrmCampaignAddComponent } from "./campaign/add/add.component";
import { CrmCampaignEditComponent } from "./campaign/edit/edit.component";
import { CrmCampaignHeaderComponent } from "./campaign/header/header.component";
import { CrmCampaignListComponent } from "./campaign/list/list.component";
import { CrmCampaignSelectorComponent } from "./campaign/selector/selector.component";
import { CrmContactAddComponent } from "./contact/add/add.component";
import { CrmContactEditComponent } from "./contact/edit/edit.component";
import { CrmContactHeaderComponent } from "./contact/header/header.component";
import { CrmContactListComponent } from "./contact/list/list.component";
import { CrmContactSelectorComponent } from "./contact/selector/selector.component";
import { CrmDealAddComponent } from "./deal/add/add.component";
import { CrmDealEditComponent } from "./deal/edit/edit.component";
import { CrmDealListComponent } from "./deal/list/list.component";
import { CrmDealSelectorComponent } from "./deal/selector/selector.component";
import { CrmLeadAddComponent } from "./lead/add/add.component";
import { CrmLeadEditComponent } from "./lead/edit/edit.component";
import { CrmLeadListComponent } from "./lead/list/list.component";
import { CrmLeadSelectorComponent } from "./lead/selector/selector.component";
import { CrmOpportunityAddComponent } from "./opportunity/add/add.component";
import { CrmOpportunityEditComponent } from "./opportunity/edit/edit.component";
import { CrmOpportunityListComponent } from "./opportunity/list/list.component";
import { CrmOpportunitySelectorComponent } from "./opportunity/selector/selector.component";
import { CrmPipelineAddComponent } from "./pipeline/add/add.component";
import { CrmPipelineEditComponent } from "./pipeline/edit/edit.component";
import { CrmPipelineListComponent } from "./pipeline/list/list.component";
import { CrmPipelineSelectorComponent } from "./pipeline/selector/selector.component";
import { CrmStageAddComponent } from "./stage/add/add.component";
import { CrmStageEditComponent } from "./stage/edit/edit.component";
import { CrmStageListComponent } from "./stage/list/list.component";
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
    CrmLeadAddComponent,
    CrmLeadEditComponent,
    CrmAccountListComponent,
    CrmAccountAddComponent,
    CrmAccountEditComponent,
    CrmContactListComponent,
    CrmContactAddComponent,
    CrmContactEditComponent,
    CrmOpportunityListComponent,
    CrmOpportunityAddComponent,
    CrmOpportunityEditComponent,
    CrmPipelineListComponent,
    CrmPipelineAddComponent,
    CrmPipelineEditComponent,
    CrmStageListComponent,
    CrmStageAddComponent,
    CrmStageEditComponent,
    CrmDealListComponent,
    CrmDealAddComponent,
    CrmDealEditComponent,
    CrmActivityListComponent,
    CrmActivityAddComponent,
    CrmActivityEditComponent,
    CrmCampaignListComponent,
    CrmCampaignAddComponent,
    CrmCampaignEditComponent,
    CrmSupplierPriceListComponent,
    CrmSupplierPriceListAddComponent,
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
    CrmPipelineService,
    CrmStageService,
    CrmDealService,
    CrmActivityService,
    CrmCampaignService,
    CrmSupplierRatingService,
    CrmSupplierPriceListService,
    CrmEnumService,
    /** */
    CmsConfirmationDialogService,
    CoreModuleTagService,
  ],
  exports: [],
})
export class CrmMainModule {}
