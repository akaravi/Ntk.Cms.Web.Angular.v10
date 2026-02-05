import { Component } from "@angular/core";
import { EstatePropertyAdsModel } from "ntk-cms-api";
import { EstatePropertyAdsListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-ads-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstatePropertyAdsListMobileComponent extends EstatePropertyAdsListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }

  getLinkMainImageIdSrc(row: EstatePropertyAdsModel): string {
    return (row as any)['linkMainImageIdSrc'] || '';
  }


  onActionButtonViewRow(model: any): void {
    super['onActionButtonViewRow']?.(model);
  }



}
