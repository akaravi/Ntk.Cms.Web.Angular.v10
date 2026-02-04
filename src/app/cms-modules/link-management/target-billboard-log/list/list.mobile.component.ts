import { Component } from "@angular/core";
import { LinkManagementTargetBillboardLogListComponent } from "./list.component";

@Component({
  selector: "app-linkmanagement-target-billboard-log-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class LinkManagementTargetBillboardLogListMobileComponent extends LinkManagementTargetBillboardLogListComponent {
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
