import { Component } from "@angular/core";
import { EstateCategoryZoneListComponent } from "./list.component";

@Component({
  selector: "app-estate-category-zone-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstateCategoryZoneListMobileComponent extends EstateCategoryZoneListComponent {}
