import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WebDesignerLogMemberInfoService } from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { WebDesignerLogMemberInfoWidgetComponent } from "../log-member-info/widget/widget.component";

@NgModule({
  declarations: [WebDesignerLogMemberInfoWidgetComponent],
  exports: [WebDesignerLogMemberInfoWidgetComponent],
  imports: [CommonModule, SharedModule],
  providers: [WebDesignerLogMemberInfoService],
})
export class WebDesignerWidgetModule {}
