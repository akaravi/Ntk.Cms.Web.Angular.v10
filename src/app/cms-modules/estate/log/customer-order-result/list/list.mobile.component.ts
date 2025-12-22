import { Component } from "@angular/core";
import { EstateCustomerOrderResultListComponent } from "./list.component";

@Component({
  selector: "app-estate-customer-order-result-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstateCustomerOrderResultListMobileComponent extends EstateCustomerOrderResultListComponent {}
