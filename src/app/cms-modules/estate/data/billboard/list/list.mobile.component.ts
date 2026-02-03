import { Component } from "@angular/core";
import { EstateBillboardListComponent } from "./list.component";

@Component({
  selector: "app-estate-billboard-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstateBillboardListMobileComponent extends EstateBillboardListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
