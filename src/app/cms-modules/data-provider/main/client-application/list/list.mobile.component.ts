import { Component } from "@angular/core";
import { DataProviderClientApplicationListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-client-application-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DataProviderClientApplicationListMobileComponent extends DataProviderClientApplicationListComponent {
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
