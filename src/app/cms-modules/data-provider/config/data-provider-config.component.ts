import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-provider-config',
  template: '<router-outlet></router-outlet>',
   standalone: false
})
export class DataProviderConfigComponent implements OnInit {

  constructorInfoAreaId = this.constructor.name;
  constructor() {
  }

  ngOnInit(): void {
  }

}
