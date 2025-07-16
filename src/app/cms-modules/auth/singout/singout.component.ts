
import { Component, OnInit } from '@angular/core';
import { CoreAuthV3Service } from 'ntk-cms-api';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
@Component({
    selector: 'app-auth-singout',
    templateUrl: './singout.component.html',
    standalone: false
})
export class AuthSingoutComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(private authService: CoreAuthV3Service,
    private cmsToastrService: CmsToastrService,
  ) {
    this.authService.ServiceLogout().subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.cmsToastrService.typeSuccessLogout();
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
      }
    });
  }
  ngOnInit(): void { }
}
