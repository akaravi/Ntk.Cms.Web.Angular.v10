import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-estate-main",
  template: "<router-outlet></router-outlet>",
  standalone: false,
})
export class EstateMainComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor() {}

  ngOnInit(): void {}
}
