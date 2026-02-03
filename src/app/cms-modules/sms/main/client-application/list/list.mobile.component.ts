import { Component } from "@angular/core";
import { SmsMainClientApplicationListComponent } from "./list.component";

@Component({
  selector: "app-sms-client-application-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class SmsMainClientApplicationListMobileComponent extends SmsMainClientApplicationListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
