import { Component } from "@angular/core";
import { CrmOpportunityStageHistoryListComponent } from "./list.component";

@Component({
  selector: "app-crm-opportunity-stage-history-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CrmOpportunityStageHistoryListMobileComponent extends CrmOpportunityStageHistoryListComponent {


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
