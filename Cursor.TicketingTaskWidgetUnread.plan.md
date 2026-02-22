# Plan: هشدار Popup برای تیکت‌های خوانده‌نشده در ویجت Ticketing Task

## Part 1: نمایش هشدار Popup هنگام وجود تیکت خوانده‌نشده

**تاریخ:** 2026-02-22
**وضعیت:** ✅ تکمیل شده

### هدف

زمانی که ویجت تیکت‌های ثبت‌شده (ticketing/task/widget) تیکت خوانده‌نشده دارد، یک هشدار Popup (toast هشدار) به کاربر نمایش داده شود.

### اقدامات انجام‌شده

1. **widget.component.ts (ticketing/task/widget)**
   - تزریق `CmsToastrService` و استفاده از `typeWarningMessage` برای نمایش toast هشدار.
   - اضافه شدن پراپرتی `unreadWarningShown` برای نمایش فقط یک‌بار در هر بار لود ویجت (جلوگیری از اسپم).
   - پس از دریافت تعداد تیکت‌های خوانده‌نشده در `onActionStatist()`، در صورتی که `ret.totalRowCount > 0` و هنوز هشدار نمایش داده نشده باشد، با ترجمهٔ کلیدهای `MESSAGE.Unread_tickets_warning` و `TITLE.Unread_tickets_warning` هشدار نمایش داده می‌شود.

2. **فایل‌های چندزبانه (i18n)**
   - افزودن کلیدهای ترجمه در تمام زبان‌ها:
     - `MESSAGE.Unread_tickets_warning`: متن هشدار (پایه فارسی: «شما تیکت خوانده نشده دارید. لطفاً بررسی کنید.»)
     - `TITLE.Unread_tickets_warning`: عنوان هشدار (پایه فارسی: «تیکت خوانده نشده»)
   - زبان‌های به‌روزرسانی‌شده: fa, en, ar, de, es, fr, ja, tr, zh.

### فایل‌های تغییر یافته

- `src/app/cms-modules/ticketing/task/widget/widget.component.ts`
- `src/assets/i18n/fa.json`
- `src/assets/i18n/en.json`
- `src/assets/i18n/ar.json`
- `src/assets/i18n/de.json`
- `src/assets/i18n/es.json`
- `src/assets/i18n/fr.json`
- `src/assets/i18n/ja.json`
- `src/assets/i18n/tr.json`
- `src/assets/i18n/zh.json`

### Result 1

✅ با لود ویجت تیکت‌های ثبت‌شده، در صورت وجود حداقل یک تیکت خوانده‌نشده، یک Popup هشدار (toast نوع warning) با عنوان و متن چندزبانه یک‌بار نمایش داده می‌شود. در همان نشست تا رفرش صفحه، هشدار مجدداً نمایش داده نمی‌شود.
