import { CommonModule, NgOptimizedImage } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import { RouterModule } from "@angular/router";
import { AngularEditorModule } from "@kolkov/angular-editor";
import {
  CoreAuthV3Service,
  CoreEnumService,
  CoreModuleService,
  CoreModuleTagService,
  EstateAccountAgencyAdsService,
  EstateAccountAgencyExpertService,
  EstateAccountAgencyService,
  EstateAccountAgencyWorkAreaService,
  EstateAccountExpertService,
  EstateAccountExpertWorkAreaService,
  EstateActivityTypeService,
  EstateAdsTypeService,
  EstateCategoryRackService,
  EstateCategoryZoneService,
  EstateConfigurationService,
  EstateContractTypeService,
  EstateCustomerCategoryService,
  EstateEnumService,
  EstatePropertyAccountTypeUserService,
  EstatePropertyAdsService,
  EstatePropertyCompanyService,
  EstatePropertyDetailGroupService,
  EstatePropertyDetailService,
  EstatePropertyProjectService,
  EstatePropertyService,
  EstatePropertySupplierCategoryService,
  EstatePropertyTypeLanduseService,
  EstatePropertyTypeService,
  EstatePropertyTypeUsageService,
  FileCategoryService,
} from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../../core-main/core.shared.module";
import { EstateMainComponent } from "./estate-main.component";
import { EstateMainRoutes } from "./estate-main.routing";

import { DragDropModule } from "@angular/cdk/drag-drop";

import { IconPickerModule } from "ngx-ntk-icon-picker";

import { EstateSharedModule } from "../shared/estate-shared.module";
import { EstateAccountAgencyAdsAddComponent } from "./account-agency-ads/add/add.component";
import { EstateAccountAgencyAdsEditComponent } from "./account-agency-ads/edit/edit.component";
import { EstateAccountAgencyAdsListComponent } from "./account-agency-ads/list/list.component";
import { EstateAccountAgencyAdsSaleListComponent } from "./account-agency-ads/sale-list/sale-list.component";
import { EstateAccountAgencyAdsSalePaymentComponent } from "./account-agency-ads/sale-payment/sale-payment.component";
import { EstateAccountAgencyExpertAddComponent } from "./account-agency-expert/add/add.component";
import { EstateAccountAgencyExpertListComponent } from "./account-agency-expert/list/list.component";
import { EstateAccountAgencyWorkAreaAddComponent } from "./account-agency-work-area/add/add.component";
import { EstateAccountAgencyWorkAreaListComponent } from "./account-agency-work-area/list/list.component";
import { EstateAccountAgencyAddComponent } from "./account-agency/add/add.component";
import { EstateAccountAgencyEditComponent } from "./account-agency/edit/edit.component";
import { EstateAccountAgencyTreeComponent } from "./account-agency/tree/tree.component";
import { EstateAccountExpertWorkAreaAddComponent } from "./account-expert-work-area/add/add.component";
import { EstateAccountExpertWorkAreaListComponent } from "./account-expert-work-area/list/list.component";
import { EstateAccountExpertAddComponent } from "./account-expert/add/add.component";
import { EstateAccountExpertEditComponent } from "./account-expert/edit/edit.component";
import { EstateAccountExpertTreeComponent } from "./account-expert/tree/tree.component";
import { EstateActivityTypeAddComponent } from "./activity-type/add/add.component";
import { EstateActivityTypeCompleteComponent } from "./activity-type/autocomplete/autocomplete.component";
import { EstateActivityTypeEditComponent } from "./activity-type/edit/edit.component";
import { EstateActivityTypeHeaderComponent } from "./activity-type/header/header.component";
import { EstateActivityTypeListComponent } from "./activity-type/list/list.component";
import { EstateActivityTypeSelectionlistComponent } from "./activity-type/selectionlist/selectionlist.component";
import { EstateAdsTypeAddComponent } from "./ads-type/add/add.component";
import { EstateAdsTypeEditComponent } from "./ads-type/edit/edit.component";
import { EstateAdsTypeListComponent } from "./ads-type/list/list.component";
import { EstateContractTypeAddComponent } from "./contract-type/add/add.component";
import { EstateContractTypeEditComponent } from "./contract-type/edit/edit.component";
import { EstateContractTypeListComponent } from "./contract-type/list/list.component";
import { EstateContractTypeTreeComponent } from "./contract-type/tree/tree.component";
import { EstatePropertyDetailGroupAddComponent } from "./property-detail-group/add/add.component";
import { EstatePropertyDetailGroupEditComponent } from "./property-detail-group/edit/edit.component";
import { EstatePropertyDetailGroupListComponent } from "./property-detail-group/list/list.component";
import { EstatePropertyDetailGroupSelectorComponent } from "./property-detail-group/selector/selector.component";
import { EstatePropertyDetailGroupTreeComponent } from "./property-detail-group/tree/tree.component";
import { EstatePropertyDetailAddComponent } from "./property-detail/add/add.component";
import { EstatePropertyDetailEditComponent } from "./property-detail/edit/edit.component";
import { EstatePropertyDetailListComponent } from "./property-detail/list/list.component";
import { EstatePropertyDetailSelectorComponent } from "./property-detail/selector/selector.component";
import { EstatePropertyDetailTreeComponent } from "./property-detail/tree/tree.component";
import { EstatePropertyTypeLanduseAddComponent } from "./property-type-landuse/add/add.component";
import { EstatePropertyTypeLanduseEditComponent } from "./property-type-landuse/edit/edit.component";
import { EstatePropertyTypeLanduseListComponent } from "./property-type-landuse/list/list.component";
import { EstatePropertyTypeLanduseSelectionlistComponent } from "./property-type-landuse/selectionlist/selectionlist.component";
import { EstatePropertyTypeUsageAddComponent } from "./property-type-usage/add/add.component";
import { EstatePropertyTypeUsageEditComponent } from "./property-type-usage/edit/edit.component";
import { EstatePropertyTypeUsageListComponent } from "./property-type-usage/list/list.component";
import { EstatePropertyTypeUsageSelectionlistComponent } from "./property-type-usage/selectionlist/selectionlist.component";
import { EstatePropertyTypeUsageTreeComponent } from "./property-type-usage/tree/tree.component";

import { CurrencyMaskModule } from "ng2-currency-mask";
import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { EstateCategoryRackAddComponent } from "../category-rack/add/add.component";
import { EstateCategoryRackEditComponent } from "../category-rack/edit/edit.component";
import { EstateCategoryRackListComponent } from "../category-rack/list/list.component";
import { EstateCategoryRackListMobileComponent } from "../category-rack/list/list.mobile.component";
import { EstateCategoryRackSelectorComponent } from "../category-rack/selector/selector.component";
import { EstateCategoryRackTreeComponent } from "../category-rack/tree/tree.component";
import { EstateCategoryZoneAddComponent } from "../category-zone/add/add.component";
import { EstateCategoryZoneEditComponent } from "../category-zone/edit/edit.component";
import { EstateCategoryZoneListComponent } from "../category-zone/list/list.component";
import { EstateCategoryZoneSelectorComponent } from "../category-zone/selector/selector.component";
import { EstateCategoryZoneTreeComponent } from "../category-zone/tree/tree.component";
import { EstateAccountAgencySelectionlistComponent } from "./account-agency/selectionlist/selectionlist.component";
import { EstateAccountExpertSelectionlistComponent } from "./account-expert/selectionlist/selectionlist.component";
import { EstateCustomerCategoryAddComponent } from "./customer-category/add/add.component";
import { EstateCustomerCategoryEditComponent } from "./customer-category/edit/edit.component";
import { EstatePropertySupplierCategoryAddComponent } from "./property-supplier-category/add/add.component";
import { EstatePropertySupplierCategoryEditComponent } from "./property-supplier-category/edit/edit.component";
import { EstatePropertySupplierCategorySelectorComponent } from "./property-supplier-category/selector/selector.component";

import { NgxMatColorPickerModule } from "src/app/shared/color-picker.module";

@NgModule({
  declarations: [
    EstateMainComponent,

    EstatePropertyTypeLanduseAddComponent,
    EstatePropertyTypeLanduseEditComponent,
    EstatePropertyTypeLanduseListComponent,

    EstatePropertyTypeLanduseSelectionlistComponent,
    /* */
    EstateActivityTypeAddComponent,
    EstateActivityTypeEditComponent,
    EstateActivityTypeListComponent,
    EstateActivityTypeCompleteComponent,
    EstateActivityTypeSelectionlistComponent,

    EstateActivityTypeHeaderComponent,
    /* */

    /* */
    EstatePropertySupplierCategoryAddComponent,
    EstatePropertySupplierCategoryEditComponent,
    EstatePropertySupplierCategorySelectorComponent,
    /* */
    EstatePropertyTypeUsageAddComponent,
    EstatePropertyTypeUsageEditComponent,
    EstatePropertyTypeUsageListComponent,
    EstatePropertyTypeUsageTreeComponent,
    EstatePropertyTypeUsageSelectionlistComponent,

    /* */
    EstateAdsTypeAddComponent,
    EstateAdsTypeEditComponent,
    EstateAdsTypeListComponent,

    /* */
    EstateContractTypeAddComponent,
    EstateContractTypeEditComponent,
    EstateContractTypeListComponent,
    EstateContractTypeTreeComponent,

    /* */
    EstatePropertyDetailGroupAddComponent,
    EstatePropertyDetailGroupEditComponent,
    EstatePropertyDetailGroupListComponent,
    EstatePropertyDetailGroupSelectorComponent,
    EstatePropertyDetailGroupTreeComponent,
    /* */
    EstatePropertyDetailAddComponent,
    EstatePropertyDetailEditComponent,
    EstatePropertyDetailListComponent,
    EstatePropertyDetailSelectorComponent,
    EstatePropertyDetailTreeComponent,
    /* */
    EstateAccountExpertAddComponent,
    EstateAccountExpertEditComponent,

    EstateAccountExpertTreeComponent,
    EstateAccountExpertSelectionlistComponent,
    /* */
    EstateAccountExpertWorkAreaAddComponent,
    EstateAccountExpertWorkAreaListComponent,
    /* */
    EstateAccountAgencyAddComponent,
    EstateAccountAgencyEditComponent,
    EstateAccountAgencyTreeComponent,
    EstateAccountAgencySelectionlistComponent,
    /* */
    EstateAccountAgencyWorkAreaAddComponent,
    EstateAccountAgencyWorkAreaListComponent,
    /* */
    EstateAccountAgencyExpertAddComponent,
    EstateAccountAgencyExpertListComponent,
    /* */
    EstateAccountAgencyAdsAddComponent,
    EstateAccountAgencyAdsEditComponent,
    EstateAccountAgencyAdsListComponent,
    EstateAccountAgencyAdsSaleListComponent,
    EstateAccountAgencyAdsSalePaymentComponent,
    /* */
    EstateCustomerCategoryAddComponent,
    EstateCustomerCategoryEditComponent,
    /* */
    EstateCategoryZoneAddComponent,
    EstateCategoryZoneEditComponent,
    EstateCategoryZoneSelectorComponent,
    EstateCategoryZoneTreeComponent,
    EstateCategoryZoneListComponent,
    /* */
    EstateCategoryRackAddComponent,
    EstateCategoryRackEditComponent,
    EstateCategoryRackSelectorComponent,
    EstateCategoryRackTreeComponent,
    EstateCategoryRackListComponent,
    EstateCategoryRackListMobileComponent,
    /* */
  ],
  imports: [
    CommonModule,
    RouterModule,
    EstateMainRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    CoreSharedModule,
    EstateSharedModule,
    AngularEditorModule,
    CurrencyMaskModule,
    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
    IconPickerModule,
    DragDropModule,
    NgxMatColorPickerModule,
    NgOptimizedImage,
    CmsFileManagerModule,
  ],
  providers: [
    CoreModuleService,
    FileCategoryService,
    CoreEnumService,
    CoreAuthV3Service,
    /*Config*/
    EstateConfigurationService,
    /*Config*/
    /** */
    EstateAccountAgencyService,
    EstateAccountAgencyWorkAreaService,
    EstateAccountAgencyExpertService,
    EstateAccountAgencyAdsService,
    EstateAccountExpertService,
    EstateAccountExpertWorkAreaService,
    EstateContractTypeService,
    EstateEnumService,
    EstateCustomerCategoryService,
    EstateCategoryZoneService,
    EstateCategoryRackService,
    EstatePropertyAccountTypeUserService,
    EstatePropertyDetailGroupService,
    EstatePropertyDetailService,
    EstatePropertySupplierCategoryService,
    EstatePropertyTypeLanduseService,
    EstateActivityTypeService,
    EstatePropertyTypeUsageService,
    EstatePropertyTypeService,
    EstateAdsTypeService,
    EstatePropertyService,
    EstatePropertyAdsService,
    EstatePropertyCompanyService,
    EstatePropertyProjectService,
    /** */
    CmsConfirmationDialogService,
    CoreModuleTagService,
  ],
  exports: [],
})
export class EstateMainModule {}
