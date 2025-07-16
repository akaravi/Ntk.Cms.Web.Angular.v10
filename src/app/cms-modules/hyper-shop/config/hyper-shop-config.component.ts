import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hyper-shop-config',
  template: '<router-outlet></router-outlet>',
   standalone: false
})
export class HyperShopConfigComponent implements OnInit {

  constructorInfoAreaId = this.constructor.name;
  constructor() {
  }

  ngOnInit(): void {
  }

}
