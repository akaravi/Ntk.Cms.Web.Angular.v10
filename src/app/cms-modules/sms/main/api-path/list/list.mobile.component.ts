import { Component } from "@angular/core";
import { SmsMainApiPathListComponent } from "./list.component";

@Component({
  selector: "app-sms-apipath-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class SmsMainApiPathListMobileComponent extends SmsMainApiPathListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }

  onActionCopied(): void {
    this.cmsToastrService.typeSuccessCopedToClipboard();
  }
}
