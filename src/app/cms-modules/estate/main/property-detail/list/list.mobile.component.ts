import { Component } from "@angular/core";
import { EstatePropertyDetailListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-detail-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstatePropertyDetailListMobileComponent extends EstatePropertyDetailListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
