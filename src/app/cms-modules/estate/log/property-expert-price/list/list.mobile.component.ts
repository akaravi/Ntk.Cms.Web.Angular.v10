import { Component } from "@angular/core";
import { EstatePropertyExpertPriceModel } from "ntk-cms-api";
import { EstatePropertyExpertPriceListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-expert-price-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstatePropertyExpertPriceListMobileComponent extends EstatePropertyExpertPriceListComponent {
  getTitle(row: EstatePropertyExpertPriceModel): string {
    return (row as any)['title'] || row.id || '';
  }

  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
