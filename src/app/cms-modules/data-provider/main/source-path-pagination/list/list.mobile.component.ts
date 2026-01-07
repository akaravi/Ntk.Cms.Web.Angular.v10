import { Component } from "@angular/core";
import { DataProviderSourcePathPaginationListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-source-path-pagination-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderSourcePathPaginationListMobileComponent extends DataProviderSourcePathPaginationListComponent {}
