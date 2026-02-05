import { Component } from "@angular/core";
import { CoreLogMemberListComponent } from "./list.component";

@Component({
  selector: "app-core-log-member-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreLogMemberListMobileComponent extends CoreLogMemberListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
