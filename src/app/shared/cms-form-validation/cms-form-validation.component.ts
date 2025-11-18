import { Component, Input, OnInit } from "@angular/core";
import { FormInfoModel, ValidationStatusEnum } from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";

@Component({
  selector: "app-cms-form-validation",
  templateUrl: "./cms-form-validation.component.html",
  standalone: false,
})
export class CmsFormValidationComponent implements OnInit {
  static nextId = 0;
  id = ++CmsFormValidationComponent.nextId;
  constructor(public publicHelper: PublicHelper) {}
  @Input() formInfo: FormInfoModel = new FormInfoModel();
  ValidationStatusEnum = ValidationStatusEnum;
  ngOnInit(): void {}
}
