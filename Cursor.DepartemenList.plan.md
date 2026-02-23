# Plan: لیست دپارتمان تیکتینگ (title و description)

## Part 1: نمایش title در لیست و description در expandedTitle

**تاریخ:** 2026-02-23

### دستور:

- در لیست فقط **title** نمایش داده شود.
- در **extendedTitle** مقدار **description** نمایش داده شود.
- نیازی به ردیف expand (expandedDetail) نیست؛ همان **expandedTitle** کافی است.

### تغییرات انجام‌شده:

1. **list.component.ts**
   - اضافه شدن `title` و `Action` به `tabledisplayedColumnsSource` و `tabledisplayedColumnsMobileSource` تا در ردیف اصلی جدول ستون عنوان و عملیات نمایش داده شود.

2. **list.component.html**
   - افزودن `multiTemplateDataRows` به `mat-table` برای پشتیبانی از ردیف بازشونده.
   - تعریف ستون `expandedTitle` با محتوای `row.description` (با چک وجود مقدار).
   - افزودن یک `mat-row` برای `expandedTitle` که با `row.expanded` نمایش/مخفی می‌شود و با کلیک یا hover (طبق ListBaseComponent) باز و بسته می‌شود.
   - افزودن `(mouseenter)` و `(mouseleave)` به ردیف اصلی برای سازگاری با منطق expand در لیست‌های مشابه.
   - ردیف **expandedDetail** اضافه نشد؛ فقط **expandedTitle** برای نمایش description استفاده شد.

### Result 1:

- در ردیف اصلی جدول: تصویر، id، وضعیت رکورد، **title** و Action نمایش داده می‌شود.
- با کلیک یا hover روی ردیف، ردیف بازشونده (expandedTitle) ظاهر می‌شود و **description** همان ردیف نمایش داده می‌شود.
- ردیف expandedDetail در این لیست وجود ندارد.
