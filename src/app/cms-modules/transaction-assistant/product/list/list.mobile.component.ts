import { Component } from "@angular/core";
import { TransactionAssistantProductListComponent } from "./list.component";

@Component({
  selector: "app-transaction-assistant-product-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TransactionAssistantProductListMobileComponent extends TransactionAssistantProductListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
