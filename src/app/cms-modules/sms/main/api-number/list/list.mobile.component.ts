import { Component } from "@angular/core";
import { SmsMainApiNumberListComponent } from "./list.component";

@Component({
  selector: "app-sms-api-number-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class SmsMainApiNumberListMobileComponent extends SmsMainApiNumberListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
