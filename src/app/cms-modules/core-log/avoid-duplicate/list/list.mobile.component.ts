import { Component } from "@angular/core";
import { CoreLogAvoidDuplicateDataEntryListComponent } from "./list.component";

@Component({
  selector: "app-core-log-avoid-duplicate-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreLogAvoidDuplicateDataEntryListMobileComponent extends CoreLogAvoidDuplicateDataEntryListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
