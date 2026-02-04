import { Component } from "@angular/core";
import { EstateAccountAgencyListComponent } from "./list.component";

@Component({
  selector: "app-estate-account-agency-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstateAccountAgencyListMobileComponent extends EstateAccountAgencyListComponent {
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
