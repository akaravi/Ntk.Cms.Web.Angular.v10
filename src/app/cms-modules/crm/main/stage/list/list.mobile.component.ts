import { Component } from "@angular/core";
import { CrmStageListComponent } from "./list.component";

@Component({
  selector: "app-crm-stage-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CrmStageListMobileComponent extends CrmStageListComponent {
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
