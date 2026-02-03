import { Component } from "@angular/core";
import { TransactionAssistantInventoryListComponent } from "./list.component";

@Component({
  selector: "app-transaction-assistant-inventory-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TransactionAssistantInventoryListMobileComponent extends TransactionAssistantInventoryListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
