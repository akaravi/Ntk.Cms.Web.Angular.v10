import { Component } from "@angular/core";
import { EstatePropertyDetailGroupListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-detail-group-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstatePropertyDetailGroupListMobileComponent extends EstatePropertyDetailGroupListComponent {
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
