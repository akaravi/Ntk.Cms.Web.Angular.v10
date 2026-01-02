import { Component } from "@angular/core";
import { DataProviderSourcePathListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-source-path-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderSourcePathListMobileComponent extends DataProviderSourcePathListComponent {}

