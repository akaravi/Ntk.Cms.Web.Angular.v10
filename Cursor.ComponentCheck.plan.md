# Plan: بررسی کامل کامپوننت‌های پروژه

## Part 1: لیست تمام کامپوننت‌های پروژه

**تاریخ شروع:** 2026-02-02

### هدف:
- لیست تمام کامپوننت‌های پروژه
- بررسی declaration در ماژول مربوطه
- بررسی route (اگر نیاز باشد)
- بررسی خطاها

### مراحل:
1. لیست تمام فایل‌های `.component.ts` در پروژه
2. برای هر کامپوننت بررسی:
   - آیا در ماژول مربوطه declaration شده است؟
   - آیا در route تعریف شده است (اگر نیاز باشد)؟
   - آیا خطا دارد؟

### محدودیت‌ها:
- حق استفاده از اسکریپت ندارم - باید تک به تک کد نویسی کنم
- باید فقط از الگوهای موجود استفاده کنم

---

## Part 2: بررسی تک به تک کامپوننت‌ها

### 2.1 لیست کامپوننت‌ها

**تعداد کل کامپوننت‌ها:** 1628 فایل `.component.ts`

### 2.2 استراتژی بررسی

با توجه به حجم کار و محدودیت عدم استفاده از اسکریپت، بررسی به صورت زیر انجام می‌شود:

1. **بررسی ماژول به ماژول:** هر ماژول به صورت جداگانه بررسی می‌شود
2. **برای هر ماژول:**
   - بررسی فایل `.module.ts` برای declarations
   - بررسی فایل `.routing.ts` برای routes
   - بررسی خطاهای linter
3. **ثبت نتایج:** نتایج در این فایل plan ثبت می‌شوند

### 2.3 ماژول‌های پروژه

**تعداد کل ماژول‌ها:** 112 فایل `.module.ts`

---

## Part 3: بررسی ماژول Data Provider

**تاریخ:** 2026-02-06 09:31:37

### 3.1 مشکلات یافت شده

1. **Routing قدیمی:**
   - فایل `data-provider.routing.ts` هنوز کامپوننت‌های قدیمی را reference می‌کرد
   - کامپوننت‌ها به sub-modules منتقل شده‌اند اما routing به‌روزرسانی نشده بود

2. **خطاهای Declaration:**
   - برخی کامپوننت‌ها در بیش از یک ماژول declaration شده‌اند
   - خطاهای مربوط به import paths

### 3.2 تغییرات انجام شده

**فایل‌های اصلاح شده:**
- `src/app/cms-modules/data-provider/data-provider.routing.ts` - اصلاح routing برای استفاده از lazy loading

**تغییرات:**
- حذف import های قدیمی کامپوننت‌ها
- اضافه شدن lazy loading برای sub-modules (main, log, transaction, config)
- اضافه شدن routes برای dashboard و overview

### 3.3 وضعیت فعلی

- ✅ Routing اصلاح شد
- ⚠️ خطاهای declaration در `data-provider-main.module.ts` نیاز به بررسی دارند
- ⚠️ برخی کامپوننت‌ها در بیش از یک ماژول declaration شده‌اند

---

## Part 4: بررسی ماژول SMS

**تاریخ:** 2026-02-06 09:31:37

### 4.1 وضعیت فعلی

- ✅ ماژول SMS ساختار مشابه data-provider دارد
- ⚠️ 2 خطای linter در کامپوننت‌های client-permission/edit
- ✅ تمام کامپوننت‌ها در ماژول مربوطه declaration شده‌اند

### 4.2 خطاهای یافت شده

1. **خطاهای Injection Token:**
   - `SmsMainClientPermissionEditComponent` - Line 46
   - `SmsMainClientPermissionEditMobileComponent` - Line 48
   - مشکل: `No suitable injection token for parameter 'smsMainClientPermissionService'`

### 4.3 وضعیت Routing

- ✅ Routing از lazy loading استفاده می‌کند
- ✅ تمام routes درست تعریف شده‌اند

---

## Part 5: خلاصه وضعیت فعلی

### 5.1 آمار کلی

- **تعداد کل کامپوننت‌ها:** 1628 فایل `.component.ts`
- **تعداد کل ماژول‌ها:** 112 فایل `.module.ts`
- **ماژول‌های بررسی شده:** 2 (Data Provider, SMS)

### 5.2 مشکلات یافت شده

1. **Routing قدیمی در Data Provider:**
   - ✅ رفع شد - routing به lazy loading تغییر یافت

2. **خطاهای Declaration:**
   - ⚠️ برخی کامپوننت‌ها در بیش از یک ماژول declaration شده‌اند
   - ⚠️ خطاهای مربوط به import paths

3. **خطاهای Injection Token:**
   - ⚠️ 2 خطا در ماژول SMS

### 5.3 مراحل بعدی

با توجه به حجم کار (1628 کامپوننت و 112 ماژول)، بررسی تک به تک تمام کامپوننت‌ها نیاز به زمان زیادی دارد.

**پیشنهاد:**
1. بررسی ماژول به ماژول به صورت منظم
2. ثبت نتایج در این فایل plan
3. رفع خطاها به صورت تدریجی

---

## Result 1

**تاریخ:** 2026-02-06 09:31:37
**وضعیت:** ✅ Plan ایجاد شد و بررسی اولیه انجام شد

**خلاصه کارهای انجام شده:**
- ✅ فایل plan ایجاد شد
- ✅ لیست کامپوننت‌ها و ماژول‌ها جمع‌آوری شد
- ✅ ماژول Data Provider بررسی شد
- ✅ Routing قدیمی Data Provider اصلاح شد
- ✅ ماژول SMS بررسی شد

**مشکلات یافت شده:**
- ⚠️ خطاهای declaration در data-provider-main.module.ts
- ⚠️ 2 خطای injection token در SMS module

**مراحل بعدی:**
- ادامه بررسی سایر ماژول‌ها
- رفع خطاهای یافت شده

**نکته مهم:**
با توجه به حجم کار (1628 کامپوننت و 112 ماژول)، بررسی کامل تمام کامپوننت‌ها نیاز به زمان زیادی دارد. بررسی به صورت ماژول به ماژول ادامه خواهد یافت.

---

## Part 6: یادداشت مهم

**تاریخ:** 2026-02-06 09:38:24

### 6.1 یادداشت

- ⚠️ `CmsModulesWidgetModule` نباید تغییر داده شود
- این ماژول به صورت عمدی کامپوننت‌های Data Provider را declaration می‌کند
- تغییرات قبلی که در این ماژول انجام شده بود، برگردانده شد

---

## Result 2

**تاریخ:** 2026-02-06 09:38:24
**وضعیت:** ✅ فایل `CmsModulesWidgetModule` به حالت قبل برگشت

**خلاصه:**
- تغییرات قبلی در `CmsModulesWidgetModule` برگردانده شد
- این ماژول باید بدون تغییر باقی بماند

**مشکلات باقی‌مانده:**
- ⚠️ 44 خطای linter در `DataProviderMainModule`
- ⚠️ خطاهای "declared by more than one NgModule" برای 4 کامپوننت

**مراحل بعدی:**
- بررسی دقیق‌تر خطاهای `DataProviderMainModule`
- بررسی اینکه آیا کامپوننت‌ها در ماژول دیگری هم declaration شده‌اند
- **توجه:** `CmsModulesWidgetModule` نباید تغییر داده شود

---

## Part 7: بررسی ماژول Core-Main

**تاریخ:** 2026-02-06 09:40:42

### 7.1 ساختار ماژول

ماژول `core-main` دارای ساختار پیچیده‌ای است:
- **ماژول اصلی:** `CoreModule` (`core.module.ts`)
- **Shared Module:** `CoreSharedModule` (`core.shared.module.ts`)
- **Sub-modules:** 20 sub-module با routing جداگانه
- **تعداد کامپوننت‌ها:** 196 فایل `.component.ts`

### 7.2 مشکلات یافت شده

1. **خطای Syntax در `core.module.ts`:**
   - خط 214: کاما بعد از `CoreComponent` وجود ندارد
   - ✅ رفع شد

2. **Duplicate Declaration:**
   - `CoreCpMainMenuEditComponent` در سه ماژول declaration شده است:
     - `CoreSharedModule` (خط 225)
     - `CoreModule` (خط 224)
     - `CoreCpMainMenu` (خط 34)
   - ⚠️ نیاز به بررسی دارد

3. **خطاهای HTML در Mobile Components:**
   - خطاهای مربوط به missing imports در:
     - `currency/list/list.mobile.component.html`
     - `device/list/list.mobile.component.html`
   - این خطاها مربوط به missing imports در ماژول‌های sub-module هستند

4. **خطاهای Import:**
   - خطاهای import در `cp-main-menu/coreCpMainMenu.module.ts` (خطوط 54-55)
   - خطاهای import در `module/coreModule.module.ts` (خط 52)

### 7.3 وضعیت Routing

- ✅ Routing از lazy loading استفاده می‌کند
- ✅ تمام sub-modules دارای routing جداگانه هستند
- ✅ ساختار routing صحیح است

### 7.4 تغییرات انجام شده

**فایل‌های اصلاح شده:**
- `src/app/cms-modules/core-main/core.module.ts` - رفع خطای syntax (کاما بعد از `CoreComponent`)

---

## Result 3

**تاریخ:** 2026-02-06 09:40:42
**وضعیت:** ✅ بررسی ماژول Core-Main انجام شد

**خلاصه کارهای انجام شده:**
- ✅ بررسی ساختار ماژول `core-main`
- ✅ رفع خطای syntax در `core.module.ts`
- ✅ شناسایی مشکلات duplicate declaration
- ✅ شناسایی خطاهای HTML در mobile components

**مشکلات باقی‌مانده:**
- ⚠️ `CoreCpMainMenuEditComponent` در سه ماژول declaration شده است
- ⚠️ خطاهای HTML در mobile components (نیاز به بررسی imports)
- ⚠️ خطاهای import در برخی sub-modules

**مراحل بعدی:**
- بررسی و رفع مشکل duplicate declaration برای `CoreCpMainMenuEditComponent`
- بررسی خطاهای import در sub-modules
