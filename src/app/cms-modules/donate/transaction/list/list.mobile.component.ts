import { Component } from "@angular/core";
import { DonateTransactionListComponent } from "./list.component";

@Component({
  selector: "app-donate-transaction-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DonateTransactionListMobileComponent extends DonateTransactionListComponent {

  onActionButtonEditRow(model: any): void {
    super['onActionButtonEditRow']?.(model);
  }
  onActionButtonDeleteRow(model: any): void {
    super['onActionButtonDeleteRow']?.(model);
  }





}
