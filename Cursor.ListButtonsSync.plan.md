# Plan: تطابق دکمه‌های list.component.html با list.mobile.component.html

## هدف

اطمینان از اینکه **تمام دکمه‌ها و اکشن‌های موجود در هر فایل `list.component.html`** در فایل متناظر **`list.mobile.component.html`** همان ماژول نیز **کدنویسی شده‌اند** و هیچ موردی فراموش نشده است.

**دامنه:** تمام جفت فایل‌های list/list.mobile در `src/app/cms-modules/**/list/` (طبق Cursor.ListMobileFinalAudit.plan.md و Cursor.ListSync.plan.md).

---

## Part 1: تعریف «دکمه» و ناحیه‌های بررسی

### 1.1 چه چیز به‌عنوان دکمه/اکشن حساب می‌شود؟

| نوع                           | توضیح                                                                         | مثال در list.component.html                               |
| ----------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------- |
| **خروجی روی کامپوننت ریشه**   | هر `(optionOnAction...)` روی `<app-cms-html-list>`                            | `(optionOnActionButtonMemoRow)="onActionButtonMemoRow()"` |
| **دکمه در اسلات هدر – شروع**  | هر `<a (click)=` یا `<button` داخل `cms-action-header-start`                  | Reload، Expand/Collapse، راهنما                           |
| **دکمه در اسلات هدر – پایان** | هر `<a (click)=` یا دکمه داخل `cms-action-header-end`                         | Search، Statist، BatchView                                |
| **دکمه اصلی**                 | هر دکمه داخل `cms-action-main`                                                | افزودن (Add)                                              |
| **دکمه‌های ردیف**             | هر دکمه داخل `cms-action-row` (با ردیف انتخاب‌شده)                            | Edit، Delete، Comment، LinkTo، و دکمه‌های خاص ماژول       |
| **دکمه در جدول (per row)**    | دکمه‌هایی که در ستون Action یا داخل expandedDetail هستند و به ردیف وابسته‌اند | LinkTo(row)، منوی اکشن، کپی ID                            |

در موبایل: دکمه‌های «ردیف» معمولاً با `tableRowSelected` در **cms-action-row** نمایش داده می‌شوند؛ دکمه‌های داخل expandedDetail (مثل کپی) داخل بلوک **getRowExpanded** در قالب موبایل قرار می‌گیرند.

### 1.2 ناحیه‌های قالب (اسلات‌ها) که باید مقایسه شوند

| ناحیه در list                               | ناحیه متناظر در list.mobile                          |
| ------------------------------------------- | ---------------------------------------------------- |
| `[optionOnAction...]` روی app-cms-html-list | همان‌ها روی app-cms-html-list-mobile                 |
| `ng-container cms-action-header-start`      | `ng-container cms-action-header-start`               |
| `ng-container cms-action-header-end`        | `ng-container cms-action-header-end`                 |
| `ng-container cms-action-main`              | `ng-container cms-action-main`                       |
| `ng-container cms-action-row`               | `ng-container cms-action-row`                        |
| دکمه/لینک داخل expandedDetail (مثل کپی)     | داخل بلوک `@if (getRowExpanded(row))` در body موبایل |

---

## Part 2: چک‌لیست اجباری برای هر جفت list / list.mobile

برای **هر** ماژول دارای هر دو فایل `list.component.html` و `list.mobile.component.html`:

| #   | مورد                          | قانون                                                                                                                                                                                                                                                                                                                        | نحوه بررسی                                                          |
| --- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| B1  | **خروجی‌های optionOnAction**  | هر `(optionOnActionButton...)` که روی `<app-cms-html-list>` در list هست، روی `<app-cms-html-list-mobile>` در list.mobile هم با همان هندلر باشد.                                                                                                                                                                              | مقایسه خط اول تا ~۲۰ هر دو فایل                                     |
| B2  | **cms-action-header-start**   | هر دکمه/لینک با `(click)` در این اسلات در list، در list.mobile در همان اسلات با همان متد باشد (راهنما، Reload، Expand/Collapse و غیره).                                                                                                                                                                                      | مقایسه بلوک cms-action-header-start                                 |
| B3  | **cms-action-header-end**     | هر دکمه (Search، Statist، BatchView و غیره) در list در list.mobile هم باشد.                                                                                                                                                                                                                                                  | مقایسه بلوک cms-action-header-end                                   |
| B4  | **cms-action-main**           | دکمه افزودن (Add) و هر دکمه اصلی دیگر در list در list.mobile با همان شرط دسترسی (مثلاً accessAddRow) باشد.                                                                                                                                                                                                                   | مقایسه بلوک cms-action-main                                         |
| B5  | **cms-action-row**            | هر دکمه وابسته به ردیف انتخاب‌شده (Edit، Delete، Comment، LinkTo و دکمه‌های خاص ماژول مثل Transactions، Payment Test و غیره) در list در list.mobile با همان متد و شرط باشد. در list ممکن است `onActionButtonEditRow(tableRowSelected, $event)` و در موبایل `onActionButtonEditRow(tableRowSelected)` باشد — هر دو معتبر است. | مقایسه بلوک cms-action-row                                          |
| B6  | **دکمه‌های داخل expand/جدول** | اگر در list در expandedDetail دکمه/لینکی (مثل کپی ID، لینک به جزئیات) وجود دارد، در موبایل داخل `@if (getRowExpanded(row))` معادل آن وجود داشته باشد.                                                                                                                                                                        | مقایسه expandedDetail در list با بلوک getRowExpanded در list.mobile |

---

## Part 3: روش اجرا (مرحله‌ای)

### مرحله ۱: استخراج لیست اکشن‌ها از list.component.html

برای هر فایل `list.component.html`:

1. از خطوط ابتدایی فایل، تمام `(optionOnAction...)` را یادداشت کن.
2. داخل هر `ng-container cms-action-header-start`، `cms-action-header-end`، `cms-action-main`، `cms-action-row` تمام `(click)="..."` را استخراج کن (نام متد و در صورت نیاز پارامترها).
3. داخل `expandedDetail` یا ستون Action جدول، هر `(click)` مربوط به اکشن کاربر را یادداشت کن.

### مرحله ۲: مقایسه با list.mobile.component.html

برای همان ماژول در `list.mobile.component.html`:

1. همان `(optionOnAction...)`ها روی `app-cms-html-list-mobile` باشند.
2. همان دکمه‌ها در هر اسلات با همان متد (یا معادل موبایل) وجود داشته باشند.
3. اکشن‌های داخل expand در list در بخش expand موبایل باشند.

### مرحله ۳: اصلاح نقص‌ها

اگر در list.mobile دکمه‌ای از list وجود نداشت:

- آن را در اسلات متناظر در list.mobile با همان کلاس‌ها و استایل‌های رایج موبایل (مطابق الگوی news/content یا bank-payment/private-site-config) اضافه کن.
- از قوانین Cursor.ListSync.plan.md و theme base (AppKit Mobile) و در صورت نیاز `styles.mobile.scss` پیروی کن.

### مرحله ۴: خطایابی

پس از هر دسته تغییر: lint و در صورت امکان `ng build` برای مسیرهای تغییر یافته.

---

## Part 4: فهرست مسیرها برای بررسی (همان ۲۰۸ مسیر)

هر ردیف زیر یک مسیر `src/app/cms-modules/<مسیر>/list/` است. برای هر مسیر هر دو فایل `list.component.html` و `list.mobile.component.html` باید از نظر دکمه‌ها مطابق چک‌لیست Part 2 مقایسه و در صورت نقص اصلاح شوند.

### api-telegram

- api-telegram/bot-config, log-input, log-output, member-info, received-file, uploaded-file

### application

- application/content, intro, memberInfo, notification, source, themeConfig

### article

- article/comment, content

### bank-payment

- bank-payment/private-site-config, public-config, transaction, transaction-log

### biography

- biography/comment, content

### blog

- blog/comment, content

### catalog

- catalog/content

### chart

- chart/comment, content

### contact

- contact/content

### core-log

- core-log/avoid-duplicate, currency, email, error, member, micro-service-ping, micro-service-status, notification, report-data, sms

### core-main

- core-main/cp-main-menu, currency, device, guides, location, module, module-entity, module-entity-report-file, module-sale/header, module-sale/header-group, module-sale/invoice, module-sale/invoice-detail, module-sale/Item, module-sale/serial, site, site-category, site-category-module, site-domain-alias, user, user-claim/content, user-claim/group, user-claim/group-detail, user-claim/type, user-group, user-support-access

### core-module-data

- core-module-data/comment, memo, pin, task

### core-module-log

- core-module-log/content-count, favorite, like, report-abuse, score, show-key, site-credit, site-credit-blocked, site-user-credit, site-user-credit-blocked

### core-module

- core-module/site-credit, site-user-credit, tag

### core-token

- core-token/activation, auth-user, auth-user-log, micro-service, micro-service-log, notification, notification-log, userBadLogin

### crm/main

- crm/main/account, activity, campaign, contact, deal, lead, opportunity, opportunity/stage-history, pipeline, stage, supplier-price-list, supplier-rating

### data-provider

- data-provider/log/client, log/plan, log/source, main/client, main/client-application, main/client-application-permission, main/plan, main/plan-client, main/plan-price, main/plan-source, main/source, main/source-company, main/source-path, main/source-path-pagination, main/source-public-config, transaction

### donate

- donate/log-view, sponser, target, target-period, target-period-sponsor, transaction

### estate

- estate/category-rack, category-zone, data/billboard, data/property, data/property-ads, data/property-company, data/property-project, data/property-supplier, log/customer-order, log/customer-order-result, log/property-expert-price, log/property-history, main/account-agency, main/account-agency-ads, main/account-agency-expert, main/account-agency-work-area, main/account-expert, main/account-expert-work-area, main/activity-type, main/ads-type, main/contract-type, main/property-detail, main/property-detail-group, main/property-type-landuse, main/property-type-usage

### file-manager

- file-manager/content

### hyper-shop

- hyper-shop/category, content

### link-management

- link-management/accounting, accounting-detail, billboard, billboard-pattern, member, target, target-billboard-log

### member

- member/group, property-alias, property-detail, property-detail-group

### news

- news/category, comment, content

### polling

- polling/content, vote

### sms

- sms/log/api-path, inbox, outbox, outbox-detail, outbox-queue, outbox-task-scheduler, main/api-number, main/api-number-permission, main/api-path, main/api-path-company, main/api-path-pagination, main/api-path-permission, main/api-path-price-permission, main/client-application, main/client-application-permission, main/message-content, main/public-config

### ticketing

- ticketing/answer, departemen, departemenLog, departemenOperator, faq, task, template

### transaction-assistant

- transaction-assistant/address, cart, category, inventory, invoice, offer, order, payment, product, rating, request, shipment, supplier, tag

### web-designer

- web-designer/intro, log-member-info, menu, page, page-dependency, page-template

---

## Part 5: الگوی مرجع (news/content)

در **news/content/list** دکمه‌های list و list.mobile به‌صورت زیر تطابق دارند و به‌عنوان الگو استفاده شوند:

- **خروجی‌ها:** optionOnActionButtonMemoRow, optionOnActionButtonMemo, optionOnActionButtonExport, optionOnActionButtonPrintRow در هر دو.
- **header-start:** راهنما، Reload، Expand همه، Collapse همه در هر دو.
- **header-end:** Search، Statist، BatchView (با شرط categoryModelSelected) در هر دو.
- **action-main:** Add با accessAddRow در هر دو.
- **action-row:** Edit، Delete، Comment، LinkTo با همان متدها و شرطها در هر دو.
- **expand:** کپی ID و onActionCopied در بخش getRowExpanded در موبایل.

لیست‌هایی که دکمه‌های خاص ماژول دارند (مثل bank-payment/private-site-config با Transactions و Payment Test) باید همان دکمه‌ها در cms-action-row موبایل اضافه شوند.

---

## Part 6: اسکریپت/جستجو برای کمک به ممیزی

1. **یافتن optionOnAction در list که در list.mobile نیست:**
   برای هر مسیر، خروجی‌های `(optionOnAction` در list.component.html را با list.mobile.component.html مقایسه کن (می‌توان با یک اسکریپت Node یا دستی برای نمونه‌ها).
2. **یافتن onAction در list:**
   `rg "\(click\)=.*onAction" --glob "list.component.html" src/app/cms-modules` برای لیست کردن اکشن‌ها.
3. **بررسی وجود همان متد در list.mobile:**
   برای هر متد استخراج‌شده از list، در list.mobile همان متد در اسلات منطبق جستجو شود.

---

## Result 0: وضعیت اولیه (قبل از اجرای Plan)

- **تاریخ:** 2026-02-21
- **هدف:** ایجاد Plan برای اطمینان از عدم فراموشی هیچ دکمه در list.mobile.
- **وضعیت:** فایل Plan ایجاد شد. اجرای مرحله‌ای ممیزی و اصلاح طبق Part 2 و Part 3 در دستور کار است.
- **مرجع:** Cursor.ListSync.plan.md، Cursor.ListMobileFinalAudit.plan.md، الگوی news/content و bank-payment/private-site-config.

---

## Result 1: اجرای ممیزی و اصلاح دکمه‌های گم‌شده (2026-02-21)

- **تاریخ:** 2026-02-21
- **تعداد مسیرهای بررسی‌شده:** نمونه‌ای از ماژول‌های دارای دکمهٔ خاص (polling/content، link-management/target، target-billboard-log، sms/main/api-path-pagination).
- **تعداد مسیرهای دارای دکمهٔ گم‌شده (قبل از اصلاح):** ۵ مسیر.
- **تعداد دکمه‌های اضافه‌شده به list.mobile:** چندین دکمه در ۵ فایل.
- **مسیرهای اصلاح‌شده:**
  1. **polling/content:** اضافه شدن دکمه‌های `onActionButtonResults()` در cms-action-main و `onActionButtonResults(tableRowSelected)` در cms-action-row.
  2. **link-management/target:** اضافه شدن `onActionButtonLog()` در cms-action-main؛ `onActionButtonLog(tableRowSelected)` و `onActionButtonLinkTo(tableRowSelected)` در cms-action-row.
  3. **link-management/target-billboard-log:** اضافه شدن `onActionButtonViewRowLinkTargetId` و `onActionButtonViewRowLinkbillboardId` در cms-action-row (با شرط linkManagementTargetId/linkManagementBillboardId)؛ اضافه شدن دکمهٔ `onActionBackToParent()` در cms-action-header-start با شرط requestLinkManagementBillboardId/requestLinkManagementTargetId.
  4. **sms/main/api-path-pagination:** اضافه شدن دکمهٔ `onActionButtonCopyRow(tableRowSelected)` در cms-action-row.
- **نتیجه build:** بیلد در حال اجرا؛ پس از اتمام در صورت خطا اصلاح خواهد شد.
- **اقدام پیشنهادی بعدی:** ادامهٔ ممیزی برای سایر مسیرهایی که در list دارای دکمهٔ BackToParent یا دکمهٔ خاص ماژول هستند و در list.mobile فاقد آن‌اند.

---

## Result 2: ارث‌بری list.mobile از list در sms/main/api-path-pagination (2026-02-21)

- **تاریخ:** 2026-02-21
- **هدف:** کاهش تکرار کد با ارث‌بری کامپوننت موبایل از کامپوننت دسکتاپ (list).
- **تغییر:** `SmsMainApiPathPaginationListMobileComponent` از `SmsMainApiPathPaginationListComponent` ارث می‌برد (به‌جای `ListBaseComponent`). تمام منطق و پراپرتی‌های مشترک حذف شد؛ فقط اعضای مخصوص موبایل (Pull-to-Refresh، Swipe، منوی اکشن، getRowExpanded و غیره) در list.mobile.component.ts باقی ماند.
- **فایل:** `src/app/cms-modules/sms/main/api-path-pagination/list/list.mobile.component.ts`
- **سابقه:** در readmehistory.md ثبت شد.

---

## Result 3: ارث‌بری تمام list.mobile‌های باقی‌مانده از list.component (2026-02-21)

- **تاریخ:** 2026-02-21
- **هدف:** اصلاح تمام فایل‌های list.mobile.component.ts که هنوز از ListBaseComponent ارث می‌بردند تا از list.component همان ماژول ارث ببرند.
- **تعداد فایل‌های اصلاح‌شده:** ۱۷ فایل (علاوه بر api-path-pagination که در Result 2 انجام شده بود).
- **مسیرها:** sms/main (public-config، message-content، api-path، api-path-price-permission، api-path-permission، api-path-company، api-number، api-number-permission)، sms/log (outbox، outbox-task-scheduler، outbox-queue، outbox-detail، inbox، api-path)، estate/category-rack، data-provider/main/source-path.
- **نتیجه:** دیگر هیچ list.mobile.component.ts از ListBaseComponent ارث نمی‌برد؛ همه از کلاس list.component متناظر ارث می‌برند.
- **سابقه:** در readmehistory.md ثبت شد.

---

## Result 2: ادامهٔ اضافه کردن دکمهٔ BackToParent به list.mobile (2026-02-21)

- **تاریخ:** 2026-02-21
- **اقدام:** دکمهٔ «بازگشت به والد» (`onActionBackToParent()`) در **cms-action-header-start** برای مسیرهایی که در list وجود داشت و در list.mobile نبود، اضافه شد.
- **مسیرهای اصلاح‌شده (BackToParent):**
  - sms/main/api-path-permission (شرط: requestLinkApiPathId?.length > 0)
  - sms/log/outbox-detail
  - sms/log/api-path
  - sms/main/api-path (شرط: requestLinkCompanyId?.length > 0)
  - sms/main/api-number (شرط: requestLinkApiPathId?.length > 0)
  - sms/main/api-number-permission (شرط: requestLinkApiNumberId?.length > 0)
  - sms/log/inbox (شرط: requestLinkPrivateConfigId?.length > 0)
  - hyper-shop/content
  - ticketing/departemenLog (شرط: requestDepartemenId > 0)
  - news/comment (شرط: requestContentId > 0)
  - application/memberInfo (شرط: requestLinkApplicationId > 0)
- **نتیجه build:** در صورت اجرا گزارش شود.

---

## Result 3: ادامهٔ اضافه کردن دکمهٔ BackToParent به list.mobile (2026-02-21)

- **تاریخ:** 2026-02-21
- **اقدام:** دکمهٔ «بازگشت به والد» در **cms-action-header-start** برای مسیرهای باقی‌مانده اضافه شد.
- **مسیرهای اصلاح‌شده (BackToParent):**
  - chart/comment
  - polling/vote
  - core-token/auth-user (شرط: requestLinkSiteId > 0)
  - core-token/auth-user-log (شرط: requestLinkSiteId > 0)
  - core-main/device (شرط: requestLinkSiteId > 0)
  - blog/comment (شرط: requestContentId > 0)
  - web-designer/intro (شرط: requestLinkPageId > 0)
  - biography/comment
  - article/comment (شرط: requestContentId > 0)
  - core-log/sms (شرط: requestLinkSiteId > 0)
  - api-telegram/log-input (شرط: requestLinkBotConfigId > 0)
  - api-telegram/log-output (شرط: requestLinkBotConfigId > 0)
  - application/themeConfig (شرط: requestLinkSourceId > 0)
