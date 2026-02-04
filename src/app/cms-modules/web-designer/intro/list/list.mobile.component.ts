import { Component } from "@angular/core";
import { WebDesignerMainIntroListComponent } from "./list.component";

@Component({
  selector: "app-webdesigner-intro-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class WebDesignerMainIntroListMobileComponent extends WebDesignerMainIntroListComponent {
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
