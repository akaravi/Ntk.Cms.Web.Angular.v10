import { Component } from "@angular/core";
import { SmsMainMessageContentListComponent } from "./list.component";

@Component({
  selector: "app-sms-main-message-content-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class SmsMainMessageContentListMobileComponent extends SmsMainMessageContentListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }

  onActionCopied(): void {
    this.cmsToastrService.typeSuccessCopedToClipboard();
  }
}
