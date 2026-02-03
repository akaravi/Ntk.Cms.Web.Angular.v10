import { Component } from "@angular/core";
import { SmsLogInBoxListComponent } from "./list.component";

@Component({
  selector: "app-sms-log-inbox-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class SmsLogInBoxListMobileComponent extends SmsLogInBoxListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }

  onActionCopied(): void {
    this.cmsToastrService.typeSuccessCopedToClipboard();
  }
}
