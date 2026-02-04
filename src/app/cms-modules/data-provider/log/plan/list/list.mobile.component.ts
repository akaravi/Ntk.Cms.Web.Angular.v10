import { Component } from "@angular/core";
import { DataProviderLogPlanListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-log-plan-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DataProviderLogPlanListMobileComponent extends DataProviderLogPlanListComponent {
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
