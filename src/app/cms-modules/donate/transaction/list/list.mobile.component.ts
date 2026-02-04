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
  onActionCopied(): void {
    super['onActionCopied']?.();
  }

  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }

  onActionButtonNewRow(): void {
    super['onActionButtonNewRow']?.();
  }

}
