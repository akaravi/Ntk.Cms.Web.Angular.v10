import { Component } from "@angular/core";
import { EstatePropertyCompanyListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-company-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstatePropertyCompanyListMobileComponent extends EstatePropertyCompanyListComponent {}
