import { Component } from "@angular/core";
import { TransactionAssistantTagListComponent } from "./list.component";

@Component({
  selector: "app-transaction-assistant-tag-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TransactionAssistantTagListMobileComponent extends TransactionAssistantTagListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
