import { Component } from "@angular/core";
import { SmsMainClientApplicationEditComponent } from "./edit.component";

@Component({
  selector: "app-sms-client-application-edit-mobile",
  templateUrl: "./edit.mobile.component.html",
  styleUrls: ["./edit.mobile.component.scss"],
  standalone: false,
})
export class SmsMainClientApplicationEditMobileComponent extends SmsMainClientApplicationEditComponent {}

