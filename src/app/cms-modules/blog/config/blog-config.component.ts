import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-config',
  template: '<router-outlet></router-outlet>',
   standalone: false
})
export class BlogConfigComponent implements OnInit {

  constructorInfoAreaId = this.constructor.name;
  constructor() {
  }

  ngOnInit(): void {
  }

}
