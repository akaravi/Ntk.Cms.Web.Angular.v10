import { Component, Input, OnInit } from "@angular/core";
import { FormInfoModel, ValidationStatusEnum } from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";

@Component({
  selector: "app-cms-form-result-message",
  templateUrl: "./cms-form-result-message.component.html",
  standalone: false,
})
export class CmsFormResultMessageComponent implements OnInit {
  static nextId = 0;
  id = ++CmsFormResultMessageComponent.nextId;
  constructor(public publicHelper: PublicHelper) {}
  @Input() formInfo: FormInfoModel = new FormInfoModel();
  ValidationStatusEnum = ValidationStatusEnum;
  ngOnInit(): void {}
}
