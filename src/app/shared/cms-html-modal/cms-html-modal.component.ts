import { FormInfoModel } from "../../core/models/formInfoModel";
import { Component, Input, OnInit } from "@angular/core";
@Component({
  selector: "app-cms-html-modal",
  templateUrl: "./cms-html-modal.component.html",
  standalone: false,
})
export class CmsHtmlModalComponent implements OnInit {
  static nextId = 0;
  id = ++CmsHtmlModalComponent.nextId;
  @Input()
  public set optionFormInfo(v: FormInfoModel) {
    this.formInfo = v;
  }
  formInfo = new FormInfoModel();

  constructor() {}
  ngOnInit(): void {}
}
