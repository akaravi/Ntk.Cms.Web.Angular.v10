import { Component } from "@angular/core";
import { CoreModuleSaleHeaderGroupListComponent } from "./list.component";

@Component({
  selector: "app-core-modulesaleheadergroup-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreModuleSaleHeaderGroupListMobileComponent extends CoreModuleSaleHeaderGroupListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
