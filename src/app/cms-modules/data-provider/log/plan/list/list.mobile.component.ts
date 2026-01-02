import { Component } from "@angular/core";
import { DataProviderLogPlanListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-log-plan-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderLogPlanListMobileComponent extends DataProviderLogPlanListComponent {}
