import { Component, HostBinding, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
  standalone: false,
})
export class TestComponent implements OnInit {
  @HostBinding("class") class = "d-flex flex-column flex-root";
  env = environment;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  routeToDashboard() {
    this.router.navigate(["dashboard"]);
  }
}
