import { Component } from "@angular/core";
import { ContactContentListComponent } from "./list.component";

@Component({
  selector: "app-contact-content-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class ContactContentListMobileComponent extends ContactContentListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
