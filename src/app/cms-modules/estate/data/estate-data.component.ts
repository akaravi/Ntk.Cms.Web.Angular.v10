import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-estate-data",
  template: "<router-outlet></router-outlet>",
  standalone: false,
})
export class EstateDataComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor() {}

  ngOnInit(): void {}
}
