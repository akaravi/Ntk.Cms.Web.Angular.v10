import { Component } from "@angular/core";
import { CoreLogTokenConnectionListComponent } from "./list.component";

@Component({
  selector: "app-coretoken-notificationlog-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreLogTokenConnectionListMobileComponent extends CoreLogTokenConnectionListComponent {
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
