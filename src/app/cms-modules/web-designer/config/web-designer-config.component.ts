import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-web-designer-config',
  template: '<router-outlet></router-outlet>',
   standalone: false
})
export class WebDesignerConfigComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor() {
  }
  ngOnInit(): void {
  }
}
