import { Component } from "@angular/core";
import { CoreCurrencyListComponent } from "./list.component";

@Component({
  selector: "app-core-currency-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreCurrencyListMobileComponent extends CoreCurrencyListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
