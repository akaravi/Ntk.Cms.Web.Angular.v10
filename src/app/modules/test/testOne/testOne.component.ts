import { Component, OnInit } from "@angular/core";
import { ROUTE_DASHBOARD } from "src/app/core/models/constModel";

@Component({
  selector: "app-testOne",
  templateUrl: "./testOne.component.html",
  styleUrls: ["./testOne.component.scss"],
  standalone: true,
})
export class TestOneComponent implements OnInit {
  ROUTE_DASHBOARD = ROUTE_DASHBOARD;
  constructor() {}

  ngOnInit(): void {}
}
