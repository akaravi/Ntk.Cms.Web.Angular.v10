import { Component } from "@angular/core";
import { SmsMainApiPathCompanyListComponent } from "./list.component";

@Component({
  selector: "app-sms-apipathcompany-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class SmsMainApiPathCompanyListMobileComponent extends SmsMainApiPathCompanyListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
