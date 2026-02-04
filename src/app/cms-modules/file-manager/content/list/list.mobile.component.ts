import { Component } from "@angular/core";
import { FileContentListComponent } from "./list.component";

@Component({
  selector: "app-file-content-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class FileContentListMobileComponent extends FileContentListComponent {
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
