import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormInfoModel } from "src/app/core/models/formInfoModel";

@Component({
  selector: "app-cms-html-form",
  templateUrl: "./cms-html-form.component.html",
  styleUrls: ["./cms-html-form.component.scss"],
  standalone: false,
})
export class CmsHtmlFormComponent implements OnInit {
  @Input() formInfo: FormInfoModel = new FormInfoModel();
  @Input() dataModel: any;
  @Input() fieldsInfo: any;
  @Input() optionLoadForm = true;
  @Input() optionShowFormTitle = true;
  @Input() optionShowFormSubmitButton = true;
  @Input() optionShowFormCancelButton = true;

  @Output() optionFormSubmit = new EventEmitter<void>();
  @Output() optionFormCancel = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.optionFormSubmit.emit();
  }

  onCancel(): void {
    this.optionFormCancel.emit();
  }
}
