import { Component } from "@angular/core";
import { EstateActivityTypeListComponent } from "./list.component";

@Component({
  selector: "app-estate-activity-type-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstateActivityTypeListMobileComponent extends EstateActivityTypeListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
