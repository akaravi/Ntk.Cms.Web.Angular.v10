import { CommonModule, NgOptimizedImage } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { AngularEditorModule } from "@kolkov/angular-editor";
import {
  BankPaymentTransactionService,
  CoreAuthV3Service,
  CoreEnumService,
  CoreModuleService,
  CoreModuleTagService,
  FileCategoryService,
  TransactionAssistantAddressService,
  TransactionAssistantCartService,
  TransactionAssistantConfigurationService,
  TransactionAssistantEnumService,
  TransactionAssistantInventoryService,
  TransactionAssistantInvoiceService,
  TransactionAssistantOfferService,
  TransactionAssistantOrderService,
  TransactionAssistantPaymentService,
  TransactionAssistantProductCategoryService,
  TransactionAssistantProductService,
  TransactionAssistantRatingService,
  TransactionAssistantRequestService,
  TransactionAssistantShipmentService,
  TransactionAssistantSupplierService,
  TransactionAssistantTagService,
} from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SharedModule } from "src/app/shared/shared.module";
import { TransactionAssistantComponent } from "./transaction-assistant.component";
import { TransactionAssistantRoutes } from "./transaction-assistant.routing";

import { DragDropModule } from "@angular/cdk/drag-drop";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { IconPickerModule } from "ngx-ntk-icon-picker";
import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { CoreSharedModule } from "../core-main/core.shared.module";

// Product Components
import { TransactionAssistantProductAddComponent } from "./product/add/add.component";
import { TransactionAssistantProductEditComponent } from "./product/edit/edit.component";
import { TransactionAssistantProductListComponent } from "./product/list/list.component";
import { TransactionAssistantProductListMobileComponent } from "./product/list/list.mobile.component";

// Order Components
import { TransactionAssistantOrderAddComponent } from "./order/add/add.component";
import { TransactionAssistantOrderEditComponent } from "./order/edit/edit.component";
import { TransactionAssistantOrderListComponent } from "./order/list/list.component";
import { TransactionAssistantOrderListMobileComponent } from "./order/list/list.mobile.component";

// Cart Components
import { TransactionAssistantCartAddComponent } from "./cart/add/add.component";
import { TransactionAssistantCartEditComponent } from "./cart/edit/edit.component";
import { TransactionAssistantCartListComponent } from "./cart/list/list.component";
import { TransactionAssistantCartListMobileComponent } from "./cart/list/list.mobile.component";

// Payment Components
import { TransactionAssistantPaymentAddComponent } from "./payment/add/add.component";
import { TransactionAssistantPaymentEditComponent } from "./payment/edit/edit.component";
import { TransactionAssistantPaymentListComponent } from "./payment/list/list.component";
import { TransactionAssistantPaymentListMobileComponent } from "./payment/list/list.mobile.component";

// Address Components
import { TransactionAssistantAddressAddComponent } from "./address/add/add.component";
import { TransactionAssistantAddressEditComponent } from "./address/edit/edit.component";
import { TransactionAssistantAddressListComponent } from "./address/list/list.component";
import { TransactionAssistantAddressListMobileComponent } from "./address/list/list.mobile.component";

// Invoice Components
import { TransactionAssistantInvoiceAddComponent } from "./invoice/add/add.component";
import { TransactionAssistantInvoiceEditComponent } from "./invoice/edit/edit.component";
import { TransactionAssistantInvoiceListComponent } from "./invoice/list/list.component";
import { TransactionAssistantInvoiceListMobileComponent } from "./invoice/list/list.mobile.component";

// Rating Components
import { TransactionAssistantRatingAddComponent } from "./rating/add/add.component";
import { TransactionAssistantRatingEditComponent } from "./rating/edit/edit.component";
import { TransactionAssistantRatingListComponent } from "./rating/list/list.component";
import { TransactionAssistantRatingListMobileComponent } from "./rating/list/list.mobile.component";

// Request Components
import { TransactionAssistantRequestAddComponent } from "./request/add/add.component";
import { TransactionAssistantRequestEditComponent } from "./request/edit/edit.component";
import { TransactionAssistantRequestListComponent } from "./request/list/list.component";
import { TransactionAssistantRequestListMobileComponent } from "./request/list/list.mobile.component";

// Inventory Components
import { TransactionAssistantInventoryAddComponent } from "./inventory/add/add.component";
import { TransactionAssistantInventoryEditComponent } from "./inventory/edit/edit.component";
import { TransactionAssistantInventoryListComponent } from "./inventory/list/list.component";
import { TransactionAssistantInventoryListMobileComponent } from "./inventory/list/list.mobile.component";

// Shipment Components
import { TransactionAssistantShipmentAddComponent } from "./shipment/add/add.component";
import { TransactionAssistantShipmentEditComponent } from "./shipment/edit/edit.component";
import { TransactionAssistantShipmentListComponent } from "./shipment/list/list.component";

// Supplier Components
import { TransactionAssistantSupplierAddComponent } from "./supplier/add/add.component";
import { TransactionAssistantSupplierEditComponent } from "./supplier/edit/edit.component";
import { TransactionAssistantSupplierListComponent } from "./supplier/list/list.component";

// Offer Components
import { TransactionAssistantOfferAddComponent } from "./offer/add/add.component";
import { TransactionAssistantOfferEditComponent } from "./offer/edit/edit.component";
import { TransactionAssistantOfferListComponent } from "./offer/list/list.component";
import { TransactionAssistantOfferListMobileComponent } from "./offer/list/list.mobile.component";

// Tag Components
import { TransactionAssistantTagAddComponent } from "./tag/add/add.component";
import { TransactionAssistantTagEditComponent } from "./tag/edit/edit.component";
import { TransactionAssistantTagListComponent } from "./tag/list/list.component";

// Category Components
import { TransactionAssistantCategoryAddComponent } from "./category/add/add.component";
import { TransactionAssistantCategoryEditComponent } from "./category/edit/edit.component";
import { TransactionAssistantCategoryListComponent } from "./category/list/list.component";
import { TransactionAssistantCategoryListMobileComponent } from "./category/list/list.mobile.component";
import { TransactionAssistantDashboardComponent } from "./dashboard/dashboard.component";
import { TransactionAssistantShipmentListMobileComponent } from "./shipment/list/list.mobile.component";
import { TransactionAssistantSupplierListMobileComponent } from "./supplier/list/list.mobile.component";
import { TransactionAssistantTagListMobileComponent } from "./tag/list/list.mobile.component";
// Config Components
import { TransactionAssistantConfigCheckSiteComponent } from "./config/check-site/check-site.component";
import { TransactionAssistantConfigCheckUserComponent } from "./config/check-user/check-user.component";
import { TransactionAssistantConfigMainAdminComponent } from "./config/main-admin/config-main-admin.component";
import { TransactionAssistantConfigSiteComponent } from "./config/site/config-site.component";
import { TransactionAssistantConfigComponent } from "./config/transaction-assistant-config.component";

@NgModule({
  declarations: [
    TransactionAssistantComponent,
    /* Product */
    TransactionAssistantProductListComponent,
    TransactionAssistantProductListMobileComponent,
    TransactionAssistantProductAddComponent,
    TransactionAssistantProductEditComponent,
    /* Product */
    /* Order */
    TransactionAssistantOrderListComponent,
    TransactionAssistantOrderListMobileComponent,
    TransactionAssistantOrderAddComponent,
    TransactionAssistantOrderEditComponent,
    /* Order */
    /* Cart */
    TransactionAssistantCartListComponent,
    TransactionAssistantCartListMobileComponent,
    TransactionAssistantCartAddComponent,
    TransactionAssistantCartEditComponent,
    /* Cart */
    /* Payment */
    TransactionAssistantPaymentListComponent,
    TransactionAssistantPaymentListMobileComponent,
    TransactionAssistantPaymentAddComponent,
    TransactionAssistantPaymentEditComponent,
    /* Payment */
    /* Address */
    TransactionAssistantAddressListComponent,
    TransactionAssistantAddressListMobileComponent,
    TransactionAssistantAddressAddComponent,
    TransactionAssistantAddressEditComponent,
    /* Address */
    /* Invoice */
    TransactionAssistantInvoiceListComponent,
    TransactionAssistantInvoiceListMobileComponent,
    TransactionAssistantInvoiceAddComponent,
    TransactionAssistantInvoiceEditComponent,
    /* Invoice */
    /* Rating */
    TransactionAssistantRatingListComponent,
    TransactionAssistantRatingListMobileComponent,
    TransactionAssistantRatingAddComponent,
    TransactionAssistantRatingEditComponent,
    /* Rating */
    /* Request */
    TransactionAssistantRequestListComponent,
    TransactionAssistantRequestListMobileComponent,
    TransactionAssistantRequestAddComponent,
    TransactionAssistantRequestEditComponent,
    /* Request */
    /* Inventory */
    TransactionAssistantInventoryListComponent,
    TransactionAssistantInventoryListMobileComponent,
    TransactionAssistantInventoryAddComponent,
    TransactionAssistantInventoryEditComponent,
    /* Inventory */
    /* Shipment */
    TransactionAssistantShipmentListComponent,
    TransactionAssistantShipmentListMobileComponent,
    TransactionAssistantShipmentAddComponent,
    TransactionAssistantShipmentEditComponent,
    /* Shipment */
    /* Supplier */
    TransactionAssistantSupplierListComponent,
    TransactionAssistantSupplierListMobileComponent,
    TransactionAssistantSupplierAddComponent,
    TransactionAssistantSupplierEditComponent,
    /* Supplier */
    /* Offer */
    TransactionAssistantOfferListComponent,
    TransactionAssistantOfferListMobileComponent,
    TransactionAssistantOfferAddComponent,
    TransactionAssistantOfferEditComponent,
    /* Offer */
    /* Tag */
    TransactionAssistantTagListComponent,
    TransactionAssistantTagListMobileComponent,
    TransactionAssistantTagAddComponent,
    TransactionAssistantTagEditComponent,
    /* Tag */
    /* Category */
    TransactionAssistantCategoryListComponent,
    TransactionAssistantCategoryListMobileComponent,
    TransactionAssistantCategoryAddComponent,
    TransactionAssistantCategoryEditComponent,
    /* Category */
    /* Dashboard */
    TransactionAssistantDashboardComponent,
    /* Dashboard */
    /* Config */
    TransactionAssistantConfigComponent,
    TransactionAssistantConfigCheckSiteComponent,
    TransactionAssistantConfigCheckUserComponent,
    TransactionAssistantConfigMainAdminComponent,
    TransactionAssistantConfigSiteComponent,
    /* Config */
  ],
  imports: [
    CommonModule,
    RouterModule,
    TransactionAssistantRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
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
    MatSlideToggleModule,
    MatMenuModule,
    IconPickerModule,
    DragDropModule,
    NgOptimizedImage,
    CmsFileManagerModule,
  ],
  providers: [
    CoreModuleService,
    FileCategoryService,
    CoreEnumService,
    CoreAuthV3Service,
    /*Config*/
    TransactionAssistantConfigurationService,
    /*Config*/
    /** */
    TransactionAssistantAddressService,
    TransactionAssistantCartService,
    TransactionAssistantEnumService,
    TransactionAssistantInventoryService,
    TransactionAssistantInvoiceService,
    TransactionAssistantOfferService,
    TransactionAssistantOrderService,
    TransactionAssistantPaymentService,
    TransactionAssistantProductService,
    TransactionAssistantProductCategoryService,
    TransactionAssistantRatingService,
    TransactionAssistantRequestService,
    TransactionAssistantShipmentService,
    TransactionAssistantSupplierService,
    TransactionAssistantTagService,
    /** */
    CmsConfirmationDialogService,
    CoreModuleTagService,
    BankPaymentTransactionService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [],
})
export class TransactionAssistantModule {}
