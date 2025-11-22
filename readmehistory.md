# تاریخچه تغییرات پروژه

## 2025-11-22 11:48:40

### رفع خطاهای کامپوننت cms-json-list

**تغییرات:**

- رفع خطای استفاده همزمان از `*ngIf` و `*ngTemplateOutlet` روی یک عنصر در خط 21-22
- حذف template بازگشتی `displayJsonChild` که باعث خطای parsing می‌شد
- اصلاح ساختار `@if` block با استفاده از متد `isPrimitive` به جای `typeof` که در template expressions قابل استفاده نیست
- افزودن متدهای `isObject` و `isPrimitive` در کامپوننت برای بررسی نوع داده‌ها
- افزودن بررسی `dataModel.length > 0` برای optionMethod 2 جهت جلوگیری از خطای دسترسی به `dataModel[0]`
- اصلاح optionMethod 3 برای استفاده صحیح از `dataModel` به عنوان object
- انتقال تمام properties (`optionFields`, `optionViewHead`) به کامپوننت بازگشتی `app-cms-json-list`

**فایل‌های تغییر یافته:**

- `src/app/shared/cms-json-list/cmsJsonList.component.html`
- `src/app/shared/cms-json-list/cmsJsonList.component.ts`

---

## 2025-11-21 14:00:00

### تبدیل دکمه ORDER_CALCULATE به آیکون ماشین حساب

**تغییرات:**

- تبدیل دکمه متنی `ORDER_CALCULATE` به دکمه آیکون با Material Icon `calculate`
- اضافه کردن `title` و `aria-label` برای دسترسی‌پذیری

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/action/send-message/send-message.component.html`

---

## 2025-11-21 10:00:00

### نرمال‌سازی کاراکترهای ورودی بر اساس زبان هدف

**تغییرات:**

- تبدیل خودکار حروف تایپ‌شده به چیدمان هدف (انگلیسی ↔ فارسی) در `cmsKeyboardForce`
- نگهداری موقعیت کرسر و انتشار مجدد رویداد `input` بدون حلقه‌ی بی‌نهایت

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 10:30:00

### تعمیم دایرکتیو cmsKeyboardForce با پشتیبانی از مپ‌های سفارشی

**تغییرات:**

- افزودن ورودی‌های `cmsKeyboardForceSource` و `cmsKeyboardForceMap` برای تعیین چیدمان مبدا و مپ اختصاصی
- تعریف `DEFAULT_MAPPINGS` جهت تشخیص خودکار تبدیل‌های رایج (انگلیسی ↔ فارسی) و قابلیت توسعه برای زبان‌های بیشتر

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 11:10:00

### بهبود تشخیص چیدمان و Auto Detect در cmsKeyboardForce

**تغییرات:**

- تعیین خودکار `sourceLocale` در صورت نبود مقدار ورودی (مثلاً هدف `fa` ← مبدا `en`)
- تشخیص لحظه‌ای مپ مناسب بر اساس `InputEvent.data` در صورت نبود مپ صریح
- جلوگیری از نیاز کاربر به تعیین دستی مبدا برای حالت‌های رایج

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 11:40:00

### پشتیبانی از CAPS LOCK و SHIFT در دایرکتیو cmsKeyboardForce

**تغییرات:**

- ذخیره وضعیت کلیدهای `Shift` و `CapsLock` در رویداد `keydown`
- اعمال منطق case فقط روی نویسه‌ای که به‌تازگی درج شده تا اعداد و متن‌های قبلی تحت تاثیر قرار نگیرند
- بهبود تجربه تایپ انگلیسی هنگامی که صفحه‌کلید فارسی فعال است و بالعکس

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 12:15:00

### افزودن فلگ‌های کنترلی و قابلیت‌های کمکی به cmsKeyboardForce

**تغییرات:**

- ورودی‌های جدید برای کنترل فعال/غیرفعال بودن ویژگی‌ها: `cmsKeyboardForceInputMode`, `cmsKeyboardForceIndicator`, `cmsKeyboardForceCloneMap`, `cmsKeyboardForceNormalizePaste`, `cmsKeyboardForceSmartReplace`
- اضافه شدن hint خودکار `inputmode`، نشانگر بصری فعال بودن دایرکتیو و بازگردانی حالت قبلی بعد از blur
- امکان کلون‌کردن map سفارشی برای جلوگیری از mutation خارجی
- انتخاب نرمال‌سازی هوشمند فقط روی کاراکتر درج‌شده و قابلیت چشم‌پوشی از paste/drop

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 12:45:00

### رفع مشکل تایپ با کلید Shift در حالت تبدیل فارسی → انگلیسی

**تغییرات:**

- ذخیره `event.code` و نگاشت آن به کلیدهای فیزیکی برای استخراج کاراکتر پایه
- افزودن fallback جهت تبدیل کاراکترهای بدون مپ (مانند علائم حاصل از `Shift` در کیبورد فارسی) به متن هدف
- اطمینان از اعمال حالت حروف بزرگ طبق ترکیب `Shift`/`CapsLock`

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 13:05:00

### جلوگیری از تغییر حروفی که از قبل در زبان مقصد هستند

**تغییرات:**

- افزودن کنترل تشخیص زبان نویسه: اگر کاربر در همان زبان هدف تایپ کند (مثلاً فارسی در فیلد فارسی)، متن دست‌نخورده باقی می‌ماند
- جلوگیری از تبدیل‌های ناخواسته برای علامت‌ها و متن‌های ترکیبی

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 13:25:00

### مستندسازی کامل دایرکتیو cmsKeyboardForce

**تغییرات:**

- اضافه کردن توضیحات انگلیسی برای تمامی متدها شامل هدف و خروجی
- مستندسازی متغیرها و ثابت‌های کلیدی برای درک سریع‌تر نقش هر بخش
- بهبود خوانایی کلی فایل با کامنت‌های ساختار یافته

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 13:35:00

### حذف وابستگی LayoutDirection از دایرکتیو کیبورد

**تغییرات:**

- جایگزینی type داخلی `'ltr' | 'rtl'` به جای استفاده از `LayoutDirection` ماژول دیگر
- کاهش coupling بین `keyboard-force.directive` و `dir.directive`

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 13:50:00

### اعمال خودکار English keyboard برای فیلدهای عددی و currency

**تغییرات:**

- ایجاد دایرکتیو جدید `KeyboardForceNumberDirective` که روی همه‌ی `input[type="number"]`، `input[numberOnly]` و `input[currencyMask]` (در صورت عدم وجود `cmsKeyboardForce`) اعمال می‌شود
- مقداردهی خودکار `cmsKeyboardForce="en"`، `cmsKeyboardForceSource="en"` و جهت `ltr` برای ورودی‌های عددی
- اضافه کردن دایرکتیو به `SharedModule` تا در تمام پروژه در دسترس باشد

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force-number.directive.ts`
- `src/app/shared/shared.module.ts`

---

## 2025-11-21 13:55:00

### رفع خطای Selector برای دایرکتیو titleML

**تغییرات:**

- Escape کردن `$` در selector دایرکتیو `KeyboardForceTitleDirective` تا کامپایلر Angular خطای `Unescaped "$"` ندهد

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force-title.directive.ts`

---

## 2025-11-21 14:05:00

### افزودن ترجمه برای ACTION.BANK_PAYMENT_TRANSACTION

**تغییرات:**

- تعریف کلید جدید `ACTION.BANK_PAYMENT_TRANSACTION` در فایل‌های `en.json` و `fa.json`
- آماده‌سازی ترجمه انگلیسی و فارسی برای استفاده در دکمه‌ها/اکشن‌های مرتبط با تراکنش بانکی

**فایل‌های تغییر یافته:**

- `src/assets/i18n/en.json`
- `src/assets/i18n/fa.json`

---

## 2025-11-21 09:30:00

### محدود کردن دایرکتیو cmsKeyboardForce به همان ورودی

**تغییرات:**

- حذف وابستگی به `DOCUMENT` و عدم اعمال `lang/dir` روی کل صفحه
- ذخیره و بازگرداندن فقط ویژگی‌های `lang` و `dir` خود ورودی هنگام `focus`/`blur`

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 09:00:00

### اضافه شدن دایرکتیو cmsKeyboardForce برای اجبار زبان ورودی

**تغییرات:**

- ایجاد دایرکتیو جدید `cmsKeyboardForce` برای ذخیره زبان جاری صفحه، اعمال زبان و جهت دلخواه روی ورودی فعال (مثلاً `fa` یا `en`) و بازگرداندن تنظیمات قبلی بعد از `blur`
- پشتیبانی از تعیین جهت دلخواه (`cmsKeyboardForceDir`) یا انتخاب خودکار بر اساس زبان‌های RTL
- اضافه کردن دایرکتیو جدید به `SharedModule` برای استفاده در سراسر پروژه

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`
- `src/app/shared/shared.module.ts`

---

## 2025-11-18 15:15:00

### فعال‌سازی RouterLink در CmsFormValidationComponent

**تغییرات:**

- افزودن `RouterModule` به `imports` و `exports` ماژول `SharedModule` برای فراهم شدن دایرکتیوهای مسیریابی در تمامی کامپوننت‌های اشتراکی

**فایل‌های تغییر یافته:**

- `src/app/shared/shared.module.ts`

---

## 2025-11-18 15:25:00

### پیکربندی Prettier برای جلوگیری از شکست خطوط HTML تک‌خط

**تغییرات:**

- اضافه کردن گزینه `singleAttributePerLine: false` در `.prettierrc` تا فرمتری مانند Prettier - Code Formatter اجباراً صفات HTML را روی خطوط جداگانه نبرد و ساختار تک‌خطی حفظ شود.

**فایل‌های تغییر یافته:**

- `.prettierrc`

---

## 2025-11-18 15:40:00

### رفع خطاهای صفحه ارسال پیام (SmsActionSendMessageComponent)

**تغییرات:**

- جلوگیری از حذف تصادفی آیتم‌های `validationList` هنگام انتخاب مسیر ارسال (حذف فقط در صورت وجود `sendMessageAddTextFirst/End`)
- جلوگیری از وقوع خطای `Cannot read properties of undefined (reading 'length')` هنگام افزودن متن پیش‌فرض به پیام از طریق کنترل اختیاری `dataModel.message?.length`

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/action/send-message/send-message.component.ts`

---

## 2025-11-18 12:30:00

### حذف متدهای بدون استفاده در myself-list.component

**تغییرات:**

- حذف متدهای جدول (مرتب‌سازی، صفحه‌بندی) و اکشن‌های ویرایش/حذف/آمار که در نسخه فعلی UI استفاده نمی‌شدند
- حذف وابستگی‌های بلااستفاده شامل `MatSort`, `PageEvent`, `MatDialogConfig`, `RecordStatusEnum`, `CmsConfirmationDialogService` و کامپوننت ویرایش
- ساده‌سازی `DataGetAll` برای عدم فراخوانی متد آمار حذف‌شده

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/core-module/site-user-credit/myself-list/myself-list.component.ts`

---

## 2025-01-27 12:00:00

### اضافه کردن EventEmitter برای optionReload در کامپوننت cms-action-button-reload

**تغییرات:**

- اضافه کردن `EventEmitter` به imports کامپوننت
- حذف setter `optionReload` و متد `reload` قبلی
- ایجاد `@Output() optionReload` از نوع `EventEmitter<void>` برای ارسال event به کامپوننت مادر
- تغییر نام متد داخلی از `onActionButtonReload()` به `onActionButtonReloadClick()` برای جلوگیری از تداخل با نام `@Output`
- ساده‌سازی متد `onActionButtonReloadClick()` که فقط event `optionReload` را emit می‌کند

**فایل‌های تغییر یافته:**

- `src/app/shared/cms-action-button-reload/cms-action-button-reload.component.ts`
- `src/app/shared/cms-action-button-reload/cms-action-button-reload.component.html`
- `src/app/cms-modules/core-module/site-user-credit/myself-list/myself-list.component.html`

**نحوه استفاده در کامپوننت مادر:**

```html
<app-cms-action-button-reload
  (optionReload)="onActionButtonReload()"
></app-cms-action-button-reload>
```

**نکته:** استفاده از event binding `(optionReload)` به جای property binding `[optionReload]`

---

## 2025-11-17 08:05:00

### فراهم‌سازی دسترسی سراسری به FormSubmitedStatusEnum

**مشکل:**

- در تمام پروژه ارجاعاتی به `FormSubmitedStatusEnum` بدون `import` وجود داشت که باعث خطای `Cannot find name 'FormSubmitedStatusEnum'` می‌شد.

**راه‌حل:**

1. تعریف یک declaration فایل (`src/types/form-submited-status.d.ts`) برای اعلان سراسری این enum و هماهنگی با TypeScript.
2. تزریق مقدار واقعی enum در ابتدای اجرای برنامه از طریق `globalThis` در `src/main.ts` تا همه بخش‌ها بتوانند از مقدار runtime استفاده کنند.

**فایل‌های تغییر یافته:**

- `src/types/form-submited-status.d.ts`
- `src/main.ts`

---

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
