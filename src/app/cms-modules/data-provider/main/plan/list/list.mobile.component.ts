import { Component } from "@angular/core";
import { DataProviderPlanListComponent } from "./list.component";

@Component({
  selector: "app-data-provider-plan-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class DataProviderPlanListMobileComponent extends DataProviderPlanListComponent {}
