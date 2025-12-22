import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ArticleContentService } from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { ArticleContentWidgetComponent } from "../content/widget/widget.component";

@NgModule({
  declarations: [ArticleContentWidgetComponent],
  exports: [ArticleContentWidgetComponent],
  imports: [CommonModule, SharedModule],
  providers: [ArticleContentService],
})
export class ArticleWidgetModule {}
