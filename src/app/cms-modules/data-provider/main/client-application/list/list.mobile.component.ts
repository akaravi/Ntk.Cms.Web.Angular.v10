import { Component } from "@angular/core";
import { DataProviderClientApplicationListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-client-application-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderClientApplicationListMobileComponent extends DataProviderClientApplicationListComponent {}

