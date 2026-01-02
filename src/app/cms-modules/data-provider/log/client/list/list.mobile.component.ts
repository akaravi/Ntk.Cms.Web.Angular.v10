import { Component } from "@angular/core";
import { DataProviderLogClientListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-log-client-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderLogClientListMobileComponent extends DataProviderLogClientListComponent {}
