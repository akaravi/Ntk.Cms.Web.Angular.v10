import { Component } from "@angular/core";
import { DataProviderClientPermissionListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-client-permission-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderClientPermissionListMobileComponent extends DataProviderClientPermissionListComponent {}

