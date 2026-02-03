import { Component } from "@angular/core";
import { EstateCustomerOrderListComponent } from "./list.component";

@Component({
  selector: "app-estate-customer-order-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstateCustomerOrderListMobileComponent extends EstateCustomerOrderListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
