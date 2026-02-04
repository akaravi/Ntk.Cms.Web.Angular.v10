import { Component } from "@angular/core";
import { CoreLocationListComponent } from "./list.component";

@Component({
  selector: "app-core-location-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreLocationListMobileComponent extends CoreLocationListComponent {
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
