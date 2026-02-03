import { Component } from "@angular/core";
import { NewsCategoryListComponent } from "./list.component";

@Component({
  selector: "app-news-category-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class NewsCategoryListMobileComponent extends NewsCategoryListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
