import { Routes } from "@angular/router";
import { TransactionAssistantComponent } from "./transaction-assistant.component";
import { TransactionAssistantProductListMobileComponent } from "./product/list/list.mobile.component";
import { TransactionAssistantProductAddComponent } from "./product/add/add.component";
import { TransactionAssistantProductEditComponent } from "./product/edit/edit.component";
import { TransactionAssistantOrderListMobileComponent } from "./order/list/list.mobile.component";
import { TransactionAssistantOrderAddComponent } from "./order/add/add.component";
import { TransactionAssistantOrderEditComponent } from "./order/edit/edit.component";
import { TransactionAssistantCartListMobileComponent } from "./cart/list/list.mobile.component";
import { TransactionAssistantCartAddComponent } from "./cart/add/add.component";
import { TransactionAssistantCartEditComponent } from "./cart/edit/edit.component";
import { TransactionAssistantPaymentListMobileComponent } from "./payment/list/list.mobile.component";
import { TransactionAssistantPaymentAddComponent } from "./payment/add/add.component";
import { TransactionAssistantPaymentEditComponent } from "./payment/edit/edit.component";
import { TransactionAssistantAddressListMobileComponent } from "./address/list/list.mobile.component";
import { TransactionAssistantAddressAddComponent } from "./address/add/add.component";
import { TransactionAssistantAddressEditComponent } from "./address/edit/edit.component";
import { TransactionAssistantInvoiceListMobileComponent } from "./invoice/list/list.mobile.component";
import { TransactionAssistantInvoiceAddComponent } from "./invoice/add/add.component";
import { TransactionAssistantInvoiceEditComponent } from "./invoice/edit/edit.component";
import { TransactionAssistantRatingListMobileComponent } from "./rating/list/list.mobile.component";
import { TransactionAssistantRatingAddComponent } from "./rating/add/add.component";
import { TransactionAssistantRatingEditComponent } from "./rating/edit/edit.component";
import { TransactionAssistantRequestListMobileComponent } from "./request/list/list.mobile.component";
import { TransactionAssistantRequestAddComponent } from "./request/add/add.component";
import { TransactionAssistantRequestEditComponent } from "./request/edit/edit.component";
import { TransactionAssistantInventoryListMobileComponent } from "./inventory/list/list.mobile.component";
import { TransactionAssistantInventoryAddComponent } from "./inventory/add/add.component";
import { TransactionAssistantInventoryEditComponent } from "./inventory/edit/edit.component";
import { TransactionAssistantShipmentListMobileComponent } from "./shipment/list/list.mobile.component";
import { TransactionAssistantShipmentAddComponent } from "./shipment/add/add.component";
import { TransactionAssistantShipmentEditComponent } from "./shipment/edit/edit.component";
import { TransactionAssistantSupplierListMobileComponent } from "./supplier/list/list.mobile.component";
import { TransactionAssistantSupplierAddComponent } from "./supplier/add/add.component";
import { TransactionAssistantSupplierEditComponent } from "./supplier/edit/edit.component";
import { TransactionAssistantOfferListMobileComponent } from "./offer/list/list.mobile.component";
import { TransactionAssistantOfferAddComponent } from "./offer/add/add.component";
import { TransactionAssistantOfferEditComponent } from "./offer/edit/edit.component";
import { TransactionAssistantTagListMobileComponent } from "./tag/list/list.mobile.component";
import { TransactionAssistantTagAddComponent } from "./tag/add/add.component";
import { TransactionAssistantTagEditComponent } from "./tag/edit/edit.component";
import { TransactionAssistantCategoryListMobileComponent } from "./category/list/list.mobile.component";
import { TransactionAssistantCategoryAddComponent } from "./category/add/add.component";
import { TransactionAssistantCategoryEditComponent } from "./category/edit/edit.component";
import { TransactionAssistantDashboardComponent } from "./dashboard/dashboard.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: TransactionAssistantComponent,
    data: { title: "ROUTE.TRANSACTIONASSISTANT" },
    children: [
      /* Dashboard */
      {
        path: "",
        pathMatch: "full",
        component: TransactionAssistantDashboardComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT" },
      },
      {
        path: "dashboard",
        component: TransactionAssistantDashboardComponent,
        data: { title: "ROUTE.TRANSACTIONASSISTANT" },
      },
      /* Dashboard */
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
        component: TransactionAssistantProductListMobileComponent,
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
        component: TransactionAssistantOrderListMobileComponent,
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
        component: TransactionAssistantCartListMobileComponent,
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
        component: TransactionAssistantPaymentListMobileComponent,
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
        component: TransactionAssistantAddressListMobileComponent,
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
        component: TransactionAssistantInvoiceListMobileComponent,
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
        component: TransactionAssistantRatingListMobileComponent,
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
        component: TransactionAssistantRequestListMobileComponent,
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
        component: TransactionAssistantInventoryListMobileComponent,
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
        component: TransactionAssistantShipmentListMobileComponent,
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
        component: TransactionAssistantSupplierListMobileComponent,
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
        component: TransactionAssistantOfferListMobileComponent,
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
        component: TransactionAssistantTagListMobileComponent,
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
        component: TransactionAssistantCategoryListMobileComponent,
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
