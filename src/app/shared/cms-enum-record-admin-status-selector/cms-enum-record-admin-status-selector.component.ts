import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  ErrorExceptionResult,
  InfoEnumModel,
  RecordAdminStatusEnum,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";

@Component({
  selector: "app-cms-enum-record-admin-status-selector",
  templateUrl: "./cms-enum-record-admin-status-selector.component.html",
  standalone: false,
})
export class CmsEnumRecordAdminStatusSelectorComponent implements OnInit {
  static nextId = 0;
  id = ++CmsEnumRecordAdminStatusSelectorComponent.nextId;
  constructor(
    public translate: TranslateService,
    public publicHelper: PublicHelper,
  ) {}
  @Input()
  set model(value: RecordAdminStatusEnum) {
    this.privateModelDate = value;
  }
  @Output() modelChange: EventEmitter<RecordAdminStatusEnum> =
    new EventEmitter<RecordAdminStatusEnum>();
  dataModelResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  @Input() optionDisabled = false;
  @Input() optionSelectFirstItem = false;
  @Input() optionLabel = "";
  @Input() optionRequired = false;

  ngOnInit(): void {
    this.loadOptions();
  }
  async loadOptions(): Promise<void> {
    this.dataModelResult = await this.publicHelper.getEnumRecordAdminStatus();
  }

  private privateModelDate: RecordAdminStatusEnum;
  get modelDate(): RecordAdminStatusEnum {
    return this.privateModelDate;
  }
  set modelDate(value: RecordAdminStatusEnum) {
    this.privateModelDate = value;
    this.modelChange.emit(value);
  }
}
