import { Component } from "@angular/core";
import { ArticleContentListComponent } from "./list.component";

@Component({
  selector: "app-article-content-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class ArticleContentListMobileComponent extends ArticleContentListComponent {
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
