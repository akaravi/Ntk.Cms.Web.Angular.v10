import { Component } from "@angular/core";
import { CoreLogTokenMicroServiceListComponent } from "./list.component";

@Component({
  selector: "app-coretoken-microservicelog-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreLogTokenMicroServiceListMobileComponent extends CoreLogTokenMicroServiceListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
