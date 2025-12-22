import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BiographyContentService } from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { BiographyContentWidgetComponent } from "../content/widget/widget.component";

@NgModule({
  declarations: [BiographyContentWidgetComponent],
  exports: [BiographyContentWidgetComponent],
  imports: [CommonModule, SharedModule],
  providers: [BiographyContentService],
})
export class BiographyWidgetModule {}
