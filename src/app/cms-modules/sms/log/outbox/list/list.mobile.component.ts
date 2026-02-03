import { Component } from "@angular/core";
import { SmsLogOutBoxListComponent } from "./list.component";

@Component({
  selector: "app-sms-log-outbox-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class SmsLogOutBoxListMobileComponent extends SmsLogOutBoxListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }

  onActionCopied(): void {
    this.cmsToastrService.typeSuccessCopedToClipboard();
  }
}
