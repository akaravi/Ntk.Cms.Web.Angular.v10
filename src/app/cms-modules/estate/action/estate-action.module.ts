import { CommonModule, NgOptimizedImage } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import { AngularEditorModule } from "@kolkov/angular-editor";
import {
  CoreAuthV3Service,
  CoreEnumService,
  CoreModuleService,
  CoreModuleTagService,
  EstateCustomerOrderService,
  EstateEnumService,
  FileCategoryService,
} from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../../core-main/core.shared.module";
import { EstateActionComponent } from "./estate-action.component";
import { EstateActionRoutes } from "./estate-action.routing";

import { DragDropModule } from "@angular/cdk/drag-drop";

import { IconPickerModule } from "ngx-ntk-icon-picker";

import { estateCustomerOrderInfoPipe } from "src/app/core/pipe/esate/estate-customer-order-info.pipe";
import { EstateCustomerOrderAddToEditComponent } from "../customer-order/add/add-to-edit.component";
import { EstateCustomerOrderAddMobileComponent } from "../customer-order/add/add.mobile.component";
import { EstateCustomerOrderEditComponent } from "../customer-order/edit/edit.component";
import { EstateCustomerOrderEditMobileComponent } from "../customer-order/edit/edit.mobile.component";
import { EstateCustomerOrderListComponent } from "../customer-order/list/list.component";
import { EstateCustomerOrderSelectorComponent } from "../customer-order/selector/selector.component";
import { EstateCustomerOrderHeaderComponent } from "../customer-order/header/header.component";
import { EstateCustomerOrderActionComponent } from "../customer-order/action/action.component";
import { EstateCustomerOrderQuickViewComponent } from "../customer-order/quick-view/quick-view.component";
import { EstateCustomerOrderResponsibleUserListComponent } from "../customer-order/responsible-user-list/responsible-user-list.component";

import { CurrencyMaskModule } from "ng2-currency-mask";
import { CmsFileManagerModule } from "ntk-cms-filemanager";

import { NgxMatColorPickerModule } from "src/app/shared/color-picker.module";
import { EstateMainModule } from "../main/estate-main.module";

@NgModule({
  declarations: [
    EstateActionComponent,
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
    estateCustomerOrderInfoPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EstateActionRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    EstateMainModule,
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
    EstateCustomerOrderService,
    EstateEnumService,
    FileCategoryService,
  ],
  exports: [
    EstateActionComponent,
    estateCustomerOrderInfoPipe,
  ],
})
export class EstateActionModule {}
