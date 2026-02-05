import { Component } from "@angular/core";
import { TransactionAssistantInvoiceListComponent } from "./list.component";

@Component({
  selector: "app-transaction-assistant-invoice-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TransactionAssistantInvoiceListMobileComponent extends TransactionAssistantInvoiceListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
  onActionButtonViewRow(model: any): void {
    super["onActionButtonViewRow"]?.(model);
  }





}
