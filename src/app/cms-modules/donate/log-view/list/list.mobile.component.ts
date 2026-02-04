import { Component } from "@angular/core";
import { DonateLogViewListComponent } from "./list.component";

@Component({
  selector: "app-donate-log-view-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DonateLogViewListMobileComponent extends DonateLogViewListComponent {
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
