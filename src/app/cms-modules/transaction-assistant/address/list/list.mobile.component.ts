import { Component } from "@angular/core";
import { TransactionAssistantAddressListComponent } from "./list.component";

@Component({
  selector: "app-transaction-assistant-address-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TransactionAssistantAddressListMobileComponent extends TransactionAssistantAddressListComponent {


  // Explicitly declare inherited methods for TypeScript
  override onActionButtonViewRow(model?: any): void {
    super.onActionButtonViewRow(model);
  }



}
