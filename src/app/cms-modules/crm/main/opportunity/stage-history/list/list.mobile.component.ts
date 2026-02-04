import { Component } from "@angular/core";
import { CrmOpportunityStageHistoryListComponent } from "./list.component";

@Component({
  selector: "app-crm-opportunity-stage-history-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CrmOpportunityStageHistoryListMobileComponent extends CrmOpportunityStageHistoryListComponent {
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
