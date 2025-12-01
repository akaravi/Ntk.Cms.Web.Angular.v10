# تاریخچه تغییرات پروژه

## 2025-12-01 11:00:00

### افزودن کلیدهای چندزبانه MESSAGE.Yes و MESSAGE.No برای کامپوننت‌های لاگ پیامک

**تغییرات:**

- افزودن کلیدهای ترجمه `MESSAGE.Yes` و `MESSAGE.No` برای نمایش مقادیر بولی (بله/خیر) در صفحات لاگ ارسال پیامک و سایر لیست‌ها
- هماهنگ‌سازی این کلیدها در همه زبان‌های فعال پروژه (fa, en, ar, de, es, fr, tr, zh, ja)

**فایل‌های تغییر یافته:**

- `src/assets/i18n/fa.json`
- `src/assets/i18n/en.json`
- `src/assets/i18n/ar.json`
- `src/assets/i18n/de.json`
- `src/assets/i18n/es.json`
- `src/assets/i18n/fr.json`
- `src/assets/i18n/tr.json`
- `src/assets/i18n/zh.json`
- `src/assets/i18n/ja.json`
- `readmehistory.md`

---

## 2025-11-30 10:05:00

### افزودن نمایش فیلدهای مهم فیلتر و ممنوعیت در کامپوننت‌های نتایج ارسال پیامک

**تغییرات:**

- افزودن ستون‌های جدید در جدول receivers برای نمایش فیلدهای مهم:
  - `messageTextForbid` - ممنوعیت متن پیام
  - `messageTextFiltering` - فیلتر متن پیام (با نمایش کاراکترهای فیلتر شده)
  - `messageNumberForbid` - ممنوعیت شماره
  - `messageNumberFiltering` - فیلتر شماره (با نمایش کاراکترهای فیلتر شده)
- افزودن هشدارهای بصری (رنگ قرمز برای ممنوعیت و رنگ زرد برای فیلتر) در جدول
- افزودن کلاس `warning-row` برای ردیف‌هایی که دارای هشدار هستند
- نمایش کاراکترهای فیلتر شده در صورت وجود
- افزودن کلیدهای ترجمه جدید به فایل‌های چندزبانه (fa.json و en.json)

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/action/send-message/send-message-calculate-result/send-message-calculate-result.component.html`
- `src/app/cms-modules/sms/action/send-message/send-message-result/send-message-result.component.html`
- `src/assets/i18n/fa.json`
- `src/assets/i18n/en.json`
- `readmehistory.md`

---

## 2025-11-30 09:55:57

### بهبود نمایش نتایج ارسال پیامک در SmsActionSendMessageResultComponent

**تغییرات:**

- اصلاح دسترسی به فیلدهای مدل از `data` به `data.item` برای دسترسی صحیح به `SmsApiSendResultModel`
- افزودن بخش نمایش خطاها (`errorMessage` و `errors`) از `ErrorExceptionResult`
- افزودن بخش نمایش هشدارها (`warnings`) از `ErrorExceptionResult`
- نمایش `toNumbers` از طریق getter `receivers` که از `data.item.toNumbers` استفاده می‌کند
- اصلاح فیلد نمایش شماره گیرنده از `receiver.toNumber` به `receiver.number` برای هماهنگی با ساختار `NumberReceverInfoModel`

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/action/send-message/send-message-result/send-message-result.component.html`
- `readmehistory.md`

---

## 2025-11-30 09:46:04

### بهبود نمایش نتایج محاسبه ارسال پیامک در SmsActionSendMessageCalculateResultComponent

**تغییرات:**

- اصلاح دسترسی به فیلدهای مدل از `data` به `data.item` برای دسترسی صحیح به `SmsApiSendOrderCalculateResultModel`
- افزودن بخش نمایش خطاها (`errorMessage` و `errors`) از `ErrorExceptionResult`
- افزودن بخش نمایش هشدارها (`warnings`) از `ErrorExceptionResult`
- نمایش `toNumbers` از طریق getter `receivers` که از `data.item.toNumbers` استفاده می‌کند
- افزودن کلیدهای ترجمه `MESSAGE.Error` و `MESSAGE.Warning` به فایل‌های چندزبانه (fa.json و en.json)

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/action/send-message/send-message-calculate-result/send-message-calculate-result.component.html`
- `src/assets/i18n/fa.json`
- `src/assets/i18n/en.json`
- `readmehistory.md`

---

## 2025-01-28 12:00:00

### افزودن مسیر Import و دکمه Import در ContactContentListComponent

**تغییرات:**

- افزودن مسیر `/contact/content/import` به routing ماژول contact برای دسترسی به صفحه Import
- افزودن متد `onActionButtonImport()` در `ContactContentListComponent` برای navigate به صفحه import
- افزودن دکمه Import در بخش `cms-action-main` کنار دکمه Add با آیکن `fa-file-import`
- افزودن کلید ترجمه `ACTION.IMPORT` به تمام فایل‌های چندزبانه (en, fa, ar, de, es, fr, tr, zh, ja)

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/contact/contact.routing.ts`
- `src/app/cms-modules/contact/content/list/list.component.ts`
- `src/app/cms-modules/contact/content/list/list.component.html`
- `src/assets/i18n/en.json`
- `src/assets/i18n/fa.json`
- `src/assets/i18n/ar.json`
- `src/assets/i18n/de.json`
- `src/assets/i18n/es.json`
- `src/assets/i18n/fr.json`
- `src/assets/i18n/tr.json`
- `src/assets/i18n/zh.json`
- `src/assets/i18n/ja.json`
- `readmehistory.md`

---

## 2025-11-28 10:36:46

### تغییر ساختار جستجو در کامپوننت cms-contact-content-drop-list به جستجوی جداگانه برای هر لیست

**تغییرات:**

- تغییر از یک فیلد جستجو مشترک به دو فیلد جستجو جداگانه
- افزودن فیلد جستجو بالای لیست اولیه (`searchTermList`)
- افزودن فیلد جستجو بالای لیست انتخاب شده (`searchTermBasket`)
- ایجاد متدهای جداگانه `highlightTextList` و `highlightTextBasket` برای highlight کردن متن در هر لیست
- به‌روزرسانی getter‌های `filteredListItems` و `filteredBasketItems` برای استفاده از `searchTermList` و `searchTermBasket` به جای `searchTerm` مشترک
- انتقال search container به داخل هر `example-container` برای قرارگیری بهتر در UI
- بهبود استایل CSS برای search container در داخل هر لیست

**فایل‌های تغییر یافته:**

- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.html`
- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.ts`
- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.scss`
- `readmehistory.md`

---

## 2025-11-28 10:34:53

### بهبود UI کامپوننت cms-contact-content-drop-list: لیست‌ها در یک ردیف، جستجو و highlight

**تغییرات:**

- قرار دادن دو لیست در کنار هم در یک ردیف با layout ریسپانسیو (با استفاده از flexbox)
- افزودن اسکرول به لیست‌ها برای نمایش بهتر زمانی که تعداد آیتم‌ها زیاد است (حداکثر ارتفاع 500px در دسکتاپ و 300px در موبایل)
- افزودن فیلد جستجو بالای دو لیست با آیکن search
- پیاده‌سازی منطق فیلتر کردن بر اساس `title`, `firstName` و `lastName` به صورت real-time
- افزودن highlight کردن متن‌های یافته شده در جستجو با رنگ زرد (#ffeb3b)
- ایجاد متد `highlightText` برای highlight کردن متن‌های match شده
- ایجاد getter‌های `filteredListItems` و `filteredBasketItems` برای فیلتر کردن بر اساس جستجو
- افزودن لیست‌های `allListItems` و `allBasketItems` برای نگهداری تمام آیتم‌ها (بدون فیلتر)
- بهبود متد `drop` برای همگام‌سازی با لیست‌های اصلی هنگام drag & drop
- اضافه کردن استایل‌های CSS برای search container و اسکرول بار زیبا
- بهبود ریسپانسیو بودن با استفاده از media queries برای صفحات کوچک (تبدیل به layout عمودی در عرض کمتر از 768px)

**فایل‌های تغییر یافته:**

- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.html`
- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.ts`
- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.scss`
- `readmehistory.md`

---

## 2025-11-28 10:25:47

### افزودن آیکن‌های + و - برای انتقال آیتم‌ها در کامپوننت cms-contact-content-drop-list

**تغییرات:**

- افزودن آیکن + (fa-solid fa-plus) در لیست اولیه برای انتقال آیتم‌ها به لیست انتخاب شده
- افزودن آیکن - (fa-solid fa-minus) در لیست انتخاب شده برای انتقال آیتم‌ها به لیست اولیه
- ایجاد متد `addToBasket` برای اضافه کردن آیتم از لیست اولیه به لیست انتخاب شده
- ایجاد متد `removeFromBasket` برای حذف آیتم از لیست انتخاب شده و بازگرداندن به لیست اولیه
- همگام‌سازی `basket` با `dataModelSelect` در متد `DataGetAll`
- به‌روزرسانی متد `drop` برای همگام‌سازی با `dataModelSelect` و `fieldsStatus` هنگام drag & drop
- افزودن استایل‌های CSS برای دکمه‌های آیکن (+ و -) با رنگ‌های مناسب

**فایل‌های تغییر یافته:**

- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.html`
- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.ts`
- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.scss`
- `readmehistory.md`

---

## 2025-11-26 15:05:17

### تکمیل ترجمه چندزبانه Info و ORDER_CALCULATE

**تغییرات:**

- افزودن کلیدهای `TITLE.Info` و `TITLE.Info_about_the_message` و ترجمه آن‌ها در تمامی زبان‌های پروژه
- تعریف ترجمه‌ی `ACTION.ORDER_CALCULATE` برای دکمه محاسبه سفارش در صفحه ارسال پیام

**فایل‌های تغییر یافته:**

- `src/assets/i18n/ar.json`
- `src/assets/i18n/de.json`
- `src/assets/i18n/en.json`
- `src/assets/i18n/es.json`
- `src/assets/i18n/fa.json`
- `src/assets/i18n/fr.json`
- `src/assets/i18n/ja.json`
- `src/assets/i18n/tr.json`
- `src/assets/i18n/zh.json`
- `readmehistory.md`

---

## 2025-11-26 11:52:18

### افزودن ترجمه چندزبانه برای Message Placeholders

**تغییرات:**

- تعریف کلیدهای `TITLE.Message_Placeholders` و توضیحات مربوط به متغیرهای Title$, FirstName$, LastName$ و تاریخ/زمان جاری
- تکمیل ترجمه این کلیدها در تمامی فایل‌های چندزبانه موجود در پروژه

**فایل‌های تغییر یافته:**

- `src/assets/i18n/ar.json`
- `src/assets/i18n/de.json`
- `src/assets/i18n/en.json`
- `src/assets/i18n/es.json`
- `src/assets/i18n/fa.json`
- `src/assets/i18n/fr.json`
- `src/assets/i18n/ja.json`
- `src/assets/i18n/tr.json`
- `src/assets/i18n/zh.json`

---

## 2025-11-25 17:07:46

### تنظیم printWidth برای افزونه Prettier

**تغییرات:**

- تنظیم مقدار `prettier.printWidth` بر روی 200 برای هماهنگی با استاندارد تیمی
- بروزرسانی فایل `.prettierrc` به‌منظور اعمال این تغییر در تمامی اجراهای افزونه Prettier - Code Formatter

**فایل‌های تغییر یافته:**

- `.prettierrc`

---

## 2025-01-27 14:30:00

### پیاده‌سازی Drag & Drop برای priority در کامپوننت‌های SMS

**تغییرات:**

- اضافه کردن قابلیت جابجایی ردیف‌ها با Drag & Drop برای فیلد `priority` در `SmsMainApiPathListComponent`
- اضافه کردن قابلیت جابجایی ردیف‌ها با Drag & Drop برای فیلد `priority` در `SmsMainApiNumberListComponent`
- پیاده‌سازی متد `onTableDropRow` مشابه `CoreCpMainMenuListComponent` برای هر دو کامپوننت
- اضافه کردن ستون `position` با آیکون `reorder` برای هر دو کامپوننت
- تغییر `sortColumn` به `priority` در `SmsMainApiNumberListComponent` (در `SmsMainApiPathListComponent` قبلاً انجام شده بود)
- اضافه کردن import های لازم (`CdkDragDrop`, `moveItemInArray`, `EditStepDtoModel`, `ActionGoStepEnum`)
- اضافه کردن `cdkDropList` و `cdkDrag` به HTML هر دو کامپوننت

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/main/api-path/list/list.component.ts`
- `src/app/cms-modules/sms/main/api-path/list/list.component.html`
- `src/app/cms-modules/sms/main/api-number/list/list.component.ts`
- `src/app/cms-modules/sms/main/api-number/list/list.component.html`

---

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

## 2025-11-27 10:15:00

### نمایش نتیجه ارسال پیامک در پاپ‌آپ اختصاصی

**تغییرات:**

- ایجاد کامپوننت `SmsActionSendMessageResultComponent` برای نمایش جزئیات نتیجه ارسال پیام در قالب پاپ‌آپ زیبا (نمایش شناسه‌ها، اعتبارها، لیست گیرندگان و ...)
- اتصال پاپ‌آپ به فرآیند ارسال پیام در `SmsActionSendMessageComponent` و فراخوانی آن بعد از موفقیت سرویس
- افزودن استایل اختصاصی، ثبت ماژول جدید در `SmsActionModule` و اضافه کردن کلیدهای چندزبانه مورد نیاز

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/action/send-message/send-message.component.ts`
- `src/app/cms-modules/sms/action/send-message/send-message-result/send-message-result.component.ts`
- `src/app/cms-modules/sms/action/send-message/send-message-result/send-message-result.component.html`
- `src/app/cms-modules/sms/action/send-message/send-message-result/send-message-result.component.scss`
- `src/app/cms-modules/sms/action/sms-action.module.ts`
- `src/assets/i18n/en.json`
- `src/assets/i18n/fa.json`

---

## 2025-11-27 10:30:00

### نمایش نتیجه محاسبه ارسال پیامک در پاپ‌آپ اختصاصی

**تغییرات:**

- ایجاد کامپوننت `SmsActionSendMessageCalculateResultComponent` برای نمایش جزئیات نتیجه محاسبه ارسال پیام در قالب پاپ‌آپ زیبا (نمایش شناسه‌ها، اعتبارها، لیست گیرندگان و ...)
- اتصال پاپ‌آپ به فرآیند محاسبه ارسال پیام در `SmsActionSendMessageComponent` و فراخوانی آن بعد از موفقیت سرویس `ServiceOrderCalculate`
- افزودن استایل اختصاصی، ثبت ماژول جدید در `SmsActionModule` و اضافه کردن کلیدهای چندزبانه مورد نیاز

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/action/send-message/send-message.component.ts`
- `src/app/cms-modules/sms/action/send-message/send-message-calculate-result/send-message-calculate-result.component.ts`
- `src/app/cms-modules/sms/action/send-message/send-message-calculate-result/send-message-calculate-result.component.html`
- `src/app/cms-modules/sms/action/send-message/send-message-calculate-result/send-message-calculate-result.component.scss`
- `src/app/cms-modules/sms/action/sms-action.module.ts`
- `src/assets/i18n/en.json`
- `src/assets/i18n/fa.json`

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
