import { Component } from "@angular/core";
import { SmsLogOutBoxQueueListComponent } from "./list.component";

@Component({
  selector: "app-sms-log-outboxqueue-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class SmsLogOutBoxQueueListMobileComponent extends SmsLogOutBoxQueueListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
