import { Component } from "@angular/core";
import { CrmSupplierPriceListComponent } from "./list.component";

@Component({
  selector: "app-crm-supplier-price-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CrmSupplierPriceListMobileComponent extends CrmSupplierPriceListComponent {
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
