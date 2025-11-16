import { Component, OnInit } from "@angular/core";
import { ROUTE_DASHBOARD } from "src/app/core/models/constModel";

@Component({
  selector: "app-error404",
  templateUrl: "./error404.component.html",
  styleUrls: ["./error404.component.scss"],
  standalone: false,
})
export class Error404Component implements OnInit {
  ROUTE_DASHBOARD = ROUTE_DASHBOARD;
  constructor() {}

  ngOnInit(): void {}
}
