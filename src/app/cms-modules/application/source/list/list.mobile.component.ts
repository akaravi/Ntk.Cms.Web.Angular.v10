import { Component } from "@angular/core";
import { ApplicationSourceListComponent } from "./list.component";

@Component({
  selector: "app-application-source-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class ApplicationSourceListMobileComponent extends ApplicationSourceListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
