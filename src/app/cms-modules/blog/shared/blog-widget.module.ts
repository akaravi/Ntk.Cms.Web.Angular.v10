import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BlogContentService } from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { BlogContentWidgetComponent } from "../content/widget/widget.component";

@NgModule({
  declarations: [BlogContentWidgetComponent],
  exports: [BlogContentWidgetComponent],
  imports: [CommonModule, SharedModule],
  providers: [BlogContentService],
})
export class BlogWidgetModule {}
