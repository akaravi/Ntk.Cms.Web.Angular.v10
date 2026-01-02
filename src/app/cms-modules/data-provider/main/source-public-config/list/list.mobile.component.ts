import { Component } from "@angular/core";
import { DataProviderSourcePublicConfigListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-source-public-config-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderSourcePublicConfigListMobileComponent extends DataProviderSourcePublicConfigListComponent {}

