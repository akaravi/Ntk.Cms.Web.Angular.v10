import { Component } from "@angular/core";
import { CoreUserClaimGroupDetailListComponent } from "./list.component";

@Component({
  selector: "app-core-userclaimgroupdetail-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreUserClaimGroupDetailListMobileComponent extends CoreUserClaimGroupDetailListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
