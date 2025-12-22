import { Component } from "@angular/core";
import { EstateAccountExpertListComponent } from "./list.component";

@Component({
  selector: "app-estate-account-expert-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstateAccountExpertListMobileComponent extends EstateAccountExpertListComponent {}
