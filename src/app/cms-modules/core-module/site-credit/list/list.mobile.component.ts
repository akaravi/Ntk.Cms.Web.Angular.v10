import { Component } from "@angular/core";
import { CoreModuleSiteCreditListComponent } from "./list.component";

@Component({
  selector: "app-coremodule-site-credit-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreModuleSiteCreditListMobileComponent extends CoreModuleSiteCreditListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
