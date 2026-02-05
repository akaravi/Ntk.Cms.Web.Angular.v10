import { Component } from "@angular/core";
import { SmsMainApiPathPublicConfigListComponent } from "./list.component";

@Component({
  selector: "app-sms-publicconfig-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class SmsMainApiPathPublicConfigListMobileComponent extends SmsMainApiPathPublicConfigListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
