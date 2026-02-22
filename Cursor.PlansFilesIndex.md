# فهرست یکپارچه Planها و فایل‌های مرتبط

این سند تمام فایل‌های Plan پروژه و فایل‌های ذکرشده در هر Plan را گردآوری می‌کند.

---

## 1. Cursor.TicketingTaskWidgetUnread.plan.md

**هدف:** نمایش هشدار Popup هنگام وجود تیکت خوانده‌نشده در ویجت تیکت‌های ثبت‌شده.

| فایل                                                            | وضعیت |
| --------------------------------------------------------------- | ----- |
| `src/app/cms-modules/ticketing/task/widget/widget.component.ts` | ✅    |
| `src/assets/i18n/*.json` (fa, en, ar, de, es, fr, ja, tr, zh)   | ✅    |

---

## 2. Cursor.TicketingTaskClick.plan.md

**هدف:** با کلیک روی تیکت، ورود به صفحه ticketing (پیام‌های ارسالی/دریافتی).

| فایل                                                                 | وضعیت |
| -------------------------------------------------------------------- | ----- |
| `src/app/cms-modules/ticketing/task/list/list.component.ts`          | ✅    |
| `src/app/cms-modules/ticketing/task/list/list.component.html`        | ✅    |
| `src/app/cms-modules/ticketing/task/list/list.mobile.component.html` | ✅    |

---

## 3. Cursor.EstatePropertyListIcons.plan.md

**هدف:** بررسی و اصلاح آیکن‌های list (estate/data/property و سپس کل پروژه).

| فایل                                                                | وضعیت |
| ------------------------------------------------------------------- | ----- |
| `src/app/cms-modules/estate/data/property/list/list.component.html` | ✅    |
| estate/log/customer-order/list/list.component.html                  | ✅    |
| donate/target/list/list.component.html                              | ✅    |
| link-management/billboard-pattern/list/list.component.html          | ✅    |
| estate/data/property/quick-list/quick-list.component.html           | ✅    |
| article/comment/list/list.component.html                            | ✅    |
| blog/comment/list/list.component.html                               | ✅    |

---

## 4. Cursor.ListButtonsSync.plan.md

**هدف:** تطابق دکمه‌های list با list.mobile (۲۰۸ مسیر).

- فهرست مسیرها در Part 4 همان Plan آمده است.
- اصلاحات نمونه و BackToParent و ارث‌بری در Result 1–3 انجام شده است.

---

## 5. Cursor.ListSync.plan.md

**هدف:** تطابق list با list.mobile (تصویر، expand، اسکرول بی‌نهایت).

- ۶۱ فایل list.mobile با optionOnScrollNearBottom.
- ۱۹۰ فایل با recordStatus در placeholder.
- ۱۸۹ فایل list.component.ts با applyDataGetAllResult.

---

## 6. Cursor.ListMobileFinalAudit.plan.md

**هدف:** چک‌لیست نهایی هر list.mobile (H1–H6، T1–T4).

- ۲۰۸ مسیر در Part 3 فهرست شده‌اند.

---

## 7. Cursor.ListMobile.plan.md

**هدف:** بازنویسی/استانداردسازی list.mobile و ایجاد موبایل برای listهای بدون موبایل.

- فهرست ۵۶ لیست موبایل و ۲۰۶ لیست در Part 1 و Part 2.

---

## 8. Cursor.ExpandedRowFix.plan.md

**هدف:** اضافه کردن `[class.ntk-row-expanded]="row.expanded === true"` به ردیف expandedDetail.

### فایل‌های اصلاح‌شده در Result 2 (۳۹ فایل)

همه در list.component.html با ردیف expandedDetail.

### فایل‌های دارای expandedDetail که در این Plan اصلاح شدند (نیاز به ntk-row-expanded)

- estate, donate, sms, data-provider, link-management, hyper-shop, news, member, core-main/user, chart, catalog, blog, biography, article, application/memberInfo

### فایل‌های دارای expandedDetail که در مرحله بعد اصلاح می‌شدند (انجام شد 2026-02-22)

| فایل                                                                                     | وضعیت |
| ---------------------------------------------------------------------------------------- | ----- |
| `core-main/site/user-list/user-list.component.html`                                      | ✅    |
| `estate/data/property/quick-list/quick-list.component.html`                              | ✅    |
| `estate/data/property/responsible-user-list/responsible-user-list.component.html`        | ✅    |
| `estate/log/property-history/responsible-user-list/responsible-user-list.component.html` | ✅    |
| `estate/log/customer-order/responsible-user-list/responsible-user-list.component.html`   | ✅    |

---

## 9. Cursor.plan.md (کلی پروژه)

**هدف:** Planهای کلی (Injection، Font، iconPicker و غیره). فایل‌های متعدد در هر Part.

---

## 10. Cursor.OnActionButtonCtrlKey.plan.md

**هدف:** استفاده یکسان از `event?.ctrlKey` در تمام متدهای **onActionButton\*** صفحات لیست؛ در صورت Ctrl+Click با `window.open(..., "_blank")` در تب جدید و در غیر این صورت با `router.navigate` در همان پنجره. الگوی مرجع: `news/content/list/list.component.ts`.

- Part 1: الگوی استاندارد (TypeScript + HTML).
- Part 2: فهرست ماژول/کامپوننت‌هایی که الان ctrlKey دارند.
- Part 3: فهرست کامپوننت‌هایی که باید ctrlKey اضافه شود (Ticketing، CRM، Web-designer، SMS، Polling، Member، Link-management، Hyper-shop، File-manager، Estate، Donate، Data-provider، Core-token، Core-log، Transaction-assistant، News/category).
- Part 4: دستور اجرا به تفکیک مرحله (۱ تا ۶).
- Part 5: بررسی نهایی؛ Result 1 برای ثبت نتیجه پس از اجرا.

---

## 11. Cursor.TicketingFaqExtend.plan.md

**هدف:** حالت extend (بازشونده) در لیست FAQ تیکتینگ تا کاربر معمولی بدون دسترسی ویز با کلیک روی ردیف بتواند سوال و پاسخ را در همان لیست ببیند.

| فایل                                                                | وضعیت |
| ------------------------------------------------------------------- | ----- |
| `src/app/cms-modules/ticketing/faq/list/list.component.html`        | ✅    |
| `src/app/cms-modules/ticketing/faq/list/list.mobile.component.html` | ✅    |

---

## 12. سایر Planها

- **Cursor.ComponentCheck.plan.md**
- **src/app/cms-modules/news/Cursor.News.plan.md**
- **src/app/cms-modules/data-provider/Cursor.1.plan.md**
- **src/app/cms-modules/sms/Cursor.2.plan.md**

---

_آخرین به‌روزرسانی: 2026-02-22 (اضافه شدن Cursor.TicketingFaqExtend.plan.md)_
