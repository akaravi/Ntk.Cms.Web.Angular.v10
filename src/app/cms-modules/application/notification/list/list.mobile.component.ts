import { Component } from "@angular/core";
import { ApplicationLogNotificationListComponent } from "./list.component";

@Component({
  selector: "app-application-notification-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class ApplicationLogNotificationListMobileComponent extends ApplicationLogNotificationListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
