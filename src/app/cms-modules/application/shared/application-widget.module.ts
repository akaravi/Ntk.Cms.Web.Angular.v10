import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  ApplicationAppService,
  ApplicationMemberInfoService,
} from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { ApplicationAppWidgetComponent } from "../content/widget/widget.component";
import { ApplicationMemberInfoWidgetComponent } from "../memberInfo/widget/widget.component";

@NgModule({
  declarations: [
    ApplicationAppWidgetComponent,
    ApplicationMemberInfoWidgetComponent,
  ],
  exports: [
    ApplicationAppWidgetComponent,
    ApplicationMemberInfoWidgetComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [ApplicationAppService, ApplicationMemberInfoService],
})
export class ApplicationWidgetModule {}
