import { Component } from "@angular/core";
import { CoreCpMainMenuListComponent } from "./list.component";

@Component({
  selector: "app-core-user-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreCpMainMenuListMobileComponent extends CoreCpMainMenuListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
