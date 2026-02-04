import { Component } from "@angular/core";
import { SmsMainApiPathPricePermissionListComponent } from "./list.component";

@Component({
  selector: "app-sms-apipath-price-permission-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class SmsMainApiPathPricePermissionListMobileComponent extends SmsMainApiPathPricePermissionListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
  onActionCopied(): void {
    super['onActionCopied']?.();
  }

  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }

  onActionButtonNewRow(): void {
    super['onActionButtonNewRow']?.();
  }

}
