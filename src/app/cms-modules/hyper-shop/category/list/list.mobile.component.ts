import { Component } from "@angular/core";
import { HyperShopCategoryListComponent } from "./list.component";

@Component({
  selector: "app-hypershop-category-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class HyperShopCategoryListMobileComponent extends HyperShopCategoryListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
