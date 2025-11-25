import { Component, OnInit } from "@angular/core";
import { ROUTE_DASHBOARD } from "src/app/core/models/constModel";

@Component({
  selector: "app-testTwo",
  templateUrl: "./testTwo.component.html",
  styleUrls: ["./testTwo.component.scss"],
  standalone: true,
})
export class TestTwoComponent implements OnInit {
  ROUTE_DASHBOARD = ROUTE_DASHBOARD;
  constructor() {}

  ngOnInit(): void {}
}
