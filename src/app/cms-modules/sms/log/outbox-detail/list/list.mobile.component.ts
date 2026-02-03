import { Component } from "@angular/core";
import { SmsLogOutBoxDetailListComponent } from "./list.component";

@Component({
  selector: "app-sms-log-outboxdetail-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class SmsLogOutBoxDetailListMobileComponent extends SmsLogOutBoxDetailListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }

  onActionCopied(): void {
    this.cmsToastrService.typeSuccessCopedToClipboard();
  }
}
