import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NewsContentService } from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { NewsContentWidgetComponent } from "../content/widget/widget.component";

@NgModule({
  declarations: [NewsContentWidgetComponent],
  exports: [NewsContentWidgetComponent],
  imports: [CommonModule, SharedModule],
  providers: [NewsContentService],
})
export class NewsWidgetModule {}
