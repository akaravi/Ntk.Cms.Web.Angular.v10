import { Component } from "@angular/core";
import { DataProviderLogSourceListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-log-source-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderLogSourceListMobileComponent extends DataProviderLogSourceListComponent {}
