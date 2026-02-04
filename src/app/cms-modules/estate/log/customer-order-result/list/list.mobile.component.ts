import { Component } from "@angular/core";
import { EstateCustomerOrderResultListComponent } from "./list.component";
import { EstateCustomerOrderResultModel } from "ntk-cms-api";

@Component({
  selector: "app-estate-customer-order-result-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstateCustomerOrderResultListMobileComponent extends EstateCustomerOrderResultListComponent {
  getTitle(row: EstateCustomerOrderResultModel): string {
    return (row as any)['title'] || row.id || '';
  }

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
