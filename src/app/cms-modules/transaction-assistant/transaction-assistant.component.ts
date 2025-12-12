import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-transaction-assistant",
  template: "<router-outlet></router-outlet>",
  standalone: false,
})
export class TransactionAssistantComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor() {}

  ngOnInit(): void {}
}

