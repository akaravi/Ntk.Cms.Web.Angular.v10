import { Component } from "@angular/core";
import { DataProviderSourcePathListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-source-path-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DataProviderSourcePathListMobileComponent extends DataProviderSourcePathListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
