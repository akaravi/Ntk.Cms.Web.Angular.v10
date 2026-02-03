import { Component } from "@angular/core";
import { WebDesignerLogMemberInfoListComponent } from "./list.component";

@Component({
  selector: "app-webdesigner-logmemberinfo-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class WebDesignerLogMemberInfoListMobileComponent extends WebDesignerLogMemberInfoListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
