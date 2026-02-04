import { Component } from "@angular/core";
import { BiographyContentListComponent } from "./list.component";

@Component({
  selector: "app-biography-content-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class BiographyContentListMobileComponent extends BiographyContentListComponent {
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
