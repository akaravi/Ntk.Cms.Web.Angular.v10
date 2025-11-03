import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-linkmanagement-config",
  template: "<router-outlet></router-outlet>",
  standalone: false,
})
export class LinkManagementConfigComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor() {}

  ngOnInit(): void {}
}
