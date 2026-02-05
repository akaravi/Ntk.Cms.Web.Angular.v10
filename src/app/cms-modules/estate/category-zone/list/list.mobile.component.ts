import { Component } from "@angular/core";
import { EstateCategoryZoneListComponent } from "./list.component";

@Component({
  selector: "app-estate-category-zone-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstateCategoryZoneListMobileComponent extends EstateCategoryZoneListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
