import { Component } from "@angular/core";
import { CrmLeadListComponent } from "./list.component";

@Component({
  selector: "app-crm-lead-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CrmLeadListMobileComponent extends CrmLeadListComponent {
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
