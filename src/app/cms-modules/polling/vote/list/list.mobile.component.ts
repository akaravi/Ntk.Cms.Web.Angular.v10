import { Component } from "@angular/core";
import { PollingVoteListComponent } from "./list.component";

@Component({
  selector: "app-polling-vote-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class PollingVoteListMobileComponent extends PollingVoteListComponent {
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
