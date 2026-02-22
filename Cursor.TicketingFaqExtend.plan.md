# Plan: حالت extend در لیست FAQ تیکتینگ

## هدف کلی

لیست FAQ تیکتینگ (`ticketing/faq/list`) حالت **extend** (بازشونده) داشته باشد تا کاربر معمولی که دسترسی ویز (View) ندارد، حداقل با **کلیک روی ردیف** بتواند جزئیات (سوال و پاسخ) را در همان لیست در حالت بازشونده ببیند.

---

## Part 1: وضعیت قبلی

- **list.component.html (دسکتاپ):** فقط جدول ساده با ستون‌های id، linkSiteId، recordStatus، Question و Action؛ بدون ردیف بازشونده.
- **list.mobile.component.html:** از `getRowExpanded(row)` استفاده می‌کرد ولی محتوای بازشونده فقط ID بود؛ سوال و پاسخ نمایش داده نمی‌شد.
- **list.component.ts:** از `ListBaseComponent` ارث می‌برد؛ متدهای `onActionTableRowSelect`، `onActionGridExpandRows` و `getRowExpanded` از پایه هستند و با کلیک روی ردیف، `row.expanded` toggle می‌شود.

---

## Part 2: تغییرات انجام‌شده

### 2.1 لیست دسکتاپ (list.component.html)

1. **دکمه‌های Maximize / Minimize** در `cms-action-header-start` (بعد از Reload) اضافه شد تا باز/بسته کردن همه ردیف‌ها ممکن باشد.
2. **ستون expandedTitle:** با `matColumnDef="expandedTitle"` و محتوای `row.question`.
3. **ستون expandedDetail:** با `matColumnDef="expandedDetail"` و محتوای:
   - شناسه (با دکمه کپی)
   - سوال (با عنوان فیلد از `fieldsInfo`)
   - پاسخ (در صورت وجود، با عنوان فیلد یا ترجمه `ROUTE.TICKETING.ANSWER`).
4. **ترتیب ردیف‌ها** طبق الگوی پروژه و قوانین mat-table:
   - ردیف `expandedTitle` با کلاس `ntk-row-expandedTitle` و رویدادهای click، rtclick، mouseenter، mouseleave.
   - ردیف اصلی با `tabledisplayedColumns` و کلاس `ntk-row-mainfild` و همان رویدادها.
   - ردیف `expandedDetail` با کلاس `ntk-row-expandedDetail` و `[class.ntk-row-expanded]="row.expanded === true"` و `[ngStyle]="{ display: row.expanded === true ? '' : 'none' }`.

### 2.2 لیست موبایل (list.mobile.component.html)

- بخش **Expanded Detail** غنی شد:
  - نمایش ID با دکمه کپی (مانند قبل).
  - نمایش **سوال** با عنوان از `fieldsInfo['question']` یا ترجمه `ACTION.QUESTIONS`.
  - نمایش **پاسخ** با عنوان از `fieldsInfo['answer']` یا ترجمه `ROUTE.TICKETING.ANSWER`.

رفتار کلیک از قبل در base درست بود: با کلیک روی ردیف، همان ردیف انتخاب و `expanded` toggle می‌شود؛ بنابراین کاربر با یک کلیک می‌تواند حالت extend را ببیند.

### 2.3 فایل TypeScript

- هیچ تغییری در `list.component.ts` لازم نبود؛ ستون‌های `expandedTitle` و `expandedDetail` در قالب به‌صورت جدا (مثل news) تعریف شده‌اند و در `tabledisplayedColumns` قرار نمی‌گیرند.

---

## Part 3: فایل‌های تغییر یافته

| فایل                                                                | تغییر                                                                                                                                  |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/cms-modules/ticketing/faq/list/list.component.html`        | دکمه‌های Maximize/Minimize؛ ستون‌های expandedTitle و expandedDetail؛ سه ردیف expandedTitle، main، expandedDetail با رویدادها و کلاس‌ها |
| `src/app/cms-modules/ticketing/faq/list/list.mobile.component.html` | غنی‌سازی محتوای بازشونده با سوال و پاسخ و برچسب‌های چندزبانه                                                                           |

---

## Result 1

- **دسکتاپ:** با کلیک روی هر ردیف (یا روی ردیف عنوان بازشونده)، ردیف جزئیات همان سطر باز/بسته می‌شود و سوال و پاسخ نمایش داده می‌شود؛ بدون نیاز به دسترسی View.
- **موبایل:** با کلیک روی آیتم، بخش extend همان آیتم باز می‌شود و سوال و پاسخ نمایش داده می‌شود.
- **دکمه‌های Maximize/Minimize** در دسکتاپ برای باز/بسته کردن همه ردیف‌ها اضافه شده است.
- الگوی ردیف بازشونده با `Cursor.ExpandedRowFix.plan.md` و قوانین `mat-table-order.mdc` هماهنگ است.

---

## پایان Plan - TicketingFaqExtend

تاریخ: 2026-02-22
