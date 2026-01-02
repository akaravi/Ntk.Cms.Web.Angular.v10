import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-data-provider-log",
  template: "<router-outlet></router-outlet>",
  standalone: false,
})
export class DataProviderLogComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor() {}

  ngOnInit(): void {}
}
