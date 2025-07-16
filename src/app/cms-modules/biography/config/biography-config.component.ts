import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-biography-config',
  template: '<router-outlet></router-outlet>',
   standalone: false
})
export class BiographyConfigComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor() {
  }
  ngOnInit(): void {
  }
}
