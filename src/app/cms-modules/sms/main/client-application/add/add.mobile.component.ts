import { Component } from "@angular/core";
import { SmsMainClientApplicationAddComponent } from "./add.component";

@Component({
  selector: "app-sms-client-application-add-mobile",
  templateUrl: "./add.mobile.component.html",
  styleUrls: ["./add.mobile.component.scss"],
  standalone: false,
})
export class SmsMainClientApplicationAddMobileComponent extends SmsMainClientApplicationAddComponent {}

