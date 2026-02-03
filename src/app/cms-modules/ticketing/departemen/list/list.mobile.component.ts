import { Component } from "@angular/core";
import { TicketingDepartemenListComponent } from "./list.component";

@Component({
  selector: "app-ticketing-departemen-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class TicketingDepartemenListMobileComponent extends TicketingDepartemenListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
