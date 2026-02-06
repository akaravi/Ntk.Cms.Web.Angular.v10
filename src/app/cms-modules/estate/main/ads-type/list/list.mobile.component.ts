import { Component } from "@angular/core";
import { EstateAdsTypeListComponent } from "./list.component";

@Component({
  selector: "app-estate-ads-type-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstateAdsTypeListMobileComponent extends EstateAdsTypeListComponent {}
