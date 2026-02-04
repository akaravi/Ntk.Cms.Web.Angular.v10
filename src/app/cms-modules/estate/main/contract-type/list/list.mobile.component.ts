import { Component } from "@angular/core";
import { EstateContractTypeListComponent } from "./list.component";

@Component({
  selector: "app-estate-contract-type-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstateContractTypeListMobileComponent extends EstateContractTypeListComponent {
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
