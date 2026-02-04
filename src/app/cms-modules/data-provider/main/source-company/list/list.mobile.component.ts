import { Component } from "@angular/core";
import { DataProviderSourceCompanyListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-source-company-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DataProviderSourceCompanyListMobileComponent extends DataProviderSourceCompanyListComponent {
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
