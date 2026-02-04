import { Component } from "@angular/core";
import { CoreTokenAuthUserLogListComponent } from "./list.component";

@Component({
  selector: "app-coretoken-auth-user-log-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreTokenAuthUserLogListMobileComponent extends CoreTokenAuthUserLogListComponent {
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
