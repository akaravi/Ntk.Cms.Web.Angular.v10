import { Component } from "@angular/core";
import { TransactionAssistantOfferListComponent } from "./list.component";

@Component({
  selector: "app-transaction-assistant-offer-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TransactionAssistantOfferListMobileComponent extends TransactionAssistantOfferListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
