import { Component } from "@angular/core";
import { WebDesignerMainMenuListComponent } from "./list.component";

@Component({
  selector: "app-webdesigner-menu-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class WebDesignerMainMenuListMobileComponent extends WebDesignerMainMenuListComponent {
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
