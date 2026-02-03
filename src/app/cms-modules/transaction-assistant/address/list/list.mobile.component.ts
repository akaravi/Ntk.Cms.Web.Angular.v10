import { Component } from "@angular/core";
import { TransactionAssistantAddressListComponent } from "./list.component";

@Component({
  selector: "app-transaction-assistant-address-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TransactionAssistantAddressListMobileComponent extends TransactionAssistantAddressListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }

  // Explicitly declare inherited methods for TypeScript
  override onActionButtonViewRow(model?: any): void {
    super.onActionButtonViewRow(model);
  }

  override onActionCopied(): void {
    super.onActionCopied();
  }
}
