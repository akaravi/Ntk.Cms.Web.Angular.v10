import { Component } from "@angular/core";
import { ChartContentListComponent } from "./list.component";

@Component({
  selector: "app-chart-content-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class ChartContentListMobileComponent extends ChartContentListComponent {
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
