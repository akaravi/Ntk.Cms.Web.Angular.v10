import { Component } from "@angular/core";
import { PollingContentListComponent } from "./list.component";

@Component({
  selector: "app-polling-content-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class PollingContentListMobileComponent extends PollingContentListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
