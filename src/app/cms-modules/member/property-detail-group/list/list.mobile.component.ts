import { Component } from "@angular/core";
import { MemberPropertyDetailGroupListComponent } from "./list.component";

@Component({
  selector: "app-member-propertydetailgroup-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class MemberPropertyDetailGroupListMobileComponent extends MemberPropertyDetailGroupListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
