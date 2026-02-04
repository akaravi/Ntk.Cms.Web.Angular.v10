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
  onActionCopied(): void {
    super['onActionCopied']?.();
  }

  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }

  onActionButtonNewRow(): void {
    super['onActionButtonNewRow']?.();
  }

}
