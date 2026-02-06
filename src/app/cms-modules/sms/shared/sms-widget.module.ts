import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  SmsLogInBoxService,
  SmsLogOutBoxQueueService,
  SmsLogOutBoxService,
  SmsLogOutBoxTaskSchedulerService,
} from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { SmsLogInBoxWidgetComponent } from "../log/inbox/widget/widget.component";
import { SmsLogInBoxWidgetMobileComponent } from "../log/inbox/widget/widget.mobile.component";
import { SmsLogOutBoxQueueWidgetComponent } from "../log/outbox-queue/widget/widget.component";
import { SmsLogOutBoxQueueWidgetMobileComponent } from "../log/outbox-queue/widget/widget.mobile.component";
import { SmsLogOutBoxTaskSchedulerWidgetComponent } from "../log/outbox-task-scheduler/widget/widget.component";
import { SmsLogOutBoxTaskSchedulerWidgetMobileComponent } from "../log/outbox-task-scheduler/widget/widget.mobile.component";
import { SmsLogOutBoxWidgetComponent } from "../log/outbox/widget/widget.component";
import { SmsLogOutBoxWidgetMobileComponent } from "../log/outbox/widget/widget.mobile.component";
import { SmsMessageTypeEnumSelectionlistComponent } from "./sms-message-type-enum/selectionlist/selectionlist.component";
import { SmsMessageTypeEnumSelectorComponent } from "./sms-message-type-enum/selector/selector.component";
import { SmsOutBoxTypeEnumSelectionlistComponent } from "./sms-out-box-type-enum/selectionlist/selectionlist.component";
import { SmsOutBoxTypeEnumSelectorComponent } from "./sms-out-box-type-enum/selector/selector.component";

@NgModule({
  declarations: [
    SmsLogInBoxWidgetComponent,
    SmsLogInBoxWidgetMobileComponent,
    SmsLogOutBoxWidgetComponent,
    SmsLogOutBoxWidgetMobileComponent,
    SmsLogOutBoxQueueWidgetComponent,
    SmsLogOutBoxQueueWidgetMobileComponent,
    SmsLogOutBoxTaskSchedulerWidgetComponent,
    SmsLogOutBoxTaskSchedulerWidgetMobileComponent,
    SmsMessageTypeEnumSelectionlistComponent,
    SmsMessageTypeEnumSelectorComponent,
    SmsOutBoxTypeEnumSelectionlistComponent,
    SmsOutBoxTypeEnumSelectorComponent,
  ],
  exports: [
    SmsLogInBoxWidgetComponent,
    SmsLogInBoxWidgetMobileComponent,
    SmsLogOutBoxWidgetComponent,
    SmsLogOutBoxWidgetMobileComponent,
    SmsLogOutBoxQueueWidgetComponent,
    SmsLogOutBoxQueueWidgetMobileComponent,
    SmsLogOutBoxTaskSchedulerWidgetComponent,
    SmsLogOutBoxTaskSchedulerWidgetMobileComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [
    SmsLogInBoxService,
    SmsLogOutBoxService,
    SmsLogOutBoxQueueService,
    SmsLogOutBoxTaskSchedulerService,
  ],
})
export class SmsWidgetModule {}
