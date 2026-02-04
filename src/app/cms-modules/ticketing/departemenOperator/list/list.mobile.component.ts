import { Component, HostListener } from "@angular/core";
import { TicketingDepartemenOperatorListComponent } from "./list.component";

@Component({
  selector: "app-ticketing-departemenoperator-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TicketingDepartemenOperatorListMobileComponent extends TicketingDepartemenOperatorListComponent {
  actionMenuOpen: string | null = null;

  toggleActionMenu(rowId: string | number): void {
    const idStr = String(rowId);
    if (this.actionMenuOpen === idStr) {
      this.actionMenuOpen = null;
    } else {
      this.actionMenuOpen = idStr;
    }
  }

  closeActionMenu(): void {
    this.actionMenuOpen = null;
  }

  toString(value: string | number): string {
    return String(value);
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (
      !target.closest(".cms-m-action-menu") &&
      !target.closest(".cms-m-action-menu-dropdown")
    ) {
      this.closeActionMenu();
    }
  }

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
