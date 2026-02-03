import { Component } from "@angular/core";
import { HyperShopContentListComponent } from "./list.component";

@Component({
  selector: "app-hypershop-content-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class HyperShopContentListMobileComponent extends HyperShopContentListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
