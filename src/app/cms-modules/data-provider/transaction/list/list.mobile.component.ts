import { Component } from "@angular/core";
import { DataProviderTransactionListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-transaction-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderTransactionListMobileComponent extends DataProviderTransactionListComponent {}
