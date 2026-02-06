import { Component } from "@angular/core";
import { EstateAccountAgencyAdsListComponent } from "./list.component";

@Component({
  selector: "app-estate-account-agency-ads-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstateAccountAgencyAdsListMobileComponent extends EstateAccountAgencyAdsListComponent {}
