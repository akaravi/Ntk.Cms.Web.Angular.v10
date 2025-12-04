import { Component, Input, OnInit } from "@angular/core";

import { PublicHelper } from "src/app/core/helpers/publicHelper";

import { FormInfoModel } from "../../core/models/formInfoModel";
import { FormValidationStatusEnum } from "src/app/core/models/formValidationStatusEnum";

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
  ValidationStatusEnum = FormValidationStatusEnum;
  ngOnInit(): void {}
}
