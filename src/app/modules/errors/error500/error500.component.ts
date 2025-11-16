import { Component, OnInit } from "@angular/core";
import { ROUTE_DASHBOARD } from "src/app/core/models/constModel";

@Component({
  selector: "app-error500",
  templateUrl: "./error500.component.html",
  styleUrls: ["./error500.component.scss"],
  standalone: false,
})
export class Error500Component implements OnInit {
  ROUTE_DASHBOARD = ROUTE_DASHBOARD;
  constructor() {}

  ngOnInit(): void {}
}
