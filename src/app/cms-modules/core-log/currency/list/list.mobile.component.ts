import { Component } from "@angular/core";
import { CoreLogCurrencyListComponent } from "./list.component";

@Component({
  selector: "app-core-log-currency-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreLogCurrencyListMobileComponent extends CoreLogCurrencyListComponent {






  onActionButtonEditRow(model: any): void {
    super['onActionButtonEditRow']?.(model);
  }

}
