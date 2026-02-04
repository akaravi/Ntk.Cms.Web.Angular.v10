import { Component } from "@angular/core";
import { TransactionAssistantTagListComponent } from "./list.component";

@Component({
  selector: "app-transaction-assistant-tag-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TransactionAssistantTagListMobileComponent extends TransactionAssistantTagListComponent {
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
