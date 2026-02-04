import { Component } from "@angular/core";
import { TransactionAssistantRatingListComponent } from "./list.component";

@Component({
  selector: "app-transaction-assistant-rating-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TransactionAssistantRatingListMobileComponent extends TransactionAssistantRatingListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
  onActionButtonViewRow(model: any): void {
    super["onActionButtonViewRow"]?.(model);
  }

  onActionCopied(): void {
    super["onActionCopied"]?.();
  }

  onActionButtonNewRow(): void {
    super['onActionButtonNewRow']?.();
  }

}
