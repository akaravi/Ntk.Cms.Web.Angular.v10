import { Component } from "@angular/core";
import { CoreModuleSaleInvoiceDetailListComponent } from "./list.component";

@Component({
  selector: "app-core-modulesaleinvoicedetail-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreModuleSaleInvoiceDetailListMobileComponent extends CoreModuleSaleInvoiceDetailListComponent {
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
