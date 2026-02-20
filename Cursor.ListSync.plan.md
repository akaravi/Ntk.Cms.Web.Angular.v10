# Plan: تطابق list.component.html با list.mobile.component.html

## هدف کلی

برای هر جفت `list.component.html` / `list.mobile.component.html` در پروژه:

1. **تصویر**: اگر در list.component.html از property برای نمایش عکس استفاده شده (مثلاً linkMainImageIdSrc)، همان property در list.mobile.component.html برای نمایش عکس استفاده شود. در مواردی که هیچ property برای عکس وجود ندارد، در list.mobile به‌جای عکس، recordStatus نمایش داده شود.
2. **بخش extend**: هر property که در list.component.html در بخش extend (expandedDetail/expandedTitle) است، در list.mobile.component.html هم در بخش expand (getRowExpanded) باشد.
3. **اسکرول بی‌نهایت**: فایل‌های list.mobile وقتی به پایین صفحه می‌رسند به‌صورت خودکار صفحه بعد را لود و به انتهای لیست اضافه کنند.
4. **خطایابی**: بعد از هر تغییر، خطایابی (lint/build) انجام شود.

---

## Part 1: لیست جفت فایل‌های list / list.mobile

جفت فایل‌هایی که هر دو list.component.html و list.mobile.component.html در همان پوشه وجود دارند (در `src/app/cms-modules`):

- application/memberInfo, application/notification
- api-telegram/bot-config, log-input, log-output, member-info, received-file, uploaded-file
- article/comment, content
- bank-payment/private-site-config, public-config, transaction, transaction-log
- biography/comment, content
- blog/content, comment
- catalog/content
- chart/content, comment
- contact/content
- core-log/avoid-duplicate, currency, email, error, member, micro-service-ping, micro-service-status, notification, report-data, sms
- core-main/cp-main-menu, currency, device, guides, location, module, module-entity, module-entity-report-file, site, site-category, site-domain-alias, site-category-module, user, user-group, user-claim/type, user-claim/group, user-claim/group-detail, user-claim/content, user-support-access, module-sale/header, module-sale/header-group, module-sale/invoice, module-sale/invoice-detail, module-sale/Item, module-sale/serial
- core-module/site-credit, site-user-credit, tag
- core-module-data/comment, memo, pin, task
- core-module-log/like, score, content-count, report-abuse, site-credit, favorite, site-user-credit, site-credit-blocked, site-user-credit-blocked, show-key
- core-token/activation, auth-user, auth-user-log, micro-service, micro-service-log, notification, notification-log, userBadLogin
- crm/main/account, activity, campaign, contact, deal, lead, opportunity, pipeline, stage, supplier-rating, supplier-price-list
- data-provider/main/client, client-application, client-application-permission, plan, plan-client, plan-price, plan-source, source, source-company, source-path, source-path-pagination, source-public-config, transaction, log/client, log/plan, log/source
- donate/log-view, sponser, target, target-period, target-period-sponsor, transaction
- estate/log/customer-order, customer-order-result, property-expert-price, property-history; estate/main/account-agency, account-agency-ads, account-agency-expert, account-agency-work-area, account-expert, activity-type, ads-type, contract-type, property-detail, property-detail-group, property-type-landuse, property-type-usage; estate/data/billboard, property, property-ads, property-company, property-project, property-supplier; estate/category-rack, category-zone
- hyper-shop/category, content
- link-management/accounting, accounting-detail, billboard, billboard-pattern, member, target, target-billboard-log
- news/category, content, comment
- polling/content, vote
- sms/main/api-number, api-number-permission, api-path, api-path-company, api-path-permission, api-path-price-permission, api-path-pagination, client-application, message-content, public-config; sms/log/api-path, inbox, outbox, outbox-detail, outbox-queue, outbox-task-scheduler
- ticketing/answer, departemen, departemenLog, departemenOperator, faq, task, template
- transaction-assistant/address, cart, category, inventory, invoice, offer, order, payment, product, rating, request, shipment, supplier, tag
- web-designer/intro, log-member-info, menu, page, page-dependency, page-template
- application/content, intro, source, themeConfig
- file-manager/content
- member/group, property-alias, property-detail, property-detail-group
- data-provider/main/source (if mobile exists)

(همه مسیرهای دارای list.mobile.component.html در cms-modules به‌صورت بالا در نظر گرفته شده‌اند.)

---

## Part 2: قوانین اجرا برای هر فایل

### 2.1 تصویر

- از list.component.html ستون/بخش مربوط به تصویر را پیدا کن (معمولاً `linkMainImageIdSrc` یا `linkImageIdSrc`).
- در list.mobile.component.html در بلوک نمایش هر ردیف:
  - اگر آن property وجود دارد: تصویر را با همان property نمایش بده (با fallback به placeholder در صورت خالی بودن).
  - اگر هیچ property تصویر در list.component نیست: به‌جای تصویر، recordStatus را در همان ناحیه نمایش بده (با آیکون/رنگ وضعیت).

### 2.2 بخش extend

- در list.component.html بخش `expandedDetail` (و در صورت وجود `expandedTitle`) را بررسی کن و تمام propertyهای نمایش‌داده‌شده را یادداشت کن.
- در list.mobile.component.html داخل بلوک `@if (getRowExpanded(row))` همان propertyها را با همان معنا نمایش بده (عنوان، تاریخ، توضیحات، کپی ID و ...).

### 2.3 اسکرول بی‌نهایت

- در کامپوننت مشترک موبایل (app-cms-html-list-mobile) یا در قالب موبایل، وقتی اسکرول به پایین رسید، رویداد/خروجی برای «لود صفحه بعد» فراخوانی شود.
- در list (base یا هر list) متد `onActionLoadNextPage()` پیاده شود تا صفحه بعد را بگیرد و به `dataModelResult.listItems` اضافه کند (بدون جایگزینی کل لیست).
- در list.mobile.component.html اتصال فراخوانی لود صفحه بعد به این رویداد انجام شود.

### 2.4 خطایابی

- بعد از هر دسته تغییر: `ng build` یا lint برای مسیرهای تغییر یافته اجرا شود.

---

## Part 3: اجرای مرحله‌ای

### مرحله 1: زیرساخت اسکرول بی‌نهایت و لود صفحه بعد

- اضافه کردن در listBaseComponent: `getFilterModel()` و `onActionLoadNextPage()` با لود صفحه بعد و append به listItems.
- اضافه کردن در cms-html-list-mobile: تشخیص اسکرول به پایین و خروجی (مثلاً optionOnScrollNearBottom) و اتصال به (scroll).

### مرحله 2: تطابق تصویر و extend و اتصال لود بعد

- برای هر ماژول/لیست: تطابق تصویر (همان property یا recordStatus)، تطابق extend، و اتصال (optionOnScrollNearBottom) به onActionLoadNextPage در list.mobile.component.html.
- در صورت نیاز override کردن getFilterModel() در list.component برای لیست‌هایی که filter سفارشی (مثلاً filterModelCompiler) دارند.

### مرحله 3: خطایابی

- بعد از هر Part یا دسته فایل: lint و در صورت امکان build.

---

## Result 1: اجرای Part 1 و زیرساخت اسکرول و نمونه – 2026-02-20

**انجام‌شده:**

1. **فایل Plan** (`Cursor.ListSync.plan.md`) ایجاد شد و کلیه جفت list/list.mobile در cms-modules در Part 1 فهرست شدند.

2. **اسکرول بی‌نهایت (دریافت خودکار صفحه بعد):**
   - در `cms-html-list-mobile.component.ts`: خروجی `optionOnScrollNearBottom` و متد `onScrollBody(event)` اضافه شد؛ با رسیدن اسکرول به نزدیک پایین، این خروجی emit می‌شود.
   - در `cms-html-list-mobile.component.html`: روی `div.cms-html-list-mobile-body` رویداد `(scroll)="onScrollBody($event)"` اضافه شد.
   - در `cms-html-list-mobile.component.scss`: برای `.cms-html-list-mobile-body` مقدار `max-height: 70dvh` و `overflow-y: auto` تنظیم شد تا ناحیه اسکرول داشته باشد.

3. **لود صفحه بعد در Base:**
   - در `listBaseComponent.ts`: متدهای `getFilterModel()` و `onActionLoadNextPage()` اضافه شد. `onActionLoadNextPage()` صفحه بعد را با همان فیلتر می‌گیرد و آیتم‌ها را به `dataModelResult.listItems` و `tableSource.data` اضافه می‌کند. برای سرویس‌هایی که `ServiceGetAll` ندارند، با بررسی `typeof svc.ServiceGetAll` از خطا جلوگیری شده است.

4. **اتصال در موبایل:**
   - در **۶۱ فایل** `list.mobile.component.html` (همهٔ آن‌هایی که الگوی `>\n  <ng-container` داشتند) بایندینگ `(optionOnScrollNearBottom)="onActionLoadNextPage()"` اضافه شد.
   - در دو کامپوننت **core-log/micro-service-ping** و **core-log/micro-service-status** (که از ListBaseComponent ارث نمی‌برند) این بایندینگ اضافه نشده است تا خطای کامپایل ایجاد نشود.

5. **تطابق تصویر و extend برای bank-payment/private-site-config:**
   - در `list.mobile.component.html`: اگر `row['linkMainImageIdSrc']` مقدار داشته باشد، تصویر با همان property و پایپ `cmsthumbnail` نمایش داده می‌شود؛ در غیر این صورت در ناحیه تصویر فقط `recordStatus` (با آیکون وضعیت) نمایش داده می‌شود.
   - عنوان ردیف: `row?.title` در صورت وجود، وگرنه `"ID: " + row.id`.
   - `optionSelectRowItemTitle` با list.component هماهنگ شد: `tableRowSelected?.title || tableRowSelected?.id`.
   - فیلدهای اصلی: `linkSiteId` (با cmssiteinfo)، `linkPublicConfigId` (با cmstitle)، `updatedDate`، `recordStatus` در بخش محتوا و در بخش expand همان createdDate و کپی ID.
   - دکمه‌های **Transactions** و **Payment Test** در `cms-action-row` موبایل اضافه شدند.
   - حذف `type="button"` از تگ‌های `<a>` در همین فایل.

6. **خطایابی:**
   - بیلد با `npm run build --configuration=development` با موفقیت انجام شد.

**باقیمانده (برای مراحل بعد):**

- در لیست‌هایی که فیلتر سفارشی (مثلاً filterModelCompiler) دارند، در صورت نیاز override کردن `getFilterModel()` در list.component برای رفتار صحیح لود صفحه بعد.

---

## Result 2: رفع لود یک‌باره و تصویر در موبایل – 2026-02-20

**۱) لود خودکار صفحه‌های بعدی (اسکرول بی‌نهایت):**

- در `listBaseComponent.ts` یک گارد همگام **`_loadingNextPage`** اضافه شد تا با فراخوانی هم‌زمان یا پشت‌سرهم `onActionLoadNextPage`، فقط یک درخواست فعال باشد و پس از `complete` دوباره لود امکان‌پذیر شود؛ در نتیجه صفحه‌های ۲، ۳ و بعدی به‌درستی به لیست اضافه می‌شوند.

**۲) تصویر در موبایل (مرحله ۲):**

- در **۱۹۰ فایل** `list.mobile.component.html` آیکون ثابت داخل **`cms-m-list-item-image-placeholder`** با **`row.recordStatus | statusIconClass`** (یا `item.recordStatus` در لیست‌هایی که متغیر حلقه `item` است) جایگزین شد تا در ناحیه تصویر، در صورت نبود عکس، وضعیت رکورد نمایش داده شود.
- در **news/content**: بلوک تصویر با **`linkMainImageIdSrc`** (در صورت وجود) و در غیر این صورت همان placeholder با recordStatus؛ فیلدهای **title** و **description** به بخش expand اضافه شدند.
- در **application/memberInfo**: بلوک تصویر با **`row['linkMainImageIdSrc']`** (به‌خاطر نوع مدل) و در غیر این صورت placeholder با recordStatus.
- در **bank-payment/public-config**: در قسمت placeholder به‌جای آیکون ثابت، **recordStatus** نمایش داده می‌شود.
- استثناها: **core-log/micro-service-ping** (مدل بدون recordStatus) با آیکون قبلی (fa-signal) نگه داشته شد؛ **data-provider/main/client-application-permission** با متغیر **`item`** با **`item.recordStatus`** اصلاح شد.
- بیلد با موفقیت انجام شد.
