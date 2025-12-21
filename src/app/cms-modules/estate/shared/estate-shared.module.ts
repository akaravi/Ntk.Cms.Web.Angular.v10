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
import { EstateContractTypeHeaderComponent } from "../main/contract-type/header/header.component";
import { EstateContractTypeSelectorComponent } from "../main/contract-type/selector/selector.component";
import { EstateCustomerCategorySelectorComponent } from "../main/customer-category/selector/selector.component";
import { EstateCustomerCategoryTreeComponent } from "../main/customer-category/tree/tree.component";
import { EstatePropertyTypeLanduseHeaderComponent } from "../main/property-type-landuse/header/header.component";
import { EstatePropertyTypeLanduseSelectorComponent } from "../main/property-type-landuse/selector/selector.component";
import { EstatePropertyTypeLanduseTreeComponent } from "../main/property-type-landuse/tree/tree.component";
import { EstatePropertyTypeUsageHeaderComponent } from "../main/property-type-usage/header/header.component";
import { EstatePropertyTypeUsageSelectorComponent } from "../main/property-type-usage/selector/selector.component";
import { EstatePropertyCompanyHeaderComponent } from "../property-company/header/header.component";
import { EstatePropertyCompanySelectorComponent } from "../property-company/selector/selector.component";
import { EstatePropertyProjectHeaderComponent } from "../property-project/header/header.component";
import { EstatePropertyProjectSelectorComponent } from "../property-project/selector/selector.component";
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
    EstateCustomerCategorySelectorComponent,
    /* Autocomplete */
    EstatePropertyCompleteComponent,
    /* Headers */
    EstatePropertyHeaderComponent,
    EstateCustomerOrderHeaderComponent,
    EstateBillboardHeaderComponent,
    EstateContractTypeHeaderComponent,
    EstatePropertyTypeLanduseHeaderComponent,
    EstatePropertyTypeUsageHeaderComponent,
    EstatePropertyProjectHeaderComponent,
    EstatePropertyCompanyHeaderComponent,
    EstateAccountAgencyHeaderComponent,
    EstateAccountExpertHeaderComponent,
    /* Trees */
    EstatePropertyTypeLanduseTreeComponent,
    EstateCustomerCategoryTreeComponent,
    EstateActivityTypeTreeComponent,
    /* Selectors - Additional */
    EstatePropertyTypeUsageSelectorComponent,
    EstatePropertyTypeLanduseSelectorComponent,
    EstateContractTypeSelectorComponent,
    EstateAccountAgencySelectorComponent,
    EstateAccountExpertSelectorComponent,
    EstateActivityTypeSelectorComponent,
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
    EstateCustomerCategorySelectorComponent,
    EstatePropertyTypeUsageSelectorComponent,
    EstatePropertyTypeLanduseSelectorComponent,
    EstateContractTypeSelectorComponent,
    EstateAccountAgencySelectorComponent,
    EstateAccountExpertSelectorComponent,
    EstateActivityTypeSelectorComponent,
    /* Headers */
    EstatePropertyHeaderComponent,
    EstateCustomerOrderHeaderComponent,
    EstateBillboardHeaderComponent,
    EstateContractTypeHeaderComponent,
    EstatePropertyTypeLanduseHeaderComponent,
    EstatePropertyTypeUsageHeaderComponent,
    EstatePropertyProjectHeaderComponent,
    EstatePropertyCompanyHeaderComponent,
    EstateAccountAgencyHeaderComponent,
    EstateAccountExpertHeaderComponent,
    /* Trees */
    EstatePropertyTypeLanduseTreeComponent,
    EstateCustomerCategoryTreeComponent,
    EstateActivityTypeTreeComponent,
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
