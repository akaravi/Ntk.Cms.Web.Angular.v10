import { Component } from "@angular/core";
import { EstatePropertyTypeUsageListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-type-usage-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstatePropertyTypeUsageListMobileComponent extends EstatePropertyTypeUsageListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
