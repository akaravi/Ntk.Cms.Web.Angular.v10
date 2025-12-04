import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SmsApiSendResultModel, NumberReceverInfoModel, ErrorExceptionResult } from "ntk-cms-api";
import { FormInfoModel } from "src/app/core/models/formInfoModel";

@Component({
  selector: "app-sms-action-send-message-result",
  templateUrl: "./send-message-result.component.html",
  styleUrls: ["./send-message-result.component.scss"],
  standalone: false,
})
export class SmsActionSendMessageResultComponent {
  constructor(
    private dialogRef: MatDialogRef<SmsActionSendMessageResultComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {result: ErrorExceptionResult<SmsApiSendResultModel>, formInfo: FormInfoModel},

  ) {}
  get receivers(): NumberReceverInfoModel[] {
    return this.data?.result?.item?.toNumbers ?? [];
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
