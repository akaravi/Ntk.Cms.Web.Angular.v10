import { CommonModule, NgOptimizedImage } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { CoreModuleService, EstateEnumService } from "ntk-cms-api";
import { estateAccountAgencyInfoPipe } from "src/app/core/pipe/esate/estate-account-agency-info.pipe";
import { estateAccountExpertInfoPipe } from "src/app/core/pipe/esate/estate-account-user-info.pipe";
import { estateCustomerOrderInfoPipe } from "src/app/core/pipe/esate/estate-customer-order-info.pipe";
import { estatePropertyCompanyInfoPipe } from "src/app/core/pipe/esate/estate-property-company-info.pipe";
import { estatePropertyInfoPipe } from "src/app/core/pipe/esate/estate-property-info.pipe";
import { estatePropertyProjectInfoPipe } from "src/app/core/pipe/esate/estate-property-project-info.pipe";
import { estatePropertySupplierInfoPipe } from "src/app/core/pipe/esate/estate-property-supplier-info.pipe";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../../core-main/core.shared.module";
import { EstateBillboardHeaderComponent } from "../billboard/header/header.component";
import { EstateCustomerOrderHeaderComponent } from "../customer-order/header/header.component";
import { EstateCustomerOrderListComponent } from "../customer-order/list/list.component";
import { EstateCustomerOrderSelectorComponent } from "../customer-order/selector/selector.component";
import { EstatePropertyCompanyHeaderComponent } from "../data/property-company/header/header.component";
import { EstatePropertyCompanySelectorComponent } from "../data/property-company/selector/selector.component";
import { EstatePropertyProjectHeaderComponent } from "../data/property-project/header/header.component";
import { EstatePropertyProjectSelectorComponent } from "../data/property-project/selector/selector.component";
import { EstatePropertyCompleteComponent } from "../data/property/autocomplete/autocomplete.component";
import { EstatePropertyHeaderComponent } from "../data/property/header/header.component";
import { EstatePropertyListComponent } from "../data/property/list/list.component";
import { EstatePropertySelectorComponent } from "../data/property/selector/selector.component";
import { EstatePropertyHistoryAddComponent } from "../log/property-history/add/add.component";
import { EstatePropertyHistoryListComponent } from "../log/property-history/list/list.component";
import { EstateAccountAgencyHeaderComponent } from "../main/account-agency/header/header.component";
import { EstateAccountAgencyListComponent } from "../main/account-agency/list/list.component";
import { EstateAccountAgencySelectorComponent } from "../main/account-agency/selector/selector.component";
import { EstateAccountExpertHeaderComponent } from "../main/account-expert/header/header.component";
import { EstateAccountExpertListComponent } from "../main/account-expert/list/list.component";
import { EstateAccountExpertSelectorComponent } from "../main/account-expert/selector/selector.component";
import { EstateActivityTypeSelectorComponent } from "../main/activity-type/selector/selector.component";
import { EstateActivityTypeTreeComponent } from "../main/activity-type/tree/tree.component";
import { EstateAdsTypeSelectorComponent } from "../main/ads-type/selector/selector.component";
import { EstateContractTypeHeaderComponent } from "../main/contract-type/header/header.component";
import { EstateContractTypeSelectorComponent } from "../main/contract-type/selector/selector.component";
import { EstateCustomerCategorySelectorComponent } from "../main/customer-category/selector/selector.component";
import { EstateCustomerCategoryTreeComponent } from "../main/customer-category/tree/tree.component";
import { EstatePropertySupplierCategoryTreeSelectorComponent } from "../main/property-supplier-category/tree-selector/tree-selector.component";
import { EstatePropertySupplierCategoryTreeComponent } from "../main/property-supplier-category/tree/tree.component";
import { EstatePropertyTypeLanduseHeaderComponent } from "../main/property-type-landuse/header/header.component";
import { EstatePropertyTypeLanduseSelectorComponent } from "../main/property-type-landuse/selector/selector.component";
import { EstatePropertyTypeLanduseTreeComponent } from "../main/property-type-landuse/tree/tree.component";
import { EstatePropertyTypeUsageHeaderComponent } from "../main/property-type-usage/header/header.component";
import { EstatePropertyTypeUsageSelectorComponent } from "../main/property-type-usage/selector/selector.component";

@NgModule({
  declarations: [
    /* Pipes */
    estateAccountAgencyInfoPipe,
    estateAccountExpertInfoPipe,
    estateCustomerOrderInfoPipe,
    estatePropertyInfoPipe,
    estatePropertyProjectInfoPipe,
    estatePropertyCompanyInfoPipe,
    estatePropertySupplierInfoPipe,
    /* Selectors */
    EstatePropertySelectorComponent,
    EstatePropertyCompanySelectorComponent,
    EstatePropertyProjectSelectorComponent,
    EstateCustomerOrderSelectorComponent,
    EstateCustomerCategorySelectorComponent,
    EstateAdsTypeSelectorComponent,
    /* Headers */
    EstateCustomerOrderHeaderComponent,
    EstateBillboardHeaderComponent,
    EstateContractTypeHeaderComponent,
    EstatePropertyTypeLanduseHeaderComponent,
    EstatePropertyTypeUsageHeaderComponent,
    EstatePropertyProjectHeaderComponent,
    EstatePropertyCompanyHeaderComponent,
    EstatePropertyHeaderComponent,
    EstateAccountAgencyHeaderComponent,
    EstateAccountExpertHeaderComponent,
    /* Trees */
    EstatePropertyTypeLanduseTreeComponent,
    EstateCustomerCategoryTreeComponent,
    EstateActivityTypeTreeComponent,
    EstatePropertySupplierCategoryTreeComponent,
    EstatePropertySupplierCategoryTreeSelectorComponent,
    /* Selectors - Additional */
    EstatePropertyTypeUsageSelectorComponent,
    EstatePropertyTypeLanduseSelectorComponent,
    EstateContractTypeSelectorComponent,
    EstateAccountAgencySelectorComponent,
    EstateAccountExpertSelectorComponent,
    EstateActivityTypeSelectorComponent,
    /* Lists */
    EstatePropertyListComponent,
    EstateCustomerOrderListComponent,
    EstatePropertyHistoryListComponent,
    EstateAccountAgencyListComponent,
    EstateAccountExpertListComponent,
    /* Quick Components */
    EstatePropertyHistoryAddComponent,
    EstatePropertyCompleteComponent,
  ],
  exports: [
    /* Pipes */
    estateAccountAgencyInfoPipe,
    estateAccountExpertInfoPipe,
    estateCustomerOrderInfoPipe,
    estatePropertyInfoPipe,
    estatePropertyProjectInfoPipe,
    estatePropertyCompanyInfoPipe,
    estatePropertySupplierInfoPipe,
    /* Selectors */
    EstatePropertySelectorComponent,
    EstatePropertyCompanySelectorComponent,
    EstatePropertyProjectSelectorComponent,
    EstateCustomerOrderSelectorComponent,
    EstateCustomerCategorySelectorComponent,
    EstatePropertyTypeUsageSelectorComponent,
    EstatePropertyTypeLanduseSelectorComponent,
    EstateContractTypeSelectorComponent,
    EstateAccountAgencySelectorComponent,
    EstateAccountExpertSelectorComponent,
    EstateActivityTypeSelectorComponent,
    EstateAdsTypeSelectorComponent,
    /* Headers */
    EstateCustomerOrderHeaderComponent,
    EstateBillboardHeaderComponent,
    EstateContractTypeHeaderComponent,
    EstatePropertyTypeLanduseHeaderComponent,
    EstatePropertyTypeUsageHeaderComponent,
    EstatePropertyProjectHeaderComponent,
    EstatePropertyCompanyHeaderComponent,
    EstatePropertyHeaderComponent,
    EstateAccountAgencyHeaderComponent,
    EstateAccountExpertHeaderComponent,
    /* Trees */
    EstatePropertyTypeLanduseTreeComponent,
    EstateCustomerCategoryTreeComponent,
    EstateActivityTypeTreeComponent,
    EstatePropertySupplierCategoryTreeComponent,
    EstatePropertySupplierCategoryTreeSelectorComponent,
    /* Lists */
    EstatePropertyListComponent,
    EstateCustomerOrderListComponent,
    EstatePropertyHistoryListComponent,
    EstateAccountAgencyListComponent,
    EstateAccountExpertListComponent,
    /* Quick Components */
    EstatePropertyHistoryAddComponent,
    EstatePropertyCompleteComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    CoreSharedModule,
    AngularEditorModule,
    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
  ],
  providers: [CoreModuleService, EstateEnumService],
})
export class EstateSharedModule {}
