import { Component } from "@angular/core";
import { CoreSiteDomainAliasListComponent } from "./list.component";

@Component({
  selector: "app-core-site-domainalias-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreSiteDomainAliasListMobileComponent extends CoreSiteDomainAliasListComponent {
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
