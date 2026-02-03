import { Component } from "@angular/core";
import { CrmDealListComponent } from "./list.component";

@Component({
  selector: "app-crm-deal-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CrmDealListMobileComponent extends CrmDealListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
