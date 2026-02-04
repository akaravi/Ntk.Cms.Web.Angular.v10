import { Component } from "@angular/core";
import { CoreModuleSiteUserCreditListComponent } from "./list.component";

@Component({
  selector: "app-coremodule-site-user-credit-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreModuleSiteUserCreditListMobileComponent extends CoreModuleSiteUserCreditListComponent {
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
