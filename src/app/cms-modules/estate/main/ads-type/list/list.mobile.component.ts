import { Component } from "@angular/core";
import { EstateAdsTypeListComponent } from "./list.component";

@Component({
  selector: "app-estate-ads-type-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstateAdsTypeListMobileComponent extends EstateAdsTypeListComponent {
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
