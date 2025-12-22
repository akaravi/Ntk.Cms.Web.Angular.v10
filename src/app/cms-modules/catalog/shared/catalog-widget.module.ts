import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CatalogContentService } from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { CatalogContentWidgetComponent } from "../content/widget/widget.component";

@NgModule({
  declarations: [CatalogContentWidgetComponent],
  exports: [CatalogContentWidgetComponent],
  imports: [CommonModule, SharedModule],
  providers: [CatalogContentService],
})
export class CatalogWidgetModule {}
