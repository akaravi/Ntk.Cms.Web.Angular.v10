import { Component } from "@angular/core";
import { WebDesignerMainMenuListComponent } from "./list.component";

@Component({
  selector: "app-webdesigner-menu-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class WebDesignerMainMenuListMobileComponent extends WebDesignerMainMenuListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
