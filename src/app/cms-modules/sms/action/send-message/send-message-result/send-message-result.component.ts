import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  SmsApiSendResultModel,
  SmsSendMessageNumberInfoModel,
} from "ntk-cms-api";

@Component({
  selector: "app-sms-action-send-message-result",
  templateUrl: "./send-message-result.component.html",
  styleUrls: ["./send-message-result.component.scss"],
  standalone: false,
})
export class SmsActionSendMessageResultComponent {
  constructor(
    private dialogRef: MatDialogRef<SmsActionSendMessageResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SmsApiSendResultModel,
  ) {}

  get receivers(): SmsSendMessageNumberInfoModel[] {
    return this.data?.toNumbers ?? [];
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
