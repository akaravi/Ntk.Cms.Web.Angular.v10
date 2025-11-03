import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { ThemeStoreModel } from "src/app/core/models/themeStoreModel";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";

@Component({
  selector: "app-menu-install-pwa-ios",
  templateUrl: "./menu-install-pwa-ios.component.html",
  styleUrls: ["./menu-install-pwa-ios.component.scss"],
  standalone: false,
})
export class MenuInstallPwaIosComponent implements OnInit, OnDestroy {
  constructor(
    public publicHelper: PublicHelper,
    private cmsStoreService: CmsStoreService,
  ) {
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.themeStore)
        .subscribe(async (value) => {
          this.themeStore = value;
        }),
    );
  }
  themeStore = new ThemeStoreModel();
  private unsubscribe: Subscription[] = [];
  ngOnInit(): void {}
  ngOnDestroy() {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
