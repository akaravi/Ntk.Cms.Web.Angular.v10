import { Component } from "@angular/core";
import { ApplicationAppListComponent } from "./list.component";

@Component({
  selector: "app-application-app-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class ApplicationAppListMobileComponent extends ApplicationAppListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
