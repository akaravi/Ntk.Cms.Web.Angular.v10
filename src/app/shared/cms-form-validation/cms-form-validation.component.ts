import { Component, Input, OnInit } from "@angular/core";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { FormInfoModel } from "../../core/models/formInfoModel";
import { FormValidationStatusEnum } from "../../core/models/formValidationStatusEnum";

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
  FormValidationStatusEnum = FormValidationStatusEnum;
  ngOnInit(): void {}
}
