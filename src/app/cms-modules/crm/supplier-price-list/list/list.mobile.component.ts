import { Component } from "@angular/core";
import { CrmSupplierPriceListComponent } from "./list.component";

@Component({
  selector: "app-crm-supplier-price-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CrmSupplierPriceListMobileComponent extends CrmSupplierPriceListComponent {


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
