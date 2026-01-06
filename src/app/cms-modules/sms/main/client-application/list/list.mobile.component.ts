import { Component } from "@angular/core";
import { SmsMainClientApplicationListComponent } from "./list.component";

@Component({
  selector: "app-sms-client-application-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class SmsMainClientApplicationListMobileComponent extends SmsMainClientApplicationListComponent {}

