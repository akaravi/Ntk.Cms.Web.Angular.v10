import { Component } from "@angular/core";
import { CoreTokenUserBadLoginListComponent } from "./list.component";

@Component({
  selector: "app-coretoken-user-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreTokenUserBadLoginListMobileComponent extends CoreTokenUserBadLoginListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
