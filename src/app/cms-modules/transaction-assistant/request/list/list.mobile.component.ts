import { Component } from "@angular/core";
import { TransactionAssistantRequestListComponent } from "./list.component";

@Component({
  selector: "app-transaction-assistant-request-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TransactionAssistantRequestListMobileComponent extends TransactionAssistantRequestListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
