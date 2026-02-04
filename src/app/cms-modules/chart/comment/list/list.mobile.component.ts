import { Component } from "@angular/core";
import { ChartCommentListComponent } from "./list.component";

@Component({
  selector: "app-chart-comment-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class ChartCommentListMobileComponent extends ChartCommentListComponent {
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
