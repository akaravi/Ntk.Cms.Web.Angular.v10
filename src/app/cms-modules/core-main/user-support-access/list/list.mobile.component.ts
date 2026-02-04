import { Component } from "@angular/core";
import { CoreUserSupportAccessListComponent } from "./list.component";

@Component({
  selector: "app-core-user-support-access-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreUserSupportAccessListMobileComponent extends CoreUserSupportAccessListComponent {
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
