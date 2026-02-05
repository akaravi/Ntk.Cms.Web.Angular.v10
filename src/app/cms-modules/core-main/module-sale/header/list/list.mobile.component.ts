import { Component } from "@angular/core";
import { CoreModuleSaleHeaderListComponent } from "./list.component";

@Component({
  selector: "app-core-modulesaleheader-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreModuleSaleHeaderListMobileComponent extends CoreModuleSaleHeaderListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
