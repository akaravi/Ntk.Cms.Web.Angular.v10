import { Component } from "@angular/core";
import { DonateTargetListComponent } from "./list.component";

@Component({
  selector: "app-donate-target-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DonateTargetListMobileComponent extends DonateTargetListComponent {
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
