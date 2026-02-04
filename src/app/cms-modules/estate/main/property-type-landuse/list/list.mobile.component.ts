import { Component } from "@angular/core";
import { EstatePropertyTypeLanduseListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-type-landuse-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstatePropertyTypeLanduseListMobileComponent extends EstatePropertyTypeLanduseListComponent {
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
