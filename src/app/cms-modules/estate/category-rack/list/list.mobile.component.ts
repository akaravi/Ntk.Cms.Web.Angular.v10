import { Component } from "@angular/core";
import { EstateCategoryRackListComponent } from "./list.component";

@Component({
  selector: "app-estate-category-rack-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstateCategoryRackListMobileComponent extends EstateCategoryRackListComponent {
  // این کامپوننت UI خاصی دارد و نمی‌تواند از app-cms-html-list-mobile استفاده کند
  // اما TS را ساده‌سازی کردیم تا از EstateCategoryRackListComponent ارث‌بری کند





  onActionClickRackDoor(row: any): void {
    super['onActionClickRackDoor']?.(row);
  }

}
