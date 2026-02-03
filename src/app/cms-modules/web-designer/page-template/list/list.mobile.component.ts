import { Component } from "@angular/core";
import { WebDesignerMainPageTemplateListComponent } from "./list.component";

@Component({
  selector: "app-webdesigner-pagetemplate-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class WebDesignerMainPageTemplateListMobileComponent extends WebDesignerMainPageTemplateListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
