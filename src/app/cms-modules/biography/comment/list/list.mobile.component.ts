import { Component } from "@angular/core";
import { BiographyCommentListComponent } from "./list.component";

@Component({
  selector: "app-biography-comment-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class BiographyCommentListMobileComponent extends BiographyCommentListComponent {
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
