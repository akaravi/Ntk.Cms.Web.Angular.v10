import { Component, OnInit } from "@angular/core";
import { CoreAuthV3Service } from "ntk-cms-api";
import { CmsAuthService } from "src/app/core/services/cmsAuth.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
@Component({
  selector: "app-auth-signout",
  templateUrl: "./signout.component.html",
  standalone: false,
})
export class AuthSignOutComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private authService: CoreAuthV3Service,
    private cmsToastrService: CmsToastrService,
    private cmsAuthService: CmsAuthService,
  ) {
    this.authService.ServiceLogout().subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.cmsToastrService.typeSuccessLogout();
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
      },
    });
  }
  ngOnInit(): void {
    this.cmsAuthService.logout();
  }
}
