import { Component } from "@angular/core";
import { CoreModuleEntityListComponent } from "./list.component";

@Component({
  selector: "app-core-module-entity-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreModuleEntityListMobileComponent extends CoreModuleEntityListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
