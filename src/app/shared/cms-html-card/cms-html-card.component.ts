import { FormInfoModel } from "../../core/models/formInfoModel";
import { Component, Input, OnInit } from "@angular/core";
@Component({
  selector: "app-cms-html-card",
  templateUrl: "./cms-html-card.component.html",
  standalone: false,
})
export class CmsHtmlCardComponent implements OnInit {
  static nextId = 0;
  id = ++CmsHtmlCardComponent.nextId;
  @Input()
  public set optionFormInfo(v: FormInfoModel) {
    this.formInfo = v;
  }
  formInfo = new FormInfoModel();
  constructor() {}
  ngOnInit(): void {}
}
