import { Component } from "@angular/core";
import { EstateActivityTypeListComponent } from "./list.component";

@Component({
  selector: "app-estate-activity-type-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstateActivityTypeListMobileComponent extends EstateActivityTypeListComponent {}
