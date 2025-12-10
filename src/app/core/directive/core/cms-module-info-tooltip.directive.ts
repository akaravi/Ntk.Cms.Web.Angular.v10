import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
} from "@angular/core";
import { CoreModuleService } from "ntk-cms-api";
import { Subscription, catchError, map, of } from "rxjs";

@Directive({
  selector: "[cmsModuleInfoTooltip]",
  standalone: false,
})
export class CmsModuleInfoTooltipDirective implements OnDestroy {
  @Input() cmsModuleInfoTooltip: number | null | undefined;
  @Input() tooltipPosition: "above" | "below" | "left" | "right" = "above";

  // Cache استاتیک برای نگهداری نتایج tooltip
  private static cache: Map<number, string> = new Map();
  private static loadingCache: Set<number> = new Set();

  private subscription: Subscription | null = null;
  private tooltipElement: HTMLElement | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private coreModuleService: CoreModuleService,
  ) {}

  @HostListener("mouseenter")
  onMouseEnter(): void {
    this.loadAndShowTooltip();
  }

  @HostListener("click")
  onClick(): void {
    this.loadAndShowTooltip();
  }

  @HostListener("mouseleave")
  onMouseLeave(): void {
    this.hideTooltip();
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private loadAndShowTooltip(): void {
    if (!this.cmsModuleInfoTooltip || this.cmsModuleInfoTooltip <= 0) {
      return;
    }

    const moduleId = this.cmsModuleInfoTooltip;

    // بررسی cache
    const cachedResult = CmsModuleInfoTooltipDirective.cache.get(moduleId);
    if (cachedResult) {
      this.showTooltip(cachedResult);
      return;
    }

    // اگر در حال loading است، منتظر بمان
    if (CmsModuleInfoTooltipDirective.loadingCache.has(moduleId)) {
      this.showTooltip("در حال بارگذاری...");
      return;
    }

    // نمایش loading
    this.showTooltip("در حال بارگذاری...");
    CmsModuleInfoTooltipDirective.loadingCache.add(moduleId);

    // درخواست از سرور
    this.subscription = this.coreModuleService
      .ServiceGetOneById(moduleId, 1000000)
      .pipe(
        map((ret) => {
          let retOut = "";
          if (ret.isSuccess) {
            if (ret.item.titleML && ret.item.titleML.length > 0)
              retOut = ret.item.titleML;
            if (ret.item.id && ret.item.id > 0) {
              if (retOut.length > 0) retOut = retOut + " | ";
              retOut = retOut + ret.item.id;
            }
          }
          return retOut;
        }),
        catchError(() => of("")),
      )
      .subscribe((tooltipText) => {
        // ذخیره در cache
        CmsModuleInfoTooltipDirective.cache.set(moduleId, tooltipText);
        CmsModuleInfoTooltipDirective.loadingCache.delete(moduleId);

        // نمایش tooltip
        if (tooltipText && tooltipText.length > 0) {
          this.showTooltip(tooltipText);
        }
      });
  }

  private showTooltip(text: string): void {
    if (!text || text.trim().length === 0) {
      return;
    }

    // حذف tooltip قبلی اگر وجود دارد
    this.hideTooltip();

    // ایجاد tooltip جدید
    this.tooltipElement = this.renderer.createElement("span");
    this.renderer.addClass(this.tooltipElement, "mat-tooltip");
    this.renderer.addClass(
      this.tooltipElement,
      `mat-tooltip-${this.tooltipPosition}`,
    );
    this.renderer.setStyle(this.tooltipElement, "position", "absolute");
    this.renderer.setStyle(this.tooltipElement, "z-index", "1000");
    this.renderer.setStyle(this.tooltipElement, "background-color", "#616161");
    this.renderer.setStyle(this.tooltipElement, "color", "#fff");
    this.renderer.setStyle(this.tooltipElement, "padding", "8px 12px");
    this.renderer.setStyle(this.tooltipElement, "border-radius", "4px");
    this.renderer.setStyle(this.tooltipElement, "font-size", "12px");
    this.renderer.setStyle(this.tooltipElement, "max-width", "250px");
    this.renderer.setStyle(this.tooltipElement, "word-wrap", "break-word");
    this.renderer.setStyle(this.tooltipElement, "opacity", "0");
    this.renderer.setStyle(this.tooltipElement, "transition", "opacity 0.2s");

    const textNode = this.renderer.createText(text);
    this.renderer.appendChild(this.tooltipElement, textNode);
    this.renderer.appendChild(document.body, this.tooltipElement);

    // محاسبه موقعیت
    this.setTooltipPosition();

    // نمایش tooltip با انیمیشن
    setTimeout(() => {
      if (this.tooltipElement) {
        this.renderer.setStyle(this.tooltipElement, "opacity", "1");
      }
    }, 10);
  }

  private setTooltipPosition(): void {
    if (!this.tooltipElement) {
      return;
    }

    const hostElement = this.elementRef.nativeElement as HTMLElement;
    const hostRect = hostElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    let top = 0;
    let left = 0;

    switch (this.tooltipPosition) {
      case "above":
        top = hostRect.top + scrollTop - tooltipRect.height - 8;
        left =
          hostRect.left + scrollLeft + (hostRect.width - tooltipRect.width) / 2;
        break;
      case "below":
        top = hostRect.bottom + scrollTop + 8;
        left =
          hostRect.left + scrollLeft + (hostRect.width - tooltipRect.width) / 2;
        break;
      case "left":
        top =
          hostRect.top + scrollTop + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left + scrollLeft - tooltipRect.width - 8;
        break;
      case "right":
        top =
          hostRect.top + scrollTop + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + scrollLeft + 8;
        break;
    }

    this.renderer.setStyle(this.tooltipElement, "top", `${top}px`);
    this.renderer.setStyle(this.tooltipElement, "left", `${left}px`);
  }

  private hideTooltip(): void {
    if (this.tooltipElement) {
      this.renderer.setStyle(this.tooltipElement, "opacity", "0");
      setTimeout(() => {
        if (this.tooltipElement && this.tooltipElement.parentNode) {
          this.renderer.removeChild(document.body, this.tooltipElement);
        }
        this.tooltipElement = null;
      }, 200);
    }
  }

  ngOnDestroy(): void {
    this.hideTooltip();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
