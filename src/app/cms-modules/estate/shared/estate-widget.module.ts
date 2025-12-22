import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  EstateCustomerOrderService,
  EstatePropertyHistoryService,
  EstatePropertyService,
} from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { EstateCustomerOrderWidgetComponent } from "../customer-order/widget/widget.component";
import { EstatePropertyHistoryWidgetComponent } from "../log/property-history/widget/widget.component";
import { EstatePropertyWidgetComponent } from "../data/property/widget/widget.component";

@NgModule({
  declarations: [
    EstatePropertyWidgetComponent,
    EstateCustomerOrderWidgetComponent,
    EstatePropertyHistoryWidgetComponent,
  ],
  exports: [
    EstatePropertyWidgetComponent,
    EstateCustomerOrderWidgetComponent,
    EstatePropertyHistoryWidgetComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [
    EstatePropertyService,
    EstateCustomerOrderService,
    EstatePropertyHistoryService,
  ],
})
export class EstateWidgetModule {}
