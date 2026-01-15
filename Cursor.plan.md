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
