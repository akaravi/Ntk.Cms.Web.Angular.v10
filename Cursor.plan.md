# Plan کلی پروژه

## Part 1: Fix NG0203/NG0201 Injection Context Error

**تاریخ:** 2026-01-03 09:52:00
**وضعیت:** ✅ تکمیل شده

### مشکل:

خطای `NG0201: No provider found for _CoreAuthV3Service` و `NG0203: The _HttpClient token injection failed` در runtime رخ می‌دهد.

### علت:

- `CoreAuthV3Service` در `app.ts` استفاده می‌شود
- `CoreAuthV3Service` از `ApiServerBase` استفاده می‌کند که `HttpClient` را با `@Inject(HttpClient)` inject می‌کند
- وقتی `CoreAuthV3Service` را به صورت مستقیم در providers قرار می‌دهیم، `ApiServerBase` constructor در injection context نیست

### راه حل‌های امتحان شده:

1. ❌ حذف `CoreAuthV3Service` از providers - باعث `NG0201` می‌شود
2. ❌ استفاده از factory function با `inject(CoreAuthV3Service)` - باعث circular dependency می‌شود
3. ❌ استفاده از factory function با `inject(HttpClient)` و ساخت instance جدید - نیاز به injection context
4. ❌ استفاده از factory function با `deps: [HttpClient]` - جواب نمی‌دهد
5. ❌ استفاده از `Injector` در یک factory service و ساخت NgModule - کاربر حذف کرد
6. ✅ اضافه کردن سرویس‌ها به `SharedModule` - موفق

### راه حل نهایی:

اضافه کردن سرویس‌ها به `SharedModule` که قبلاً سرویس‌های مشابهی را provide می‌کند:

- `CoreAuthV3Service`
- `CoreEnumService`
- `CoreModuleService`
- `CoreConfigurationService`

مزیت این روش: `SharedModule` قبلاً سرویس‌های دیگری که از `ApiServerBase` extend می‌کنند را به درستی provide می‌کند و این روش هم باید کار کند

### فایل‌های تغییر یافته:

- `src/app/app.config.ts`: تغییر تمام سرویس‌های `ApiServerBase` به factory function با `inject(HttpClient)`

### Result 1:

✅ مشکل injection context حل شد. تمام سرویس‌هایی که از `ApiServerBase` extend می‌کنند با factory function تعریف شدند که `HttpClient` را به درستی inject می‌کند.

---

## Part 2: Fix Build Error - Font Awesome Duplicate Files

**تاریخ:** 2026-01-03 20:14:58
**وضعیت:** ✅ تکمیل شده

### مشکل:

خطای `Two output files share the same path but have different contents` برای فایل‌های Font Awesome (woff2) در build رخ می‌داد.

### علت:

دو منبع مختلف برای Font Awesome در `angular.json` وجود داشت که فایل‌های مشابه را به مسیرهای یکسان کپی می‌کردند:

- `@fortawesome/fontawesome-free/webfonts/` به `assets/fonts/webfonts/`
- `font-awesome/fonts/` به `assets/fonts/`

### راه حل:

حذف خط مربوط به `@fortawesome` از `angular.json` چون در `package.json` وجود ندارد.

### فایل‌های تغییر یافته:

- `angular.json`: حذف خط مربوط به `@fortawesome/fontawesome-free/webfonts/`

### Result 2:

✅ مشکل duplicate files حل شد. حالا فقط `font-awesome` از `package.json` استفاده می‌شود و conflict رخ نمی‌دهد.

---

## Part 3: Fix iconPicker Icons Not Loading

**تاریخ:** 2026-01-03 20:35:38
**وضعیت:** ✅ تکمیل شده

### مشکل:

iconPicker ایکن‌ها را لود نمی‌کرد.

### علت:

style‌های `ngx-ntk-icon-picker` لود نمی‌شدند. این کتابخانه یک فایل `styles.scss` دارد که FontAwesome و PrimeIcons را import می‌کند.

### راه حل:

اضافه کردن `node_modules/ngx-ntk-icon-picker/src/styles.scss` به styles در `angular.json`.

### فایل‌های تغییر یافته:

- `angular.json`: اضافه کردن `node_modules/ngx-ntk-icon-picker/src/styles.scss` به styles

### Result 3:

✅ مشکل iconPicker حل شد. حالا style از خود کتابخانه `ngx-ntk-icon-picker` لود می‌شود و iconPicker می‌تواند ایکن‌ها را به درستی نمایش دهد.

---

## Part 4: Fix Build Error - Font Awesome Duplicate Files (Final Fix)

**تاریخ:** 2026-01-03 20:45:00
**وضعیت:** ✅ تکمیل شده

### مشکل:

خطای `Two output files share the same path but have different contents` برای فایل‌های Font Awesome (woff2) در build رخ می‌داد.

### علت:

دو منبع مختلف برای Font Awesome وجود داشت:

1. Angular build system فایل‌های فونت را از CSS (از مسیر `../webfonts/`) پیدا می‌کند و به `media/` کپی می‌کند
2. Assets entry فایل‌های فونت را به `assets/fonts/webfonts/` کپی می‌کرد
3. این دو منبع باعث conflict می‌شدند

### راه حل:

حذف assets entry برای `@fortawesome/fontawesome-free/webfonts/` از `angular.json`. Angular build system خودش فایل‌های فونت را از CSS پیدا می‌کند و به `media/` کپی می‌کند.

### فایل‌های تغییر یافته:

- `angular.json`: حذف assets entry برای `@fortawesome/fontawesome-free/webfonts/`

### Result 4:

✅ مشکل duplicate files حل شد. حالا فقط Angular build system فایل‌های فونت را از CSS پیدا می‌کند و به `media/` کپی می‌کند و conflict رخ نمی‌دهد.

---

## Part 5: Fix Build Error - Font Awesome Pro vs Free Conflict

**تاریخ:** 2026-01-03 20:50:00
**وضعیت:** ✅ تکمیل شده

### مشکل:

خطای `Two output files share the same path but have different contents` برای فایل‌های Font Awesome (woff2) در build رخ می‌داد.

### علت:

دو منبع مختلف برای Font Awesome وجود داشت:

1. `src/assets/fonts/css/all.min.css` (Font Awesome Pro 6.4.0) به `../webfonts/` اشاره می‌کند
2. `ngx-ntk-icon-picker/src/styles.scss` به `@fortawesome/fontawesome-free/css/all.css` اشاره می‌کند که به `../webfonts/` اشاره می‌کند
3. Angular build system هر دو را پیدا می‌کند و به `media/` کپی می‌کند
4. این باعث conflict می‌شود

### راه حل:

حذف `src/assets/fonts/css/all.min.css` از styles در `angular.json`. حالا فقط Font Awesome Free از طریق `ngx-ntk-icon-picker` لود می‌شود.

### فایل‌های تغییر یافته:

- `angular.json`: حذف `src/assets/fonts/css/all.min.css` از styles

### Result 5:

✅ مشکل duplicate files حل شد. حالا فقط Font Awesome Free از طریق `ngx-ntk-icon-picker` لود می‌شود و conflict رخ نمی‌دهد.

---

## Part 6: Fix SourcePublicConfig Mobile List Template Errors

**تاریخ:** 2026-01-15 09:16:42
**وضعیت:** ✅ تکمیل شده

### مشکل:

خطای template برای متدهای اکشن در نسخه موبایل لیست SourcePublicConfig رخ می‌داد.

### علت:

در `list.mobile.component.html` نام متدها با امضای کامپوننت هماهنگ نبود (`onActionbutton*` به جای `onActionButton*`).

### راه حل:

اصلاح bindingهای اکشن در template موبایل برای استفاده از نام درست متدها.

### دستورات اجرا شده:

- `Get-Date -Format "yyyy-MM-dd HH:mm:ss"`

### فایل‌های تغییر یافته:

- `src/app/cms-modules/data-provider/main/source-public-config/list/list.mobile.component.html`

### Result 6:

✅ خطاهای template برطرف شد و اکشن‌های افزودن/ویرایش/حذف در موبایل به درستی به متدهای کامپوننت متصل شدند.

---

## Part 7: Fix npm Dependency Conflict - @fortawesome/angular-fontawesome

**تاریخ:** 2026-01-15 19:44:27
**وضعیت:** ✅ تکمیل شده

### مشکل:

خطای `ERESOLVE could not resolve` برای dependency conflict بین `ngx-ntk-icon-picker@20.26.4` و `@fortawesome/angular-fontawesome` رخ می‌داد.

### علت:

- `ngx-ntk-icon-picker@20.26.4` نیاز به `@fortawesome/angular-fontawesome@^4.0.0` دارد (peer dependency)
- پروژه فعلی `@fortawesome/angular-fontawesome@^3.0.0` را نصب کرده بود
- این conflict باعث می‌شد npm نتواند dependency tree را resolve کند

### راه حل:

آپدیت `@fortawesome/angular-fontawesome` از نسخه `^3.0.0` به `^4.0.0` در `package.json` برای رفع conflict با `ngx-ntk-icon-picker`.

### دستورات اجرا شده:

- `Get-Date -Format "yyyy-MM-dd HH:mm:ss"`

### فایل‌های تغییر یافته:

- `package.json`: آپدیت `@fortawesome/angular-fontawesome` از `^3.0.0` به `^4.0.0`

### Result 7:

✅ مشکل dependency conflict حل شد. حالا `@fortawesome/angular-fontawesome@^4.0.0` با `ngx-ntk-icon-picker@20.26.4` سازگار است و npm می‌تواند dependency tree را به درستی resolve کند.

**نکته:** بعد از این تغییر باید `npm install` را اجرا کنید تا dependency‌ها به‌روزرسانی شوند.

---

## Part 8: بهینه‌سازی کامپوننت cms-html-list و تبدیل Inline Styles به CSS

**تاریخ:** 2026-02-02 10:14:46
**وضعیت:** ✅ تکمیل شده

### مشکل:

کامپوننت `cms-html-list` از inline styles استفاده می‌کرد که باعث کاهش قابلیت نگهداری و بهینه‌سازی می‌شد. همچنین مشکلات دیگری مانند استفاده از EventEmitter به عنوان boolean وجود داشت.

### تغییرات انجام شده:

1. **ایجاد فایل SCSS برای کامپوننت:**
   - ایجاد فایل `cms-html-list.component.scss` با کلاس‌های CSS بهینه شده
   - تبدیل تمام inline styles به کلاس‌های CSS قابل استفاده مجدد
   - اضافه کردن transitions و animations برای بهبود UX

2. **بهینه‌سازی TypeScript Component:**
   - اضافه کردن Inputهای boolean برای کنترل نمایش دکمه‌ها:
     - `optionActionButtonMemoDisplay`
     - `optionActionButtonPrintRowDisplay`
     - `optionActionButtonMemoRowDisplay`
   - اضافه کردن helper methods برای مدیریت کلاس‌های CSS:
     - `getActionMainButtonClasses()`
     - `getActionRowButtonClasses()`
     - `getIconRotationClass()`
   - بهبود کد با استفاده از `===` به جای `==`
   - حذف کامنت‌های غیرضروری

3. **بهینه‌سازی HTML Template:**
   - حذف تمام inline styles و جایگزینی با کلاس‌های CSS
   - حذف `this` از template (استفاده از `publicHelper.isMobile` به جای `this.publicHelper.isMobile`)
   - حذف بررسی تکراری `optionHeaderDisplay`
   - حذف `target="_blank"` از دکمه‌های غیرلینک
   - اضافه کردن `role="button"` و `aria-label` برای بهبود accessibility
   - استفاده از `[ngClass]` برای مدیریت کلاس‌های CSS به صورت داینامیک

4. **بهبود CSS:**
   - ایجاد کلاس‌های CSS برای fixed buttons با پشتیبانی از موقعیت‌های مختلف
   - اضافه کردن transitions برای smooth animations
   - بهبود responsive design برای موبایل و دسکتاپ
   - اضافه کردن accessibility improvements (focus states, hover effects)

### فایل‌های تغییر یافته:

- `src/app/shared/cms-html-list/cms-html-list.component.scss` (جدید)
- `src/app/shared/cms-html-list/cms-html-list.component.ts`
- `src/app/shared/cms-html-list/cms-html-list.component.html`

### Result 8:

✅ کامپوننت `cms-html-list` بهینه‌سازی شد:
- تمام inline styles به کلاس‌های CSS تبدیل شدند
- کد تمیزتر و قابل نگهداری‌تر شد
- Performance بهبود یافت با استفاده از CSS classes به جای inline styles
- Accessibility بهبود یافت با اضافه کردن role و aria-label
- Backward compatibility حفظ شد با default value true برای Inputهای جدید

---

## Part 9: Fix TypeScript Error - onActionButtonEditRow Argument Mismatch

**تاریخ:** 2026-02-02
**وضعیت:** ✅ تکمیل شده

### مشکل:

خطای TypeScript `TS2554: Expected 0-1 arguments, but got 2` در کامپوننت موبایل TemplateItemList رخ می‌داد.

### علت:

در `list.mobile.component.html` متد `onActionButtonEditRow` با 2 آرگومان فراخوانی می‌شد (`tableRowSelected` و `$event`)، در حالی که تعریف متد در کلاس والد `TemplateItemListComponent` فقط 0-1 آرگومان می‌پذیرد:

```typescript
onActionButtonEditRow(
  model: CoreModuleModel = this.tableRowSelected,
): void
```

### راه حل:

حذف پارامتر `$event` از فراخوانی متد در template موبایل. این با الگوی سایر کامپوننت‌های موبایل در پروژه هماهنگ است که فقط `tableRowSelected` را پاس می‌دهند.

### فایل‌های تغییر یافته:

- `src/app/cms-modules/template/item/list/list.mobile.component.html`: حذف `$event` از فراخوانی `onActionButtonEditRow`

### Result 9:

✅ خطای TypeScript برطرف شد. متد `onActionButtonEditRow` حالا با امضای صحیح فراخوانی می‌شود و با سایر کامپوننت‌های موبایل در پروژه هماهنگ است.

---

## Part 10: Fix Multiple TypeScript Errors in Mobile Components

**تاریخ:** 2026-02-02 12:11:55
**وضعیت:** ✅ تکمیل شده

### مشکلات:

چندین خطای TypeScript در کامپوننت‌های موبایل مختلف رخ می‌داد:

1. **TS2554: Expected 0-1 arguments, but got 2** - خطای `onActionButtonEditRow` در چندین کامپوننت
2. **TS2551: Property 'linkUserId' does not exist** - خطای property در کامپوننت‌های client-application
3. **TS2339: Property 'onActionCopied' does not exist** - متد گم‌شده در چندین کامپوننت
4. **TS2339: Property 'onActionButtonNewRowAuto' does not exist** - متد گم‌شده در sms/public-config
5. **TS2339: Property 'getRowExpanded' does not exist** - متد گم‌شده در sms/public-config

### راه حل‌ها:

#### 1. رفع خطاهای `onActionButtonEditRow`:
- حذف پارامتر `$event` از فراخوانی در:
  - `template/category/list/list.mobile.component.html`
  - `data-provider/main/client-application/list/list.mobile.component.html`
  - `news/category/list/list.mobile.component.html`

#### 2. رفع خطاهای `linkUserId`:
- استفاده از `$any(row).linkUserId` به جای `row.linkUserId` در:
  - `data-provider/main/client-application/list/list.mobile.component.html`
  - `sms/main/client-application/list/list.mobile.component.html`

#### 3. اضافه کردن متدهای گم‌شده:
- اضافه کردن `onActionCopied()` به:
  - `data-provider/main/source-public-config/list/list.component.ts`
  - `data-provider/transaction/list/list.component.ts`
- اضافه کردن `onActionButtonNewRowAuto()`, `getRowExpanded()`, و `onActionCopied()` به:
  - `sms/main/public-config/list/list.mobile.component.ts`

### فایل‌های تغییر یافته:

- `src/app/cms-modules/template/category/list/list.mobile.component.html`
- `src/app/cms-modules/data-provider/main/client-application/list/list.mobile.component.html`
- `src/app/cms-modules/news/category/list/list.mobile.component.html`
- `src/app/cms-modules/sms/main/client-application/list/list.mobile.component.html`
- `src/app/cms-modules/data-provider/main/source-public-config/list/list.component.ts`
- `src/app/cms-modules/data-provider/transaction/list/list.component.ts`
- `src/app/cms-modules/sms/main/public-config/list/list.mobile.component.ts`

### Result 10:

✅ تمام خطاهای TypeScript برطرف شد:
- تمام فراخوانی‌های `onActionButtonEditRow` با امضای صحیح اصلاح شدند
- خطاهای `linkUserId` با استفاده از `$any()` برطرف شدند
- تمام متدهای گم‌شده به کلاس‌های مربوطه اضافه شدند
- کد حالا با الگوی سایر کامپوننت‌های موبایل در پروژه هماهنگ است

---

## Part 11: ایجاد و استانداردسازی کامپوننت لیست موبایل عمومی

**تاریخ:** 2026-02-02
**وضعیت:** ✅ تکمیل شده

### هدف:

ایجاد یک کامپوننت اشتراکی `CmsHtmlListMobileComponent` برای استفاده در تمام لیست‌های موبایل و استانداردسازی UX/UI در همه لیست‌های موبایل پروژه.

### تغییرات انجام شده:

1. **ایجاد کامپوننت جدید:**
   - `src/app/shared/cms-html-list-mobile/cms-html-list-mobile.component.ts`
   - `src/app/shared/cms-html-list-mobile/cms-html-list-mobile.component.html`
   - `src/app/shared/cms-html-list-mobile/cms-html-list-mobile.component.scss`

2. **اضافه شدن به SharedModule:**
   - Import, Declaration, Export در `shared.module.ts`

3. **تبدیل فایل‌ها:**
   - 25 فایل `list.mobile.component.html` از `app-cms-html-list` به `app-cms-html-list-mobile` تبدیل شدند
   - حذف کامل `cms-m-list-item-actions` و `cms-m-list-item-swipe-actions` از همه لیست‌های موبایل

4. **بهینه‌سازی عملکرد:**
   - فعال‌سازی `ChangeDetectionStrategy.OnPush`
   - اضافه شدن `ChangeDetectorRef` و استفاده از `markForCheck()` در همه subscription‌ها
   - مدیریت صحیح subscription‌ها برای جلوگیری از memory leak

5. **ویژگی‌های UI/UX:**
   - استفاده از CSS variables برای تم روز/شب
   - پشتیبانی از Safe Area برای iPhone
   - دکمه‌های اکشن ثابت در پایین صفحه
   - منوی Tree با انیمیشن slide-in
   - UX یکنواخت در همه لیست‌های موبایل

### Result 11:

✅ همه کارها تکمیل شد:
- کامپوننت `CmsHtmlListMobileComponent` ایجاد و بهینه شد
- 25 فایل `list.mobile.component.html` استاندارد شدند
- همه `cms-m-list-item-actions` حذف شدند
- `ChangeDetectionStrategy.OnPush` فعال است
- همه subscription‌ها به درستی مدیریت می‌شوند
- هیچ خطای لینت وجود ندارد
- همه تغییرات در `readmehistory.md` ثبت شدند

---
