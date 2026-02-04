import { Component } from "@angular/core";
import { CoreModuleSaleInvoiceListComponent } from "./list.component";

@Component({
  selector: "app-core-modulesaleinvoice-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreModuleSaleInvoiceListMobileComponent extends CoreModuleSaleInvoiceListComponent {
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
