import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donate-config',
  template: '<router-outlet></router-outlet>',
  standalone: false
})
export class DonateConfigComponent implements OnInit {

  constructorInfoAreaId = this.constructor.name;
  constructor() {
  }

  ngOnInit(): void {
  }

}
