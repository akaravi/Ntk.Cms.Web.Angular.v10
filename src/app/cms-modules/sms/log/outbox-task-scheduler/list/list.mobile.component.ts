import { Component } from "@angular/core";
import { SmsLogOutBoxTaskSchedulerListComponent } from "./list.component";

@Component({
  selector: "app-sms-log-outbox-task-scheduler-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class SmsLogOutBoxTaskSchedulerListMobileComponent extends SmsLogOutBoxTaskSchedulerListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }

  onActionCopied(): void {
    this.cmsToastrService.typeSuccessCopedToClipboard();
  }
}
