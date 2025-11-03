import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { ThemeStoreModel } from "src/app/core/models/themeStoreModel";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { ThemeService } from "src/app/core/services/theme.service";

@Component({
  selector: "app-menu-colors",
  templateUrl: "./menu-colors.component.html",
  styleUrls: ["./menu-colors.component.scss"],
  standalone: false,
})
export class MenuColorsComponent implements OnInit, OnDestroy {
  constructor(
    public publicHelper: PublicHelper,
    private themeService: ThemeService,
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
  onActionHighLightSwitch(colorStr: string) {
    this.themeService.updateThemeHighLight(colorStr);
  }
}
