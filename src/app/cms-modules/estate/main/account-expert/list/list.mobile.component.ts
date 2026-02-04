import { Component } from "@angular/core";
import { EstateAccountExpertListComponent } from "./list.component";

@Component({
  selector: "app-estate-account-expert-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstateAccountExpertListMobileComponent extends EstateAccountExpertListComponent {
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
