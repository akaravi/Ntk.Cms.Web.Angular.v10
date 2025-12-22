import { Component } from "@angular/core";
import { EstatePropertyDetailListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-detail-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstatePropertyDetailListMobileComponent extends EstatePropertyDetailListComponent {}
