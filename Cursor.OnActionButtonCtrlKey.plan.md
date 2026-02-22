# Plan: استفاده یکسان از event?.ctrlKey در تمام onActionButton صفحات لیست

## هدف کلی

در تمام صفحات لیست (list)، متدهای **onActionButton\*** که منجر به **مسیریابی** (router.navigate یا معادل) می‌شوند باید پارامتر اختیاری **event?: MouseEvent** داشته باشند و در صورت **Ctrl+Click** (event?.ctrlKey) با **window.open(..., "\_blank")** در تب جدید باز شوند؛ در غیر این صورت با **router.navigate** در همان پنجره هدایت شوند. الگوی مرجع: `news/content/list/list.component.ts` (مثلاً onActionButtonNewRow، onActionButtonEditRow، onActionButtonComment).

---

## Part 1: الگوی استاندارد (مرجع)

### 1.1 نمونه کد TypeScript (مرجع: news/content/list/list.component.ts)

```typescript
onActionButtonEditRow(
  model: NewsContentModel = this.tableRowSelected,
  event?: MouseEvent,
): void {
  // ... اعتبارسنجی model و دسترسی ...
  if (event?.ctrlKey) {
    this.link = "/#/news/content/edit/" + this.tableRowSelected.id;
    window.open(this.link, "_blank");
  } else {
    this.router.navigate(["/news/content/edit", this.tableRowSelected.id]);
  }
}
```

### 1.2 نمونه اتصال در HTML

- دسکتاپ/موبایل: `(click)="onActionButtonEditRow(tableRowSelected, $event)"`
- در منوی ردیف: در صورت نیاز به تب جدید، همان متد با `$event` فراخوانی شود.

### 1.3 قوانین

- هر **onActionButton\*** که فقط **router.navigate** دارد (بدون event) → اضافه کردن **event?: MouseEvent** و شرط **if (event?.ctrlKey) { window.open(...); } else { router.navigate(...); }**.
- در تمپلیت‌های **list.component.html** و **list.mobile.component.html** برای دکمه‌هایی که این متدها را صدا می‌زنند، **$event** پاس داده شود.
- متدهایی که فقط **دیالوگ** باز می‌کنند (مثل View با dialog) یا **حذف** هستند نیازی به ctrlKey ندارند؛ فقط متدهایی که **به صفحه/مسیر دیگر می‌روند**.

---

## Part 2: ماژول‌ها و کامپوننت‌هایی که الان event?.ctrlKey دارند

این فهرست صرفاً برای یکپارچگی و جلوگیری از کار تکراری است. در اجرای Plan فقط کامپوننت‌هایی که **هنوز** ctrlKey ندارند اصلاح می‌شوند.

| ماژول / مسیر                                                                                                                                                                                                              | متدهای دارای ctrlKey                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| news/content/list                                                                                                                                                                                                         | onActionButtonNewRow, onActionButtonEditRow, onActionButtonComment                |
| news/comment/list                                                                                                                                                                                                         | onActionButtonEditContent                                                         |
| article/content/list                                                                                                                                                                                                      | onActionButtonNewRow, onActionButtonEditRow, onActionButtonComment (در صورت وجود) |
| article/comment/list                                                                                                                                                                                                      | onActionButtonEditRow (با ctrlKey)                                                |
| sms/main/public-config, client-application, api-path, api-path-pagination, api-path-company, api-number                                                                                                                   | چندین onActionButton با ctrlKey                                                   |
| link-management/target-billboard-log, billboard-pattern                                                                                                                                                                   | onActionButtonViewRowLinkbillboardId, onActionButtonViewRowLinkTargetId و مشابه   |
| estate (main: contract-type, ads-type, activity-type, account-expert, account-agency؛ data: property, property-supplier, property-project, property-company, billboard؛ category-zone, category-rack؛ log/customer-order) | onActionButtonNewRow, onActionButtonEditRow و سایر لینک‌ها با ctrlKey             |
| data-provider (source, source-public-config, source-path, source-company, plan, client, client-application)                                                                                                               | onActionButton\* با ctrlKey                                                       |
| core-main/user/list, core-main/site/user-list, core-main/site/moduleList                                                                                                                                                  | چندین onActionButton با ctrlKey                                                   |
| core-module-log (site-user-credit, site-user-credit-blocked, site-credit, site-credit-blocked)                                                                                                                            | onActionButton\* با ctrlKey                                                       |
| bank-payment/public-config                                                                                                                                                                                                | onActionButton\* با ctrlKey                                                       |
| estate/data/property/quick-list                                                                                                                                                                                           | onActionButtonAdsRow, onActionButtonEditRow, onActionButtonHistoryRow با ctrlKey  |

---

## Part 3: فهرست کامپوننت‌های لیست که باید ctrlKey اضافه شود

کامپوننت‌هایی که **onActionButton\*** با **router.navigate** (یا مسیریابی معادل) دارند ولی **event?: MouseEvent** و **event?.ctrlKey** در آن متدها استفاده نشده است.

### 3.1 Ticketing

| فایل                                                | متد(های) نیازمند ctrlKey                                                                            |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ticketing/task/list/list.component.ts               | onActionButtonViewRow, onActionButtonEditRow, onActionButtonAnswerList (در صورت navigate)           |
| ticketing/answer/list/list.component.ts             | onActionButtonViewRow, onActionButtonEditRow                                                        |
| ticketing/departemen/list/list.component.ts         | onActionButtonFaq, onActionButtonTemplate, onActionButtonEditRow, onActionButtonTask (همه navigate) |
| ticketing/departemenOperator/list/list.component.ts | onActionButtonNewRow, onActionButtonEditRow, onActionButtonViewRow                                  |
| ticketing/departemenLog/list/list.component.ts      | onActionButtonEditRow, onActionButtonViewRow                                                        |
| ticketing/template/list/list.component.ts           | onActionButtonEditRow                                                                               |
| ticketing/faq/list/list.component.ts                | onActionButtonEditRow                                                                               |

### 3.2 CRM

| فایل                                                                        | متد(های) نیازمند ctrlKey                         |
| --------------------------------------------------------------------------- | ------------------------------------------------ |
| crm/main/stage/list/list.component.ts                                       | onActionButtonEditRow                            |
| crm/main/pipeline/list/list.component.ts                                    | onActionButtonEditRow                            |
| crm/main/account, activity, campaign, contact, deal, lead, opportunity/list | onActionButtonEditRow (و در صورت وجود View/Link) |

### 3.3 Web-designer

| فایل                                                | متد(های) نیازمند ctrlKey                     |
| --------------------------------------------------- | -------------------------------------------- |
| web-designer/page-template/list/list.component.ts   | onActionButtonEditRow                        |
| web-designer/page-dependency/list/list.component.ts | onActionButtonEditRow                        |
| web-designer/menu/list/list.component.ts            | onActionButtonEditRow                        |
| web-designer/log-member-info/list/list.component.ts | onActionButtonViewRow, onActionButtonEditRow |
| web-designer/intro/list/list.component.ts           | onActionButtonNewRow, onActionButtonEditRow  |

### 3.4 SMS (مواردی که فقط navigate دارند و ctrlKey ندارند)

| فایل                                                                                     | متد(های) نیازمند ctrlKey                                        |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| sms/main/client-application-permission/list/list.component.ts                            | onActionButtonEditRow (در صورت navigate و عدم وجود event)       |
| sms/main/api-path-permission, api-path-price-permission, api-number-permission/list      | onActionButtonEditRow و لینک‌های مرتبط                          |
| sms/main/message-content/list/list.component.ts                                          | در صورت وجود navigate به edit                                   |
| sms/log/outbox, outbox-task-scheduler, outbox-queue, outbox-detail, inbox, api-path/list | onActionButtonEditRow, onActionButtonViewRow (در صورت navigate) |

### 3.5 سایر ماژول‌ها

| ماژول / مسیر                                                                                                                                                                                                   | توضیح                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| polling/content/list, polling/vote/list                                                                                                                                                                        | onActionButtonNewRow, onActionButtonEditRow و لینک به vote با ctrlKey                                                                                        |
| member (group, property-alias, property-detail, property-detail-group)                                                                                                                                         | onActionButtonEditRow و در صورت وجود View                                                                                                                    |
| link-management (target, member, billboard, accounting, accounting-detail)                                                                                                                                     | onActionButtonEditRow و لینک‌های لیست با ctrlKey                                                                                                             |
| hyper-shop (content, category)                                                                                                                                                                                 | onActionButtonViewRow, onActionButtonEditRow                                                                                                                 |
| file-manager/content/list                                                                                                                                                                                      | onActionButtonNewRow, onActionButtonEditRow                                                                                                                  |
| estate (main: property-type-usage, property-type-landuse, property-detail, property-detail-group, account-agency-ads؛ log: property-history, property-expert-price, customer-order-result؛ data: property-ads) | onActionButtonEditRow و هر متد navigate دیگر                                                                                                                 |
| donate (target, target-period, target-period-sponsor, sponser, transaction, log-view)                                                                                                                          | onActionButtonEditRow, onActionButtonViewRow                                                                                                                 |
| data-provider (plan-source, plan-price, plan-client, plan/list؛ log/source, plan, client)                                                                                                                      | onActionButtonEditRow, onActionButtonViewRow                                                                                                                 |
| core-token (userBadLogin, notification, notification-log, micro-service, micro-service-log)                                                                                                                    | onActionButtonViewRow, onActionButtonEditRow, onActionButtonViewUserRow, onActionButtonViewMemberRow, onActionButtonViewSiteRow, onActionButtonViewDeviceRow |
| core-log (micro-service-status, micro-service-ping)                                                                                                                                                            | در صورت وجود متدهای navigate با event                                                                                                                        |
| transaction-assistant (همه listها)                                                                                                                                                                             | onActionButtonEditRow (و در صورت وجود View)                                                                                                                  |
| news/category/list                                                                                                                                                                                             | onActionButtonEditRow, onActionButtonViewRow در صورت navigate                                                                                                |

### 3.6 news/content/list – موارد تکمیلی

- **onActionButtonViewRow**: با دیالوگ باز می‌شود؛ در صورت تمایل به باز شدن در تب جدید می‌توان لینک مستقیم به view در نظر گرفت (اختیاری).
- **onActionButtonLinkTo**: در حال حاضر event ندارد؛ در صورت نیاز به باز شدن لینک در تب جدید با Ctrl+Click، اضافه کردن **event?: MouseEvent** و **event?.ctrlKey** با window.open.

---

## Part 4: دستور اجرا (به تفکیک مرحله)

### Part 4.1 مرحله ۱ – Ticketing

1. در هر فایل list.component.ts ماژول ticketing که در Part 3.1 آمده، برای متدهای onActionButton\* که **router.navigate** دارند:
   - پارامتر **event?: MouseEvent** اضافه شود.
   - بلافاصله قبل از **router.navigate** شرط زیر اضافه شود:
     - اگر **event?.ctrlKey**: ساخت **link** (مثلاً `"/#/ticketing/..."`) و **window.open(link, "\_blank")**.
     - وگرنه: **router.navigate** مانند قبل.
2. در فایل‌های list.component.html و list.mobile.component.html مربوطه، فراخوانی این متدها با **$event** به‌روز شود، مثلاً:
   `(click)="onActionButtonEditRow(tableRowSelected, $event)"`.

### Part 4.2 مرحله ۲ – CRM

همان الگو برای crm/main (stage, pipeline, account, activity, campaign, contact, deal, lead, opportunity): اضافه کردن **event?: MouseEvent** و **event?.ctrlKey** برای هر onActionButton\* که navigate می‌کند؛ به‌روزرسانی تمپلیت با **$event**.

### Part 4.3 مرحله ۳ – Web-designer, Polling, Member, Link-management (بقیه)

اعمال همان الگو برای فایل‌های ذکرشده در Part 3.3 و 3.5 (web-designer, polling, member, link-management).

### Part 4.4 مرحله ۴ – Hyper-shop, File-manager, Estate (بقیه), Donate, Data-provider (بقیه)

اعمال الگو برای hyper-shop, file-manager, estate (فهرست Part 3.5), donate, data-provider.

### Part 4.5 مرحله ۵ – Core-token, Core-log, Transaction-assistant, News/category

اعمال الگو برای core-token, core-log, transaction-assistant و news/category؛ در news/content/list در صورت نیاز تکمیل onActionButtonLinkTo و (اختیاری) onActionButtonViewRow.

### Part 4.6 مرحله ۶ – SMS (موارد باقی‌مانده)

بررسی و اعمال ctrlKey برای هر list در SMS که هنوز در متدهای navigate از event استفاده نکرده است (طبق Part 3.4).

---

## Part 5: بررسی نهایی

- جستجوی کلی برای **router.navigate** در **list/\*.component.ts** و اطمینان از اینکه یا متد مربوطه **event و ctrlKey** دارد یا به‌دلیل نوع اکشن (مثلاً فقط دیالوگ) استثنا شده است.
- اطمینان از اینکه در تمام تمپلیت‌های list و list.mobile که این متدها فراخوانی می‌شوند، **$event** ارسال شده است تا Ctrl+Click در مرورگر درست کار کند.

---

## Result 1

_(پس از اجرای هر مرحله، نتیجه در این بخش ثبت شود.)_

- **تاریخ:** 2026-02-22
- **مراحل انجام‌شده:** Part 4.1 (Ticketing)، بخشی از Part 4.3 (Polling، Link-management/target). Part 4.2 (CRM): بدون تغییر — همه لیست‌های CRM از دیالوگ استفاده می‌کنند، نه router.navigate.
- **فایل‌های تغییر یافته:** Ticketing: task/list، departemen/list، departemenOperator/list، departemenLog/list (TS + HTML + mobile). Polling: content/list (TS + HTML + mobile). Link-management: target/list (TS + HTML + mobile). در همه‌ی متدهای دارای router.navigate پارامتر event و شرط event?.ctrlKey با window.open اضافه شد؛ در تمپلیت‌ها $event پاس داده شد.
- **خطاهای باقی‌مانده (در صورت وجود):** هیچ. بقیه ماژول‌ها طبق Part 3 و Part 4 در مراحل بعدی قابل اعمال هستند.

---

## Result 2

_(ادامه اجرا: File-manager، Web-designer، Hyper-shop، Donate، Member.)_

- **تاریخ:** 2026-02-22
- **مراحل انجام‌شده:** Part 4.3 (ادامه)، Part 4.4 (بخش).
- **فایل‌های تغییر یافته:** File-manager content/list: onActionButtonNewRow، onActionButtonEditRow، onClickDownload با event + ctrlKey و $event در HTML/mobile. Web-designer intro/list: onActionButtonNewRow، onActionButtonEditRow. Web-designer page-template/list: onActionButtonPageList. Web-designer page-dependency/list: onActionButtonPageList. Hyper-shop category/list: onActionButtonContentList. Donate: target/list (TargetPeriodList، ViewRow)، target-period/list (DonateTargetPeriodAccountRow، TargetPeriodSponserList، TransactionsRow)، sponser/list (TargetPeriodSponserRow، TransactionsRow). Member: property-detail/list، property-detail-group/list (onActionButtonContentList). در همه‌ی تمپلیت‌های مربوط $event اضافه شد.
- **خطاهای باقی‌مانده (در صورت وجود):** هیچ.

---

## Result 3

_(ادامه اجرا: Link-management billboard و accounting؛ Core-token userBadLogin.)_

- **تاریخ:** 2026-02-22
- **مراحل انجام‌شده:** Part 4.3 (link-management)، Part 4.5 (core-token — یک نمونه).
- **فایل‌های تغییر یافته:** Link-management billboard/list: onActionButtonNewRow، onActionButtonEditRow، onActionButtonLog با event + ctrlKey و $event در list/mobile. Link-management accounting/list: onActionButtonAccountingDetail با event + ctrlKey و $event. Core-token userBadLogin/list: onActionButtonViewUserRow، onActionButtonViewMemberRow، onActionButtonViewSiteRow، onActionButtonViewDeviceRow با event + ctrlKey و $event (همچنین اصلاح شرط ViewMemberRow به linkMemberId).
- **خطاهای باقی‌مانده (در صورت وجود):** هیچ. سایر لیست‌های core-token (notification، notification-log، micro-service، micro-service-log، auth-user، auth-user-log، activation) با الگوی مشابه در مراحل بعد قابل اعمال هستند.

---

## Result 4

_(ادامه اجرا: بقیه core-token — notification، notification-log، micro-service، micro-service-log، activation، auth-user، auth-user-log.)_

- **تاریخ:** 2026-02-22
- **مراحل انجام‌شده:** Part 4.5 (core-token — تکمیل).
- **فایل‌های تغییر یافته:** Core-token notification، notification-log، micro-service، micro-service-log، activation: onActionButtonViewUserRow و onActionButtonViewSiteRow با event + ctrlKey و $event در HTML. Core-token auth-user و auth-user-log: onActionButtonViewUserRow، onActionButtonViewMemberRow (اصلاح شرط به linkMemberId)، onActionButtonViewSiteRow، onActionButtonViewDeviceRow با event + ctrlKey و $event در HTML.
- **خطاهای باقی‌مانده (در صورت وجود):** هیچ.

---

## Result 5

_(ادامه اجرا: SMS log — outbox، inbox.)_

- **تاریخ:** 2026-02-22
- **مراحل انجام‌شده:** Part 4.6 (SMS — موارد باقی‌مانده).
- **فایل‌های تغییر یافته:** SMS log outbox/list: onActionButtonDetailRow (navigate به outbox-detail)، onActionButtonPriceServicesList (navigate به api-path-pagination) با event + ctrlKey و $event در list.component.html و list.mobile.component.html. SMS log inbox/list: onActionButtonSendMessage (navigate به send-message؛ در حالت Ctrl+Click با window.open بدون state) با event + ctrlKey و $event در list.component.html.
- **خطاهای باقی‌مانده (در صورت وجود):** هیچ.

---

## Result 6

_(ادامه اجرا: SMS outbox-task-scheduler، api-path EditRow؛ Estate property-type-usage، property-type-landuse.)_

- **تاریخ:** 2026-02-22
- **مراحل انجام‌شده:** Part 4.6 (SMS — تکمیل)، Part 4.4 (Estate — نمونه‌های اضافی).
- **فایل‌های تغییر یافته:** SMS log outbox-task-scheduler/list: onActionButtonSupersedesList، onActionButtonMustSupersedesList، onActionButtonNumbersList (به bankpayment/privatesiteconfig)، onActionButtonPermitionList (به api-path-permission)، onActionButtonPriceServicesList (به api-path-pagination) با event + ctrlKey. SMS main api-path/list: onActionButtonEditRow با event + ctrlKey و $event در list و list.mobile. Estate main property-type-usage/list: onActionButtonContentDetailList با event + ctrlKey و $event. Estate main property-type-landuse/list: onActionButtonContentDetailList و onActionButtonContentList با event + ctrlKey و $event در list و list.mobile.
- **خطاهای باقی‌مانده (در صورت وجود):** هیچ.

---

_آخرین به‌روزرسانی: 2026-02-22_
