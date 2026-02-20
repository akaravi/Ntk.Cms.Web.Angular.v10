# Plan: بررسی نهایی list.mobile – هیچ موردی از قلم نیفتد (MUST DO)

## هدف

بررسی **همه** فایل‌های `list.mobile.component.html` و `list.mobile.component.ts` در `src/app/cms-modules` طبق قوانین Plan ListSync و اطمینان از اینکه **هیچ فعالیتی از قلم نیفتاده است**.

**تعداد کل:** 208 مسیر (هر مسیر شامل list.mobile.component.html + list.mobile.component.ts).

---

## Part 1: چک‌لیست اجباری برای هر list.mobile.component.html

برای **هر** فایل `list.mobile.component.html` باید موارد زیر بررسی و در صورت نقص اصلاح شود:

| #   | مورد                      | قانون                                                                                                                                                                                                                                                                                                                                                                                                                    | وضعیت پیش‌فرض                     |
| --- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| H1  | **تصویر**                 | اگر در `list.component.html` همان ماژول از property تصویر (مثلاً `linkMainImageIdSrc` یا `linkImageIdSrc`) استفاده شده، در موبایل در **بلوک تصویر هر ردیف** باید: در صورت وجود مقدار، تصویر با همان property نمایش داده شود؛ در غیر این صورت **فقط** placeholder با **recordStatus** (آیکون وضعیت). اگر در list اصلاً ستون/property تصویر نیست، در موبایل فقط **recordStatus** در ناحیه تصویر.                           | بررسی دستی هر ماژول               |
| H2  | **بخش expand**            | هر property که در `list.component.html` در **expandedDetail** (و در صورت وجود expandedTitle) نمایش داده می‌شود، باید در موبایل داخل **`@if (getRowExpanded(row))`** با همان معنا نمایش داده شود (id با کپی، title، تاریخ‌ها، توضیحات، فیلدهای اضافه و ...). اگر list اصلاً expand ندارد، موبایل هم نباید بلوک expand داشته باشد یا فقط در صورت استفاده اختیاری.                                                          | بررسی دستی هر ماژول               |
| H3  | **اسکرول بی‌نهایت**       | روی تگ **`<app-cms-html-list-mobile>`** باید بایندینگ **`(optionOnScrollNearBottom)="onActionLoadNextPage()"`** وجود داشته باشد. **استثنا:** لیست‌هایی که از ListBaseComponent ارث نمی‌برند یا از app-cms-html-list-mobile استفاده نمی‌کنند: **core-log/micro-service-ping**, **core-log/micro-service-status**, **crm/main/opportunity/stage-history**, **crm/main/supplier-price-list**, **crm/main/supplier-rating**. | جستجو: `optionOnScrollNearBottom` |
| H4  | **عنوان ردیف انتخاب‌شده** | **`[optionSelectRowItemTitle]`** باید با list.component هماهنگ باشد (مثلاً `tableRowSelected?.title \|\| tableRowSelected?.id` یا معادل برای مدل بدون title).                                                                                                                                                                                                                                                            | بررسی نمونه‌ها                    |
| H5  | **بدون $any**             | در قالب موبایل از **`$any()`** استفاده نشود؛ از propertyهای واقعی مدل یا fallback (مثل row.id) استفاده شود.                                                                                                                                                                                                                                                                                                              | جستجو: `$any`                     |
| H6  | **Footer هنگام لود**      | (اختیاری/آینده) هنگام لود صفحه بعد، محتوای **`[cms-footer]`** می‌تواند با شرط لود مخفی شود تا فقط لودینگ پایین لیست دیده شود. در حال حاضر در پروژه پیاده‌سازی نشده؛ در صورت نیاز می‌توان به shared یا هر قالب اضافه کرد.                                                                                                                                                                                                 | فعلاً skip                        |

---

## Part 2: چک‌لیست اجباری برای هر list.mobile.component.ts

| #   | مورد                       | قانون                                                                                                                                                                                                                                  | وضعیت پیش‌فرض                                 |
| --- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| T1  | **ارث‌بری**                | کلاس باید از **کامپوننت لیست دسکتاپ همان ماژول** ارث ببرد (مثلاً `extends EstatePropertyListComponent`). **استثنا:** core-log/micro-service-ping و core-log/micro-service-status که ممکن است از base دیگری ارث ببرند.                  | بررسی دستی                                    |
| T2  | **getRowExpanded**         | اگر در قالب موبایل از **`getRowExpanded(row)`** استفاده شده، در فایل .ts باید متد **`getRowExpanded(row: any): boolean`** وجود داشته باشد و معمولاً `(row as any).expanded === true` برگرداند.                                         | جستجو: `getRowExpanded`                       |
| T3  | **contentService در قالب** | اگر در list.mobile.component.html از **contentService** (مثلاً برای recordStatus self-save) استفاده شده، در list.component.ts (پدر) یا list.mobile.component.ts فیلد **contentService** باید **public** باشد تا در قالب در دسترس باشد. | جستجو: `contentService` در html + تعریف در ts |
| T4  | **متدهای action**          | متدهای مورد استفاده در قالب (مثل onActionButtonEditRow، onActionTableRowSelect و ...) یا در کلاس پدر (list.component) تعریف شده‌اند یا در list.mobile.component.ts؛ در غیر این صورت خطای کامپایل.                                      | lint/build                                    |

---

## Part 3: فهرست کامل مسیرها برای بررسی (208 مسیر)

هر ردیف = یک مسیر زیر `src/app/cms-modules/<مسیر>/list/` که شامل `list.mobile.component.html` و `list.mobile.component.ts` است. پس از بررسی هر مسیر، در ستون‌های H1–H6 و T1–T4 می‌توانی OK یا نقص را یادداشت کنی.

### api-telegram

- api-telegram/bot-config
- api-telegram/log-input
- api-telegram/log-output
- api-telegram/member-info
- api-telegram/received-file
- api-telegram/uploaded-file

### application

- application/content
- application/intro
- application/memberInfo
- application/notification
- application/source
- application/themeConfig

### article

- article/comment
- article/content

### bank-payment

- bank-payment/private-site-config
- bank-payment/public-config
- bank-payment/transaction
- bank-payment/transaction-log

### biography

- biography/comment
- biography/content

### blog

- blog/comment
- blog/content

### catalog

- catalog/content

### chart

- chart/comment
- chart/content

### contact

- contact/content

### core-log

- core-log/avoid-duplicate
- core-log/currency
- core-log/email
- core-log/error
- core-log/member
- core-log/micro-service-ping ← استثنا: بدون optionOnScrollNearBottom
- core-log/micro-service-status ← استثنا: بدون optionOnScrollNearBottom
- core-log/notification
- core-log/report-data
- core-log/sms

### core-main

- core-main/cp-main-menu
- core-main/currency
- core-main/device
- core-main/guides
- core-main/location
- core-main/module
- core-main/module-entity
- core-main/module-entity-report-file
- core-main/module-sale/header
- core-main/module-sale/header-group
- core-main/module-sale/invoice
- core-main/module-sale/invoice-detail
- core-main/module-sale/Item
- core-main/module-sale/serial
- core-main/site
- core-main/site-category
- core-main/site-category-module
- core-main/site-domain-alias
- core-main/user
- core-main/user-claim/content
- core-main/user-claim/group
- core-main/user-claim/group-detail
- core-main/user-claim/type
- core-main/user-group
- core-main/user-support-access

### core-module-data

- core-module-data/comment
- core-module-data/memo
- core-module-data/pin
- core-module-data/task

### core-module-log

- core-module-log/content-count
- core-module-log/favorite
- core-module-log/like
- core-module-log/report-abuse
- core-module-log/score
- core-module-log/show-key
- core-module-log/site-credit
- core-module-log/site-credit-blocked
- core-module-log/site-user-credit
- core-module-log/site-user-credit-blocked

### core-module

- core-module/site-credit
- core-module/site-user-credit
- core-module/tag

### core-token

- core-token/activation
- core-token/auth-user
- core-token/auth-user-log
- core-token/micro-service
- core-token/micro-service-log
- core-token/notification
- core-token/notification-log
- core-token/userBadLogin

### crm/main

- crm/main/account
- crm/main/activity
- crm/main/campaign
- crm/main/contact
- crm/main/deal
- crm/main/lead
- crm/main/opportunity
- crm/main/opportunity/stage-history
- crm/main/pipeline
- crm/main/stage
- crm/main/supplier-price-list
- crm/main/supplier-rating

### data-provider

- data-provider/log/client
- data-provider/log/plan
- data-provider/log/source
- data-provider/main/client
- data-provider/main/client-application
- data-provider/main/client-application-permission
- data-provider/main/plan
- data-provider/main/plan-client
- data-provider/main/plan-price
- data-provider/main/plan-source
- data-provider/main/source
- data-provider/main/source-company
- data-provider/main/source-path
- data-provider/main/source-path-pagination
- data-provider/main/source-public-config
- data-provider/transaction

### donate

- donate/log-view
- donate/sponser
- donate/target
- donate/target-period
- donate/target-period-sponsor
- donate/transaction

### estate

- estate/category-rack
- estate/category-zone
- estate/data/billboard
- estate/data/property
- estate/data/property-ads
- estate/data/property-company
- estate/data/property-project
- estate/data/property-supplier
- estate/log/customer-order
- estate/log/customer-order-result
- estate/log/property-expert-price
- estate/log/property-history
- estate/main/account-agency
- estate/main/account-agency-ads
- estate/main/account-agency-expert
- estate/main/account-agency-work-area
- estate/main/account-expert
- estate/main/account-expert-work-area
- estate/main/activity-type
- estate/main/ads-type
- estate/main/contract-type
- estate/main/property-detail
- estate/main/property-detail-group
- estate/main/property-type-landuse
- estate/main/property-type-usage

### file-manager

- file-manager/content

### hyper-shop

- hyper-shop/category
- hyper-shop/content

### link-management

- link-management/accounting
- link-management/accounting-detail
- link-management/billboard
- link-management/billboard-pattern
- link-management/member
- link-management/target
- link-management/target-billboard-log

### member

- member/group
- member/property-alias
- member/property-detail
- member/property-detail-group

### news

- news/category
- news/comment
- news/content

### polling

- polling/content
- polling/vote

### sms

- sms/log/api-path
- sms/log/inbox
- sms/log/outbox
- sms/log/outbox-detail
- sms/log/outbox-queue
- sms/log/outbox-task-scheduler
- sms/main/api-number
- sms/main/api-number-permission
- sms/main/api-path
- sms/main/api-path-company
- sms/main/api-path-pagination
- sms/main/api-path-permission
- sms/main/api-path-price-permission
- sms/main/client-application
- sms/main/client-application-permission
- sms/main/message-content
- sms/main/public-config

### ticketing

- ticketing/answer
- ticketing/departemen
- ticketing/departemenLog
- ticketing/departemenOperator
- ticketing/faq
- ticketing/task
- ticketing/template

### transaction-assistant

- transaction-assistant/address
- transaction-assistant/cart
- transaction-assistant/category
- transaction-assistant/inventory
- transaction-assistant/invoice
- transaction-assistant/offer
- transaction-assistant/order
- transaction-assistant/payment
- transaction-assistant/product
- transaction-assistant/rating
- transaction-assistant/request
- transaction-assistant/shipment
- transaction-assistant/supplier
- transaction-assistant/tag

### web-designer

- web-designer/intro
- web-designer/log-member-info
- web-designer/menu
- web-designer/page
- web-designer/page-dependency
- web-designer/page-template

---

## Part 4: روش اجرای بررسی نهایی

### مرحله 1: اسکریپت/جستجو برای موارد قطعی

1. **optionOnScrollNearBottom:** در همه list.mobile.component.html جستجو کن؛ هر فایلی که این بایندینگ را **ندارد** (به‌جز micro-service-ping و micro-service-status) باید اصلاح شود.
2. **$any:** در همه list.mobile.component.html زیر cms-modules جستجو کن؛ در صورت وجود، حذف یا جایگزینی با property صحیح.
3. **getRowExpanded در قالب بدون متد در .ts:** فایل‌های .html که `getRowExpanded(` دارند را لیست کن؛ در همان مسیر در .ts باید متد `getRowExpanded` وجود داشته باشد (در خود فایل یا در کلاس پدر).

### مرحله 2: بررسی دستی نمونه‌های پرریسک

- لیست‌هایی که در list.component دارای **ستون تصویر** (linkMainImageIdSrc / linkImageIdSrc) هستند: تطابق تصویر در موبایل.
- لیست‌هایی که در list.component دارای **expandedDetail** با فیلدهای متعدد هستند: تطابق فیلدهای expand در موبایل.
- estate/data/property قبلاً اصلاح شده؛ به‌عنوان الگو برای لیست‌های مشابه (دارای تصویر + expand زیاد) استفاده شود.

### مرحله 3: ثبت نتیجه

- پس از بررسی هر دسته، در این فایل در بخش **Result** خلاصه کن: تعداد فایل‌های اصلاح‌شده، مسیرهای دارای نقص قبلی، و استثناها.
- در **readmehistory.md** یک ورودی با تاریخ برای «بررسی نهایی list.mobile» اضافه شود.

---

## Part 5: مرجع قوانین (خلاصه از Cursor.ListSync.plan.md)

- **تصویر:** همان property تصویر list در موبایل؛ وگرنه فقط recordStatus در placeholder.
- **Expand:** هر property موجود در expandedDetail/expandedTitle در list، در موبایل داخل getRowExpanded نمایش داده شود.
- **اسکرول:** optionOnScrollNearBottom → onActionLoadNextPage() روی app-cms-html-list-mobile (به‌جز دو استثنای core-log).
- **list.component.ts:** همه از applyDataGetAllResult(ret) استفاده کنند (قبلاً انجام شده).
- **بدون $any** در قالب موبایل.

---

## Result 0: وضعیت اولیه (خودکار – قبل از اصلاحات)

- **تاریخ:** 2026-02-20
- **optionOnScrollNearBottom:** از 208 فایل list.mobile.component.html فقط **60 فایل** این بایندینگ را داشتند. **148 فایل** فاقد آن بودند که از این میان **۵ مورد** استثنا هستند (۲ مورد core-log + ۳ مورد crm بدون ListBaseComponent)؛ به **143 فایل** بایندینگ اضافه شد و از **۳ فایل** CRM پس از خطای بیلد حذف شد؛ اکنون **203 فایل** دارای بایندینگ و **۵ فایل** استثنا.
- **$any:** در هیچ list.mobile.component.html زیر cms-modules استفاده نشده (۰ مورد).
- **getRowExpanded:** در **بیش از ۱۲۰** فایل .html استفاده شده؛ متد `getRowExpanded` باید در همان کامپوننت موبایل یا در کلاس پدر (list.component) وجود داشته باشد – با lint/build قابل بررسی است.
- **اقدام پیشنهادی:** اول اضافه کردن optionOnScrollNearBottom به 146 فایل (به‌جز دو استثنا)، سپس بررسی دستی تصویر و expand برای لیست‌های پرریسک.

---

## Result 1: اجرای مرحله ۱ – اضافه کردن optionOnScrollNearBottom (2026-02-20)

- **تاریخ:** 2026-02-20
- **اقدام:** با اسکریپت Node به **۱۴۶ فایل** list.mobile.component.html که فاقد بایندینگ بودند، خط **`(optionOnScrollNearBottom)="onActionLoadNextPage()"`** روی تگ `<app-cms-html-list-mobile>` اضافه شد.
- **استثناها:** core-log/micro-service-ping و core-log/micro-service-status (بدون تغییر، طبق Plan).
- **نتیجه:** اکنون **۲۰۶ فایل** دارای optionOnScrollNearBottom هستند و **۲ فایل** (دو استثنا) فاقد آن؛ چک H3 در Plan برای همهٔ مسیرها برآورده شده است.
- **استثناهای اضافی:** سه لیست که از ListBaseComponent ارث نمی‌برند و قالب آن‌ها از `<app-cms-html-list-mobile>` استفاده نمی‌کند، بایندینگ از آن‌ها حذف شد تا خطای کامپایل برطرف شود: **crm/main/opportunity/stage-history**, **crm/main/supplier-price-list**, **crm/main/supplier-rating**.
- **نتیجه build:** بیلد با موفقیت انجام شد (exit code 0).

---

## Result 2: (پس از ادامهٔ بررسی نهایی پرکن)

- تاریخ:
- تعداد مسیرهای بررسی‌شده:
- تعداد اصلاحات در .html:
- تعداد اصلاحات در .ts:
- مسیرهای دارای نقص قبلی (در صورت وجود):
- نتیجه build/lint:
