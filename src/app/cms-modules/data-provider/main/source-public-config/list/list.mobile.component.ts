import { Component } from "@angular/core";
import { DataProviderSourcePublicConfigListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-source-public-config-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DataProviderSourcePublicConfigListMobileComponent extends DataProviderSourcePublicConfigListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }

  onActionCopied(): void {
    this.cmsToastrService.typeSuccessCopedToClipboard();
  }
  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }

  onActionButtonNewRow(): void {
    super['onActionButtonNewRow']?.();
  }

}
