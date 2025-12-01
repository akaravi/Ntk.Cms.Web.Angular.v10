import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  SmsApiSendOrderCalculateResultModel,
  NumberReceverInfoModel,
  ErrorExceptionResult,
} from "ntk-cms-api";

@Component({
  selector: "app-sms-action-send-message-calculate-result",
  templateUrl: "./send-message-calculate-result.component.html",
  styleUrls: ["./send-message-calculate-result.component.scss"],
  standalone: false,
})
export class SmsActionSendMessageCalculateResultComponent {
  constructor(
    private dialogRef: MatDialogRef<SmsActionSendMessageCalculateResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorExceptionResult<SmsApiSendOrderCalculateResultModel>,
  ) {}

  get receivers(): NumberReceverInfoModel[] {
    return this.data?.item?.toNumbers ?? [];
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
