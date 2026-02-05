import { Component } from "@angular/core";
import { LinkManagementTargetListComponent } from "./list.component";

@Component({
  selector: "app-linkmanagement-target-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class LinkManagementTargetListMobileComponent extends LinkManagementTargetListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
