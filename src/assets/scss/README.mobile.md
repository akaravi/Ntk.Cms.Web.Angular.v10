# راهنمای استفاده از استایل‌های موبایل (Mobile Styles Guide)

این فایل شامل استایل‌های مشترک و قابل استفاده مجدد برای تمام کامپوننت‌های موبایل است.

## 📁 فایل‌ها

- `styles.mobile.scss` - فایل اصلی استایل‌های موبایل
- این فایل در `src/styles.scss` import شده است

## 🎨 CSS Variables

تمام رنگ‌ها، فاصله‌ها و مقادیر از طریق CSS Variables تعریف شده‌اند:

### رنگ‌ها (Colors)
```scss
--cms-m-bg-color          // رنگ پس‌زمینه اصلی
--cms-m-header-bg         // رنگ پس‌زمینه هدر
--cms-m-card-bg           // رنگ پس‌زمینه کارت
--cms-m-text-primary      // رنگ متن اصلی
--cms-m-text-secondary    // رنگ متن ثانویه
--cms-m-primary-color      // رنگ اصلی (آبی)
--cms-m-border-color      // رنگ حاشیه
```

### فاصله‌ها (Spacing)
```scss
--cms-m-spacing-xs: 4px
--cms-m-spacing-sm: 8px
--cms-m-spacing-md: 16px
--cms-m-spacing-lg: 24px
--cms-m-spacing-xl: 32px
```

### اندازه‌های لمس (Touch Targets)
```scss
--cms-m-touch-target-min: 44px  // حداقل اندازه برای لمس (iOS standard)
```

## 📱 کلاس‌های اصلی

### Layout
```html
<div class="cms-m-body">
  <div class="cms-m-header safe-area-top">
    <div class="cms-m-header-content">
      <h1 class="cms-m-header-title">عنوان</h1>
    </div>
  </div>

  <div class="cms-m-content safe-area-content">
    <!-- محتوا -->
  </div>

  <div class="cms-m-footer safe-area-bottom">
    <!-- فوتر -->
  </div>
</div>
```

### فرم‌ها (Forms)
```html
<div class="cms-m-form-field">
  <label class="cms-m-form-label">برچسب</label>
  <input class="cms-m-form-input" type="text" />
  <span class="cms-m-form-hint">راهنما</span>
</div>

<textarea class="cms-m-form-textarea"></textarea>
```

### دکمه‌ها (Buttons)
```html
<button class="cms-m-btn cms-m-btn-primary">دکمه اصلی</button>
<button class="cms-m-btn cms-m-btn-secondary">دکمه ثانویه</button>
<button class="cms-m-btn cms-m-btn-danger">حذف</button>
<button class="cms-m-btn cms-m-btn-success">موفق</button>
<button class="cms-m-btn-small">دکمه کوچک</button>
<button class="cms-m-btn-icon">
  <i class="fa-solid fa-icon"></i>
</button>
```

### Stepper (Material)
```html
<mat-stepper class="cms-m-stepper" orientation="vertical">
  <mat-step>
    <ng-template matStepLabel>
      <div class="cms-m-step-label">
        <i class="fa-solid fa-icon"></i>
        <span>مرحله</span>
      </div>
    </ng-template>
    <div class="cms-m-step-content">
      <!-- محتوا -->
      <div class="cms-m-step-actions">
        <button class="cms-m-btn cms-m-btn-secondary">بازگشت</button>
        <button class="cms-m-btn cms-m-btn-primary">بعدی</button>
      </div>
    </div>
  </mat-step>
</mat-stepper>
```

### کارت‌ها (Cards)
```html
<div class="cms-m-card">
  <!-- محتوای کارت -->
</div>

<div class="cms-m-placeholder-card">
  <div class="cms-m-placeholder-code">$CODE</div>
  <div class="cms-m-placeholder-description">توضیحات</div>
  <button class="cms-m-placeholder-btn">افزودن</button>
</div>
```

## 🌓 Dark Mode

Dark Mode به صورت خودکار از طریق `@media (prefers-color-scheme: dark)` فعال می‌شود.

## 🔄 RTL Support

پشتیبانی از RTL به صورت خودکار انجام می‌شود. برای تغییر جهت آیکون‌ها در RTL:

```scss
[dir="rtl"] {
  .cms-m-btn i {
    transform: scaleX(-1);
  }
}
```

## 📐 Safe Area Support

برای پشتیبانی از Safe Area در iPhone X و جدیدتر:

```html
<div class="safe-area-top">    <!-- برای بالای صفحه -->
<div class="safe-area-bottom">  <!-- برای پایین صفحه -->
<div class="safe-area-content">  <!-- برای محتوا -->
<div class="safe-area-all">     <!-- برای همه -->
```

## 🎯 Utility Classes

### Text Alignment
```html
<div class="cms-m-text-center">مرکز</div>
<div class="cms-m-text-right">راست</div>
<div class="cms-m-text-left">چپ</div>
```

### Spacing
```html
<div class="cms-m-mt-sm">فاصله بالا کوچک</div>
<div class="cms-m-mt-md">فاصله بالا متوسط</div>
<div class="cms-m-mt-lg">فاصله بالا بزرگ</div>

<div class="cms-m-mb-sm">فاصله پایین کوچک</div>
<div class="cms-m-mb-md">فاصله پایین متوسط</div>
<div class="cms-m-mb-lg">فاصله پایین بزرگ</div>

<div class="cms-m-p-sm">پدینگ کوچک</div>
<div class="cms-m-p-md">پدینگ متوسط</div>
<div class="cms-m-p-lg">پدینگ بزرگ</div>

<div class="cms-m-gap-sm">فاصله بین المان‌ها کوچک</div>
<div class="cms-m-gap-md">فاصله بین المان‌ها متوسط</div>
<div class="cms-m-gap-lg">فاصله بین المان‌ها بزرگ</div>
```

## 📱 Responsive Breakpoints

```scss
@media (max-width: 375px) {
  // استایل‌های خاص برای صفحه‌های کوچک
}
```

## ♿ Accessibility

- حداقل اندازه لمس: 44px (iOS standard)
- پشتیبانی از `prefers-reduced-motion`
- Focus states برای keyboard navigation
- ARIA labels پشتیبانی می‌شود

## 🔧 استفاده در کامپوننت‌های جدید

برای استفاده از این استایل‌ها در کامپوننت‌های جدید:

1. فایل SCSS کامپوننت را باز کنید
2. از کلاس‌های موجود استفاده کنید
3. در صورت نیاز، استایل‌های خاص را اضافه کنید

مثال:
```scss
// در فایل component.mobile.component.scss
@import "../../../../assets/scss/styles.mobile";

// یا استفاده مستقیم از کلاس‌ها
.my-custom-component {
  @extend .cms-m-card;
  // استایل‌های خاص
}
```

## 📝 نکات مهم

1. **همیشه از CSS Variables استفاده کنید** - برای سازگاری با Dark Mode
2. **حداقل اندازه لمس 44px** - برای تجربه کاربری بهتر
3. **از Safe Area استفاده کنید** - برای iPhone X و جدیدتر
4. **RTL را در نظر بگیرید** - برای پشتیبانی از زبان‌های راست به چپ
5. **Accessibility را رعایت کنید** - برای دسترسی بهتر

## 🎨 سفارشی‌سازی

برای تغییر رنگ‌ها یا مقادیر، CSS Variables را در کامپوننت خود override کنید:

```scss
.my-component {
  --cms-m-primary-color: #your-color;
  --cms-m-spacing-md: 20px;
}
```

## 📚 مثال کامل

```html
<div class="cms-m-body loader-container">
  <app-progress-spinner></app-progress-spinner>

  <div class="cms-m-header safe-area-top">
    <div class="cms-m-header-content">
      <button class="cms-m-back-btn">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
      <h1 class="cms-m-header-title">عنوان صفحه</h1>
      <div class="cms-m-header-spacer"></div>
    </div>
  </div>

  <div class="cms-m-content safe-area-content">
    <div class="cms-m-form-field">
      <label class="cms-m-form-label">نام</label>
      <input class="cms-m-form-input" type="text" />
    </div>

    <div class="cms-m-step-actions">
      <button class="cms-m-btn cms-m-btn-secondary">بازگشت</button>
      <button class="cms-m-btn cms-m-btn-primary">ذخیره</button>
    </div>
  </div>

  <div class="cms-m-footer safe-area-bottom">
    <div class="cms-m-footer-actions">
      <button class="cms-m-btn cms-m-btn-primary cms-m-btn-submit">
        ارسال
      </button>
    </div>
  </div>
</div>
```

## 🔄 به‌روزرسانی

این فایل به صورت مداوم به‌روزرسانی می‌شود. برای اضافه کردن استایل‌های جدید:

1. استایل را به `styles.mobile.scss` اضافه کنید
2. از CSS Variables استفاده کنید
3. Dark Mode و RTL را در نظر بگیرید
4. این مستندات را به‌روز کنید

---

**تاریخ ایجاد:** 2024
**نسخه:** 1.0.0
