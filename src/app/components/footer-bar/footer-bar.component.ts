import { Component, OnInit } from "@angular/core";
import { TokenInfoModelV3 } from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { ThemeStoreModel } from "src/app/core/models/themeStoreModel";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { ThemeService } from "src/app/core/services/theme.service";

@Component({
  selector: "app-footer-bar",
  templateUrl: "./footer-bar.component.html",
  styleUrls: ["./footer-bar.component.scss"],
  standalone: false,
})
export class FooterBarComponent implements OnInit {
  constructor(
    public tokenHelper: TokenHelper,
    public publicHelper: PublicHelper,
    private cmsStoreService: CmsStoreService,
    private themeService: ThemeService,
  ) {
    this.tokenInfo = this.cmsStoreService.getStateSnapshot().tokenInfoStore;

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.tokenInfo = value;
        }),
    );
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.themeStore)
        .subscribe(async (value) => {
          this.themeStore = value;
        }),
    );
  }
  themeStore = new ThemeStoreModel();
  tokenInfo = new TokenInfoModelV3();
  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {}
  ngOnDestroy() {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  onActionCleanDataMenu(): void {
    this.themeService.cleanDataMenu();
  }
}
