import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-data-provider-transaction",
  template: "<router-outlet></router-outlet>",
  standalone: false,
})
export class DataProviderTransactionComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor() {}

  ngOnInit(): void {}
}
