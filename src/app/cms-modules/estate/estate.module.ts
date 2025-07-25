import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {
  BankPaymentTransactionService, CoreAuthV3Service,
  CoreEnumService, CoreModuleService, CoreModuleTagService, EstateAccountAgencyAdsService,
  EstateAccountAgencyExpertService,
  EstateAccountAgencyService,
  EstateAccountAgencyWorkAreaService,
  EstateAccountExpertService, EstateAccountExpertWorkAreaService, EstateActivityTypeService, EstateAdsTypeService, EstateBillboardService, EstateCategoryRackService, EstateCategoryZoneService, EstateConfigurationService, EstateContractService, EstateContractTypeService, EstateCustomerCategoryService, EstateCustomerOrderResultService, EstateCustomerOrderService, EstateEnumService,
  EstatePropertyAccountTypeUserService, EstatePropertyAdsService, EstatePropertyCompanyService, EstatePropertyDetailGroupService, EstatePropertyDetailService, EstatePropertyExpertPriceService, EstatePropertyHistoryService, EstatePropertyProjectService, EstatePropertyService, EstatePropertyShareAgencyService,
  EstatePropertyShareAgentService,
  EstatePropertyShareSiteService, EstatePropertySupplierCategoryService, EstatePropertySupplierService, EstatePropertyTypeLanduseService, EstatePropertyTypeService, EstatePropertyTypeUsageService, FileCategoryService
} from 'ntk-cms-api';
import { CmsConfirmationDialogService } from 'src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { EstateComponent } from './estate.component';
import { EstateRoutes } from './estate.routing';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { IconPickerModule } from 'ngx-ntk-icon-picker';

import { estateAccountAgencyInfoPipe } from 'src/app/core/pipe/esate/estate-account-agency-info.pipe';
import { estateAccountExpertInfoPipe } from 'src/app/core/pipe/esate/estate-account-user-info.pipe';
import { estateCustomerOrderInfoPipe } from 'src/app/core/pipe/esate/estate-customer-order-info.pipe';
import { estatePropertyCompanyInfoPipe } from 'src/app/core/pipe/esate/estate-property-company-info.pipe';
import { estatePropertyInfoPipe } from 'src/app/core/pipe/esate/estate-property-info.pipe';
import { EstateAccountAgencyExpertAddComponent } from './account-agency-expert/add/add.component';
import { EstateAccountAgencyExpertListComponent } from './account-agency-expert/list/list.component';
import { EstateAccountAgencyAddComponent } from './account-agency/add/add.component';
import { EstateAccountAgencyEditComponent } from './account-agency/edit/edit.component';
import { EstateAccountAgencyListComponent } from './account-agency/list/list.component';
import { EstateAccountAgencySelectorComponent } from './account-agency/selector/selector.component';
import { EstateAccountAgencyTreeComponent } from './account-agency/tree/tree.component';
import { EstateAccountExpertAddComponent } from './account-expert/add/add.component';
import { EstateAccountExpertEditComponent } from './account-expert/edit/edit.component';
import { EstateAccountExpertListComponent } from './account-expert/list/list.component';
import { EstateAccountExpertSelectorComponent } from './account-expert/selector/selector.component';
import { EstateAccountExpertTreeComponent } from './account-expert/tree/tree.component';
import { EstateActivityTypeAddComponent } from './activity-type/add/add.component';
import { EstateActivityTypeCompleteComponent } from './activity-type/autocomplete/autocomplete.component';
import { EstateActivityTypeEditComponent } from './activity-type/edit/edit.component';
import { EstateActivityTypeHeaderComponent } from './activity-type/header/header.component';
import { EstateActivityTypeListComponent } from './activity-type/list/list.component';
import { EstateActivityTypeSelectionlistComponent } from './activity-type/selectionlist/selectionlist.component';
import { EstateActivityTypeSelectorComponent } from './activity-type/selector/selector.component';
import { EstateActivityTypeTreeComponent } from './activity-type/tree/tree.component';
import { EstateAdsTypeAddComponent } from './ads-type/add/add.component';
import { EstateAdsTypeEditComponent } from './ads-type/edit/edit.component';
import { EstateAdsTypeListComponent } from './ads-type/list/list.component';
import { EstateAdsTypeSelectorComponent } from './ads-type/selector/selector.component';
import { EstateBillboardAddComponent } from './billboard/add/add.component';
import { EstateBillboardEditComponent } from './billboard/edit/edit.component';
import { EstateBillboardHeaderComponent } from './billboard/header/header.component';
import { EstateBillboardListComponent } from './billboard/list/list.component';
import { EstateBillboardSelectorComponent } from './billboard/selector/selector.component';
import { EstateBillboardTreeComponent } from './billboard/tree/tree.component';
import { EstateContractTypeAddComponent } from './contract-type/add/add.component';
import { EstateContractTypeCompleteComponent } from './contract-type/autocomplete/autocomplete.component';
import { EstateContractTypeEditComponent } from './contract-type/edit/edit.component';
import { EstateContractTypeListComponent } from './contract-type/list/list.component';
import { EstateContractTypeSelectorComponent } from './contract-type/selector/selector.component';
import { EstateContractTypeTreeComponent } from './contract-type/tree/tree.component';
import { EstateCustomerOrderEditComponent } from './customer-order/edit/edit.component';
import { EstateCustomerOrderListComponent } from './customer-order/list/list.component';
import { EstateCustomerOrderSelectorComponent } from './customer-order/selector/selector.component';

import { EstatePropertyAdsAddComponent } from './property-ads/add/add.component';
import { EstatePropertyAdsEditComponent } from './property-ads/edit/edit.component';
import { EstatePropertyAdsListComponent } from './property-ads/list/list.component';
import { EstatePropertyAdsSaleListComponent } from './property-ads/sale-list/sale-list.component';
import { EstatePropertyAdsSalePaymentComponent } from './property-ads/sale-payment/sale-payment.component';
import { EstatePropertyDetailGroupAddComponent } from './property-detail-group/add/add.component';
import { EstatePropertyDetailGroupEditComponent } from './property-detail-group/edit/edit.component';
import { EstatePropertyDetailGroupListComponent } from './property-detail-group/list/list.component';
import { EstatePropertyDetailGroupSelectorComponent } from './property-detail-group/selector/selector.component';
import { EstatePropertyDetailGroupTreeComponent } from './property-detail-group/tree/tree.component';
import { EstatePropertyDetailAddComponent } from './property-detail/add/add.component';
import { EstatePropertyDetailEditComponent } from './property-detail/edit/edit.component';
import { EstatePropertyDetailListComponent } from './property-detail/list/list.component';
import { EstatePropertyDetailSelectorComponent } from './property-detail/selector/selector.component';
import { EstatePropertyDetailTreeComponent } from './property-detail/tree/tree.component';
import { EstatePropertyHistoryAddComponent } from './property-history/add/add.component';
import { EstatePropertyHistoryEditComponent } from './property-history/edit/edit.component';
import { EstatePropertyHistoryListComponent } from './property-history/list/list.component';
import { EstatePropertyTypeLanduseAddComponent } from './property-type-landuse/add/add.component';
import { EstatePropertyTypeLanduseCompleteComponent } from './property-type-landuse/autocomplete/autocomplete.component';
import { EstatePropertyTypeLanduseEditComponent } from './property-type-landuse/edit/edit.component';
import { EstatePropertyTypeLanduseHeaderComponent } from './property-type-landuse/header/header.component';
import { EstatePropertyTypeLanduseListComponent } from './property-type-landuse/list/list.component';
import { EstatePropertyTypeLanduseSelectionlistComponent } from './property-type-landuse/selectionlist/selectionlist.component';
import { EstatePropertyTypeLanduseSelectorComponent } from './property-type-landuse/selector/selector.component';
import { EstatePropertyTypeLanduseTreeComponent } from './property-type-landuse/tree/tree.component';
import { EstatePropertyTypeUsageAddComponent } from './property-type-usage/add/add.component';
import { EstatePropertyTypeUsageCompleteComponent } from './property-type-usage/autocomplete/autocomplete.component';
import { EstatePropertyTypeUsageEditComponent } from './property-type-usage/edit/edit.component';
import { EstatePropertyTypeUsageListComponent } from './property-type-usage/list/list.component';
import { EstatePropertyTypeUsageSelectionlistComponent } from './property-type-usage/selectionlist/selectionlist.component';
import { EstatePropertyTypeUsageSelectorComponent } from './property-type-usage/selector/selector.component';
import { EstatePropertyTypeUsageTreeComponent } from './property-type-usage/tree/tree.component';
import { EstatePropertyAddComponent } from './property/add/add.component';
import { EstatePropertyAddMobileComponent } from './property/add/add.mobile.component';
import { EstatePropertyCompleteComponent } from './property/autocomplete/autocomplete.component';
import { EstatePropertyEditComponent } from './property/edit/edit.component';
import { EstatePropertyHeaderComponent } from './property/header/header.component';
import { EstatePropertyListComponent } from './property/list/list.component';
import { EstatePropertySelectorComponent } from './property/selector/selector.component';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CmsFileManagerModule } from 'ntk-cms-filemanager';
import { estatePropertyProjectInfoPipe } from 'src/app/core/pipe/esate/estate-property-project-info.pipe';
import { estatePropertySupplierInfoPipe } from 'src/app/core/pipe/esate/estate-property-supplier-info.pipe';
import { EstateAccountAgencyAdsAddComponent } from './account-agency-ads/add/add.component';
import { EstateAccountAgencyAdsEditComponent } from './account-agency-ads/edit/edit.component';
import { EstateAccountAgencyAdsListComponent } from './account-agency-ads/list/list.component';
import { EstateAccountAgencyAdsSaleListComponent } from './account-agency-ads/sale-list/sale-list.component';
import { EstateAccountAgencyAdsSalePaymentComponent } from './account-agency-ads/sale-payment/sale-payment.component';
import { EstateAccountAgencyWorkAreaAddComponent } from './account-agency-work-area/add/add.component';
import { EstateAccountAgencyWorkAreaListComponent } from './account-agency-work-area/list/list.component';
import { EstateAccountAgencyHeaderComponent } from './account-agency/header/header.component';
import { EstateAccountAgencySelectionlistComponent } from './account-agency/selectionlist/selectionlist.component';
import { EstateAccountExpertHeaderComponent } from './account-expert/header/header.component';
import { EstateAccountExpertSelectionlistComponent } from './account-expert/selectionlist/selectionlist.component';
import { EstateAccountExpertWorkAreaAddComponent } from './account-expert-work-area/add/add.component';
import { EstateAccountExpertWorkAreaListComponent } from './account-expert-work-area/list/list.component';
import { EstateCategoryRackAddComponent } from './category-rack/add/add.component';
import { EstateCategoryRackEditComponent } from './category-rack/edit/edit.component';
import { EstateCategoryRackListComponent } from './category-rack/list/list.component';
import { EstateCategoryRackListMobileComponent } from './category-rack/list/list.mobile.component';
import { EstateCategoryRackSelectorComponent } from './category-rack/selector/selector.component';
import { EstateCategoryRackTreeComponent } from './category-rack/tree/tree.component';
import { EstateCategoryZoneAddComponent } from './category-zone/add/add.component';
import { EstateCategoryZoneEditComponent } from './category-zone/edit/edit.component';
import { EstateCategoryZoneListComponent } from './category-zone/list/list.component';
import { EstateCategoryZoneSelectorComponent } from './category-zone/selector/selector.component';
import { EstateCategoryZoneTreeComponent } from './category-zone/tree/tree.component';
import { EstateContractTypeHeaderComponent } from './contract-type/header/header.component';
import { EstateCustomerCategoryAddComponent } from './customer-category/add/add.component';
import { EstateCustomerCategoryEditComponent } from './customer-category/edit/edit.component';
import { EstateCustomerCategorySelectorComponent } from './customer-category/selector/selector.component';
import { EstateCustomerCategoryTreeComponent } from './customer-category/tree/tree.component';
import { EstateCustomerOrderResultListComponent } from './customer-order-result/list/list.component';
import { EstateCustomerOrderResultViewComponent } from './customer-order-result/view/view.component';
import { EstateCustomerOrderActionComponent } from './customer-order/action/action.component';
import { EstateCustomerOrderAddToEditComponent } from './customer-order/add/add-to-edit.component';
import { EstateCustomerOrderAddMobileComponent } from './customer-order/add/add.mobile.component';
import { EstateCustomerOrderEditMobileComponent } from './customer-order/edit/edit.mobile.component';
import { EstateCustomerOrderHeaderComponent } from './customer-order/header/header.component';
import { EstateCustomerOrderQuickViewComponent } from './customer-order/quick-view/quick-view.component';
import { EstateOverviewEventsComponent } from './overview/events/events.component';
import { EstateOverviewSummaryComponent } from './overview/summary/summary.component';
import { EstatePropertyCompanyAddComponent } from './property-company/add/add.component';
import { EstatePropertyCompanyDeleteComponent } from './property-company/delete/delete.component';
import { EstatePropertyCompanyEditComponent } from './property-company/edit/edit.component';
import { EstatePropertyCompanyHeaderComponent } from './property-company/header/header.component';

import { EstateCustomerOrderResponsibleUserListComponent } from './customer-order/responsible-user-list/responsible-user-list.component';
import { EstatePropertyCompanyListComponent } from './property-company/list/list.component';
import { EstatePropertyCompanyQuickViewComponent } from './property-company/quick-view/quick-view.component';
import { EstatePropertyCompanySelectorComponent } from './property-company/selector/selector.component';
import { EstatePropertyCompanyTreeComponent } from './property-company/tree/tree.component';
import { EstatePropertyExpertPriceAddComponent } from './property-expert-price/add/add.component';
import { EstatePropertyExpertPriceEditComponent } from './property-expert-price/edit/edit.component';
import { EstatePropertyExpertPriceHeaderComponent } from './property-expert-price/header/header.component';
import { EstatePropertyExpertPriceInquiryCalculateComponent } from './property-expert-price/inquiry-calculate/inquiry-calculate.component';
import { EstatePropertyExpertPriceInquiryListComponent } from './property-expert-price/inquiry-list/inquiry-list.component';
import { EstatePropertyExpertPriceListComponent } from './property-expert-price/list/list.component';
import { EstatePropertyHistoryAddMobileComponent } from './property-history/add/add.mobile.component';
import { EstatePropertyHistoryEditMobileComponent } from './property-history/edit/edit.mobile.component';
import { EstatePropertyHistoryQuickViewComponent } from './property-history/quick-view/quick-view.component';
import { EstatePropertyHistoryResponsibleUserListComponent } from './property-history/responsible-user-list/responsible-user-list.component';
import { EstatePropertyProjectAddComponent } from './property-project/add/add.component';
import { EstatePropertyProjectDeleteComponent } from './property-project/delete/delete.component';
import { EstatePropertyProjectEditComponent } from './property-project/edit/edit.component';
import { EstatePropertyProjectHeaderComponent } from './property-project/header/header.component';
import { EstatePropertyProjectListComponent } from './property-project/list/list.component';
import { EstatePropertyProjectQuickViewComponent } from './property-project/quick-view/quick-view.component';
import { EstatePropertyProjectSelectorComponent } from './property-project/selector/selector.component';
import { EstatePropertyProjectTreeComponent } from './property-project/tree/tree.component';
import { EstatePropertySupplierCategoryAddComponent } from './property-supplier-category/add/add.component';
import { EstatePropertySupplierCategoryEditComponent } from './property-supplier-category/edit/edit.component';
import { EstatePropertySupplierCategorySelectorComponent } from './property-supplier-category/selector/selector.component';
import { EstatePropertySupplierCategoryTreeSelectorComponent } from './property-supplier-category/tree-selector/tree-selector.component';
import { EstatePropertySupplierCategoryTreeComponent } from './property-supplier-category/tree/tree.component';
import { EstatePropertySupplierAddComponent } from './property-supplier/add/add.component';
import { EstatePropertySupplierDeleteComponent } from './property-supplier/delete/delete.component';
import { EstatePropertySupplierEditComponent } from './property-supplier/edit/edit.component';
import { EstatePropertySupplierHeaderComponent } from './property-supplier/header/header.component';
import { EstatePropertySupplierListComponent } from './property-supplier/list/list.component';
import { EstatePropertySupplierQuickViewComponent } from './property-supplier/quick-view/quick-view.component';
import { EstatePropertySupplierSelectorComponent } from './property-supplier/selector/selector.component';
import { EstatePropertySupplierTreeComponent } from './property-supplier/tree/tree.component';
import { EstatePropertyTypeUsageHeaderComponent } from './property-type-usage/header/header.component';
import { EstatePropertyActionComponent } from './property/action/action.component';
import { EstatePropertyQuickAddComponent } from './property/quick-add/quick-add.component';
import { EstatePropertyQuickListComponent } from './property/quick-list/quick-list.component';
import { EstatePropertyQuickViewComponent } from './property/quick-view/quick-view.component';
import { EstatePropertyResponsibleUserListComponent } from './property/responsible-user-list/responsible-user-list.component';
import { NgxMatColorPickerModule } from 'src/app/shared/color-picker.module';


@NgModule({
  declarations: [
    EstateComponent,
    /* */
    estateAccountAgencyInfoPipe,
    estateAccountExpertInfoPipe,
    estateCustomerOrderInfoPipe,
    estatePropertyInfoPipe,
    estatePropertyProjectInfoPipe,
    estatePropertyCompanyInfoPipe,
    estatePropertySupplierInfoPipe,
    /* */
    EstateOverviewEventsComponent,
    EstateOverviewSummaryComponent,
    /* */
    EstatePropertyTypeLanduseAddComponent,
    EstatePropertyTypeLanduseEditComponent,
    EstatePropertyTypeLanduseListComponent,
    EstatePropertyTypeLanduseSelectorComponent,
    EstatePropertyTypeLanduseTreeComponent,
    EstatePropertyTypeLanduseCompleteComponent,
    EstatePropertyTypeLanduseSelectionlistComponent,
    EstatePropertyTypeLanduseHeaderComponent,
    /* */
    EstateActivityTypeAddComponent,
    EstateActivityTypeEditComponent,
    EstateActivityTypeListComponent,
    EstateActivityTypeSelectorComponent,
    EstateActivityTypeTreeComponent,
    EstateActivityTypeCompleteComponent,
    EstateActivityTypeSelectionlistComponent,
    EstateActivityTypeHeaderComponent,
    /* */
    EstatePropertyProjectAddComponent,
    EstatePropertyProjectEditComponent,
    EstatePropertyProjectListComponent,
    EstatePropertyProjectSelectorComponent,
    EstatePropertyProjectDeleteComponent,
    EstatePropertyProjectTreeComponent,
    EstatePropertyProjectHeaderComponent,
    EstatePropertyProjectQuickViewComponent,
    /* */
    EstatePropertyCompanyAddComponent,
    EstatePropertyCompanyEditComponent,
    EstatePropertyCompanyListComponent,
    EstatePropertyCompanySelectorComponent,
    EstatePropertyCompanyDeleteComponent,
    EstatePropertyCompanyTreeComponent,
    EstatePropertyCompanyHeaderComponent,
    EstatePropertyCompanyQuickViewComponent,
    /* */
    EstatePropertySupplierAddComponent,
    EstatePropertySupplierEditComponent,
    EstatePropertySupplierListComponent,
    EstatePropertySupplierSelectorComponent,
    EstatePropertySupplierDeleteComponent,
    EstatePropertySupplierTreeComponent,
    EstatePropertySupplierCategoryTreeSelectorComponent,
    EstatePropertySupplierHeaderComponent,
    EstatePropertySupplierQuickViewComponent,
    /* */
    EstatePropertySupplierCategoryAddComponent,
    EstatePropertySupplierCategoryEditComponent,
    EstatePropertySupplierCategorySelectorComponent,
    EstatePropertySupplierCategoryTreeComponent,
    /* */
    EstatePropertyTypeUsageAddComponent,
    EstatePropertyTypeUsageEditComponent,
    EstatePropertyTypeUsageListComponent,
    EstatePropertyTypeUsageSelectorComponent,
    EstatePropertyTypeUsageTreeComponent,
    EstatePropertyTypeUsageSelectionlistComponent,
    EstatePropertyTypeUsageCompleteComponent,
    EstatePropertyTypeUsageHeaderComponent,
    /* */
    EstatePropertyAddComponent,
    EstatePropertyAddMobileComponent,
    EstatePropertyQuickAddComponent,
    EstatePropertyEditComponent,
    EstatePropertyListComponent,
    EstatePropertySelectorComponent,
    EstatePropertyCompleteComponent,
    EstatePropertyHeaderComponent,
    EstatePropertyActionComponent,
    EstatePropertyQuickViewComponent,
    EstatePropertyQuickListComponent,
    EstatePropertyResponsibleUserListComponent,
    /* */
    EstatePropertyHistoryAddComponent,
    EstatePropertyHistoryAddMobileComponent,
    EstatePropertyHistoryEditComponent,
    EstatePropertyHistoryEditMobileComponent,
    EstatePropertyHistoryListComponent,
    EstatePropertyHistoryQuickViewComponent,
    EstatePropertyHistoryResponsibleUserListComponent,
    /* */
    EstatePropertyAdsAddComponent,
    EstatePropertyAdsEditComponent,
    EstatePropertyAdsListComponent,
    EstatePropertyAdsSaleListComponent,
    EstatePropertyAdsSalePaymentComponent,
    /* */
    EstateAdsTypeAddComponent,
    EstateAdsTypeEditComponent,
    EstateAdsTypeListComponent,
    EstateAdsTypeSelectorComponent,
    /* */
    EstateContractTypeAddComponent,
    EstateContractTypeEditComponent,
    EstateContractTypeListComponent,
    EstateContractTypeSelectorComponent,
    EstateContractTypeTreeComponent,
    EstateContractTypeCompleteComponent,
    EstateContractTypeHeaderComponent,
    /* */
    EstateBillboardAddComponent,
    EstateBillboardEditComponent,
    EstateBillboardListComponent,
    EstateBillboardSelectorComponent,
    EstateBillboardTreeComponent,
    EstateBillboardHeaderComponent,
    /* */
    EstateCustomerOrderAddToEditComponent,
    EstateCustomerOrderAddMobileComponent,
    EstateCustomerOrderEditComponent,
    EstateCustomerOrderEditMobileComponent,
    EstateCustomerOrderListComponent,
    EstateCustomerOrderSelectorComponent,
    EstateCustomerOrderHeaderComponent,
    EstateCustomerOrderActionComponent,
    EstateCustomerOrderQuickViewComponent,
    EstateCustomerOrderResponsibleUserListComponent,
    /* */
    EstateCustomerOrderResultListComponent,
    EstateCustomerOrderResultViewComponent,
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
    EstatePropertyExpertPriceAddComponent,
    EstatePropertyExpertPriceEditComponent,
    EstatePropertyExpertPriceHeaderComponent,
    EstatePropertyExpertPriceListComponent,
    EstatePropertyExpertPriceInquiryCalculateComponent,
    EstatePropertyExpertPriceInquiryListComponent,
    /* */

    EstateAccountExpertAddComponent,
    EstateAccountExpertEditComponent,
    EstateAccountExpertListComponent,
    EstateAccountExpertSelectorComponent,
    EstateAccountExpertTreeComponent,
    EstateAccountExpertHeaderComponent,
    EstateAccountExpertSelectionlistComponent,
    /* */
    EstateAccountAgencyAddComponent,
    EstateAccountAgencyEditComponent,
    EstateAccountAgencyListComponent,
    EstateAccountAgencySelectorComponent,
    EstateAccountAgencyTreeComponent,
    EstateAccountAgencyHeaderComponent,
    EstateAccountAgencySelectionlistComponent,
    /* */
    EstateAccountAgencyExpertAddComponent,
    EstateAccountAgencyExpertListComponent,
    /* */
    EstateAccountAgencyWorkAreaAddComponent,
    EstateAccountAgencyWorkAreaListComponent,
    /* */
    EstateAccountExpertWorkAreaAddComponent,
    EstateAccountExpertWorkAreaListComponent,
    /* */
    EstateAccountAgencyAdsAddComponent,
    EstateAccountAgencyAdsEditComponent,
    EstateAccountAgencyAdsListComponent,
    EstateAccountAgencyAdsSaleListComponent,
    EstateAccountAgencyAdsSalePaymentComponent,
    /* */
    EstateCustomerCategoryAddComponent,
    EstateCustomerCategoryEditComponent,
    EstateCustomerCategorySelectorComponent,
    EstateCustomerCategoryTreeComponent,
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
    EstateRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    SharedModule,
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
    EstateAccountAgencyExpertService,
    EstateAccountAgencyWorkAreaService,
    EstateAccountExpertWorkAreaService,
    EstateAccountExpertService,
    EstateContractService,
    EstateContractTypeService,
    EstateEnumService,
    EstateBillboardService,
    EstateCustomerCategoryService,
    EstateCategoryZoneService,
    EstateCategoryRackService,
    EstateCustomerOrderService,
    EstateCustomerOrderResultService,
    EstatePropertyService,
    EstatePropertyAccountTypeUserService,
    EstatePropertyDetailGroupService,
    EstatePropertyDetailService,
    EstatePropertyExpertPriceService,
    EstatePropertyHistoryService,
    EstatePropertyShareAgencyService,
    EstatePropertyShareAgentService,
    EstatePropertyShareSiteService,
    EstatePropertyProjectService,
    EstatePropertyCompanyService,
    EstatePropertySupplierService,
    EstatePropertySupplierCategoryService,
    EstatePropertyTypeLanduseService,
    EstateActivityTypeService,
    EstatePropertyTypeUsageService,
    EstatePropertyTypeService,
    EstatePropertyAdsService,
    EstateAdsTypeService,
    /** */
    EstateAccountAgencyAdsService,
    /** */
    CmsConfirmationDialogService,
    CoreModuleTagService,
    BankPaymentTransactionService,
  ]
  , exports: [
    estateAccountAgencyInfoPipe,
    estateAccountExpertInfoPipe,
    estateCustomerOrderInfoPipe,
    estatePropertyInfoPipe,
    estatePropertyProjectInfoPipe,
    estatePropertyCompanyInfoPipe,
    estatePropertySupplierInfoPipe,
  ]
})
export class EstateModule { }
