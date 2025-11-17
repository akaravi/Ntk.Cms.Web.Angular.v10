import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
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
    private cdr: ChangeDetectorRef,
  ) {
    // مقدار اولیه را از snapshot بگیریم
    const snapshot = this.cmsStoreService.getStateSnapshot();
    this.themeStore = snapshot?.themeStore ?? new ThemeStoreModel();
  }
  themeStore = new ThemeStoreModel();
  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    // انتقال subscription به ngOnInit برای جلوگیری از ExpressionChangedAfterItHasBeenCheckedError
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.themeStore)
        .subscribe(async (value) => {
          if (value) {
            // استفاده از setTimeout برای به تعویق انداختن تغییرات به چرخه بعدی
            setTimeout(() => {
              this.themeStore = value;
              this.cdr.markForCheck();
            }, 0);
          } else {
            setTimeout(() => {
              this.themeStore = new ThemeStoreModel();
              this.cdr.markForCheck();
            }, 0);
          }
        }),
    );
  }
  ngOnDestroy() {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  onActionHighLightSwitch(colorStr: string) {
    this.themeService.updateThemeHighLight(colorStr);
  }
}
