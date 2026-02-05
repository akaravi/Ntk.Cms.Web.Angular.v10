import { Component } from "@angular/core";
import { BlogContentListComponent } from "./list.component";

@Component({
  selector: "app-blog-content-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class BlogContentListMobileComponent extends BlogContentListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
