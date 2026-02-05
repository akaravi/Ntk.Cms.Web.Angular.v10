import { Component } from "@angular/core";
import { EstatePropertyHistoryListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-history-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstatePropertyHistoryListMobileComponent extends EstatePropertyHistoryListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
