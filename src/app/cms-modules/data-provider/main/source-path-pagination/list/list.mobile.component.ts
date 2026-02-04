import { Component } from "@angular/core";
import { DataProviderSourcePathPaginationListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-source-path-pagination-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DataProviderSourcePathPaginationListMobileComponent extends DataProviderSourcePathPaginationListComponent {
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
