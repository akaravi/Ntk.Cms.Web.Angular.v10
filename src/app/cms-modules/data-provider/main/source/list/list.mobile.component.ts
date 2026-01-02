import { Component } from "@angular/core";
import { DataProviderSourceListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-source-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderSourceListMobileComponent extends DataProviderSourceListComponent {}
