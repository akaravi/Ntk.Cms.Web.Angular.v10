import { Component } from "@angular/core";
import { DataProviderPlanPriceListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-plan-price-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderPlanPriceListMobileComponent extends DataProviderPlanPriceListComponent {}

