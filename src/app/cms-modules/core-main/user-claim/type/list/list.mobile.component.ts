import { Component } from "@angular/core";
import { CoreUserClaimTypeListComponent } from "./list.component";

@Component({
  selector: "app-core-userclaimtype-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreUserClaimTypeListMobileComponent extends CoreUserClaimTypeListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
