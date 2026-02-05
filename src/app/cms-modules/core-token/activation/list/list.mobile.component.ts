import { Component } from "@angular/core";
import { CoreTokenActivationListComponent } from "./list.component";

@Component({
  selector: "app-coretoken-user-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreTokenActivationListMobileComponent extends CoreTokenActivationListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
