import { Component } from "@angular/core";
import { EstateCustomerOrderResultListComponent } from "./list.component";
import { EstateCustomerOrderResultModel } from "ntk-cms-api";

@Component({
  selector: "app-estate-customer-order-result-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstateCustomerOrderResultListMobileComponent extends EstateCustomerOrderResultListComponent {
  getTitle(row: EstateCustomerOrderResultModel): string {
    return (row as any)['title'] || row.id || '';
  }
}
