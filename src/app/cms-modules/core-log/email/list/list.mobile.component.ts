import { Component } from "@angular/core";
import { CoreLogEmailListComponent } from "./list.component";

@Component({
  selector: "app-core-log-email-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreLogEmailListMobileComponent extends CoreLogEmailListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
