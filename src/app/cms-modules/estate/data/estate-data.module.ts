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
  EstateAdsTypeService,
  EstateBillboardService,
  EstateConfigurationService,
  EstateContractTypeService,
  EstateEnumService,
  EstatePropertyAdsService,
  EstatePropertyCompanyService,
  EstatePropertyDetailGroupService,
  EstatePropertyProjectService,
  EstatePropertyService,
  EstatePropertySupplierCategoryService,
  EstatePropertySupplierService,
  EstatePropertyTypeLanduseService,
  EstatePropertyTypeService,
  EstatePropertyTypeUsageService,
  FileCategoryService,
} from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../../core-main/core.shared.module";
import { EstateDataComponent } from "./estate-data.component";
import { EstateDataRoutes } from "./estate-data.routing";

import { DragDropModule } from "@angular/cdk/drag-drop";

import { IconPickerModule } from "ngx-ntk-icon-picker";

import { EstateSharedModule } from "../shared/estate-shared.module";
import { EstateWidgetModule } from "../shared/estate-widget.module";
import { EstateBillboardAddComponent } from "./billboard/add/add.component";
import { EstateBillboardEditComponent } from "./billboard/edit/edit.component";
import { EstateBillboardListComponent } from "./billboard/list/list.component";
import { EstateBillboardSelectorComponent } from "./billboard/selector/selector.component";
import { EstateBillboardTreeComponent } from "./billboard/tree/tree.component";
import { EstatePropertyAdsAddComponent } from "./property-ads/add/add.component";
import { EstatePropertyAdsEditComponent } from "./property-ads/edit/edit.component";
import { EstatePropertyAdsListComponent } from "./property-ads/list/list.component";
import { EstatePropertyAdsSaleListComponent } from "./property-ads/sale-list/sale-list.component";
import { EstatePropertyAdsSalePaymentComponent } from "./property-ads/sale-payment/sale-payment.component";
import { EstatePropertyCompanyAddComponent } from "./property-company/add/add.component";
import { EstatePropertyCompanyDeleteComponent } from "./property-company/delete/delete.component";
import { EstatePropertyCompanyEditComponent } from "./property-company/edit/edit.component";
import { EstatePropertyCompanyListComponent } from "./property-company/list/list.component";
import { EstatePropertyCompanyQuickViewComponent } from "./property-company/quick-view/quick-view.component";
import { EstatePropertyCompanyTreeComponent } from "./property-company/tree/tree.component";
import { EstatePropertyProjectAddComponent } from "./property-project/add/add.component";
import { EstatePropertyProjectDeleteComponent } from "./property-project/delete/delete.component";
import { EstatePropertyProjectEditComponent } from "./property-project/edit/edit.component";
import { EstatePropertyProjectListComponent } from "./property-project/list/list.component";
import { EstatePropertyProjectQuickViewComponent } from "./property-project/quick-view/quick-view.component";
import { EstatePropertyProjectTreeComponent } from "./property-project/tree/tree.component";
import { EstatePropertySupplierAddComponent } from "./property-supplier/add/add.component";
import { EstatePropertySupplierDeleteComponent } from "./property-supplier/delete/delete.component";
import { EstatePropertySupplierEditComponent } from "./property-supplier/edit/edit.component";
import { EstatePropertySupplierHeaderComponent } from "./property-supplier/header/header.component";
import { EstatePropertySupplierListComponent } from "./property-supplier/list/list.component";
import { EstatePropertySupplierQuickViewComponent } from "./property-supplier/quick-view/quick-view.component";
import { EstatePropertySupplierSelectorComponent } from "./property-supplier/selector/selector.component";
import { EstatePropertySupplierTreeComponent } from "./property-supplier/tree/tree.component";
import { EstatePropertyActionComponent } from "./property/action/action.component";
import { EstatePropertyAddComponent } from "./property/add/add.component";
import { EstatePropertyAddMobileComponent } from "./property/add/add.mobile.component";
import { EstatePropertyEditComponent } from "./property/edit/edit.component";
import { EstatePropertyQuickAddComponent } from "./property/quick-add/quick-add.component";
import { EstatePropertyQuickListComponent } from "./property/quick-list/quick-list.component";
import { EstatePropertyQuickViewComponent } from "./property/quick-view/quick-view.component";
import { EstatePropertyResponsibleUserListComponent } from "./property/responsible-user-list/responsible-user-list.component";

import { CurrencyMaskModule } from "ng2-currency-mask";
import { CmsFileManagerModule } from "ntk-cms-filemanager";

import { NgxMatColorPickerModule } from "src/app/shared/color-picker.module";

@NgModule({
  declarations: [
    EstateDataComponent,
    /* */
    EstatePropertyProjectAddComponent,
    EstatePropertyProjectEditComponent,
    EstatePropertyProjectListComponent,
    EstatePropertyProjectDeleteComponent,
    EstatePropertyProjectTreeComponent,
    EstatePropertyProjectQuickViewComponent,
    /* */
    EstatePropertyCompanyAddComponent,
    EstatePropertyCompanyEditComponent,
    EstatePropertyCompanyListComponent,
    EstatePropertyCompanyDeleteComponent,
    EstatePropertyCompanyTreeComponent,
    EstatePropertyCompanyQuickViewComponent,
    /* */
    EstatePropertySupplierAddComponent,
    EstatePropertySupplierEditComponent,
    EstatePropertySupplierListComponent,
    EstatePropertySupplierSelectorComponent,
    EstatePropertySupplierDeleteComponent,
    EstatePropertySupplierTreeComponent,
    EstatePropertySupplierHeaderComponent,
    EstatePropertySupplierQuickViewComponent,
    /* */
    EstateBillboardAddComponent,
    EstateBillboardEditComponent,
    EstateBillboardListComponent,
    EstateBillboardSelectorComponent,
    EstateBillboardTreeComponent,
    /* */
    EstatePropertyAddComponent,
    EstatePropertyAddMobileComponent,
    EstatePropertyEditComponent,
    EstatePropertyActionComponent,

    EstatePropertyQuickAddComponent,
    EstatePropertyQuickListComponent,
    EstatePropertyQuickViewComponent,
    EstatePropertyResponsibleUserListComponent,
    /* */
    EstatePropertyAdsAddComponent,
    EstatePropertyAdsEditComponent,
    EstatePropertyAdsListComponent,
    EstatePropertyAdsSaleListComponent,
    EstatePropertyAdsSalePaymentComponent,
    /* */
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    EstateDataRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    EstateSharedModule,
    EstateWidgetModule,
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
    CoreSharedModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreAuthV3Service,
    CmsConfirmationDialogService,
    CoreModuleTagService,
    EstateConfigurationService,

    EstateAdsTypeService,
    EstateContractTypeService,
    EstateEnumService,
    EstatePropertyService,
    EstateBillboardService,
    EstatePropertyAdsService,
    EstatePropertyCompanyService,
    EstatePropertyDetailGroupService,
    EstatePropertyProjectService,
    EstatePropertySupplierCategoryService,
    EstatePropertySupplierService,
    EstatePropertyTypeLanduseService,
    EstatePropertyTypeUsageService,
    EstatePropertyTypeService,
    FileCategoryService,
  ],
  exports: [EstateDataComponent],
})
export class EstateDataModule {}
