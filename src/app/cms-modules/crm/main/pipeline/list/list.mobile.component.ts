import { Component } from "@angular/core";
import { CrmPipelineListComponent } from "./list.component";

@Component({
  selector: "app-crm-pipeline-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CrmPipelineListMobileComponent extends CrmPipelineListComponent {
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
