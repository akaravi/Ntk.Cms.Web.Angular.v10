import { Component } from "@angular/core";
import { DataProviderClientListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-client-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderClientListMobileComponent extends DataProviderClientListComponent {}
