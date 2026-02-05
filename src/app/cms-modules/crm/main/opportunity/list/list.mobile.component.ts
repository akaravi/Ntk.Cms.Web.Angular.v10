import { Component } from "@angular/core";
import { CrmOpportunityListComponent } from "./list.component";

@Component({
  selector: "app-crm-opportunity-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CrmOpportunityListMobileComponent extends CrmOpportunityListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
