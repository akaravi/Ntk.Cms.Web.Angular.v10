import { Component } from "@angular/core";
import { EstatePropertyListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstatePropertyListMobileComponent extends EstatePropertyListComponent {}
