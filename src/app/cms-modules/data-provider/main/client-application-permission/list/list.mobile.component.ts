import { Component } from "@angular/core";
import { DataProviderClientApplicationPermissionListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-client-application-permission-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DataProviderClientApplicationPermissionListMobileComponent
  extends DataProviderClientApplicationPermissionListComponent
{
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
