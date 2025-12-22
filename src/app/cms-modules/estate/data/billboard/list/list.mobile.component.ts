import { Component } from "@angular/core";
import { EstateBillboardListComponent } from "./list.component";

@Component({
  selector: "app-estate-billboard-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstateBillboardListMobileComponent extends EstateBillboardListComponent {}
