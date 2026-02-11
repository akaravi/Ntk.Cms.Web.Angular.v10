import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core";
import { CmsHtmlListComponent } from "../cms-html-list/cms-html-list.component";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { ThemeService } from "src/app/core/services/theme.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-cms-html-list-mobile",
  templateUrl: "./cms-html-list-mobile.component.html",
  styleUrls: ["./cms-html-list-mobile.component.scss"],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmsHtmlListMobileComponent extends CmsHtmlListComponent {
  static nextId = 0;
  override id = ++CmsHtmlListMobileComponent.nextId;

  constructor(
    public override publicHelper: PublicHelper,
    public override tokenHelper: TokenHelper,
    public override themeService: ThemeService,
    public override translate: TranslateService,
    cmsStoreService: CmsStoreService,
    cdr: ChangeDetectorRef,
  ) {
    super(
      publicHelper,
      tokenHelper,
      themeService,
      translate,
      cmsStoreService,
      cdr,
    );
  }

  // Helper method to get button position classes
  getActionMainButtonClasses(): string {
    const classes = [
      "cms-html-list-mobile-fixed-button",
      "cms-html-list-mobile-action-main-button",
    ];
    if (this.optionTreeDisplay) {
      classes.push("with-tree");
    }
    return classes.join(" ");
  }

  // Helper method to get row button position classes
  getActionRowButtonClasses(): string {
    const classes = [
      "cms-html-list-mobile-fixed-button",
      "cms-html-list-mobile-action-row-button",
    ];
    if (this.optionTreeDisplay) {
      classes.push("with-tree");
      if (this.optionActionMainDisplay) {
        classes.push("with-action-main");
      }
    } else if (this.optionActionMainDisplay) {
      classes.push("with-action-main");
    }
    return classes.join(" ");
  }

  // Helper method to get icon rotation class
  getIconRotationClass(isRotated: boolean): string {
    return isRotated
      ? "cms-html-list-mobile-icon rotated"
      : "cms-html-list-mobile-icon normal";
  }
}
