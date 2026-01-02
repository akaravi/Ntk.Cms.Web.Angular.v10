import { Component } from "@angular/core";
import { DataProviderPlanSourceListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-plan-source-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderPlanSourceListMobileComponent extends DataProviderPlanSourceListComponent {}

