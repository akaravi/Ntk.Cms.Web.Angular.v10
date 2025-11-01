import { Component, OnInit } from "@angular/core";
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
    private cmsToastrService: CmsToastrService,
    private cmsAuthService: CmsAuthService,
  ) {}
  ngOnInit(): void {
    this.cmsToastrService.typeOrderActionLogout();
    this.cmsAuthService.logout();
  }
}
