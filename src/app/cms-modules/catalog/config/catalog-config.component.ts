import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-config',
  template: '<router-outlet></router-outlet>',
   standalone: false
})
export class CatalogConfigComponent implements OnInit {

  constructorInfoAreaId = this.constructor.name;
  constructor() {
  }

  ngOnInit(): void {
  }

}
