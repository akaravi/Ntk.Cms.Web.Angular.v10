import { Component } from "@angular/core";
import { EstatePropertyExpertPriceListComponent } from "./list.component";
import { EstatePropertyExpertPriceModel } from "ntk-cms-api";

@Component({
  selector: "app-estate-property-expert-price-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstatePropertyExpertPriceListMobileComponent extends EstatePropertyExpertPriceListComponent {
  getTitle(row: EstatePropertyExpertPriceModel): string {
    return (row as any)['title'] || row.id || '';
  }
}
