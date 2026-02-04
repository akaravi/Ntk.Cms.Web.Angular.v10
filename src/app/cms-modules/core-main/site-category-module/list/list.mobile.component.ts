import { Component } from "@angular/core";
import { CoreSiteCategoryCmsModuleListComponent } from "./list.component";

@Component({
  selector: "app-core-sitecategorycmsmodule-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreSiteCategoryCmsModuleListMobileComponent extends CoreSiteCategoryCmsModuleListComponent {
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
