import { Component } from "@angular/core";
import { EstatePropertyProjectListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-project-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstatePropertyProjectListMobileComponent extends EstatePropertyProjectListComponent {}
