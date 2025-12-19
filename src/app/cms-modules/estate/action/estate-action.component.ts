import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-estate-action",
  template: "<router-outlet></router-outlet>",
  standalone: false,
})
export class EstateActionComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor() {}

  ngOnInit(): void {}
}
