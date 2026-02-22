# Plan: بررسی و اصلاح آیکن‌های list / list.mobile در پروژه

---

## فهرست کامل تمام فایل‌های اصلاح‌شده

در این پلن تمام فایل‌هایی که برای یکسان‌سازی و رفع باگ آیکن‌ها تغییر کرده‌اند در یک جا فهرست شده‌اند. مسیرها نسبت به `src/app/` هستند.

### Shared (۲ فایل)

| #   | مسیر فایل                                                         | نوع اصلاح                                                                    |
| --- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1   | `shared/cms-html-list/cms-html-list.component.html`               | fa fa-bars → fa-solid fa-bars؛ fa fa-times-circle → fa-solid fa-times-circle |
| 2   | `shared/cms-html-list-mobile/cms-html-list-mobile.component.html` | همان                                                                         |

### Estate (۱۴ فایل)

| #   | مسیر فایل                                                                                            | نوع اصلاح                                                                                                                                                 |
| --- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3   | `cms-modules/estate/data/property/list/list.component.html`                                          | matPrefix→matSuffix برای دکمه پاک caseCode؛ fa-light fa-message-lines → fa-solid fa-sms؛ fa-bullseye-pointer → fa-bullseye؛ fa fa-bars → fa-solid fa-bars |
| 4   | `cms-modules/estate/data/property/list/list.mobile.component.html`                                   | fa-light fa-message-lines → fa-solid fa-sms؛ fa-bullseye-pointer → fa-bullseye                                                                            |
| 5   | `cms-modules/estate/data/property/quick-list/quick-list.component.html`                              | fa-bullseye-pointer → fa-bullseye؛ fa fa-bars → fa-solid fa-bars                                                                                          |
| 6   | `cms-modules/estate/data/property/responsible-user-list/responsible-user-list.component.html`        | fa fa-bars → fa-solid fa-bars                                                                                                                             |
| 7   | `cms-modules/estate/data/property-company/list/list.component.html`                                  | fa fa-bars → fa-solid fa-bars                                                                                                                             |
| 8   | `cms-modules/estate/data/property-supplier/list/list.component.html`                                 | fa fa-bars → fa-solid fa-bars                                                                                                                             |
| 9   | `cms-modules/estate/data/property-project/list/list.component.html`                                  | fa fa-bars → fa-solid fa-bars                                                                                                                             |
| 10  | `cms-modules/estate/data/billboard/list/list.component.html`                                         | fa fa-bars → fa-solid fa-bars                                                                                                                             |
| 11  | `cms-modules/estate/main/account-agency/list/list.component.html`                                    | fa fa-bars → fa-solid fa-bars                                                                                                                             |
| 12  | `cms-modules/estate/main/account-expert/list/list.component.html`                                    | fa fa-bars → fa-solid fa-bars                                                                                                                             |
| 13  | `cms-modules/estate/log/customer-order/list/list.component.html`                                     | fa-light fa-clapperboard-play → fa-solid fa-clapperboard؛ fa fa-bars → fa-solid fa-bars                                                                   |
| 14  | `cms-modules/estate/log/customer-order/responsible-user-list/responsible-user-list.component.html`   | fa fa-bars → fa-solid fa-bars                                                                                                                             |
| 15  | `cms-modules/estate/log/property-history/list/list.component.html`                                   | fa fa-bars → fa-solid fa-bars                                                                                                                             |
| 16  | `cms-modules/estate/log/property-history/responsible-user-list/responsible-user-list.component.html` | fa fa-bars → fa-solid fa-bars                                                                                                                             |
| 17  | `cms-modules/estate/log/property-expert-price/list/list.component.html`                              | fa fa-bars → fa-solid fa-bars                                                                                                                             |

### Donate، Link-management (۷ فایل)

| #   | مسیر فایل                                                                   | نوع اصلاح                                                        |
| --- | --------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 18  | `cms-modules/donate/target/list/list.component.html`                        | fa-bullseye-pointer → fa-bullseye؛ fa fa-bars → fa-solid fa-bars |
| 19  | `cms-modules/link-management/billboard-pattern/list/list.component.html`    | fa-bullseye-pointer → fa-bullseye؛ fa fa-bars → fa-solid fa-bars |
| 20  | `cms-modules/link-management/target/list/list.component.html`               | fa fa-bars → fa-solid fa-bars                                    |
| 21  | `cms-modules/link-management/target-billboard-log/list/list.component.html` | fa fa-bars → fa-solid fa-bars                                    |
| 22  | `cms-modules/link-management/member/list/list.component.html`               | fa fa-bars → fa-solid fa-bars                                    |
| 23  | `cms-modules/link-management/accounting/list/list.component.html`           | fa fa-bars → fa-solid fa-bars                                    |
| 24  | `cms-modules/link-management/accounting-detail/list/list.component.html`    | fa fa-bars → fa-solid fa-bars                                    |

### SMS، Data-provider (۸ فایل)

| #   | مسیر فایل                                                                               | نوع اصلاح                                           |
| --- | --------------------------------------------------------------------------------------- | --------------------------------------------------- |
| 25  | `cms-modules/sms/main/client-application-permission/list/list.component.html`           | fa fa-question-circle → fa-solid fa-circle-question |
| 26  | `cms-modules/sms/log/outbox-detail/list/list.component.html`                            | fa fa-bars → fa-solid fa-bars                       |
| 27  | `cms-modules/sms/log/api-path/list/list.component.html`                                 | fa fa-bars → fa-solid fa-bars                       |
| 28  | `cms-modules/data-provider/main/source/list/list.component.html`                        | fa fa-bars → fa-solid fa-bars                       |
| 29  | `cms-modules/data-provider/main/plan/list/list.component.html`                          | fa fa-bars → fa-solid fa-bars                       |
| 30  | `cms-modules/data-provider/main/client/list/list.component.html`                        | fa fa-bars → fa-solid fa-bars                       |
| 31  | `cms-modules/data-provider/main/client-application/list/list.component.html`            | fa fa-bars → fa-solid fa-bars                       |
| 32  | `cms-modules/data-provider/main/client-application-permission/list/list.component.html` | fa fa-question-circle → fa-solid fa-circle-question |

### Core-main، Core-module-log (۱۲ فایل)

| #   | مسیر فایل                                                                              | نوع اصلاح                                        |
| --- | -------------------------------------------------------------------------------------- | ------------------------------------------------ |
| 33  | `cms-modules/core-main/user/list/list.component.html`                                  | fa fa-bars → fa-solid fa-bars                    |
| 34  | `cms-modules/core-main/site/user-list/user-list.component.html`                        | fa fa-bars → fa-solid fa-bars                    |
| 35  | `cms-modules/core-module-log/site-user-credit/list/list.mobile.component.html`         | fa fa-ellipsis-v → fa-solid fa-ellipsis-vertical |
| 36  | `cms-modules/core-module-log/site-user-credit-blocked/list/list.mobile.component.html` | fa fa-ellipsis-v → fa-solid fa-ellipsis-vertical |
| 37  | `cms-modules/core-module-log/site-credit/list/list.mobile.component.html`              | fa fa-ellipsis-v → fa-solid fa-ellipsis-vertical |
| 38  | `cms-modules/core-module-log/site-credit-blocked/list/list.mobile.component.html`      | fa fa-ellipsis-v → fa-solid fa-ellipsis-vertical |
| 39  | `cms-modules/core-module-log/show-key/list/list.mobile.component.html`                 | fa fa-ellipsis-v → fa-solid fa-ellipsis-vertical |
| 40  | `cms-modules/core-module-log/score/list/list.mobile.component.html`                    | fa fa-ellipsis-v → fa-solid fa-ellipsis-vertical |
| 41  | `cms-modules/core-module-log/report-abuse/list/list.mobile.component.html`             | fa fa-ellipsis-v → fa-solid fa-ellipsis-vertical |
| 42  | `cms-modules/core-module-log/like/list/list.mobile.component.html`                     | fa fa-ellipsis-v → fa-solid fa-ellipsis-vertical |
| 43  | `cms-modules/core-module-log/favorite/list/list.mobile.component.html`                 | fa fa-ellipsis-v → fa-solid fa-ellipsis-vertical |
| 44  | `cms-modules/core-module-log/content-count/list/list.mobile.component.html`            | fa fa-ellipsis-v → fa-solid fa-ellipsis-vertical |

### CRM (۱۰ فایل)

| #   | مسیر فایل                                                   | نوع اصلاح                                                      |
| --- | ----------------------------------------------------------- | -------------------------------------------------------------- |
| 45  | `cms-modules/crm/main/stage/list/list.component.html`       | fa fa-bars → fa-solid fa-bars؛ fa fa-check/fa-times → fa-solid |
| 46  | `cms-modules/crm/main/pipeline/list/list.component.html`    | fa fa-bars → fa-solid fa-bars؛ fa fa-check/fa-times → fa-solid |
| 47  | `cms-modules/crm/main/opportunity/list/list.component.html` | fa fa-bars → fa-solid fa-bars                                  |
| 48  | `cms-modules/crm/main/lead/list/list.component.html`        | fa fa-bars → fa-solid fa-bars                                  |
| 49  | `cms-modules/crm/main/deal/list/list.component.html`        | fa fa-bars → fa-solid fa-bars                                  |
| 50  | `cms-modules/crm/main/contact/list/list.component.html`     | fa fa-bars → fa-solid fa-bars                                  |
| 51  | `cms-modules/crm/main/campaign/list/list.component.html`    | fa fa-bars → fa-solid fa-bars                                  |
| 52  | `cms-modules/crm/main/account/list/list.component.html`     | fa fa-bars → fa-solid fa-bars                                  |
| 53  | `cms-modules/crm/main/activity/list/list.component.html`    | fa fa-bars → fa-solid fa-bars                                  |

### News، Article، Blog، Biography، Catalog، Chart، Polling، Member، Hyper-shop، Application (۱۴ فایل)

| #   | مسیر فایل                                                     | نوع اصلاح                                         |
| --- | ------------------------------------------------------------- | ------------------------------------------------- |
| 54  | `cms-modules/news/content/list/list.component.html`           | fa fa-bars → fa-solid fa-bars                     |
| 55  | `cms-modules/news/category/list/list.component.html`          | fa fa-bars → fa-solid fa-bars                     |
| 56  | `cms-modules/article/content/list/list.component.html`        | fa fa-bars → fa-solid fa-bars                     |
| 57  | `cms-modules/article/comment/list/list.component.html`        | fa-light fa-pen-field → fa-solid fa-pen-to-square |
| 58  | `cms-modules/blog/content/list/list.component.html`           | fa fa-bars → fa-solid fa-bars                     |
| 59  | `cms-modules/blog/comment/list/list.component.html`           | fa-solid fa-pen-field → fa-solid fa-pen-to-square |
| 60  | `cms-modules/biography/content/list/list.component.html`      | fa fa-bars → fa-solid fa-bars                     |
| 61  | `cms-modules/catalog/content/list/list.component.html`        | fa fa-bars → fa-solid fa-bars                     |
| 62  | `cms-modules/chart/content/list/list.component.html`          | fa fa-bars → fa-solid fa-bars                     |
| 63  | `cms-modules/polling/content/list/list.component.html`        | fa fa-bars → fa-solid fa-bars                     |
| 64  | `cms-modules/member/property-alias/list/list.component.html`  | fa fa-bars → fa-solid fa-bars                     |
| 65  | `cms-modules/member/group/list/list.component.html`           | fa fa-bars → fa-solid fa-bars                     |
| 66  | `cms-modules/hyper-shop/content/list/list.component.html`     | fa fa-bars → fa-solid fa-bars                     |
| 67  | `cms-modules/application/memberInfo/list/list.component.html` | fa fa-bars → fa-solid fa-bars                     |

---

**جمع کل:** ۶۷ فایل (۲ shared + ۶۵ در cms-modules).

---

## Part 1: دامنه و روش بررسی

**فایل:** `src/app/cms-modules/estate/data/property/list/list.component.html`

**هدف:** بررسی یکپارچگی و صحت آیکن‌های تمام دکمه‌ها و اقدامات در این قالب.

### ناحیه‌های بررسی شده

| ناحیه                   | خطوط تقریبی | نوع آیکن‌ها                      |
| ----------------------- | ----------- | -------------------------------- |
| cms-action-header-start | 71–117      | Font Awesome (fa-solid)          |
| cms-action-header-end   | 119–152     | mat-slide-toggle (بدون آیکن جدا) |
| cms-action-main         | 154–194     | Font Awesome                     |
| cms-action-row          | 195–384     | Font Awesome                     |
| cms-action-area (جستجو) | 385–420     | Material Icons (mat-icon)        |
| ستون action_menu (جدول) | 1007–1020   | Font Awesome (fa fa-bars)        |
| ستون Action (جدول)      | 1211–1215   | Material (more_vert)             |
| ستون LinkTo (جدول)      | 1226–1232   | Material (Unicode &#8599;)       |
| ستون QuickView (جدول)   | 1242–1249   | Material (visibility)            |
| expandedDetail (کپی ID) | 1276–1282   | Flaticon (flaticon2-copy)        |

---

## Part 2: لیست آیکن‌های فعلی و وضعیت

### دکمه‌های هدر و اصلی (همه با Font Awesome و استایل یکسان)

| کارکرد         | کلاس آیکن                | وضعیت                 |
| -------------- | ------------------------ | --------------------- |
| بازگشت به والد | fa-solid fa-arrow-left   | ✅                    |
| راهنما         | fa-solid fa-info         | ✅                    |
| بارگذاری مجدد  | fa-solid fa-rotate-right | ✅                    |
| گسترش سطرها    | fa-solid fa-maximize     | ✅                    |
| جمع‌کردن سطرها | fa-solid fa-minimize     | ✅                    |
| افزودن         | fa-solid fa-plus         | ✅                    |
| افزودن سریع    | fa-solid fa-plus         | ✅ (همان آیکن افزودن) |

### دکمه‌های ردیف (cms-action-row)

| کارکرد                 | کلاس آیکن                     | وضعیت                                                                          |
| ---------------------- | ----------------------------- | ------------------------------------------------------------------------------ |
| مشاهده سریع            | fa-solid fa-eye               | ✅                                                                             |
| ویرایش                 | fa-solid fa-pen               | ✅                                                                             |
| حذف                    | fa-solid fa-trash             | ✅                                                                             |
| ارسال SMS به سفارش     | fa-solid fa-sms               | ✅ (اصلاح از fa-light fa-message-lines برای نمایش در مودال)                    |
| آگهی                   | fa-solid fa-bullseye          | ✅ (اصلاح از fa-bullseye-pointer برای نمایش در مودال)                          |
| افزودن به تاریخچه      | fa-solid fa-clock-rotate-left | ✅                                                                             |
| لیست تاریخچه           | fa-solid fa-clock-rotate-left | ⚠️ (همان آیکن؛ برای تفکیک می‌توان از fa-solid fa-history استفاده کرد)          |
| مشاهده آگهی کاربر دیگر | fa-solid fa-user              | ✅                                                                             |
| مشاهده کاربر           | fa-solid fa-user              | ✅                                                                             |
| لینک به                | fa-solid fa-share             | ✅                                                                             |
| کاربران مسئول          | fa-solid fa-share             | ⚠️ (همان آیکن لینک؛ در صورت تمایل می‌توان آیکن متمایز مثل fa-users انتخاب کرد) |

### فرم جستجو (caseCode)

| کارکرد         | آیکن                 | وضعیت                                                                      |
| -------------- | -------------------- | -------------------------------------------------------------------------- |
| پاک کردن مقدار | mat-icon: close      | ✅ (اصلاح: حذف matPrefix تکراری و استفاده از matSuffix برای دکمه پاک کردن) |
| برچسب فیلد     | mat-icon: mode_edit  | ✅                                                                         |
| راهنمای فیلد   | mat-icon در mat-hint | ✅                                                                         |

### جدول (per row)

| ستون/کارکرد              | آیکن                 | وضعیت                                             |
| ------------------------ | -------------------- | ------------------------------------------------- |
| منوی انتخاب ردیف         | fa fa-bars           | ✅ (الگوی پروژه در shared و سایر listها همین است) |
| منوی اکشن ردیف           | mat-icon: more_vert  | ✅ (الگوی پروژه)                                  |
| لینک به                  | mat-icon + &#8599;   | ✅ (الگوی پروژه، مشابه news)                      |
| مشاهده سریع              | mat-icon: visibility | ✅                                                |
| کپی ID در expandedDetail | flaticon2-copy       | ✅ (الگوی پروژه در همه listها)                    |

---

## Part 3: اصلاحات انجام‌شده

1. **باگ mat-icon دکمه پاک کردن caseCode (خطوط 401–411)**
   - **مشکل:** وجود دو بار `matPrefix` روی یک المنت و استفاده از `matPrefix` برای دکمه پاک کردن که باید در انتهای فیلد باشد.
   - **اصلاح:** حذف `matPrefix` تکراری و تغییر دکمه پاک کردن به `matSuffix` تا در سمت راست فیلد نمایش داده شود.

---

## Result 1

- تمام آیکن‌های دکمه‌ها در `list.component.html` (estate/data/property/list) بررسی شدند.
- بیشتر آیکن‌ها با الگوی پروژه (Font Awesome برای دکمه‌های اکشن، Material برای جدول و فرم، Flaticon برای کپی ID) سازگار هستند.
- تنها باگ مشخص (matPrefix تکراری و جایگاه دکمه پاک کردن در فیلد caseCode) اصلاح شد.
- موارد اختیاری برای بهبود معنایی (تفکیک تاریخچه/افزودن به تاریخچه، آیکن کاربران مسئول، و اطمینان از در دسترس بودن fa-light) در جدول Part 2 با ⚠️ علامت‌گذاری شده‌اند و در صورت نیاز در Partهای بعدی قابل اعمال هستند.

---

## Part 4: بررسی و اصلاح آیکن‌های list در کل پروژه

**هدف:** جستجوی تمام فایل‌های `list.component.html` و `list.mobile.component.html` برای آیکن‌های غیرفعال (fa-light، fa-bullseye-pointer، fa-pen-field و مشابه) و جایگزینی با آیکن‌های fa-solid قابل نمایش در Font Awesome Free.

### فایل‌های اصلاح‌شده

| ماژول/مسیر                             | فایل                      | قبل                           | بعد                       |
| -------------------------------------- | ------------------------- | ----------------------------- | ------------------------- |
| estate/log/customer-order/list         | list.component.html       | fa-light fa-clapperboard-play | fa-solid fa-clapperboard  |
| donate/target/list                     | list.component.html       | fa-solid fa-bullseye-pointer  | fa-solid fa-bullseye      |
| link-management/billboard-pattern/list | list.component.html       | fa-solid fa-bullseye-pointer  | fa-solid fa-bullseye      |
| estate/data/property/quick-list        | quick-list.component.html | fa-solid fa-bullseye-pointer  | fa-solid fa-bullseye      |
| article/comment/list                   | list.component.html       | fa-light fa-pen-field         | fa-solid fa-pen-to-square |
| blog/comment/list                      | list.component.html       | fa-solid fa-pen-field         | fa-solid fa-pen-to-square |

### جستجو انجام‌شده

- الگوهای جستجو: `fa-light `، `fa-bullseye-pointer`، `fa-pen-field`، `fa-clapperboard-play` در تمام `**/*list*.html` و `**/*.html`.
- پس از اصلاحات، هیچ مورد دیگری از fa-light یا fa-bullseye-pointer یا fa-pen-field در پروژه باقی نمانده است.

---

## Result 2

- در کل پروژه ۶ فایل با آیکن‌های غیرفعال یا نامعتبر اصلاح شدند.
- همه آیکن‌های دکمه‌های لیست اکنون از مجموعه **Font Awesome Free (Solid)** استفاده می‌کنند و در مودال/صفحه به‌درستی نمایش داده می‌شوند.

---

## Part 5: ادامهٔ بررسی (ادامه بده)

**هدف:** جستجوی مجدد در تمام list/list.mobile برای هرگونه آیکن باقی‌ماندهٔ مشکل‌دار و اطمینان از یکسان‌سازی با list.mobile در صورت وجود همان دکمه.

### جستجوهای انجام‌شده

- جستجوی الگوهای `fa-light `، `fa-regular `، `fa-brands `، `fa fa-` در **list/** و **list.mobile/**.
- بررسی وجود دکمه‌های مشابه (مثل DISPLAYCLIENTPAGE، تبلیغات، ویرایش مقاله/وبلاگ) در list.mobile مربوط به ماژول‌های اصلاح‌شده.

### نتیجه

- **هیچ مورد دیگری از fa-light یا آیکن نامعتبر** در فایل‌های list/list.mobile یافت نشد.
- **estate/log/customer-order/list.mobile:** بلوک `cms-action-row` فقط دکمه‌های ویرایش، حذف و مشاهده دارد؛ دکمه «نمایش صفحه مشتری» (DISPLAYCLIENTPAGE) در نسخه موبایل این لیست وجود ندارد؛ اصلاح فقط در list.component.html کافی است.
- **article/comment و blog/comment list.mobile:** دکمه «ویرایش مقاله/وبلاگ» به‌صورت جداگانه در موبایل نیست؛ از دکمهٔ عمومی «ویرایش» با آیکن `fa-pen` استفاده می‌شود؛ نیازی به تغییر نیست.
- آیکن‌های **fa-billboard**، **fa-map-marker-alt**، **fa fa-bars**، **fa fa-times-circle** و مشابه در پروژه با نسخهٔ فعلی Font Awesome (از جمله @fortawesome/fontawesome-free و در صورت لود font-awesome 4) سازگار در نظر گرفته شدند و تغییری اعمال نشد.

---

## Result 3

- ادامهٔ بررسی لیست‌ها انجام شد؛ مورد جدیدی برای اصلاح آیکن یافت نشد.
- وضعیت آیکن‌های list و list.mobile با اصلاحات Part 4 هماهنگ است.

---

## Part 6: یکسان‌سازی آیکن‌های با سینتکس قدیمی (fa fa-\*)

**هدف:** جایگزینی آیکن‌های با کلاس قدیمی `fa fa-*` (Font Awesome 4) با `fa-solid fa-*` تا بدون وابستگی به FA4 در محیط Angular با @fortawesome/fontawesome-free به‌درستی نمایش داده شوند.

### تغییرات انجام‌شده

| دسته               | فایل‌ها                                                                                       | قبل                            | بعد                                        |
| ------------------ | --------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------ |
| Shared             | cms-html-list.component.html                                                                  | fa fa-bars، fa fa-times-circle | fa-solid fa-bars، fa-solid fa-times-circle |
| Shared             | cms-html-list-mobile.component.html                                                           | همان                           | همان                                       |
| List (جدول منو)    | همه list.component.html دارای ستون action_menu + quick-list، responsible-user-list، user-list | fa fa-bars font-18             | fa-solid fa-bars font-18                   |
| SMS + DataProvider | client-application-permission/list (هر دو ماژول)                                              | fa fa-question-circle          | fa-solid fa-circle-question                |
| CRM                | pipeline/list، stage/list                                                                     | fa fa-check، fa fa-times       | fa-solid fa-check، fa-solid fa-times       |
| Core-module-log    | ۱۰ list.mobile (site-user-credit، site-credit، show-key، score، …)                            | fa fa-ellipsis-v               | fa-solid fa-ellipsis-vertical              |

### تعداد فایل‌های اصلاح‌شده

- ۲ فایل shared
- بیش از ۳۵ فایل list / responsible-user-list / user-list (fa-bars)
- ۱ فایل sms list (fa-question-circle → fa-circle-question)
- ۱۰ فایل core-module-log list.mobile (fa-ellipsis-v → fa-ellipsis-vertical)

---

## Result 4

- تمام آیکن‌های منوی اکشن (bars)، بستن (times-circle)، سؤال (question) و منوی عمودی (ellipsis-v) در محدودهٔ list و shared به **fa-solid** منتقل شدند.
- نمایش آیکن‌ها فقط به **Font Awesome Free (Solid)** وابسته است و به لود شدن font-awesome 4 وابستگی ندارد.

---

## چک‌لیست مسیرها (برای بازبینی یا اسکریپت)

```
src/app/shared/cms-html-list/cms-html-list.component.html
src/app/shared/cms-html-list-mobile/cms-html-list-mobile.component.html
src/app/cms-modules/estate/data/property/list/list.component.html
src/app/cms-modules/estate/data/property/list/list.mobile.component.html
src/app/cms-modules/estate/data/property/quick-list/quick-list.component.html
src/app/cms-modules/estate/data/property/responsible-user-list/responsible-user-list.component.html
src/app/cms-modules/estate/data/property-company/list/list.component.html
src/app/cms-modules/estate/data/property-supplier/list/list.component.html
src/app/cms-modules/estate/data/property-project/list/list.component.html
src/app/cms-modules/estate/data/billboard/list/list.component.html
src/app/cms-modules/estate/main/account-agency/list/list.component.html
src/app/cms-modules/estate/main/account-expert/list/list.component.html
src/app/cms-modules/estate/log/customer-order/list/list.component.html
src/app/cms-modules/estate/log/customer-order/responsible-user-list/responsible-user-list.component.html
src/app/cms-modules/estate/log/property-history/list/list.component.html
src/app/cms-modules/estate/log/property-history/responsible-user-list/responsible-user-list.component.html
src/app/cms-modules/estate/log/property-expert-price/list/list.component.html
src/app/cms-modules/donate/target/list/list.component.html
src/app/cms-modules/link-management/billboard-pattern/list/list.component.html
src/app/cms-modules/link-management/target/list/list.component.html
src/app/cms-modules/link-management/target-billboard-log/list/list.component.html
src/app/cms-modules/link-management/member/list/list.component.html
src/app/cms-modules/link-management/accounting/list/list.component.html
src/app/cms-modules/link-management/accounting-detail/list/list.component.html
src/app/cms-modules/sms/main/client-application-permission/list/list.component.html
src/app/cms-modules/sms/log/outbox-detail/list/list.component.html
src/app/cms-modules/sms/log/api-path/list/list.component.html
src/app/cms-modules/data-provider/main/source/list/list.component.html
src/app/cms-modules/data-provider/main/plan/list/list.component.html
src/app/cms-modules/data-provider/main/client/list/list.component.html
src/app/cms-modules/data-provider/main/client-application/list/list.component.html
src/app/cms-modules/data-provider/main/client-application-permission/list/list.component.html
src/app/cms-modules/core-main/user/list/list.component.html
src/app/cms-modules/core-main/site/user-list/user-list.component.html
src/app/cms-modules/core-module-log/site-user-credit/list/list.mobile.component.html
src/app/cms-modules/core-module-log/site-user-credit-blocked/list/list.mobile.component.html
src/app/cms-modules/core-module-log/site-credit/list/list.mobile.component.html
src/app/cms-modules/core-module-log/site-credit-blocked/list/list.mobile.component.html
src/app/cms-modules/core-module-log/show-key/list/list.mobile.component.html
src/app/cms-modules/core-module-log/score/list/list.mobile.component.html
src/app/cms-modules/core-module-log/report-abuse/list/list.mobile.component.html
src/app/cms-modules/core-module-log/like/list/list.mobile.component.html
src/app/cms-modules/core-module-log/favorite/list/list.mobile.component.html
src/app/cms-modules/core-module-log/content-count/list/list.mobile.component.html
src/app/cms-modules/crm/main/stage/list/list.component.html
src/app/cms-modules/crm/main/pipeline/list/list.component.html
src/app/cms-modules/crm/main/opportunity/list/list.component.html
src/app/cms-modules/crm/main/lead/list/list.component.html
src/app/cms-modules/crm/main/deal/list/list.component.html
src/app/cms-modules/crm/main/contact/list/list.component.html
src/app/cms-modules/crm/main/campaign/list/list.component.html
src/app/cms-modules/crm/main/account/list/list.component.html
src/app/cms-modules/crm/main/activity/list/list.component.html
src/app/cms-modules/news/content/list/list.component.html
src/app/cms-modules/news/category/list/list.component.html
src/app/cms-modules/article/content/list/list.component.html
src/app/cms-modules/article/comment/list/list.component.html
src/app/cms-modules/blog/content/list/list.component.html
src/app/cms-modules/blog/comment/list/list.component.html
src/app/cms-modules/biography/content/list/list.component.html
src/app/cms-modules/catalog/content/list/list.component.html
src/app/cms-modules/chart/content/list/list.component.html
src/app/cms-modules/polling/content/list/list.component.html
src/app/cms-modules/member/property-alias/list/list.component.html
src/app/cms-modules/member/group/list/list.component.html
src/app/cms-modules/hyper-shop/content/list/list.component.html
src/app/cms-modules/application/memberInfo/list/list.component.html
```

---

## Part 7 / Result 5: ادامه — بازبینی نهایی

- **بازبینی:** در تمام فایل‌های زیر `**/list/**/*.html` و در `shared/cms-html-list*.component.html` دیگر هیچ `class="fa fa-` باقی نمانده است؛ اصلاحات Part 1 تا Part 6 اعمال شده‌اند.
- **سایر shared:** کامپوننت‌های دیگر shared (selectorها، cms-form-validation، progress-spinner و غیره) هنوز از سینتکس `fa fa-*` استفاده می‌کنند؛ در صورت نیاز می‌توان در پلن جداگانه آن‌ها را به fa-solid منتقل کرد.
- **مرجع:** فهرست کامل ۶۷ فایل اصلاح‌شده در ابتدای این پلن و در چک‌لیست مسیرها (بالا) ثبت است.

---

## Part 8: یکسان‌سازی آیکن‌ها در تمام کامپوننت‌های shared

**هدف:** تبدیل تمام `fa fa-*` به `fa-solid fa-*` و استفاده از نام‌های Font Awesome 6 در کامپوننت‌های shared (غیر از cms-html-list و cms-html-list-mobile که در Part 6 انجام شده بود).

### تغییرات انجام‌شده

- **جایگزینی سینتکس:** در همهٔ فایل‌های shared که `class="fa fa-` داشتند، به `class="fa-solid fa-` تغییر داده شد.
- **نام‌های FA6:** آیکن‌های با نام قدیمی به نام‌های FA6 Free تبدیل شدند: `fa-info-circle` → `fa-circle-info`، `fa-question-circle` → `fa-circle-question`، `fa-check-square-o` → `fa-square-check`، `fa-exclamation-triangle` → `fa-triangle-exclamation`، `fa-exclamation-circle` → `fa-circle-exclamation`، `fa-check-circle` → `fa-circle-check`.

### فایل‌های اصلاح‌شده (بیش از ۲۸ کامپوننت shared)

cms-user-selector، cms-user-group-selector، cms-site-selector، cms-site-category-selector، cms-module-selector، cms-location-selector، cms-currency-selector، cms-application-selector، cms-member-selector، cms-search-list، progress-spinner، cms-site-user-credit-view، cms-site-credit-view، cms-show-key، cms-link-to، cms-form-validation، cms-guide-notice، cms-export-list، cms-export-entity، cms-enum-x-selector، cms-enum-record-status-selector، cms-enum-record-admin-status-selector، cms-data-pin، cms-data-task، cms-data-memo، cms-data-comment، cms-bankpayment-transaction-info، cms-action-button-reload، cms-360-tour-list، cms-360-image-list، cms-form-result-message، cms-confirmation-dialog. (کامپوننت‌های cms-sms-apipath-selector و cms-sms-api-number-selector در صورت وجود همان الگو به‌روز شدند.)

---

## Result 6

- در محدودهٔ **shared** دیگر هیچ `class="fa fa-` باقی نمانده است.
- آیکن‌ها با **Font Awesome 6 Free (Solid)** و نام‌های استاندارد FA6 هماهنگ هستند.
