import { Component } from "@angular/core";
import { CrmActivityListComponent } from "./list.component";

@Component({
  selector: "app-crm-activity-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CrmActivityListMobileComponent extends CrmActivityListComponent {
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
