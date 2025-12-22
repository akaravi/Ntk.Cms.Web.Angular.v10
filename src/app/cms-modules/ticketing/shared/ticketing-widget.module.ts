import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TicketingTaskService } from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { TicketingTaskWidgetComponent } from "../task/widget/widget.component";

@NgModule({
  declarations: [TicketingTaskWidgetComponent],
  exports: [TicketingTaskWidgetComponent],
  imports: [CommonModule, SharedModule],
  providers: [TicketingTaskService],
})
export class TicketingWidgetModule {}
