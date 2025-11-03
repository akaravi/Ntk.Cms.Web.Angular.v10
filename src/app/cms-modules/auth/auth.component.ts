import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenInfoModelV3 } from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsTranslationService } from "src/app/core/i18n";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  standalone: false,
})
export class AuthComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private router: Router,
    public publicHelper: PublicHelper,
    public tokenHelper: TokenHelper,
    public translate: CmsTranslationService,
    private cmsStoreService: CmsStoreService,
    private cdr: ChangeDetectorRef,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  tokenInfo = new TokenInfoModelV3();

  today: Date = new Date();
  //tesettt = 'gfjhgjh';
  showSplashModel = true;
  ngOnInit(): void {
    if (window.innerWidth < environment.cmsViewConfig.mobileWindowInnerWidth) {
      setTimeout(() => {
        this.showSplashModel = false;
        this.cdr.markForCheck();
      }, 5000);
    }
  }
}
