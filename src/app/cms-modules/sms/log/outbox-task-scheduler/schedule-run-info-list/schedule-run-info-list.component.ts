import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SmsLogOutBoxScheduleRunInfoModel } from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";

@Component({
  selector: "app-schedule-run-info-list",
  templateUrl: "./schedule-run-info-list.component.html",
  standalone: false,
})
export class ScheduleRunInfoListComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ScheduleRunInfoListComponent>,
    public publicHelper: PublicHelper,
  ) {
    if (data) {
      this.scheduleRunInfos = data.scheduleRunInfos || [];
      this.taskSchedulerId = data.taskSchedulerId || "";
    }
  }

  scheduleRunInfos: SmsLogOutBoxScheduleRunInfoModel[] = [];
  taskSchedulerId: string = "";

  ngOnInit(): void {}

  onClose(): void {
    this.dialogRef.close();
  }
}
