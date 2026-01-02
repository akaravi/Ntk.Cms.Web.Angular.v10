import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-data-provider-main",
  template: "<router-outlet></router-outlet>",
  standalone: false,
})
export class DataProviderMainComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor() {}

  ngOnInit(): void {}
}
