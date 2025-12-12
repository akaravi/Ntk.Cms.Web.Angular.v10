import { Routes } from "@angular/router";
import { TransactionAssistantComponent } from "./transaction-assistant.component";
import { TransactionAssistantProductListComponent } from "./product/list/list.component";
import { TransactionAssistantProductAddComponent } from "./product/add/add.component";
import { TransactionAssistantProductEditComponent } from "./product/edit/edit.component";
import { TransactionAssistantOrderListComponent } from "./order/list/list.component";
import { TransactionAssistantOrderAddComponent } from "./order/add/add.component";
import { TransactionAssistantOrderEditComponent } from "./order/edit/edit.component";
import { TransactionAssistantCartListComponent } from "./cart/list/list.component";
import { TransactionAssistantCartAddComponent } from "./cart/add/add.component";
import { TransactionAssistantCartEditComponent } from "./cart/edit/edit.component";
import { TransactionAssistantPaymentListComponent } from "./payment/list/list.component";
import { TransactionAssistantPaymentAddComponent } from "./payment/add/add.component";
import { TransactionAssistantPaymentEditComponent } from "./payment/edit/edit.component";
import { TransactionAssistantAddressListComponent } from "./address/list/list.component";
import { TransactionAssistantAddressAddComponent } from "./address/add/add.component";
import { TransactionAssistantAddressEditComponent } from "./address/edit/edit.component";
import { TransactionAssistantInvoiceListComponent } from "./invoice/list/list.component";
import { TransactionAssistantInvoiceAddComponent } from "./invoice/add/add.component";
import { TransactionAssistantInvoiceEditComponent } from "./invoice/edit/edit.component";
import { TransactionAssistantRatingListComponent } from "./rating/list/list.component";
import { TransactionAssistantRatingAddComponent } from "./rating/add/add.component";
import { TransactionAssistantRatingEditComponent } from "./rating/edit/edit.component";
import { TransactionAssistantRequestListComponent } from "./request/list/list.component";
import { TransactionAssistantRequestAddComponent } from "./request/add/add.component";
import { TransactionAssistantRequestEditComponent } from "./request/edit/edit.component";
import { TransactionAssistantInventoryListComponent } from "./inventory/list/list.component";
import { TransactionAssistantInventoryAddComponent } from "./inventory/add/add.component";
import { TransactionAssistantInventoryEditComponent } from "./inventory/edit/edit.component";
import { TransactionAssistantShipmentListComponent } from "./shipment/list/list.component";
import { TransactionAssistantShipmentAddComponent } from "./shipment/add/add.component";
import { TransactionAssistantShipmentEditComponent } from "./shipment/edit/edit.component";
import { TransactionAssistantSupplierListComponent } from "./supplier/list/list.component";
import { TransactionAssistantSupplierAddComponent } from "./supplier/add/add.component";
import { TransactionAssistantSupplierEditComponent } from "./supplier/edit/edit.component";
import { TransactionAssistantOfferListComponent } from "./offer/list/list.component";
import { TransactionAssistantOfferAddComponent } from "./offer/add/add.component";
import { TransactionAssistantOfferEditComponent } from "./offer/edit/edit.component";
import { TransactionAssistantTagListComponent } from "./tag/list/list.component";
import { TransactionAssistantTagAddComponent } from "./tag/add/add.component";
import { TransactionAssistantTagEditComponent } from "./tag/edit/edit.component";
import { TransactionAssistantCategoryListComponent } from "./category/list/list.component";
import { TransactionAssistantCategoryAddComponent } from "./category/add/add.component";
import { TransactionAssistantCategoryEditComponent } from "./category/edit/edit.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: TransactionAssistantComponent,
    data: { title: "ROUTE.TRANSACTIONASSISTANT" },
    children: [
      /* Config */
      {
        path: "config",
        loadChildren: () =>
          import("./config/transaction-assistant-config.module").then(
            (m) => m.TransactionAssistantConfigModule,
          ),
        data: { title: "ROUTE.TRANSACTIONASSISTANT" },
      },
      /* Config */
      /* Product */
      {
        path: "product",
        component: TransactionAssistantProductListComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.PRODUCT" },
      },
      {
        path: "product/add",
        component: TransactionAssistantProductAddComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.PRODUCTADD" },
      },
      {
        path: "product/edit/:id",
        component: TransactionAssistantProductEditComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.PRODUCTEDIT" },
      },
      /* Product */
      /* Order */
      {
        path: "order",
        component: TransactionAssistantOrderListComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.ORDER" },
      },
      {
        path: "order/add",
        component: TransactionAssistantOrderAddComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.ORDERADD" },
      },
      {
        path: "order/edit/:id",
        component: TransactionAssistantOrderEditComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.ORDEREDIT" },
      },
      /* Order */
      /* Cart */
      {
        path: "cart",
        component: TransactionAssistantCartListComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.CART" },
      },
      {
        path: "cart/add",
        component: TransactionAssistantCartAddComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.CARTADD" },
      },
      {
        path: "cart/edit/:id",
        component: TransactionAssistantCartEditComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.CARTEDIT" },
      },
      /* Cart */
      /* Payment */
      {
        path: "payment",
        component: TransactionAssistantPaymentListComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.PAYMENT" },
      },
      {
        path: "payment/add",
        component: TransactionAssistantPaymentAddComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.PAYMENTADD" },
      },
      {
        path: "payment/edit/:id",
        component: TransactionAssistantPaymentEditComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.PAYMENTEDIT" },
      },
      /* Payment */
      /* Address */
      {
        path: "address",
        component: TransactionAssistantAddressListComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.ADDRESS" },
      },
      {
        path: "address/add",
        component: TransactionAssistantAddressAddComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.ADDRESSADD" },
      },
      {
        path: "address/edit/:id",
        component: TransactionAssistantAddressEditComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.ADDRESSEDIT" },
      },
      /* Address */
      /* Invoice */
      {
        path: "invoice",
        component: TransactionAssistantInvoiceListComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.INVOICE" },
      },
      {
        path: "invoice/add",
        component: TransactionAssistantInvoiceAddComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.INVOICEADD" },
      },
      {
        path: "invoice/edit/:id",
        component: TransactionAssistantInvoiceEditComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.INVOICEEDIT" },
      },
      /* Invoice */
      /* Rating */
      {
        path: "rating",
        component: TransactionAssistantRatingListComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.RATING" },
      },
      {
        path: "rating/add",
        component: TransactionAssistantRatingAddComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.RATINGADD" },
      },
      {
        path: "rating/edit/:id",
        component: TransactionAssistantRatingEditComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.RATINGEDIT" },
      },
      /* Rating */
      /* Request */
      {
        path: "request",
        component: TransactionAssistantRequestListComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.REQUEST" },
      },
      {
        path: "request/add",
        component: TransactionAssistantRequestAddComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.REQUESTADD" },
      },
      {
        path: "request/edit/:id",
        component: TransactionAssistantRequestEditComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.REQUESTEDIT" },
      },
      /* Request */
      /* Inventory */
      {
        path: "inventory",
        component: TransactionAssistantInventoryListComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.INVENTORY" },
      },
      {
        path: "inventory/add",
        component: TransactionAssistantInventoryAddComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.INVENTORYADD" },
      },
      {
        path: "inventory/edit/:id",
        component: TransactionAssistantInventoryEditComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.INVENTORYEDIT" },
      },
      /* Inventory */
      /* Shipment */
      {
        path: "shipment",
        component: TransactionAssistantShipmentListComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.SHIPMENT" },
      },
      {
        path: "shipment/add",
        component: TransactionAssistantShipmentAddComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.SHIPMENTADD" },
      },
      {
        path: "shipment/edit/:id",
        component: TransactionAssistantShipmentEditComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.SHIPMENTEDIT" },
      },
      /* Shipment */
      /* Supplier */
      {
        path: "supplier",
        component: TransactionAssistantSupplierListComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.SUPPLIER" },
      },
      {
        path: "supplier/add",
        component: TransactionAssistantSupplierAddComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.SUPPLIERADD" },
      },
      {
        path: "supplier/edit/:id",
        component: TransactionAssistantSupplierEditComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.SUPPLIEREDIT" },
      },
      /* Supplier */
      /* Offer */
      {
        path: "offer",
        component: TransactionAssistantOfferListComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.OFFER" },
      },
      {
        path: "offer/add",
        component: TransactionAssistantOfferAddComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.OFFERADD" },
      },
      {
        path: "offer/edit/:id",
        component: TransactionAssistantOfferEditComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.OFFEREDIT" },
      },
      /* Offer */
      /* Tag */
      {
        path: "tag",
        component: TransactionAssistantTagListComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.TAG" },
      },
      {
        path: "tag/add",
        component: TransactionAssistantTagAddComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.TAGADD" },
      },
      {
        path: "tag/edit/:id",
        component: TransactionAssistantTagEditComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.TAGEDIT" },
      },
      /* Tag */
      /* Category */
      {
        path: "category",
        component: TransactionAssistantCategoryListComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.CATEGORY" },
      },
      {
        path: "category/add",
        component: TransactionAssistantCategoryAddComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.CATEGORYADD" },
      },
      {
        path: "category/edit/:id",
        component: TransactionAssistantCategoryEditComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT.CATEGORYEDIT" },
      },
      /* Category */
    ],
  },
];

