import { Component } from "@angular/core";
import { MemberPropertyAliasListComponent } from "./list.component";

@Component({
  selector: "app-member-propertyalias-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class MemberPropertyAliasListMobileComponent extends MemberPropertyAliasListComponent {
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
