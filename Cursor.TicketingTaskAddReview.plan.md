# Plan: بررسی و اصلاحات جزئی Ticketing Task Add

## Part 1: بررسی `ticketing/task/add` و رفع باگ‌های مشخص UI/TS

**تاریخ:** 2026-04-19

### دستورات / اقدامات

1. مرور `add.component.ts` و `add.component.html` در مسیر `src/app/cms-modules/ticketing/task/add/`.
2. اصلاح برچسب فیلد **DeviceInformation** که به‌اشتباه از `fieldsInfo["userIpAddress"]` خوانده می‌شد.
3. هم‌تراز کردن شمارنده کاراکتر **fullName** با `maxlength="1000"` (قبلاً `/ 100` نمایش داده می‌شد).
4. حذف ویژگی تکراری `type="text"` در ورودی **title**.
5. فرمت و خوانایی `add.component.ts`: تورفتگی `tokenInfo`، مقداردهی امن `LinkDepartemenId` با `Number(... ?? "0")`.
6. اجرای `ng build --configuration development` برای خطایابی کامپایل.

### Result 1

بیلد توسعه با موفقیت تمام شد (`exit_code: 0`، خروجی در `dist/ntk-cms-web`). اصلاحات HTML/TS بدون خطای کامپایل پذیرفته شدند. نکات باقی‌مانده برای اصلاحات بعدی (اختیاری): `@ViewChild` با `#vform="ngForm"` از نظر تایپ دقیق‌تر باید `NgForm` باشد (الگوی مشابه در سایر ماژول‌ها)؛ متن خطاهای `mat-error` هنوز بخش انگلیسی ثابت ` is ` دارد و می‌تواند به کلید ترجمه منتقل شود؛ اعتبارسنجی گام استپر در `onStepClick` کامنت شده است.
