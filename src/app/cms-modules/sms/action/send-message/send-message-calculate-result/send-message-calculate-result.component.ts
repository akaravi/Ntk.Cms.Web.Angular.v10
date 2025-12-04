import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  ErrorExceptionResult,
  NumberReceverInfoModel,
  SmsApiSendOrderCalculateResultModel,
} from "ntk-cms-api";
import { FormInfoModel } from "src/app/core/models/formInfoModel";

@Component({
  selector: "app-sms-action-send-message-calculate-result",
  templateUrl: "./send-message-calculate-result.component.html",
  styleUrls: ["./send-message-calculate-result.component.scss"],
  standalone: false,
})
export class SmsActionSendMessageCalculateResultComponent {
  constructor(
    private dialogRef: MatDialogRef<SmsActionSendMessageCalculateResultComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {result: ErrorExceptionResult<SmsApiSendOrderCalculateResultModel>, formInfo: FormInfoModel},

  ) {}

  get receivers(): NumberReceverInfoModel[] {
    return this.data?.result?.item?.toNumbers ?? [];
  }
  formInfo: FormInfoModel = new FormInfoModel();
  onClose(): void {
    this.dialogRef.close();
  }
}
