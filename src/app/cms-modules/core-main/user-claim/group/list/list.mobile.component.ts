import { Component } from "@angular/core";
import { CoreUserClaimGroupListComponent } from "./list.component";

@Component({
  selector: "app-core-userclaimgroup-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreUserClaimGroupListMobileComponent extends CoreUserClaimGroupListComponent {
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
