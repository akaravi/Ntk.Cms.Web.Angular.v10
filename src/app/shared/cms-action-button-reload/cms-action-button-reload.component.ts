import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PublicHelper } from "src/app/core/helpers/publicHelper";

@Component({
  selector: "app-cms-action-button-reload",
  templateUrl: "./cms-action-button-reload.component.html",
  standalone: false,
})
export class CmsActionButtonReloadComponent implements OnInit {
  static nextId = 0;
  id = ++CmsActionButtonReloadComponent.nextId;
  constructor(public publicHelper: PublicHelper) {}
  @Input() optionBottomVisible = true;

  @Output() optionReload = new EventEmitter<void>();

  ngOnInit(): void {}
  onActionButtonReloadClick(): void {
    this.optionReload.emit();
  }
}
