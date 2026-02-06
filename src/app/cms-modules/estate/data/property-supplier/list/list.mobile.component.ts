import { Component } from "@angular/core";
import { EstatePropertySupplierListComponent } from "./list.component";

@Component({
  selector: "app-estate-property-supplier-list-mobile",
  templateUrl: "./list.mobile.component.html",
  styleUrls: ["./list.mobile.component.scss"],
  standalone: false,
})
export class EstatePropertySupplierListMobileComponent extends EstatePropertySupplierListComponent {}
