import { Component } from "@angular/core";
import { EstateAccountAgencyAdsListComponent } from "./list.component";

@Component({
  selector: "app-estate-account-agency-ads-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstateAccountAgencyAdsListMobileComponent extends EstateAccountAgencyAdsListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
