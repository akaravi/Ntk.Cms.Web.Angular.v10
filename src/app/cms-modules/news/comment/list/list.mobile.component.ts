import { Component } from "@angular/core";
import { NewsCommentListComponent } from "./list.component";

@Component({
  selector: "app-news-comment-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class NewsCommentListMobileComponent extends NewsCommentListComponent {
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
