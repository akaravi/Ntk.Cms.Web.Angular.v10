import { Component } from "@angular/core";
import { CoreSiteCategoryListComponent } from "./list.component";

@Component({
  selector: "app-core-sitecategory-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreSiteCategoryListMobileComponent extends CoreSiteCategoryListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
