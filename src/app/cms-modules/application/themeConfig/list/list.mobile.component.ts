import { Component } from "@angular/core";
import { ApplicationThemeConfigListComponent } from "./list.component";

@Component({
  selector: "app-application-theme-config-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class ApplicationThemeConfigListMobileComponent extends ApplicationThemeConfigListComponent {
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
