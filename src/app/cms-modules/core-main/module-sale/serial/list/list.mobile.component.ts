import { Component } from "@angular/core";
import { CoreModuleSaleSerialListComponent } from "./list.component";

@Component({
  selector: "app-core-modulesaleserial-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreModuleSaleSerialListMobileComponent extends CoreModuleSaleSerialListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
