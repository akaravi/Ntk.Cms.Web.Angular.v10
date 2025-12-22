import { CommonModule, NgOptimizedImage } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
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
  EstateActivityTypeService,
  EstateContractTypeService,
  EstateCustomerCategoryService,
  EstateCustomerOrderResultService,
  EstateCustomerOrderService,
  EstateEnumService,
  EstatePropertyDetailGroupService,
  EstatePropertyExpertPriceService,
  EstatePropertyHistoryService,
  EstatePropertyService,
  EstatePropertyTypeLanduseService,
  EstatePropertyTypeUsageService,
  FileCategoryService,
} from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../../core-main/core.shared.module";
import { EstateLogComponent } from "./estate-log.component";
import { EstateLogRoutes } from "./estate-log.routing";

import { DragDropModule } from "@angular/cdk/drag-drop";

import { IconPickerModule } from "ngx-ntk-icon-picker";

import { EstateCustomerOrderResultListComponent } from "./customer-order-result/list/list.component";
import { EstateCustomerOrderResultListMobileComponent } from "./customer-order-result/list/list.mobile.component";
import { EstateCustomerOrderResultViewComponent } from "./customer-order-result/view/view.component";
import { EstateCustomerOrderActionComponent } from "./customer-order/action/action.component";
import { EstateCustomerOrderAddToEditComponent } from "./customer-order/add/add-to-edit.component";
import { EstateCustomerOrderAddMobileComponent } from "./customer-order/add/add.mobile.component";
import { EstateCustomerOrderEditComponent } from "./customer-order/edit/edit.component";
import { EstateCustomerOrderEditMobileComponent } from "./customer-order/edit/edit.mobile.component";
import { EstateCustomerOrderQuickViewComponent } from "./customer-order/quick-view/quick-view.component";
import { EstateCustomerOrderResponsibleUserListComponent } from "./customer-order/responsible-user-list/responsible-user-list.component";
import { EstatePropertyExpertPriceAddComponent } from "./property-expert-price/add/add.component";
import { EstatePropertyExpertPriceAddMobileComponent } from "./property-expert-price/add/add.mobile.component";
import { EstatePropertyExpertPriceEditComponent } from "./property-expert-price/edit/edit.component";
import { EstatePropertyExpertPriceEditMobileComponent } from "./property-expert-price/edit/edit.mobile.component";
import { EstatePropertyExpertPriceHeaderComponent } from "./property-expert-price/header/header.component";
import { EstatePropertyExpertPriceInquiryCalculateComponent } from "./property-expert-price/inquiry-calculate/inquiry-calculate.component";
import { EstatePropertyExpertPriceInquiryListComponent } from "./property-expert-price/inquiry-list/inquiry-list.component";
import { EstatePropertyExpertPriceListComponent } from "./property-expert-price/list/list.component";
import { EstatePropertyExpertPriceListMobileComponent } from "./property-expert-price/list/list.mobile.component";
import { EstatePropertyHistoryAddMobileComponent } from "./property-history/add/add.mobile.component";
import { EstatePropertyHistoryEditComponent } from "./property-history/edit/edit.component";
import { EstatePropertyHistoryEditMobileComponent } from "./property-history/edit/edit.mobile.component";
import { EstatePropertyHistoryQuickViewComponent } from "./property-history/quick-view/quick-view.component";
import { EstatePropertyHistoryResponsibleUserListComponent } from "./property-history/responsible-user-list/responsible-user-list.component";

import { CurrencyMaskModule } from "ng2-currency-mask";
import { CmsFileManagerModule } from "ntk-cms-filemanager";

import { NgxMatColorPickerModule } from "src/app/shared/color-picker.module";
import { EstateSharedModule } from "../shared/estate-shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { EstatePropertyHistoryListMobileComponent } from "./property-history/list/list.mobile.component";
import { EstateCustomerOrderListMobileComponent } from "./customer-order/list/list.mobile.component";

@NgModule({
  declarations: [
    EstateLogComponent,
    EstatePropertyHistoryAddMobileComponent,
    EstatePropertyHistoryEditComponent,
    EstatePropertyHistoryEditMobileComponent,
    EstatePropertyHistoryListMobileComponent,
    EstatePropertyHistoryQuickViewComponent,
    EstatePropertyHistoryResponsibleUserListComponent,
    /* */
    EstatePropertyExpertPriceAddComponent,
    EstatePropertyExpertPriceAddMobileComponent,
    EstatePropertyExpertPriceEditComponent,
    EstatePropertyExpertPriceEditMobileComponent,
    EstatePropertyExpertPriceHeaderComponent,
    EstatePropertyExpertPriceListComponent,
    EstatePropertyExpertPriceListMobileComponent,
    EstatePropertyExpertPriceInquiryCalculateComponent,
    EstatePropertyExpertPriceInquiryListComponent,
    /* */
    EstateCustomerOrderResultListComponent,
    EstateCustomerOrderResultListMobileComponent,
    EstateCustomerOrderResultViewComponent,
    EstateCustomerOrderAddToEditComponent,
    EstateCustomerOrderAddMobileComponent,
    EstateCustomerOrderEditComponent,
    EstateCustomerOrderEditMobileComponent,
    EstateCustomerOrderListMobileComponent,
    EstateCustomerOrderActionComponent,
    EstateCustomerOrderQuickViewComponent,
    EstateCustomerOrderResponsibleUserListComponent,

    /* */
  ],
  imports: [
    CommonModule,
    RouterModule,
    EstateLogRoutes,
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
    TranslateModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreAuthV3Service,
    CmsConfirmationDialogService,
    CoreModuleTagService,
    EstateActivityTypeService,
    EstateContractTypeService,
    EstateCustomerCategoryService,
    EstateCustomerOrderResultService,
    EstateCustomerOrderService,
    EstateEnumService,
    EstatePropertyDetailGroupService,
    EstatePropertyExpertPriceService,
    EstatePropertyHistoryService,
    EstatePropertyService,
    EstatePropertyTypeLanduseService,
    EstatePropertyTypeUsageService,
    FileCategoryService,
  ],
  exports: [EstateLogComponent],
})
export class EstateLogModule {}
