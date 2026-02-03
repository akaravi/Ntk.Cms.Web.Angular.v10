import { Component } from "@angular/core";
import { DataProviderPlanClientListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-plan-client-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DataProviderPlanClientListMobileComponent extends DataProviderPlanClientListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
