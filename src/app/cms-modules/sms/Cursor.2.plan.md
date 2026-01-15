# Plan: تکمیل client-application در ماژول SMS

## Part 1: بررسی و تکمیل فرم‌ها

### دستورات اجرا شده
- `Get-Date -Format "yyyy-MM-dd HH:mm:ss"`

### بررسی‌ها
- مقایسه الگوی `client-application` در SMS با Data Provider
- مرور قالب‌های add/edit دسکتاپ و نسخه موبایل
- هم‌ترازی فیلدهای `linkUserId` و `linkSiteId` در فرم‌ها

## Part 2: افزودن فیلدهای جدید

### فیلدهای اضافه شده
- `fromDate`: Date - با mat-datepicker
- `expireDate`: Date - با mat-datepicker
- `description`: string - با textarea
- `apiKey`: string - با input text
- `firewallAllowIP`: string - با input text
- `firewallAllowIPList`: string[] - با لیست badge و دکمه‌های اضافه/حذف

### کامپوننت‌های به‌روزرسانی شده
- SmsMainClientApplicationAddComponent
- SmsMainClientApplicationEditComponent
- DataProviderClientApplicationAddComponent
- DataProviderClientApplicationEditComponent

### متدهای اضافه شده
- `onActionAddFirewallIP()`: اضافه کردن IP به لیست
- `onActionRemoveFirewallIP(ip: string)`: حذف IP از لیست

## Result 1

**تاریخ:** 2026-01-15 10:47:18
**وضعیت:** تکمیل شد

- فیلدهای `linkUserId` و `linkSiteId` به فرم‌های دسکتاپ add/edit اضافه شدند.
- هم‌ترازی با الگوی Data Provider و نسخه موبایل انجام شد.
- خطای lint گزارش نشد.

## Result 2

**تاریخ:** 2026-01-15 11:15:00
**وضعیت:** تکمیل شد

- فیلدهای `fromDate`, `expireDate`, `description`, `apiKey`, `firewallAllowIP` و `firewallAllowIPList` به تمام کامپوننت‌های client-application اضافه شدند.
- فیلدهای تاریخ با mat-datepicker و calendarHeaderComponent پیاده‌سازی شدند.
- فیلد description با textarea و validation پیاده‌سازی شد.
- فیلد apiKey با input text و input-ltr برای نمایش صحیح پیاده‌سازی شد.
- فیلد firewallAllowIP با input text و دکمه اضافه پیاده‌سازی شد.
- فیلد firewallAllowIPList با لیست badge و دکمه‌های حذف برای هر IP پیاده‌سازی شد.
- متدهای مدیریت لیست IP (اضافه و حذف) در تمام کامپوننت‌ها اضافه شدند.
- در edit component، مقداردهی اولیه firewallAllowIPList در DataGetOneContent انجام شد.
- خطای lint گزارش نشد.

## Part 3: رفع مشکل firewallAllowIP

### مشکل
- فیلد `firewallAllowIP` درست کار نمی‌کرد و با `firewallAllowIPList` همگام نبود.

### راه‌حل
- در SMS: فیلد `firewallAllowIP` با `firewallAllowIPList` همگام می‌شود (join با کاما).
- در edit component SMS: مقدار `firewallAllowIP` از سرور خوانده شده و به لیست اضافه می‌شود.
- در DataProvider: فقط با `firewallAllowIPList` کار می‌شود چون فیلد `firewallAllowIP` وجود ندارد.

## Result 3

**تاریخ:** 2026-01-15 11:58:56
**وضعیت:** تکمیل شد

- مشکل همگام‌سازی `firewallAllowIP` با `firewallAllowIPList` در SMS رفع شد.
- در SMS، هنگام اضافه/حذف IP، فیلد `firewallAllowIP` به‌روزرسانی می‌شود (join با کاما).
- در edit component SMS، مقدار `firewallAllowIP` از سرور خوانده شده و به لیست اضافه می‌شود.
- در DataProvider، کدهای مربوط به `firewallAllowIP` حذف شدند چون این فیلد وجود ندارد.
- خطای lint گزارش نشد.
