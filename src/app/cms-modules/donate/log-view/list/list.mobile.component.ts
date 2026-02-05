import { Component } from "@angular/core";
import { DonateLogViewListComponent } from "./list.component";

@Component({
  selector: "app-donate-log-view-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class DonateLogViewListMobileComponent extends DonateLogViewListComponent {

  onActionButtonEditRow(model: any): void {
    super['onActionButtonEditRow']?.(model);
  }
  onActionButtonDeleteRow(model: any): void {
    super['onActionButtonDeleteRow']?.(model);
  }





}
