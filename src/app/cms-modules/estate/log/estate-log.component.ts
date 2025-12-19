import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-estate-log",
  template: "<router-outlet></router-outlet>",
  standalone: false,
})
export class EstateLogComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor() {}

  ngOnInit(): void {}
}
