import { Component } from "@angular/core";
import { CoreModuleEntityReportFileListComponent } from "./list.component";

@Component({
  selector: "app-core-module-entity-report-file-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class CoreModuleEntityReportFileListMobileComponent extends CoreModuleEntityReportFileListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
