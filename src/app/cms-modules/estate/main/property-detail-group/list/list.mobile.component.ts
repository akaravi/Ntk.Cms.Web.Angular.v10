import { Component } from "@angular/core";
import { EstatePropertyDetailGroupListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-detail-group-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstatePropertyDetailGroupListMobileComponent extends EstatePropertyDetailGroupListComponent {}
