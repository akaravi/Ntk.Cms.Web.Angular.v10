import { Component } from "@angular/core";
import { SmsMainApiNumberPermissionListComponent } from "./list.component";

@Component({
  selector: "app-sms-api-number-permission-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class SmsMainApiNumberPermissionListMobileComponent extends SmsMainApiNumberPermissionListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }

  onActionCopied(): void {
    this.cmsToastrService.typeSuccessCopedToClipboard();
  }
  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }

  onActionButtonNewRow(): void {
    super['onActionButtonNewRow']?.();
  }

}
