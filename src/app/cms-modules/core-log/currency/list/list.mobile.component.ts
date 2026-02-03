import { Component } from "@angular/core";
import { CoreLogCurrencyListComponent } from "./list.component";

@Component({
  selector: "app-core-log-currency-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreLogCurrencyListMobileComponent extends CoreLogCurrencyListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
