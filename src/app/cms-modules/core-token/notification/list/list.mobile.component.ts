import { Component } from "@angular/core";
import { CoreTokenConnectionListComponent } from "./list.component";

@Component({
  selector: "app-coretoken-notification-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreTokenConnectionListMobileComponent extends CoreTokenConnectionListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
