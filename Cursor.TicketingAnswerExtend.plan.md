# Plan: حالت extend detail در لیست پاسخ تیکتینگ (Answer)

## هدف

لیست پاسخ تیکتینگ (`ticketing/answer/list`) حالت **extend detail** داشته باشد تا با کلیک روی ردیف یا دکمه‌های Maximize/Minimize بتوان جزئیات (متن پاسخ htmlBody) را در همان لیست دید.

---

## Part 1: تغییرات انجام‌شده

### 1.1 لیست دسکتاپ (list.component.html)

- **دکمه‌های Maximize / Minimize** در `cms-action-header-start` (بعد از Reload) اضافه شد.
- **multiTemplateDataRows** به `mat-table` اضافه شد.
- **ستون expandedDetail** با محتوای: شناسه (با دکمه کپی)، در صورت وجود **htmlBody** با عنوان از `fieldsInfo["htmlBody"]` یا ترجمه `TICKETING.ANSWER_BODY` و نمایش با پایپ `safeHtml`.
- **ردیف بازشونده** با `mat-row` برای ستون `expandedDetail`، کلاس `ntk-row-expandedDetail` و `[ngStyle]="{ display: row.expanded === true ? '' : 'none' }`.
- رویدادهای **mouseenter** و **mouseleave** به ردیف اصلی برای هماهنگی با base اضافه شد.

### 1.2 لیست موبایل (list.mobile.component.html)

- در بلوک **Expanded Detail** (زیر `getRowExpanded(row)`): نمایش **htmlBody** با عنوان از `fieldsInfo["htmlBody"]` یا `TICKETING.ANSWER_BODY` و کلاس `ntk-html-content cms-m-list-item-answer` با پایپ `safeHtml`.

### 1.3 چندزبانگی

- کلید **TICKETING.ANSWER_BODY** به تمام فایل‌های i18n اضافه شد (fa: «متن پاسخ»، en, ar, de, es, fr, ja, tr, zh).

---

## Part 2: فایل‌های تغییر یافته

| فایل | تغییر |
|------|--------|
| `ticketing/answer/list/list.component.html` | دکمه‌های Maximize/Minimize، multiTemplateDataRows، ستون و ردیف expandedDetail، mouseenter/mouseleave |
| `ticketing/answer/list/list.mobile.component.html` | نمایش htmlBody در بخش expanded |
| `src/assets/i18n/fa.json` و سایر زبان‌ها | کلید TICKETING.ANSWER_BODY |

---

## Result 1

لیست پاسخ تیکتینگ در دسکتاپ و موبایل دارای حالت expand detail است؛ با کلیک روی ردیف یا Maximize/Minimize متن پاسخ (htmlBody) در همان صفحه نمایش داده می‌شود.
