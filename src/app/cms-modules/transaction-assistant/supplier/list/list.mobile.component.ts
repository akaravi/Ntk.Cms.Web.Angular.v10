import { Component } from "@angular/core";
import { TransactionAssistantSupplierListComponent } from "./list.component";

@Component({
  selector: "app-transaction-assistant-supplier-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TransactionAssistantSupplierListMobileComponent extends TransactionAssistantSupplierListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
  onActionButtonViewRow(model: any): void {
    super["onActionButtonViewRow"]?.(model);
  }





}
