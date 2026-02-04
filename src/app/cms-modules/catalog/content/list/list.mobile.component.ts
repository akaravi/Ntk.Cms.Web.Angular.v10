import { Component } from "@angular/core";
import { CatalogContentListComponent } from "./list.component";

@Component({
  selector: "app-catalog-content-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CatalogContentListMobileComponent extends CatalogContentListComponent {
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
