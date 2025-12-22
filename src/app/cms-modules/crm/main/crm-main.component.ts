import { Component, OnInit } from "@angular/core";

/**
 * Component اصلی sub-module Main CRM.
 * این component به عنوان container برای componentهای اصلی CRM عمل می‌کند.
 */
@Component({
  selector: "app-crm-main",
  template: "<router-outlet></router-outlet>",
  standalone: false,
})
export class CrmMainComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor() {}

  ngOnInit(): void {}
}

