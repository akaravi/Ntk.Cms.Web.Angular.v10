import { Component } from "@angular/core";
import { TransactionAssistantPaymentListComponent } from "./list.component";

@Component({
  selector: "app-transaction-assistant-payment-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TransactionAssistantPaymentListMobileComponent extends TransactionAssistantPaymentListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
