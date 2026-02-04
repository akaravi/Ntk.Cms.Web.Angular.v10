import { Component } from "@angular/core";
import { TransactionAssistantShipmentListComponent } from "./list.component";

@Component({
  selector: "app-transaction-assistant-shipment-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TransactionAssistantShipmentListMobileComponent extends TransactionAssistantShipmentListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
  onActionButtonViewRow(model: any): void {
    super["onActionButtonViewRow"]?.(model);
  }

  onActionCopied(): void {
    super["onActionCopied"]?.();
  }

  onActionButtonNewRow(): void {
    super['onActionButtonNewRow']?.();
  }

}
