import { Component } from "@angular/core";
import { DataProviderPlanSourceListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-plan-source-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DataProviderPlanSourceListMobileComponent extends DataProviderPlanSourceListComponent {
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
