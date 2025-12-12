import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-transaction-assistant-config",
  template: "<router-outlet></router-outlet>",
  standalone: false,
})
export class TransactionAssistantConfigComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor() {}
  ngOnInit(): void {}
}

