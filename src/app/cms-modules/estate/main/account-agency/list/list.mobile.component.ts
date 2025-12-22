import { Component } from "@angular/core";
import { EstateAccountAgencyListComponent } from "./list.component";

@Component({
  selector: "app-estate-account-agency-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstateAccountAgencyListMobileComponent extends EstateAccountAgencyListComponent {}
