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

## Part 4: بهبود UI و رفع مشکلات نمایش firewallAllowIP

### مشکلات
- `(keyup.enter)` کاربردی نداشت و حذف شد
- `onActionAddFirewallIP` به درستی کار نمی‌کرد (مشکل change detection)
- Badge های IP به درستی نمایش داده نمی‌شدند
- فونت IP ها کوچک بود
- فرمت IP اعتبارسنجی نمی‌شد

### راه‌حل‌ها
- حذف `(keyup.enter)` از تمام template ها
- اصلاح `onActionAddFirewallIP` و `onActionRemoveFirewallIP` برای استفاده از spread operator و filter برای trigger کردن change detection
- اصلاح CSS classes برای badge ها (از `badge-secondary` به `bg-info`)
- اضافه کردن `font-13` class به badge ها
- جابجایی container badge ها به خارج از `input-style` div
- اضافه کردن متد `validateIPFormat` برای اعتبارسنجی فرمت IP (تک IP، CIDR، Range)
- اضافه کردن `syncFirewallAllowIPFromList` برای همگام‌سازی قبل از submit

## Result 4

**تاریخ:** 2026-01-15 15:47:10
**وضعیت:** تکمیل شد

- مشکل change detection در `firewallAllowIPList` رفع شد با استفاده از spread operator و filter
- Badge های IP به درستی نمایش داده می‌شوند با استایل `bg-info` و `font-13`
- Container badge ها به خارج از `input-style` div منتقل شدند
- اعتبارسنجی فرمت IP اضافه شد (تک IP، CIDR notation، IP range)
- متد `syncFirewallAllowIPFromList` اضافه شد برای همگام‌سازی قبل از submit
- فونت IP ها بزرگتر شد
- خطای lint گزارش نشد

## Part 5: پیاده‌سازی IP Management در CoreUserEditComponent

### دستور
- پیاده‌سازی مدیریت IP در `CoreUserEditComponent` به همان روش کامپوننت‌های client-application

### تغییرات
- تبدیل `textarea` برای `firewallAllowIP` به `input` با badge list
- اضافه کردن `firewallAllowIPInput` property
- اضافه کردن متدهای `validateIPFormat`, `onActionAddFirewallIP`, `onActionRemoveFirewallIP`
- اضافه کردن `syncFirewallAllowIPFromList` و فراخوانی آن در `DataEditContent`
- به‌روزرسانی `DataGetOneContent` برای parse کردن `firewallAllowIP` به `firewallAllowIPList`

## Result 5

**تاریخ:** 2026-01-15 15:47:10
**وضعیت:** تکمیل شد

- مدیریت IP در `CoreUserEditComponent` به همان روش کامپوننت‌های client-application پیاده‌سازی شد
- تمام متدهای لازم اضافه شدند
- UI با badge list و دکمه‌های اضافه/حذف پیاده‌سازی شد
- اعتبارسنجی فرمت IP اضافه شد
- خطای lint گزارش نشد

## Part 6: تبدیل به Tab-Based Layout و مدیریت Permissions

### دستور
- تبدیل صفحه edit به tab-based layout
- Tab 1: اطلاعات اصلی Client Application
- Tab 2: مدیریت Permissions (CRUD operations)

### تغییرات در SmsMainClientApplicationEditComponent
- اضافه کردن `mat-tab-group` و `mat-tab` به template
- اضافه کردن imports: `MatDialog`, `SmsMainClientApplicationPermissionService`, `SmsMainClientApplicationPermissionAddComponent`, `SmsMainClientApplicationPermissionEditComponent`
- اضافه کردن properties: `permissionDataModelResult`, `permissionTableData`, `permissionTableRowSelected`, `permissionFilterModel`, `permissionLoading`
- اضافه کردن متدهای `DataGetAllPermission`, `onActionPermissionButtonNewRow`, `onActionPermissionButtonEditRow`, `onActionPermissionButtonDeleteRow`
- فراخوانی `DataGetAllPermission` در `ngOnInit` و بعد از هر تغییر permission

### تغییرات در DataProviderClientApplicationEditComponent
- همان تغییرات SmsMainClientApplicationEditComponent
- استفاده از `DataProviderClientApplicationPermissionService` و کامپوننت‌های مربوطه

### UI Improvements
- جدول permissions با استایل `table-striped` و `table-dark`
- Badge برای RecordStatus, IsRequested, IsApproved
- فرمت تاریخ: `yyyy-MM-dd HH:mm`
- Loading spinner برای permission loading
- Empty state با آیکون و دکمه "Add First Permission"
- دکمه Refresh با loading spinner
- نمایش تعداد permissions

## Result 6

**تاریخ:** 2026-01-15 15:47:10
**وضعیت:** تکمیل شد

- هر دو کامپوننت (SmsMainClientApplicationEditComponent و DataProviderClientApplicationEditComponent) به tab-based layout تبدیل شدند
- Tab 1: اطلاعات اصلی Client Application
- Tab 2: مدیریت Permissions با CRUD کامل
- تمام متدهای مدیریت permissions پیاده‌سازی شدند
- UI/UX بهبود یافت با جدول، badge، loading states، و empty state
- خطای lint گزارش نشد
- پروژه کامل و آماده استفاده است

## Part 7: رسپانسیو کردن دیالوگ‌های نتیجه ارسال پیام (موبایل)

### دستورات اجرا شده
- کامپوننت‌های `send-message-calculate-result` و `send-message-result` باید در حالت موبایل هم کاملاً رسپانسیو باشند.

### تغییرات
- **send-message-calculate-result.component.scss / send-message-result.component.scss:**
  - افزودن `:host` با `display: block; width: 100%; max-width: 100%;`
  - حذف `min-width: 420px` از `.send-result-dialog` و استفاده از `min-width: 0` و `width: 100%`
  - رسپانسیو برای تبلت (max-width: 768px): گرید متا دو ستونه، جدول با اسکرول افقی و `-webkit-overflow-scrolling: touch`، دکمه بستن با حداقل 44px برای لمس
  - رسپانسیو برای موبایل کوچک (max-width: 480px): گرید متا تک‌ستونه، فونت و padding کاهش‌یافته
- **styles.scss:** برای viewport باریک، پنل دیالوگ‌های `sms-send-result-dialog` و `sms-send-calculate-result-dialog` با عرض 100%
- **styles.mobile.scss:** استایل‌های مشابه برای پنل دیالوگ در موبایل با حاشیه 8px در 480px

## Result 7

**تاریخ:** 2026-02-21  
**وضعیت:** تکمیل شد

- هر دو کامپوننت نتیجه ارسال/محاسبه پیام در موبایل و تبلت رسپانسیو شدند.
- دیالوگ در عرض کم به صورت full-width نمایش داده می‌شود؛ جدول گیرندگان با اسکرول افقی قابل مشاهده است.
- دکمه بستن و هدر برای لمس بهینه شدند؛ گرید کارت‌های متا در موبایل تک‌ستونه و در تبلت دو ستونه است.

## Part 8: چیدمان دکمه محاسبه در سمت چپ دکمه ارسال (موبایل)

### دستورات اجرا شده
- دکمه «محاسبه سفارش» به صورت کوچک در سمت چپ دکمه «ارسال پیام» قرار گیرد.

### تغییرات
- **send-message.mobile.component.html:** حذف بلوک جداگانه دکمه محاسبه از `cms-m-message-quick-actions`؛ قرار دادن هر دو دکمه در یک نوار با کلاس `cms-m-floating-send-bar`؛ دکمه محاسبه با کلاس `cms-m-floating-btn cms-m-floating-btn-calculate` (فقط آیکون، اندازه ثابت) در سمت چپ؛ دکمه ارسال با `cms-m-floating-btn-send` و `flex: 1` در سمت راست؛ افزودن `aria-label` برای دکمه محاسبه.

## Result 8

**تاریخ:** 2026-02-21  
**وضعیت:** تکمیل شد

- دکمه محاسبه به صورت کوچک (آیکون ماشین‌حساب) در سمت چپ و دکمه ارسال پیام در سمت راست در یک ردیف نمایش داده می‌شوند.
- از کلاس‌های موجود `cms-m-floating-send-bar` و `cms-m-floating-btn-calculate` در SCSS استفاده شد.
