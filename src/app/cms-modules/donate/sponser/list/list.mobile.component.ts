import { Component } from "@angular/core";
import { DonateSponserListComponent } from "./list.component";

@Component({
  selector: "app-donate-sponser-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DonateSponserListMobileComponent extends DonateSponserListComponent {
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
