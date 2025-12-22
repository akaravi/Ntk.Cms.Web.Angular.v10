import { Component } from "@angular/core";
import { EstateCustomerOrderListComponent } from "./list.component";

@Component({
  selector: "app-estate-customer-order-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstateCustomerOrderListMobileComponent extends EstateCustomerOrderListComponent {}
