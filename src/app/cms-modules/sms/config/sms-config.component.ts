import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sms-config',
  template: '<router-outlet></router-outlet>',
   standalone: false
})
export class SmsConfigComponent implements OnInit {

  constructorInfoAreaId = this.constructor.name;
  constructor() {
  }

  ngOnInit(): void {
  }

}
