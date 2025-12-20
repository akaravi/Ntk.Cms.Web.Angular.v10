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
import { EstateAccountAgencyHeaderComponent } from "../account-agency/header/header.component";
import { EstateAccountAgencyListComponent } from "../account-agency/list/list.component";
import { EstateAccountAgencySelectorComponent } from "../account-agency/selector/selector.component";
import { EstateAccountExpertHeaderComponent } from "../account-expert/header/header.component";
import { EstateAccountExpertListComponent } from "../account-expert/list/list.component";
import { EstateAccountExpertSelectorComponent } from "../account-expert/selector/selector.component";
import { EstateActivityTypeSelectorComponent } from "../activity-type/selector/selector.component";
import { EstateActivityTypeTreeComponent } from "../activity-type/tree/tree.component";
import { EstateBillboardHeaderComponent } from "../billboard/header/header.component";
import { EstateContractTypeHeaderComponent } from "../contract-type/header/header.component";
import { EstateContractTypeSelectorComponent } from "../contract-type/selector/selector.component";
import { EstateCustomerCategorySelectorComponent } from "../customer-category/selector/selector.component";
import { EstateCustomerCategoryTreeComponent } from "../customer-category/tree/tree.component";
import { EstateCustomerOrderHeaderComponent } from "../customer-order/header/header.component";
import { EstateCustomerOrderListComponent } from "../customer-order/list/list.component";
import { EstateCustomerOrderSelectorComponent } from "../customer-order/selector/selector.component";
import { EstatePropertyCompanyHeaderComponent } from "../property-company/header/header.component";
import { EstatePropertyCompanySelectorComponent } from "../property-company/selector/selector.component";
import { EstatePropertyHistoryAddComponent } from "../property-history/add/add.component";
import { EstatePropertyHistoryListComponent } from "../property-history/list/list.component";
import { EstatePropertyProjectHeaderComponent } from "../property-project/header/header.component";
import { EstatePropertyProjectSelectorComponent } from "../property-project/selector/selector.component";
import { EstatePropertyTypeLanduseHeaderComponent } from "../property-type-landuse/header/header.component";
import { EstatePropertyTypeLanduseSelectorComponent } from "../property-type-landuse/selector/selector.component";
import { EstatePropertyTypeLanduseTreeComponent } from "../property-type-landuse/tree/tree.component";
import { EstatePropertyTypeUsageHeaderComponent } from "../property-type-usage/header/header.component";
import { EstatePropertyTypeUsageSelectorComponent } from "../property-type-usage/selector/selector.component";
import { EstatePropertyCompleteComponent } from "../property/autocomplete/autocomplete.component";
import { EstatePropertyHeaderComponent } from "../property/header/header.component";
import { EstatePropertyListComponent } from "../property/list/list.component";
import { EstatePropertyQuickAddComponent } from "../property/quick-add/quick-add.component";
import { EstatePropertyQuickListComponent } from "../property/quick-list/quick-list.component";
import { EstatePropertyQuickViewComponent } from "../property/quick-view/quick-view.component";
import { EstatePropertyResponsibleUserListComponent } from "../property/responsible-user-list/responsible-user-list.component";
import { EstatePropertySelectorComponent } from "../property/selector/selector.component";

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
    EstateAccountAgencySelectorComponent,
    EstateAccountExpertSelectorComponent,
    EstateActivityTypeSelectorComponent,
    EstateCustomerCategorySelectorComponent,
    /* Autocomplete */
    EstatePropertyCompleteComponent,
    /* Headers */
    EstatePropertyHeaderComponent,
    EstateCustomerOrderHeaderComponent,
    EstateAccountExpertHeaderComponent,
    EstateAccountAgencyHeaderComponent,
    EstateBillboardHeaderComponent,
    EstateContractTypeHeaderComponent,
    EstatePropertyTypeLanduseHeaderComponent,
    EstatePropertyTypeUsageHeaderComponent,
    EstatePropertyProjectHeaderComponent,
    EstatePropertyCompanyHeaderComponent,
    /* Trees */
    EstateActivityTypeTreeComponent,
    EstatePropertyTypeLanduseTreeComponent,
    EstateCustomerCategoryTreeComponent,
    /* Selectors - Additional */
    EstatePropertyTypeUsageSelectorComponent,
    EstatePropertyTypeLanduseSelectorComponent,
    EstateContractTypeSelectorComponent,
    /* Lists */
    EstateCustomerOrderListComponent,
    EstatePropertyHistoryListComponent,
    EstatePropertyListComponent,
    EstateAccountAgencyListComponent,
    EstateAccountExpertListComponent,
    /* Quick Components */
    EstatePropertyQuickViewComponent,
    EstatePropertyQuickAddComponent,
    EstatePropertyQuickListComponent,
    EstatePropertyResponsibleUserListComponent,
    EstatePropertyHistoryAddComponent,
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
    EstateAccountAgencySelectorComponent,
    EstateAccountExpertSelectorComponent,
    EstateActivityTypeSelectorComponent,
    EstateCustomerCategorySelectorComponent,
    EstatePropertyTypeUsageSelectorComponent,
    EstatePropertyTypeLanduseSelectorComponent,
    EstateContractTypeSelectorComponent,
    /* Headers */
    EstatePropertyHeaderComponent,
    EstateCustomerOrderHeaderComponent,
    EstateAccountExpertHeaderComponent,
    EstateAccountAgencyHeaderComponent,
    EstateBillboardHeaderComponent,
    EstateContractTypeHeaderComponent,
    EstatePropertyTypeLanduseHeaderComponent,
    EstatePropertyTypeUsageHeaderComponent,
    EstatePropertyProjectHeaderComponent,
    EstatePropertyCompanyHeaderComponent,
    /* Trees */
    EstateActivityTypeTreeComponent,
    EstatePropertyTypeLanduseTreeComponent,
    EstateCustomerCategoryTreeComponent,
    /* Lists */
    EstateCustomerOrderListComponent,
    EstatePropertyHistoryListComponent,
    EstatePropertyListComponent,
    EstateAccountAgencyListComponent,
    EstateAccountExpertListComponent,
    /* Quick Components */
    EstatePropertyQuickViewComponent,
    EstatePropertyQuickAddComponent,
    EstatePropertyQuickListComponent,
    EstatePropertyResponsibleUserListComponent,
    EstatePropertyHistoryAddComponent,
    /* Autocomplete */
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
