import { Component } from "@angular/core";
import { CoreLogSmsListComponent } from "./list.component";

@Component({
  selector: "app-core-log-sms-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreLogSmsListMobileComponent extends CoreLogSmsListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
