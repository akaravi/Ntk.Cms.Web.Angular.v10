import { Component } from "@angular/core";
import { CoreModuleSaleItemListComponent } from "./list.component";

@Component({
  selector: "app-core-modulesaleitem-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreModuleSaleItemListMobileComponent extends CoreModuleSaleItemListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
