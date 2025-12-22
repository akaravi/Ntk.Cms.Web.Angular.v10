import { Component } from "@angular/core";
import { EstatePropertyAdsListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-ads-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstatePropertyAdsListMobileComponent extends EstatePropertyAdsListComponent {}
