# تاریخچه تغییرات پروژه

## 2025-11-17 07:43:10

### رفع خطای ExpressionChangedAfterItHasBeenCheckedError در MenuColorsComponent (نسخه نهایی)

**مشکل:**

- خطای `NG0100: ExpressionChangedAfterItHasBeenCheckedError` در کامپوننت `MenuColorsComponent`
- مقدار `themeStore.themeHighlight` بعد از بررسی Angular تغییر می‌کرد (از 'blue' به 'red' یا 'green')
- این خطا به دلیل subscription در constructor بود که `themeStore` را در طول change detection اولیه به‌روزرسانی می‌کرد

**راه حل نهایی:**

1. **انتقال subscription از constructor به ngOnInit**: برای جلوگیری از اجرای subscription در طول change detection اولیه
2. **استفاده از getStateSnapshot برای مقدار اولیه**: مقدار اولیه `themeStore` از snapshot گرفته می‌شود تا از تغییرات ناگهانی جلوگیری شود
3. **استفاده از setTimeout برای به تعویق انداختن تغییرات**: تغییرات `themeStore` با `setTimeout(..., 0)` به چرخه بعدی event loop منتقل می‌شوند
4. **استفاده از markForCheck**: برای اطلاع‌رسانی به Angular در مورد تغییرات

**فایل‌های تغییر یافته:**

- `src/app/components/menu-colors/menu-colors.component.ts`

**تغییرات اعمال شده:**

```typescript
// اضافه شدن ChangeDetectorRef به imports
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";

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
```

---

## 2025-11-17 07:41:20

### رفع خطای ExpressionChangedAfterItHasBeenCheckedError در MenuColorsComponent (نسخه اولیه)

**مشکل:**

- خطای `NG0100: ExpressionChangedAfterItHasBeenCheckedError` در کامپوننت `MenuColorsComponent`
- مقدار `themeStore.themeHighlight` بعد از بررسی Angular تغییر می‌کرد (از 'blue' به 'red' یا 'green')
- این خطا به دلیل subscription در constructor بود که `themeStore` را به‌روزرسانی می‌کرد

**راه حل اولیه (کافی نبود):**

- اضافه کردن `ChangeDetectorRef` به constructor
- استفاده از `markForCheck()` در subscription برای اطلاع‌رسانی به Angular در مورد تغییرات
- این روش تغییرات را به چرخه بعدی change detection منتقل می‌کند

**نتیجه:** راه حل اولیه کافی نبود و خطا همچنان وجود داشت، بنابراین راه حل نهایی با انتقال subscription به ngOnInit و استفاده از setTimeout اعمال شد.
