import { Component, OnInit } from "@angular/core";

/**
 * Component اصلی ماژول CRM.
 * این component به عنوان container برای sub-moduleهای CRM عمل می‌کند.
 */
@Component({
  selector: "app-crm",
  template: "<router-outlet></router-outlet>",
  standalone: false,
})
export class CrmComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor() {}

  ngOnInit(): void {}
}

