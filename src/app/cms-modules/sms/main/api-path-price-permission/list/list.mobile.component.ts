import { Component, HostListener } from "@angular/core";
import { SmsMainApiPathPricePermissionListComponent } from "./list.component";

@Component({
  selector: "app-sms-apipath-price-permission-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class SmsMainApiPathPricePermissionListMobileComponent extends SmsMainApiPathPricePermissionListComponent {
  pullToRefreshState = {
    isRefreshing: false,
    startY: 0,
    currentY: 0,
    pullDistance: 0,
    threshold: 80,
  };

  swipeState: Map<
    string,
    { startX: number; currentX: number; offset: number }
  > = new Map();
  readonly SWIPE_THRESHOLD = 100;
  readonly SWIPE_MAX_OFFSET = 120;

  onItemTouchStart(event: TouchEvent, itemId: string): void {
    event.stopPropagation();
    const touch = event.touches[0];
    this.swipeState.set(itemId, {
      startX: touch.clientX,
      currentX: touch.clientX,
      offset: 0,
    });
  }

  onItemTouchMove(event: TouchEvent, itemId: string): void {
    event.stopPropagation();
    const state = this.swipeState.get(itemId);
    if (!state) return;
    const touch = event.touches[0];
    state.currentX = touch.clientX;
    const diff = state.currentX - state.startX;
    const isRTL = document.documentElement.dir === "rtl";
    const maxOffset = isRTL ? this.SWIPE_MAX_OFFSET : -this.SWIPE_MAX_OFFSET;
    const minOffset = isRTL ? -this.SWIPE_MAX_OFFSET : this.SWIPE_MAX_OFFSET;
    state.offset = Math.max(minOffset, Math.min(maxOffset, diff));
  }

  onItemTouchEnd(event: TouchEvent, itemId: string): void {
    event.stopPropagation();
    const state = this.swipeState.get(itemId);
    if (!state) return;
    const isRTL = document.documentElement.dir === "rtl";
    const threshold = isRTL ? this.SWIPE_THRESHOLD : -this.SWIPE_THRESHOLD;
    if (
      (isRTL && state.offset > threshold) ||
      (!isRTL && state.offset < threshold)
    ) {
    } else {
      state.offset = 0;
    }
    this.swipeState.set(itemId, state);
  }

  onTouchStart(event: TouchEvent): void {
    const target = event.target as HTMLElement;
    const contentArea = target.closest(".cms-m-content");
    if (contentArea && (contentArea as HTMLElement).scrollTop === 0) {
      this.pullToRefreshState.startY = event.touches[0].clientY;
      this.pullToRefreshState.isRefreshing = false;
    }
  }

  onTouchMove(event: TouchEvent): void {
    const target = event.target as HTMLElement;
    const contentArea = target.closest(".cms-m-content");
    if (
      contentArea &&
      (contentArea as HTMLElement).scrollTop === 0 &&
      this.pullToRefreshState.startY > 0
    ) {
      this.pullToRefreshState.currentY = event.touches[0].clientY;
      this.pullToRefreshState.pullDistance = Math.max(
        0,
        this.pullToRefreshState.currentY - this.pullToRefreshState.startY,
      );
      if (this.pullToRefreshState.pullDistance > 10) {
        event.preventDefault();
      }
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (
      this.pullToRefreshState.pullDistance >=
        this.pullToRefreshState.threshold &&
      !this.pullToRefreshState.isRefreshing
    ) {
      this.pullToRefreshState.isRefreshing = true;
      this.onActionButtonReload();
      setTimeout(() => {
        this.pullToRefreshState.isRefreshing = false;
        this.pullToRefreshState.pullDistance = 0;
        this.pullToRefreshState.startY = 0;
        this.pullToRefreshState.currentY = 0;
      }, 1000);
    } else {
      this.pullToRefreshState.pullDistance = 0;
      this.pullToRefreshState.startY = 0;
      this.pullToRefreshState.currentY = 0;
    }
  }

  actionMenuOpen: string | null = null;

  toggleActionMenu(rowId: string | number): void {
    const idStr = String(rowId);
    if (this.actionMenuOpen === idStr) {
      this.actionMenuOpen = null;
    } else {
      this.actionMenuOpen = idStr;
    }
  }

  closeActionMenu(): void {
    this.actionMenuOpen = null;
  }

  toString(value: string | number): string {
    return String(value);
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (
      !target.closest(".cms-m-action-menu") &&
      !target.closest(".cms-m-action-menu-dropdown")
    ) {
      this.closeActionMenu();
    }
  }

  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
