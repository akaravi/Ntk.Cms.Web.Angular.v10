import { Component } from "@angular/core";
import { EstatePropertyProjectListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-project-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstatePropertyProjectListMobileComponent extends EstatePropertyProjectListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
