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
}
