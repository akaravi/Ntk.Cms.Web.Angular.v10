import { Component } from "@angular/core";
import { CoreLogMicroServicePingListComponent } from "./list.component";

@Component({
  selector: "app-core-log-micro-service-ping-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.component.scss"],
  standalone: false,
})
export class CoreLogMicroServicePingListMobileComponent extends CoreLogMicroServicePingListComponent {}
