import { Component } from "@angular/core";
import { TransactionAssistantCategoryListComponent } from "./list.component";

@Component({
  selector: "app-transaction-assistant-category-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TransactionAssistantCategoryListMobileComponent extends TransactionAssistantCategoryListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
  onActionButtonViewRow(model: any): void {
    super["onActionButtonViewRow"]?.(model);
  }





}
