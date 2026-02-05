import { Component } from "@angular/core";
import { ApplicationMemberInfoListComponent } from "./list.component";

@Component({
  selector: "app-application-memberinfo-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class ApplicationMemberInfoListMobileComponent extends ApplicationMemberInfoListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
