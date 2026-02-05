import { Component } from "@angular/core";
import { EstatePropertySupplierListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-supplier-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstatePropertySupplierListMobileComponent extends EstatePropertySupplierListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
