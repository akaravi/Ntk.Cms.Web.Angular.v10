import { Component } from "@angular/core";
import { DonateTransactionListComponent } from "./list.component";

@Component({
  selector: "app-donate-transaction-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DonateTransactionListMobileComponent extends DonateTransactionListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
  onActionButtonEditRow(model: any): void {
    super['onActionButtonEditRow']?.(model);
  }
  onActionButtonDeleteRow(model: any): void {
    super['onActionButtonDeleteRow']?.(model);
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
