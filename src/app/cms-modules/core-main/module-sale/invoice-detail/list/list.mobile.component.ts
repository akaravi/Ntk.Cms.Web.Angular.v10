import { Component } from "@angular/core";
import { CoreModuleSaleInvoiceDetailListComponent } from "./list.component";

@Component({
  selector: "app-core-modulesaleinvoicedetail-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreModuleSaleInvoiceDetailListMobileComponent extends CoreModuleSaleInvoiceDetailListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
