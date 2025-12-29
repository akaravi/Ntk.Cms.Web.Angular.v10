import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DatapickerHeaderComponent } from "src/app/shared/datapicker-header/datapicker-header.component";

@Component({
  selector: "app-input-date",
  templateUrl: "./date.component.html",
  styleUrls: ["./date.component.scss"],
  standalone: false,
})
export class DateComponent implements OnInit {
  constructor() {}
  @Input()
  set model(value: Date) {
    this.privateModelDate = value;
  }
  @Output() modelChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Input() optionRequired = false;
  @Input() optionDisabled = false;
  private privateModelDate: Date;
  datapickerHeader = DatapickerHeaderComponent;
  get modelDate(): Date {
    return this.privateModelDate;
  }
  set modelDate(value: Date) {
    this.privateModelDate = value;
    this.modelChange.emit(value);
  }
  ngOnInit(): void {}
}
