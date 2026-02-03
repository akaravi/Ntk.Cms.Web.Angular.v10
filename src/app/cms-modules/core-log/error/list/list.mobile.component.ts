import { Component } from "@angular/core";
import { CoreLogErrorListComponent } from "./list.component";

@Component({
  selector: "app-core-log-error-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreLogErrorListMobileComponent extends CoreLogErrorListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
