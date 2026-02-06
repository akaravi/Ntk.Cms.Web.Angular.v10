import { Component } from "@angular/core";
import { EstateContractTypeListComponent } from "./list.component";

@Component({
  selector: "app-estate-contract-type-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstateContractTypeListMobileComponent extends EstateContractTypeListComponent {}
