import { Component } from "@angular/core";
import { DataProviderPlanSourceListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-plan-source-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DataProviderPlanSourceListMobileComponent extends DataProviderPlanSourceListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
