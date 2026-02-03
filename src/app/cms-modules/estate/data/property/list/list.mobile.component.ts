import { Component } from "@angular/core";
import { EstatePropertyListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstatePropertyListMobileComponent extends EstatePropertyListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
