import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-config',
  template: '<router-outlet></router-outlet>',
   standalone: false
})
export class ChartConfigComponent implements OnInit {

  constructorInfoAreaId = this.constructor.name;
  constructor() {
  }

  ngOnInit(): void {
  }

}
