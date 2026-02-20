import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { ThemeService } from "src/app/core/services/theme.service";

@Component({
  selector: "app-scroll-top",
  templateUrl: "./scroll-top.component.html",
  styleUrls: ["./scroll-top.component.scss"],
  standalone: false,
})
export class ScrollTopComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    public publicHelper: PublicHelper,
    private cmsStoreService: CmsStoreService,
    public themeService: ThemeService,
  ) {
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.themeStore)
        .subscribe(async (value) => {
          if (value.actionScrollTopPage) this.onScroll(null);
        }),
    );
  }
  viewScrollTop = false;
  verticalOffset = 0;
  private unsubscribe: Subscription[] = [];
  private mobileScrollListeners: Array<{
    element: HTMLElement;
    handler: (e: Event) => void;
  }> = [];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // برای موبایل: گوش دادن به scroll event در cms-html-list-mobile-body
    if (this.publicHelper.isMobile) {
      this.attachMobileScrollListeners();
    }
  }

  private attachMobileScrollListeners(): void {
    // پیدا کردن تمام عناصر cms-html-list-mobile-body
    const mobileBodies = document.querySelectorAll<HTMLElement>(
      ".cms-html-list-mobile-body",
    );
    mobileBodies.forEach((el) => {
      const handler = (e: Event) => this.onMobileScroll(e);
      el.addEventListener("scroll", handler, { passive: true });
      this.mobileScrollListeners.push({ element: el, handler });
    });

    // گوش دادن به اضافه شدن عناصر جدید (MutationObserver)
    const observer = new MutationObserver(() => {
      const newBodies = document.querySelectorAll<HTMLElement>(
        ".cms-html-list-mobile-body",
      );
      newBodies.forEach((el) => {
        if (!this.mobileScrollListeners.some((l) => l.element === el)) {
          const handler = (e: Event) => this.onMobileScroll(e);
          el.addEventListener("scroll", handler, { passive: true });
          this.mobileScrollListeners.push({ element: el, handler });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    this.unsubscribe.push(
      new Subscription(() => {
        observer.disconnect();
        this.mobileScrollListeners.forEach(({ element, handler }) => {
          element.removeEventListener("scroll", handler);
        });
        this.mobileScrollListeners = [];
      }),
    );
  }

  @HostListener("window:scroll", ["$event"]) // for window scroll events
  onScroll(event) {
    this.verticalOffset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    // console.log('verticalOffset', this.verticalOffset, 'windows.innerHeight', window.innerHeight);
    if (this.verticalOffset > window.innerHeight / 5) this.viewScrollTop = true;
    else this.viewScrollTop = false;

    this.themeService.onActionScrollTopPage(false);
  }

  private onMobileScroll(event: Event): void {
    const el = event.target as HTMLElement;
    if (!el || typeof el.scrollTop !== "number") return;
    const scrollTop = el.scrollTop;
    const threshold = el.clientHeight / 5;
    this.viewScrollTop = scrollTop > threshold;
    this.themeService.onActionScrollTopPage(false);
  }

  scrollToTop() {
    if (this.publicHelper.isMobile) {
      // در موبایل: اسکرول کردن cms-html-list-mobile-body به بالا
      const mobileBodies = document.querySelectorAll<HTMLElement>(
        ".cms-html-list-mobile-body",
      );
      mobileBodies.forEach((el) => {
        el.scrollTo({ top: 0, behavior: "smooth" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: `smooth` });
    }
  }

  ngOnDestroy() {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
