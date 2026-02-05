import { Component } from "@angular/core";
import { CoreGuideListComponent } from "./list.component";

@Component({
  selector: "app-core-guide-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreGuideListMobileComponent extends CoreGuideListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
