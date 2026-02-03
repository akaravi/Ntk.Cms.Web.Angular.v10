import { Component } from "@angular/core";
import { DataProviderClientListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-client-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DataProviderClientListMobileComponent extends DataProviderClientListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
