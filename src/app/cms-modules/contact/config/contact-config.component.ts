import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-config',
  template: '<router-outlet></router-outlet>',
   standalone: false
})
export class ContactConfigComponent implements OnInit {

  constructorInfoAreaId = this.constructor.name;
  constructor() {
  }

  ngOnInit(): void {
  }

}
