import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { IconPickerModule } from "ngx-ntk-icon-picker";
import {
  EstateAccountAgencyAdsService,
  EstateAccountAgencyService,
  EstateAccountExpertService,
  EstateCustomerOrderService,
  EstatePropertyAdsService,
  EstatePropertyCompanyService,
  EstatePropertyHistoryService,
  EstatePropertyProjectService,
  EstatePropertyService,
  EstatePropertySupplierService,
} from "ntk-cms-api";
import { NgxMatColorPickerModule } from "src/app/shared/color-picker.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../core-main/core.shared.module";
import { EstateDashboardComponent } from "./dashboard/dashboard.component";
import { EstateComponent } from "./estate.component";
import { EstateRoutes } from "./estate.routing";
import { EstateOverviewEventsComponent } from "./overview/events/events.component";
import { EstateOverviewSummaryComponent } from "./overview/summary/summary.component";
import { EstateSharedModule } from "./shared/estate-shared.module";
import { EstateActionComponent } from "./action/estate-action.component";
import { EstateCategoryRackAddComponent } from "./category-rack/add/add.component";
import { EstateCategoryRackAddMobileComponent } from "./category-rack/add/add.mobile.component";
import { EstateCategoryRackEditComponent } from "./category-rack/edit/edit.component";
import { EstateCategoryRackEditMobileComponent } from "./category-rack/edit/edit.mobile.component";
import { EstateCategoryRackListComponent } from "./category-rack/list/list.component";
import { EstateCategoryRackListMobileComponent } from "./category-rack/list/list.mobile.component";
import { EstateCategoryRackSelectorComponent } from "./category-rack/selector/selector.component";
import { EstateCategoryRackTreeComponent } from "./category-rack/tree/tree.component";
import { EstateCategoryZoneAddComponent } from "./category-zone/add/add.component";
import { EstateCategoryZoneAddMobileComponent } from "./category-zone/add/add.mobile.component";
import { EstateCategoryZoneEditComponent } from "./category-zone/edit/edit.component";
import { EstateCategoryZoneEditMobileComponent } from "./category-zone/edit/edit.mobile.component";
import { EstateCategoryZoneListComponent } from "./category-zone/list/list.component";
import { EstateCategoryZoneListMobileComponent } from "./category-zone/list/list.mobile.component";
import { EstateCategoryZoneSelectorComponent } from "./category-zone/selector/selector.component";
import { EstateCategoryZoneTreeComponent } from "./category-zone/tree/tree.component";
import { EstateConfigCheckSiteComponent } from "./config/check-site/check-site.component";
import { EstateConfigCheckUserComponent } from "./config/check-user/check-user.component";
import { EstateConfigComponent } from "./config/estate-config.component";
import { EstateConfigMainAdminComponent } from "./config/main-admin/config-main-admin.component";
import { EstateConfigSiteComponent } from "./config/site/config-site.component";
import { EstateBillboardAddComponent } from "./data/billboard/add/add.component";
import { EstateBillboardAddMobileComponent } from "./data/billboard/add/add.mobile.component";
import { EstateBillboardEditComponent } from "./data/billboard/edit/edit.component";
import { EstateBillboardEditMobileComponent } from "./data/billboard/edit/edit.mobile.component";
import { EstateBillboardHeaderComponent } from "./data/billboard/header/header.component";
import { EstateBillboardListComponent } from "./data/billboard/list/list.component";
import { EstateBillboardListMobileComponent } from "./data/billboard/list/list.mobile.component";
import { EstateBillboardSelectorComponent } from "./data/billboard/selector/selector.component";
import { EstateBillboardTreeComponent } from "./data/billboard/tree/tree.component";
import { EstateDataComponent } from "./data/estate-data.component";
import { EstatePropertyAdsAddComponent } from "./data/property-ads/add/add.component";
import { EstatePropertyAdsAddMobileComponent } from "./data/property-ads/add/add.mobile.component";
import { EstatePropertyAdsEditComponent } from "./data/property-ads/edit/edit.component";
import { EstatePropertyAdsEditMobileComponent } from "./data/property-ads/edit/edit.mobile.component";
import { EstatePropertyAdsListComponent } from "./data/property-ads/list/list.component";
import { EstatePropertyAdsListMobileComponent } from "./data/property-ads/list/list.mobile.component";
import { EstatePropertyAdsSaleListComponent } from "./data/property-ads/sale-list/sale-list.component";
import { EstatePropertyAdsSalePaymentComponent } from "./data/property-ads/sale-payment/sale-payment.component";
import { EstatePropertyCompanyAddComponent } from "./data/property-company/add/add.component";
import { EstatePropertyCompanyAddMobileComponent } from "./data/property-company/add/add.mobile.component";
import { EstatePropertyCompanyDeleteComponent } from "./data/property-company/delete/delete.component";
import { EstatePropertyCompanyEditComponent } from "./data/property-company/edit/edit.component";
import { EstatePropertyCompanyEditMobileComponent } from "./data/property-company/edit/edit.mobile.component";
import { EstatePropertyCompanyHeaderComponent } from "./data/property-company/header/header.component";
import { EstatePropertyCompanyListComponent } from "./data/property-company/list/list.component";
import { EstatePropertyCompanyListMobileComponent } from "./data/property-company/list/list.mobile.component";
import { EstatePropertyCompanyQuickViewComponent } from "./data/property-company/quick-view/quick-view.component";
import { EstatePropertyCompanySelectorComponent } from "./data/property-company/selector/selector.component";
import { EstatePropertyCompanyTreeComponent } from "./data/property-company/tree/tree.component";
import { EstatePropertyProjectAddComponent } from "./data/property-project/add/add.component";
import { EstatePropertyProjectAddMobileComponent } from "./data/property-project/add/add.mobile.component";
import { EstatePropertyProjectDeleteComponent } from "./data/property-project/delete/delete.component";
import { EstatePropertyProjectEditComponent } from "./data/property-project/edit/edit.component";
import { EstatePropertyProjectEditMobileComponent } from "./data/property-project/edit/edit.mobile.component";
import { EstatePropertyProjectHeaderComponent } from "./data/property-project/header/header.component";
import { EstatePropertyProjectListComponent } from "./data/property-project/list/list.component";
import { EstatePropertyProjectListMobileComponent } from "./data/property-project/list/list.mobile.component";
import { EstatePropertyProjectQuickViewComponent } from "./data/property-project/quick-view/quick-view.component";
import { EstatePropertyProjectSelectorComponent } from "./data/property-project/selector/selector.component";
import { EstatePropertyProjectTreeComponent } from "./data/property-project/tree/tree.component";
import { EstatePropertySupplierAddComponent } from "./data/property-supplier/add/add.component";
import { EstatePropertySupplierAddMobileComponent } from "./data/property-supplier/add/add.mobile.component";
import { EstatePropertySupplierDeleteComponent } from "./data/property-supplier/delete/delete.component";
import { EstatePropertySupplierEditComponent } from "./data/property-supplier/edit/edit.component";
import { EstatePropertySupplierEditMobileComponent } from "./data/property-supplier/edit/edit.mobile.component";
import { EstatePropertySupplierHeaderComponent } from "./data/property-supplier/header/header.component";
import { EstatePropertySupplierListComponent } from "./data/property-supplier/list/list.component";
import { EstatePropertySupplierListMobileComponent } from "./data/property-supplier/list/list.mobile.component";
import { EstatePropertySupplierQuickViewComponent } from "./data/property-supplier/quick-view/quick-view.component";
import { EstatePropertySupplierSelectorComponent } from "./data/property-supplier/selector/selector.component";
import { EstatePropertySupplierTreeComponent } from "./data/property-supplier/tree/tree.component";
import { EstatePropertyActionComponent } from "./data/property/action/action.component";
import { EstatePropertyAddComponent } from "./data/property/add/add.component";
import { EstatePropertyAddMobileComponent } from "./data/property/add/add.mobile.component";
import { EstatePropertyCompleteComponent } from "./data/property/autocomplete/autocomplete.component";
import { EstatePropertyEditComponent } from "./data/property/edit/edit.component";
import { EstatePropertyHeaderComponent } from "./data/property/header/header.component";
import { EstatePropertyListComponent } from "./data/property/list/list.component";
import { EstatePropertyListMobileComponent } from "./data/property/list/list.mobile.component";
import { EstatePropertyQuickAddComponent } from "./data/property/quick-add/quick-add.component";
import { EstatePropertyQuickListComponent } from "./data/property/quick-list/quick-list.component";
import { EstatePropertyQuickViewComponent } from "./data/property/quick-view/quick-view.component";
import { EstatePropertyResponsibleUserListComponent } from "./data/property/responsible-user-list/responsible-user-list.component";
import { EstatePropertySelectorComponent } from "./data/property/selector/selector.component";
import { EstatePropertyWidgetComponent } from "./data/property/widget/widget.component";
import { EstateCustomerOrderResultListComponent } from "./log/customer-order-result/list/list.component";
import { EstateCustomerOrderResultListMobileComponent } from "./log/customer-order-result/list/list.mobile.component";
import { EstateCustomerOrderResultViewComponent } from "./log/customer-order-result/view/view.component";
import { EstateCustomerOrderActionComponent } from "./log/customer-order/action/action.component";
import { EstateCustomerOrderAddToEditComponent } from "./log/customer-order/add/add-to-edit.component";
import { EstateCustomerOrderAddMobileComponent } from "./log/customer-order/add/add.mobile.component";
import { EstateCustomerOrderEditComponent } from "./log/customer-order/edit/edit.component";
import { EstateCustomerOrderEditMobileComponent } from "./log/customer-order/edit/edit.mobile.component";
import { EstateCustomerOrderHeaderComponent } from "./log/customer-order/header/header.component";
import { EstateCustomerOrderListComponent } from "./log/customer-order/list/list.component";
import { EstateCustomerOrderListMobileComponent } from "./log/customer-order/list/list.mobile.component";
import { EstateCustomerOrderQuickViewComponent } from "./log/customer-order/quick-view/quick-view.component";
import { EstateCustomerOrderResponsibleUserListComponent } from "./log/customer-order/responsible-user-list/responsible-user-list.component";
import { EstateCustomerOrderSelectorComponent } from "./log/customer-order/selector/selector.component";
import { EstateCustomerOrderWidgetComponent } from "./log/customer-order/widget/widget.component";
import { EstateLogComponent } from "./log/estate-log.component";
import { EstatePropertyExpertPriceAddComponent } from "./log/property-expert-price/add/add.component";
import { EstatePropertyExpertPriceAddMobileComponent } from "./log/property-expert-price/add/add.mobile.component";
import { EstatePropertyExpertPriceEditComponent } from "./log/property-expert-price/edit/edit.component";
import { EstatePropertyExpertPriceEditMobileComponent } from "./log/property-expert-price/edit/edit.mobile.component";
import { EstatePropertyExpertPriceHeaderComponent } from "./log/property-expert-price/header/header.component";
import { EstatePropertyExpertPriceInquiryCalculateComponent } from "./log/property-expert-price/inquiry-calculate/inquiry-calculate.component";
import { EstatePropertyExpertPriceInquiryListComponent } from "./log/property-expert-price/inquiry-list/inquiry-list.component";
import { EstatePropertyExpertPriceListComponent } from "./log/property-expert-price/list/list.component";
import { EstatePropertyExpertPriceListMobileComponent } from "./log/property-expert-price/list/list.mobile.component";
import { EstatePropertyHistoryAddComponent } from "./log/property-history/add/add.component";
import { EstatePropertyHistoryAddMobileComponent } from "./log/property-history/add/add.mobile.component";
import { EstatePropertyHistoryEditComponent } from "./log/property-history/edit/edit.component";
import { EstatePropertyHistoryEditMobileComponent } from "./log/property-history/edit/edit.mobile.component";
import { EstatePropertyHistoryListComponent } from "./log/property-history/list/list.component";
import { EstatePropertyHistoryListMobileComponent } from "./log/property-history/list/list.mobile.component";
import { EstatePropertyHistoryQuickViewComponent } from "./log/property-history/quick-view/quick-view.component";
import { EstatePropertyHistoryResponsibleUserListComponent } from "./log/property-history/responsible-user-list/responsible-user-list.component";
import { EstatePropertyHistoryWidgetComponent } from "./log/property-history/widget/widget.component";
import { EstateAccountAgencyAdsAddComponent } from "./main/account-agency-ads/add/add.component";
import { EstateAccountAgencyAdsAddMobileComponent } from "./main/account-agency-ads/add/add.mobile.component";
import { EstateAccountAgencyAdsEditComponent } from "./main/account-agency-ads/edit/edit.component";
import { EstateAccountAgencyAdsEditMobileComponent } from "./main/account-agency-ads/edit/edit.mobile.component";
import { EstateAccountAgencyAdsListComponent } from "./main/account-agency-ads/list/list.component";
import { EstateAccountAgencyAdsListMobileComponent } from "./main/account-agency-ads/list/list.mobile.component";
import { EstateAccountAgencyAdsSaleListComponent } from "./main/account-agency-ads/sale-list/sale-list.component";
import { EstateAccountAgencyAdsSalePaymentComponent } from "./main/account-agency-ads/sale-payment/sale-payment.component";
import { EstateAccountAgencyExpertAddComponent } from "./main/account-agency-expert/add/add.component";
import { EstateAccountAgencyExpertListComponent } from "./main/account-agency-expert/list/list.component";
import { EstateAccountAgencyExpertListMobileComponent } from "./main/account-agency-expert/list/list.mobile.component";
import { EstateAccountAgencyWorkAreaAddComponent } from "./main/account-agency-work-area/add/add.component";
import { EstateAccountAgencyWorkAreaListComponent } from "./main/account-agency-work-area/list/list.component";
import { EstateAccountAgencyWorkAreaListMobileComponent } from "./main/account-agency-work-area/list/list.mobile.component";
import { EstateAccountAgencyAddComponent } from "./main/account-agency/add/add.component";
import { EstateAccountAgencyAddMobileComponent } from "./main/account-agency/add/add.mobile.component";
import { EstateAccountAgencyEditComponent } from "./main/account-agency/edit/edit.component";
import { EstateAccountAgencyEditMobileComponent } from "./main/account-agency/edit/edit.mobile.component";
import { EstateAccountAgencyHeaderComponent } from "./main/account-agency/header/header.component";
import { EstateAccountAgencyListComponent } from "./main/account-agency/list/list.component";
import { EstateAccountAgencyListMobileComponent } from "./main/account-agency/list/list.mobile.component";
import { EstateAccountAgencySelectionlistComponent } from "./main/account-agency/selectionlist/selectionlist.component";
import { EstateAccountAgencySelectorComponent } from "./main/account-agency/selector/selector.component";
import { EstateAccountAgencyTreeComponent } from "./main/account-agency/tree/tree.component";
import { EstateAccountExpertWorkAreaAddComponent } from "./main/account-expert-work-area/add/add.component";
import { EstateAccountExpertWorkAreaListComponent } from "./main/account-expert-work-area/list/list.component";
import { EstateAccountExpertWorkAreaListMobileComponent } from "./main/account-expert-work-area/list/list.mobile.component";
import { EstateAccountExpertAddComponent } from "./main/account-expert/add/add.component";
import { EstateAccountExpertAddMobileComponent } from "./main/account-expert/add/add.mobile.component";
import { EstateAccountExpertEditComponent } from "./main/account-expert/edit/edit.component";
import { EstateAccountExpertEditMobileComponent } from "./main/account-expert/edit/edit.mobile.component";
import { EstateAccountExpertHeaderComponent } from "./main/account-expert/header/header.component";
import { EstateAccountExpertListComponent } from "./main/account-expert/list/list.component";
import { EstateAccountExpertListMobileComponent } from "./main/account-expert/list/list.mobile.component";
import { EstateAccountExpertSelectionlistComponent } from "./main/account-expert/selectionlist/selectionlist.component";
import { EstateAccountExpertSelectorComponent } from "./main/account-expert/selector/selector.component";
import { EstateAccountExpertTreeComponent } from "./main/account-expert/tree/tree.component";
import { EstateActivityTypeAddComponent } from "./main/activity-type/add/add.component";
import { EstateActivityTypeAddMobileComponent } from "./main/activity-type/add/add.mobile.component";
import { EstateActivityTypeCompleteComponent } from "./main/activity-type/autocomplete/autocomplete.component";
import { EstateActivityTypeEditComponent } from "./main/activity-type/edit/edit.component";
import { EstateActivityTypeEditMobileComponent } from "./main/activity-type/edit/edit.mobile.component";
import { EstateActivityTypeHeaderComponent } from "./main/activity-type/header/header.component";
import { EstateActivityTypeListComponent } from "./main/activity-type/list/list.component";
import { EstateActivityTypeListMobileComponent } from "./main/activity-type/list/list.mobile.component";
import { EstateActivityTypeSelectionlistComponent } from "./main/activity-type/selectionlist/selectionlist.component";
import { EstateActivityTypeSelectorComponent } from "./main/activity-type/selector/selector.component";
import { EstateActivityTypeTreeComponent } from "./main/activity-type/tree/tree.component";
import { EstateAdsTypeAddComponent } from "./main/ads-type/add/add.component";
import { EstateAdsTypeAddMobileComponent } from "./main/ads-type/add/add.mobile.component";
import { EstateAdsTypeEditComponent } from "./main/ads-type/edit/edit.component";
import { EstateAdsTypeEditMobileComponent } from "./main/ads-type/edit/edit.mobile.component";
import { EstateAdsTypeListComponent } from "./main/ads-type/list/list.component";
import { EstateAdsTypeListMobileComponent } from "./main/ads-type/list/list.mobile.component";
import { EstateAdsTypeSelectorComponent } from "./main/ads-type/selector/selector.component";
import { EstateContractTypeAddComponent } from "./main/contract-type/add/add.component";
import { EstateContractTypeAddMobileComponent } from "./main/contract-type/add/add.mobile.component";
import { EstateContractTypeCompleteComponent } from "./main/contract-type/autocomplete/autocomplete.component";
import { EstateContractTypeEditComponent } from "./main/contract-type/edit/edit.component";
import { EstateContractTypeEditMobileComponent } from "./main/contract-type/edit/edit.mobile.component";
import { EstateContractTypeHeaderComponent } from "./main/contract-type/header/header.component";
import { EstateContractTypeListComponent } from "./main/contract-type/list/list.component";
import { EstateContractTypeListMobileComponent } from "./main/contract-type/list/list.mobile.component";
import { EstateContractTypeSelectorComponent } from "./main/contract-type/selector/selector.component";
import { EstateContractTypeTreeComponent } from "./main/contract-type/tree/tree.component";
import { EstateCustomerCategoryAddComponent } from "./main/customer-category/add/add.component";
import { EstateCustomerCategoryEditComponent } from "./main/customer-category/edit/edit.component";
import { EstateCustomerCategorySelectorComponent } from "./main/customer-category/selector/selector.component";
import { EstateCustomerCategoryTreeComponent } from "./main/customer-category/tree/tree.component";
import { EstateMainComponent } from "./main/estate-main.component";
import { EstatePropertyDetailGroupAddComponent } from "./main/property-detail-group/add/add.component";
import { EstatePropertyDetailGroupAddMobileComponent } from "./main/property-detail-group/add/add.mobile.component";
import { EstatePropertyDetailGroupEditComponent } from "./main/property-detail-group/edit/edit.component";
import { EstatePropertyDetailGroupEditMobileComponent } from "./main/property-detail-group/edit/edit.mobile.component";
import { EstatePropertyDetailGroupListComponent } from "./main/property-detail-group/list/list.component";
import { EstatePropertyDetailGroupListMobileComponent } from "./main/property-detail-group/list/list.mobile.component";
import { EstatePropertyDetailGroupSelectorComponent } from "./main/property-detail-group/selector/selector.component";
import { EstatePropertyDetailGroupTreeComponent } from "./main/property-detail-group/tree/tree.component";
import { EstatePropertyDetailAddComponent } from "./main/property-detail/add/add.component";
import { EstatePropertyDetailAddMobileComponent } from "./main/property-detail/add/add.mobile.component";
import { EstatePropertyDetailEditComponent } from "./main/property-detail/edit/edit.component";
import { EstatePropertyDetailEditMobileComponent } from "./main/property-detail/edit/edit.mobile.component";
import { EstatePropertyDetailListComponent } from "./main/property-detail/list/list.component";
import { EstatePropertyDetailListMobileComponent } from "./main/property-detail/list/list.mobile.component";
import { EstatePropertyDetailSelectorComponent } from "./main/property-detail/selector/selector.component";
import { EstatePropertyDetailTreeComponent } from "./main/property-detail/tree/tree.component";
import { EstatePropertySupplierCategoryAddComponent } from "./main/property-supplier-category/add/add.component";
import { EstatePropertySupplierCategoryEditComponent } from "./main/property-supplier-category/edit/edit.component";
import { EstatePropertySupplierCategorySelectorComponent } from "./main/property-supplier-category/selector/selector.component";
import { EstatePropertySupplierCategoryTreeSelectorComponent } from "./main/property-supplier-category/tree-selector/tree-selector.component";
import { EstatePropertySupplierCategoryTreeComponent } from "./main/property-supplier-category/tree/tree.component";
import { EstatePropertyTypeLanduseAddComponent } from "./main/property-type-landuse/add/add.component";
import { EstatePropertyTypeLanduseAddMobileComponent } from "./main/property-type-landuse/add/add.mobile.component";
import { EstatePropertyTypeLanduseCompleteComponent } from "./main/property-type-landuse/autocomplete/autocomplete.component";
import { EstatePropertyTypeLanduseEditComponent } from "./main/property-type-landuse/edit/edit.component";
import { EstatePropertyTypeLanduseEditMobileComponent } from "./main/property-type-landuse/edit/edit.mobile.component";
import { EstatePropertyTypeLanduseHeaderComponent } from "./main/property-type-landuse/header/header.component";
import { EstatePropertyTypeLanduseListComponent } from "./main/property-type-landuse/list/list.component";
import { EstatePropertyTypeLanduseListMobileComponent } from "./main/property-type-landuse/list/list.mobile.component";
import { EstatePropertyTypeLanduseSelectionlistComponent } from "./main/property-type-landuse/selectionlist/selectionlist.component";
import { EstatePropertyTypeLanduseSelectorComponent } from "./main/property-type-landuse/selector/selector.component";
import { EstatePropertyTypeLanduseTreeComponent } from "./main/property-type-landuse/tree/tree.component";
import { EstatePropertyTypeUsageAddComponent } from "./main/property-type-usage/add/add.component";
import { EstatePropertyTypeUsageAddMobileComponent } from "./main/property-type-usage/add/add.mobile.component";
import { EstatePropertyTypeUsageCompleteComponent } from "./main/property-type-usage/autocomplete/autocomplete.component";
import { EstatePropertyTypeUsageEditComponent } from "./main/property-type-usage/edit/edit.component";
import { EstatePropertyTypeUsageEditMobileComponent } from "./main/property-type-usage/edit/edit.mobile.component";
import { EstatePropertyTypeUsageHeaderComponent } from "./main/property-type-usage/header/header.component";
import { EstatePropertyTypeUsageListComponent } from "./main/property-type-usage/list/list.component";
import { EstatePropertyTypeUsageListMobileComponent } from "./main/property-type-usage/list/list.mobile.component";
import { EstatePropertyTypeUsageSelectionlistComponent } from "./main/property-type-usage/selectionlist/selectionlist.component";
import { EstatePropertyTypeUsageSelectorComponent } from "./main/property-type-usage/selector/selector.component";
import { EstatePropertyTypeUsageTreeComponent } from "./main/property-type-usage/tree/tree.component";

@NgModule({
  declarations: [
    EstateComponent,

    /* Dashboard */
    EstateDashboardComponent,
    /* Dashboard */
    /* */
    EstateOverviewEventsComponent,
    EstateOverviewSummaryComponent,
    /* */
    EstateActionComponent,
    EstateCategoryRackAddComponent,
    EstateCategoryRackAddMobileComponent,
    EstateCategoryRackEditComponent,
    EstateCategoryRackEditMobileComponent,
    EstateCategoryRackListComponent,
    EstateCategoryRackListMobileComponent,
    EstateCategoryRackSelectorComponent,
    EstateCategoryRackTreeComponent,
    EstateCategoryZoneAddComponent,
    EstateCategoryZoneAddMobileComponent,
    EstateCategoryZoneEditComponent,
    EstateCategoryZoneEditMobileComponent,
    EstateCategoryZoneListComponent,
    EstateCategoryZoneListMobileComponent,
    EstateCategoryZoneSelectorComponent,
    EstateCategoryZoneTreeComponent,
    EstateConfigCheckSiteComponent,
    EstateConfigCheckUserComponent,
    EstateConfigComponent,
    EstateConfigMainAdminComponent,
    EstateConfigSiteComponent,
    EstateBillboardAddComponent,
    EstateBillboardAddMobileComponent,
    EstateBillboardEditComponent,
    EstateBillboardEditMobileComponent,
    EstateBillboardHeaderComponent,
    EstateBillboardListComponent,
    EstateBillboardListMobileComponent,
    EstateBillboardSelectorComponent,
    EstateBillboardTreeComponent,
    EstateDataComponent,
    EstatePropertyAdsAddComponent,
    EstatePropertyAdsAddMobileComponent,
    EstatePropertyAdsEditComponent,
    EstatePropertyAdsEditMobileComponent,
    EstatePropertyAdsListComponent,
    EstatePropertyAdsListMobileComponent,
    EstatePropertyAdsSaleListComponent,
    EstatePropertyAdsSalePaymentComponent,
    EstatePropertyCompanyAddComponent,
    EstatePropertyCompanyAddMobileComponent,
    EstatePropertyCompanyDeleteComponent,
    EstatePropertyCompanyEditComponent,
    EstatePropertyCompanyEditMobileComponent,
    EstatePropertyCompanyHeaderComponent,
    EstatePropertyCompanyListComponent,
    EstatePropertyCompanyListMobileComponent,
    EstatePropertyCompanyQuickViewComponent,
    EstatePropertyCompanySelectorComponent,
    EstatePropertyCompanyTreeComponent,
    EstatePropertyProjectAddComponent,
    EstatePropertyProjectAddMobileComponent,
    EstatePropertyProjectDeleteComponent,
    EstatePropertyProjectEditComponent,
    EstatePropertyProjectEditMobileComponent,
    EstatePropertyProjectHeaderComponent,
    EstatePropertyProjectListComponent,
    EstatePropertyProjectListMobileComponent,
    EstatePropertyProjectQuickViewComponent,
    EstatePropertyProjectSelectorComponent,
    EstatePropertyProjectTreeComponent,
    EstatePropertySupplierAddComponent,
    EstatePropertySupplierAddMobileComponent,
    EstatePropertySupplierDeleteComponent,
    EstatePropertySupplierEditComponent,
    EstatePropertySupplierEditMobileComponent,
    EstatePropertySupplierHeaderComponent,
    EstatePropertySupplierListComponent,
    EstatePropertySupplierListMobileComponent,
    EstatePropertySupplierQuickViewComponent,
    EstatePropertySupplierSelectorComponent,
    EstatePropertySupplierTreeComponent,
    EstatePropertyActionComponent,
    EstatePropertyAddComponent,
    EstatePropertyAddMobileComponent,
    EstatePropertyCompleteComponent,
    EstatePropertyEditComponent,
    EstatePropertyHeaderComponent,
    EstatePropertyListComponent,
    EstatePropertyListMobileComponent,
    EstatePropertyQuickAddComponent,
    EstatePropertyQuickListComponent,
    EstatePropertyQuickViewComponent,
    EstatePropertyResponsibleUserListComponent,
    EstatePropertySelectorComponent,
    EstatePropertyWidgetComponent,
    EstateCustomerOrderResultListComponent,
    EstateCustomerOrderResultListMobileComponent,
    EstateCustomerOrderResultViewComponent,
    EstateCustomerOrderActionComponent,
    EstateCustomerOrderAddToEditComponent,
    EstateCustomerOrderAddMobileComponent,
    EstateCustomerOrderEditComponent,
    EstateCustomerOrderEditMobileComponent,
    EstateCustomerOrderHeaderComponent,
    EstateCustomerOrderListComponent,
    EstateCustomerOrderListMobileComponent,
    EstateCustomerOrderQuickViewComponent,
    EstateCustomerOrderResponsibleUserListComponent,
    EstateCustomerOrderSelectorComponent,
    EstateCustomerOrderWidgetComponent,
    EstateLogComponent,
    EstatePropertyExpertPriceAddComponent,
    EstatePropertyExpertPriceAddMobileComponent,
    EstatePropertyExpertPriceEditComponent,
    EstatePropertyExpertPriceEditMobileComponent,
    EstatePropertyExpertPriceHeaderComponent,
    EstatePropertyExpertPriceInquiryCalculateComponent,
    EstatePropertyExpertPriceInquiryListComponent,
    EstatePropertyExpertPriceListComponent,
    EstatePropertyExpertPriceListMobileComponent,
    EstatePropertyHistoryAddComponent,
    EstatePropertyHistoryAddMobileComponent,
    EstatePropertyHistoryEditComponent,
    EstatePropertyHistoryEditMobileComponent,
    EstatePropertyHistoryListComponent,
    EstatePropertyHistoryListMobileComponent,
    EstatePropertyHistoryQuickViewComponent,
    EstatePropertyHistoryResponsibleUserListComponent,
    EstatePropertyHistoryWidgetComponent,
    EstateAccountAgencyAdsAddComponent,
    EstateAccountAgencyAdsAddMobileComponent,
    EstateAccountAgencyAdsEditComponent,
    EstateAccountAgencyAdsEditMobileComponent,
    EstateAccountAgencyAdsListComponent,
    EstateAccountAgencyAdsListMobileComponent,
    EstateAccountAgencyAdsSaleListComponent,
    EstateAccountAgencyAdsSalePaymentComponent,
    EstateAccountAgencyExpertAddComponent,
    EstateAccountAgencyExpertListComponent,
    EstateAccountAgencyExpertListMobileComponent,
    EstateAccountAgencyWorkAreaAddComponent,
    EstateAccountAgencyWorkAreaListComponent,
    EstateAccountAgencyWorkAreaListMobileComponent,
    EstateAccountAgencyAddComponent,
    EstateAccountAgencyAddMobileComponent,
    EstateAccountAgencyEditComponent,
    EstateAccountAgencyEditMobileComponent,
    EstateAccountAgencyHeaderComponent,
    EstateAccountAgencyListComponent,
    EstateAccountAgencyListMobileComponent,
    EstateAccountAgencySelectionlistComponent,
    EstateAccountAgencySelectorComponent,
    EstateAccountAgencyTreeComponent,
    EstateAccountExpertWorkAreaAddComponent,
    EstateAccountExpertWorkAreaListComponent,
    EstateAccountExpertWorkAreaListMobileComponent,
    EstateAccountExpertAddComponent,
    EstateAccountExpertAddMobileComponent,
    EstateAccountExpertEditComponent,
    EstateAccountExpertEditMobileComponent,
    EstateAccountExpertHeaderComponent,
    EstateAccountExpertListComponent,
    EstateAccountExpertListMobileComponent,
    EstateAccountExpertSelectionlistComponent,
    EstateAccountExpertSelectorComponent,
    EstateAccountExpertTreeComponent,
    EstateActivityTypeAddComponent,
    EstateActivityTypeAddMobileComponent,
    EstateActivityTypeCompleteComponent,
    EstateActivityTypeEditComponent,
    EstateActivityTypeEditMobileComponent,
    EstateActivityTypeHeaderComponent,
    EstateActivityTypeListComponent,
    EstateActivityTypeListMobileComponent,
    EstateActivityTypeSelectionlistComponent,
    EstateActivityTypeSelectorComponent,
    EstateActivityTypeTreeComponent,
    EstateAdsTypeAddComponent,
    EstateAdsTypeAddMobileComponent,
    EstateAdsTypeEditComponent,
    EstateAdsTypeEditMobileComponent,
    EstateAdsTypeListComponent,
    EstateAdsTypeListMobileComponent,
    EstateAdsTypeSelectorComponent,
    EstateContractTypeAddComponent,
    EstateContractTypeAddMobileComponent,
    EstateContractTypeCompleteComponent,
    EstateContractTypeEditComponent,
    EstateContractTypeEditMobileComponent,
    EstateContractTypeHeaderComponent,
    EstateContractTypeListComponent,
    EstateContractTypeListMobileComponent,
    EstateContractTypeSelectorComponent,
    EstateContractTypeTreeComponent,
    EstateCustomerCategoryAddComponent,
    EstateCustomerCategoryEditComponent,
    EstateCustomerCategorySelectorComponent,
    EstateCustomerCategoryTreeComponent,
    EstateMainComponent,
    EstatePropertyDetailGroupAddComponent,
    EstatePropertyDetailGroupAddMobileComponent,
    EstatePropertyDetailGroupEditComponent,
    EstatePropertyDetailGroupEditMobileComponent,
    EstatePropertyDetailGroupListComponent,
    EstatePropertyDetailGroupListMobileComponent,
    EstatePropertyDetailGroupSelectorComponent,
    EstatePropertyDetailGroupTreeComponent,
    EstatePropertyDetailAddComponent,
    EstatePropertyDetailAddMobileComponent,
    EstatePropertyDetailEditComponent,
    EstatePropertyDetailEditMobileComponent,
    EstatePropertyDetailListComponent,
    EstatePropertyDetailListMobileComponent,
    EstatePropertyDetailSelectorComponent,
    EstatePropertyDetailTreeComponent,
    EstatePropertySupplierCategoryAddComponent,
    EstatePropertySupplierCategoryEditComponent,
    EstatePropertySupplierCategorySelectorComponent,
    EstatePropertySupplierCategoryTreeSelectorComponent,
    EstatePropertySupplierCategoryTreeComponent,
    EstatePropertyTypeLanduseAddComponent,
    EstatePropertyTypeLanduseAddMobileComponent,
    EstatePropertyTypeLanduseCompleteComponent,
    EstatePropertyTypeLanduseEditComponent,
    EstatePropertyTypeLanduseEditMobileComponent,
    EstatePropertyTypeLanduseHeaderComponent,
    EstatePropertyTypeLanduseListComponent,
    EstatePropertyTypeLanduseListMobileComponent,
    EstatePropertyTypeLanduseSelectionlistComponent,
    EstatePropertyTypeLanduseSelectorComponent,
    EstatePropertyTypeLanduseTreeComponent,
    EstatePropertyTypeUsageAddComponent,
    EstatePropertyTypeUsageAddMobileComponent,
    EstatePropertyTypeUsageCompleteComponent,
    EstatePropertyTypeUsageEditComponent,
    EstatePropertyTypeUsageEditMobileComponent,
    EstatePropertyTypeUsageHeaderComponent,
    EstatePropertyTypeUsageListComponent,
    EstatePropertyTypeUsageListMobileComponent,
    EstatePropertyTypeUsageSelectionlistComponent,
    EstatePropertyTypeUsageSelectorComponent,
    EstatePropertyTypeUsageTreeComponent,
  ],
  imports: [
    CommonModule,
    EstateRoutes,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    CoreSharedModule,
    EstateSharedModule,
    CurrencyMaskModule,
    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
    IconPickerModule,
    DragDropModule,
    NgxMatColorPickerModule,
    NgOptimizedImage,
  ],
  exports: [
    /* Dashboard */
    EstateDashboardComponent,
    /* Dashboard */
    /* */
    EstateOverviewEventsComponent,
    EstateOverviewSummaryComponent,
    /* */
  ],
  providers: [
    EstatePropertyService,
    EstatePropertyAdsService,
    EstateAccountAgencyAdsService,
    EstatePropertyProjectService,
    EstatePropertyCompanyService,
    EstatePropertySupplierService,
    EstateAccountAgencyService,
    EstateAccountExpertService,
    EstateCustomerOrderService,
    EstatePropertyHistoryService,
  ],
})
export class EstateModule {}
