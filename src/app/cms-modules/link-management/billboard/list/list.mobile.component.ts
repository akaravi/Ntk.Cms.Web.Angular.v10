import { Component } from "@angular/core";
import { LinkManagementBillboardListComponent } from "./list.component";

@Component({
  selector: "app-linkmanagement-billboard-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class LinkManagementBillboardListMobileComponent extends LinkManagementBillboardListComponent {
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
