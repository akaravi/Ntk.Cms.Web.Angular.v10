import { Component } from "@angular/core";
import { EstatePropertyCompanyListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-company-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstatePropertyCompanyListMobileComponent extends EstatePropertyCompanyListComponent {
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
