import { Component } from "@angular/core";
import { DataProviderSourceCompanyListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-source-company-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderSourceCompanyListMobileComponent extends DataProviderSourceCompanyListComponent {}

