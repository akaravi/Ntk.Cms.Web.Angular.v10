import { Component } from "@angular/core";
import { EstatePropertyTypeLanduseListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-type-landuse-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstatePropertyTypeLanduseListMobileComponent extends EstatePropertyTypeLanduseListComponent {}
