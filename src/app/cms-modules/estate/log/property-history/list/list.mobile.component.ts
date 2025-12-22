import { Component } from "@angular/core";
import { EstatePropertyHistoryListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-history-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstatePropertyHistoryListMobileComponent extends EstatePropertyHistoryListComponent {}
