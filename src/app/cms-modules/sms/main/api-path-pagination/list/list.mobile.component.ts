import { Component } from "@angular/core";
import { SmsMainApiPathPaginationListComponent } from "./list.component";

@Component({
  selector: "app-sms-apipath-pagination-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class SmsMainApiPathPaginationListMobileComponent extends SmsMainApiPathPaginationListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
