import { Component } from "@angular/core";
import { CoreLogMicroServiceStatusListComponent } from "./list.component";

@Component({
  selector: "app-core-log-micro-service-status-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.component.scss"],
  standalone: false,
})
export class CoreLogMicroServiceStatusListMobileComponent extends CoreLogMicroServiceStatusListComponent {}
