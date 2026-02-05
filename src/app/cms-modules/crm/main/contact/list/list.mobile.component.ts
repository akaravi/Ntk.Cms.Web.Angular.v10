import { Component } from "@angular/core";
import { CrmContactListComponent } from "./list.component";

@Component({
  selector: "app-crm-contact-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CrmContactListMobileComponent extends CrmContactListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
