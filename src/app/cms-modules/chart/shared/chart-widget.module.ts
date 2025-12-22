import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChartContentService } from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { ChartContentWidgetComponent } from "../content/widget/widget.component";

@NgModule({
  declarations: [ChartContentWidgetComponent],
  exports: [ChartContentWidgetComponent],
  imports: [CommonModule, SharedModule],
  providers: [ChartContentService],
})
export class ChartWidgetModule {}
