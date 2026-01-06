import { Component } from "@angular/core";
import { DataProviderClientApplicationPermissionListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-client-application-permission-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderClientApplicationPermissionListMobileComponent
  extends DataProviderClientApplicationPermissionListComponent
{}

