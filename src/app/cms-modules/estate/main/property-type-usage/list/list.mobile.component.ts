import { Component } from "@angular/core";
import { EstatePropertyTypeUsageListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-type-usage-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstatePropertyTypeUsageListMobileComponent extends EstatePropertyTypeUsageListComponent {}
