import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
} from "@angular/core";
import { FileContentService } from "ntk-cms-api";
import { Subscription, catchError, map, of } from "rxjs";

@Directive({
  selector: "[cmsFileInfoTooltip]",
  standalone: false,
})
export class CmsFileInfoTooltipDirective implements OnDestroy {
  @Input() cmsFileInfoTooltip: number | null | undefined;
  @Input() tooltipPosition: "above" | "below" | "left" | "right" = "above";

  private static cache: Map<number, string> = new Map();
  private static loadingCache: Set<number> = new Set();

  private subscription: Subscription | null = null;
  private tooltipElement: HTMLElement | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private fileContentService: FileContentService,
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
    if (!this.cmsFileInfoTooltip || this.cmsFileInfoTooltip <= 0) {
      return;
    }

    const fileId = this.cmsFileInfoTooltip;

    const cachedResult = CmsFileInfoTooltipDirective.cache.get(fileId);
    if (cachedResult) {
      this.showTooltip(cachedResult);
      return;
    }

    if (CmsFileInfoTooltipDirective.loadingCache.has(fileId)) {
      this.showTooltip("در حال بارگذاری...");
      return;
    }

    this.showTooltip("در حال بارگذاری...");
    CmsFileInfoTooltipDirective.loadingCache.add(fileId);

    this.subscription = this.fileContentService
      .ServiceGetOneById(fileId, 1000000)
      .pipe(
        map((ret) => {
          let retOut = "";
          if (ret.isSuccess && ret.item) {
            if (ret.item.fileName && ret.item.fileName.length > 0) {
              retOut = ret.item.fileName;
            }
            if (ret.item.fileSize != null && ret.item.fileSize > 0) {
              const sizeStr = this.formatFileSize(ret.item.fileSize);
              if (sizeStr && retOut.length > 0) retOut = retOut + " | ";
              if (sizeStr) retOut = retOut + sizeStr;
            }
            if (
              ret.item.downloadLinksrc &&
              ret.item.downloadLinksrc.length > 0
            ) {
              if (retOut.length > 0) retOut = retOut + " | ";
              retOut = retOut + ret.item.downloadLinksrc;
            }
          }
          if (retOut.length === 0) retOut = fileId.toString();
          return retOut;
        }),
        catchError(() => of(fileId.toString())),
      )
      .subscribe((tooltipText) => {
        CmsFileInfoTooltipDirective.cache.set(fileId, tooltipText);
        CmsFileInfoTooltipDirective.loadingCache.delete(fileId);
        this.showTooltip(tooltipText);
      });
  }

  private showTooltip(text: string): void {
    if (!text || text.trim().length === 0) {
      return;
    }

    this.hideTooltip();

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
    this.renderer.setStyle(this.tooltipElement, "max-width", "350px");
    this.renderer.setStyle(this.tooltipElement, "word-wrap", "break-word");
    this.renderer.setStyle(this.tooltipElement, "opacity", "0");
    this.renderer.setStyle(this.tooltipElement, "transition", "opacity 0.2s");

    const textNode = this.renderer.createText(text);
    this.renderer.appendChild(this.tooltipElement, textNode);
    this.renderer.appendChild(document.body, this.tooltipElement);

    this.setTooltipPosition();

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

  private formatFileSize(bytes: number): string {
    if (bytes == null || bytes <= 0 || isNaN(bytes)) return "";
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(1)} GB`;
  }

  ngOnDestroy(): void {
    this.hideTooltip();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
