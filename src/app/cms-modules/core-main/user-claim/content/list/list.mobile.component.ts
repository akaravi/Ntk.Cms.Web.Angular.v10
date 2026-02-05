import { Component } from "@angular/core";
import { CoreUserClaimContentListComponent } from "./list.component";

@Component({
  selector: "app-core-userclaimcontent-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreUserClaimContentListMobileComponent extends CoreUserClaimContentListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
