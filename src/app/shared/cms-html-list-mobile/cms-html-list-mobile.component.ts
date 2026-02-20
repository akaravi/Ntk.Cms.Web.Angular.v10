import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { ThemeService } from "src/app/core/services/theme.service";
import { CmsHtmlListComponent } from "../cms-html-list/cms-html-list.component";

/** Threshold in px from bottom to trigger load next page */
const SCROLL_NEAR_BOTTOM_THRESHOLD = 120;
/** Min interval in ms between two near-bottom emits (throttle) */
const SCROLL_NEAR_BOTTOM_MIN_INTERVAL_MS = 2000;

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

  @Output() optionOnScrollNearBottom = new EventEmitter<void>();

  /** Last time optionOnScrollNearBottom was emitted (throttle: max once per 2s) */
  private _lastScrollNearBottomEmitTime = 0;

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

  /** Call from template (scroll) on body; emits when scroll is near bottom for infinite scroll */
  onScrollBody(event: Event): void {
    if (!this.optionOnScrollNearBottom) return;
    if (
      this.publicHelper?.processService?.process?.inRunArea?.[
        this.optionsListInfoAreaId
      ]
    )
      return;
    const now = Date.now();
    if (
      now - this._lastScrollNearBottomEmitTime <
      SCROLL_NEAR_BOTTOM_MIN_INTERVAL_MS
    )
      return;
    const el = event.target as HTMLElement;
    if (!el || typeof el.scrollTop !== "number") return;
    const nearBottom =
      el.scrollTop + el.clientHeight >=
      el.scrollHeight - SCROLL_NEAR_BOTTOM_THRESHOLD;
    if (nearBottom) {
      this._lastScrollNearBottomEmitTime = now;
      this.optionOnScrollNearBottom.emit();
      this.optionFooterDisplay = false;
    }
  }
}
