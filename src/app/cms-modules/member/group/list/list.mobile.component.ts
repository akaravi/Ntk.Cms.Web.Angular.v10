import { Component } from "@angular/core";
import { MemberGroupListComponent } from "./list.component";

@Component({
  selector: "app-member-group-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class MemberGroupListMobileComponent extends MemberGroupListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
