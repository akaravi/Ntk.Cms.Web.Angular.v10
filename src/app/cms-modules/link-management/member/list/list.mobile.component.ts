import { Component } from "@angular/core";
import { LinkManagementMemberListComponent } from "./list.component";

@Component({
  selector: "app-linkmanagement-member-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class LinkManagementMemberListMobileComponent extends LinkManagementMemberListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
