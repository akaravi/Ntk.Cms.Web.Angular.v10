import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreModuleSaleItemListComponent } from "./Item/list/list.component";
import { CoreModuleSaleHeaderGroupListComponent } from "./header-group/list/list.component";
import { CoreModuleSaleHeaderListComponent } from "./header/list/list.component";
import { CoreModuleSaleHeaderSaleListComponent } from "./header/sale-list/sale-list.component";
import { CoreModuleSaleInvoiceDetailListComponent } from "./invoice-detail/list/list.component";
import { CoreModuleSaleInvoiceListComponent } from "./invoice/list/list.component";
import { CoreModuleSaleSerialCheckListComponent } from "./serial/check-list/check-list.component";
import { CoreModuleSaleSerialListComponent } from "./serial/list/list.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CORE.MODULESALE" },
    children: [
      {
        path: "headergroup",
        component: CoreModuleSaleHeaderGroupListComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      /** */
      {
        path: "header",
        component: CoreModuleSaleHeaderListComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      {
        path: "header/sale",
        component: CoreModuleSaleHeaderSaleListComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      {
        path: "header/:LinkHeaderGroupId",
        component: CoreModuleSaleHeaderListComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      /** */
      {
        path: "invoice",
        component: CoreModuleSaleInvoiceListComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      {
        path: "invoicedetail",
        component: CoreModuleSaleInvoiceDetailListComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      {
        path: "invoicedetail/LinkInvoiceId/:LinkInvoiceId",
        component: CoreModuleSaleInvoiceDetailListComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      {
        path: "item",
        component: CoreModuleSaleItemListComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      {
        path: "item/LinkModuleSaleHeader/:LinkModuleSaleHeader",
        component: CoreModuleSaleItemListComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      {
        path: "serial",
        component: CoreModuleSaleSerialListComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
      {
        path: "serial/checklist",
        component: CoreModuleSaleSerialCheckListComponent,
        data: { title: "ROUTE.CORE.MODULESALE" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreModuleSaleRouting {}
