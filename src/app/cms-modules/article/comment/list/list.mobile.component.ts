import { Component } from "@angular/core";
import { ArticleCommentListComponent } from "./list.component";

@Component({
  selector: "app-article-comment-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class ArticleCommentListMobileComponent extends ArticleCommentListComponent {
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
