import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
} from "@angular/core";
import { ContactContentService } from "ntk-cms-api";
import { Subscription, catchError, map, of } from "rxjs";

@Directive({
  selector: "[contactContentByNumberTooltip]",
  standalone: false,
})
export class ContactContentByNumberTooltipDirective implements OnDestroy {
  @Input() contactContentByNumberTooltip: string | null | undefined;
  @Input() tooltipPosition: "above" | "below" | "left" | "right" = "above";

  // Cache استاتیک برای نگهداری نتایج tooltip
  private static cache: Map<string, string> = new Map();
  private static loadingCache: Set<string> = new Set();

  private subscription: Subscription | null = null;
  private tooltipElement: HTMLElement | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private contactContentService: ContactContentService,
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
    if (!this.contactContentByNumberTooltip) {
      return;
    }

    const phoneNumber = this.contactContentByNumberTooltip.trim();
    if (!phoneNumber || phoneNumber.length === 0) {
      return;
    }

    // بررسی cache
    const cachedResult =
      ContactContentByNumberTooltipDirective.cache.get(phoneNumber);
    if (cachedResult) {
      this.showTooltip(cachedResult);
      return;
    }

    // اگر در حال loading است، منتظر بمان
    if (ContactContentByNumberTooltipDirective.loadingCache.has(phoneNumber)) {
      // نمایش loading
      this.showTooltip("در حال بارگذاری...");
      return;
    }

    // نمایش loading
    this.showTooltip("در حال بارگذاری...");
    ContactContentByNumberTooltipDirective.loadingCache.add(phoneNumber);

    // درخواست از سرور
    this.subscription = this.contactContentService
      .ServiceFindByNumber(phoneNumber)
      .pipe(
        map((response) => {
          let result = phoneNumber;

          if (response?.isSuccess) {
            const contacts = [];

            if (response.item) {
              contacts.push(response.item);
            }

            if (Array.isArray(response.listItems)) {
              contacts.push(...response.listItems);
            }

            const names = contacts
              .map((contact) => {
                if (!contact) {
                  return "";
                }
                const fullName = [contact.firstName, contact.lastName]
                  .filter((name) => !!name && name.trim().length > 0)
                  .join(" ")
                  .trim();

                if (fullName.length > 0) {
                  return fullName;
                }

                if (contact.title && contact.title.trim().length > 0) {
                  return contact.title.trim();
                }

                return "";
              })
              .filter((name) => name.length > 0);

            if (names.length > 0) {
              result = phoneNumber + ": " + names.join(" | ");
            }
          }

          return result;
        }),
        catchError(() => of(phoneNumber)),
      )
      .subscribe((tooltipText) => {
        // ذخیره در cache
        ContactContentByNumberTooltipDirective.cache.set(
          phoneNumber,
          tooltipText,
        );
        ContactContentByNumberTooltipDirective.loadingCache.delete(phoneNumber);

        // نمایش tooltip
        this.showTooltip(tooltipText);
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
