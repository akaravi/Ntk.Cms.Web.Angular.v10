import { Component } from "@angular/core";
import { DonateTargetPeriodSponserListComponent } from "./list.component";

@Component({
  selector: "app-donate-target-period-sponser-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DonateTargetPeriodSponserListMobileComponent extends DonateTargetPeriodSponserListComponent {
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
