# Plan: کلیک روی تیکت و ورود به صفحه Ticketing

## Part 1: هدایت کلیک ردیف به صفحه ticketing (پیام‌های ارسالی/دریافتی)

**تاریخ:** 2026-02-22
**وضعیت:** ✅ تکمیل شده

### هدف

زمانی که کاربر روی یک تیکت در لیست تسک‌های ticketing کلیک می‌کند، به کامپوننت/صفحه‌ای وارد شود که دقیقاً ticketing باشد؛ پیام‌های ارسالی و دریافتی و کلیه استانداردهای یک ticketing رعایت شده باشد.

### اقدامات انجام‌شده

1. **list.component.ts (ticketing/task/list)**
   - متد `onActionTaskRowClick(row: TicketingTaskModel, event?: MouseEvent)` اضافه شد.
   - در صورت معتبر بودن ردیف (`row?.id > 0`) و داشتن دسترسی مشاهده (`accessWatchRow`)، کاربر به مسیر `/ticketing/answer/LinkTaskId/:id` هدایت می‌شود (صفحه لیست پاسخ‌ها با هدر تسک و پیام‌های ارسالی/دریافتی).
   - در غیر این صورت همان رفتار قبلی (انتخاب ردیف با `onActionTableRowSelect`) اجرا می‌شود.
   - کلیک راست (rtclick) بدون تغییر و همچنان منجر به انتخاب ردیف و منوی اکشن می‌شود.

2. **list.component.html (دسکتاپ)**
   - رویداد `(click)` روی `mat-row` از `onActionTableRowSelect(row, $event)` به `onActionTaskRowClick(row, $event)` تغییر کرد. (بعداً در Part 2 به `(dblclick)` تغییر یافت.)

3. **list.mobile.component.html (موبایل)**
   - رویداد `(click)` روی آیتم لیست از `onActionTableRowSelect(row, $event)` به `onActionTaskRowClick(row, $event)` تغییر کرد. (بعداً در Part 2 به `(dblclick)` تغییر یافت.)

### مسیر و استاندارد ticketing

- مسیر `/ticketing/answer/LinkTaskId/:LinkTaskId` از قبل در `routes.normal` و `routes.mobile` تعریف شده است.
- در این صفحه کامپوننت `app-ticketing-task-header` اطلاعات تسک را نمایش می‌دهد و لیست پاسخ‌ها (پیام‌های ارسالی و دریافتی) در قالب جدول/لیست استاندارد ticketing نمایش داده می‌شود.

### فایل‌های تغییر یافته

- `src/app/cms-modules/ticketing/task/list/list.component.ts`
- `src/app/cms-modules/ticketing/task/list/list.component.html`
- `src/app/cms-modules/ticketing/task/list/list.mobile.component.html`

### Result 1

✅ با کلیک روی هر تیکت در لیست (دسکتاپ و موبایل)، کاربر به صفحه ticketing همان تسک (هدر تسک + لیست پاسخ‌ها) هدایت می‌شود. پیام‌های ارسالی و دریافتی و استانداردهای ticketing در آن صفحه رعایت شده است. کلیک راست برای منوی اکشن بدون تغییر کار می‌کند.

---

## Part 2: تغییر به دبل‌کلیک برای ورود به صفحه ticketing

**تاریخ:** 2026-02-22
**وضعیت:** ✅ تکمیل شده

### هدف

ورود به صفحه ticketing (answer/LinkTaskId/:id) فقط با دبل‌کلیک روی ردیف انجام شود تا با کلیک ساده (مثلاً برای انتخاب ردیف) تداخل نداشته باشد.

### اقدامات انجام‌شده

1. **list.component.html (دسکتاپ)**
   - رویداد ورود به صفحه از `(click)` به `(dblclick)="onActionTaskRowClick(row, $event)"` تغییر کرد.
   - برای انتخاب ردیف، `(click)="onActionTableRowSelect(row, $event)"` اضافه شد.

2. **list.mobile.component.html (موبایل)**
   - رویداد ورود به صفحه از `(click)` به `(dblclick)="onActionTaskRowClick(row, $event)"` تغییر کرد.
   - برای انتخاب ردیف، `(click)="onActionTableRowSelect(row, $event)"` اضافه شد.

### Result 2

✅ با دبل‌کلیک روی ردیف تیکت در لیست (دسکتاپ و موبایل)، کاربر به صفحه ticketing همان تسک هدایت می‌شود. کلیک ساده فقط ردیف را انتخاب می‌کند (برای دکمه‌های اکشن).
