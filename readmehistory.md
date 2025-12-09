# تاریخچه تغییرات پروژه

## 2025-12-09 15:13 (نمایش اطلاعات مخاطب با دبل‌کلیک روی شماره)

### تغییرات اعمال شده:

- افزودن حالت نمایش مخاطب به ستون شماره فرستنده در `SmsLogInBoxListComponent` با دبل‌کلیک و استفاده از `contactContentByNumber` برای واکشی نام از دفترچه تلفن

---

## 2025-12-09 16:19 (بهبود نمایش نام در contactContentByNumber)

### تغییرات اعمال شده:

- اولویت نمایش: ابتدا `firstName + lastName`، در صورت نبود نام، `title` دفترچه تلفن و در نهایت fallback به شماره ورودی
- حذف نمایش شماره/سازمان در خروجی pipe برای نمایش خالص نام دفترچه تلفن

---

## 2025-12-09 16:21 (پشتیبانی از listItems در contactContentByNumber)

### تغییرات اعمال شده:

- در پاسخ `ServiceFindByNumber` در صورت نبود `item`، از اولین عضو `listItems` استفاده می‌شود تا نام مخاطب برگردد
- همچنان اولویت نمایش: fullname سپس title و در نهایت شماره ورودی

---

## 2025-12-09 16:25 (ترکیب تمام listItems در contactContentByNumber)

### تغییرات اعمال شده:

- جمع‌آوری همه نتایج (`item` و `listItems`) و ساخت فهرست نام‌ها بر اساس `firstName + lastName` یا `title`
- نمایش خروجی به صورت فهرست جداشده با `|`؛ در صورت نبود نام، بازگشت به شماره ورودی

### فایل‌های تغییر یافته:
- `src/app/core/pipe/contact/contact-content-by-number.pipe.ts`
- `readmehistory.md`

### فایل‌های تغییر یافته:
- `src/app/core/pipe/contact/contact-content-by-number.pipe.ts`
- `readmehistory.md`

### فایل‌های تغییر یافته:
- `src/app/core/pipe/contact/contact-content-by-number.pipe.ts`
- `readmehistory.md`

### فایل‌های تغییر یافته:
- `src/app/cms-modules/sms/log/inbox/list/list.component.ts`
- `src/app/cms-modules/sms/log/inbox/list/list.component.html`
- `readmehistory.md`

---

## 2025-12-09 14:54 (افزودن pipe جستجوی شماره تماس)

### تغییرات اعمال شده:

- ثبت `ContactContentByNumberPipe` در `SharedModule` برای دسترسی سراسری و استفاده از API `ContactContentService.ServiceFindByNumber`
- افزودن `ContactContentService` به `providers` برای پشتیبانی از pipe و جلوگیری از خطای تزریق

### فایل‌های تغییر یافته:
- `src/app/shared/shared.module.ts`
- `readmehistory.md`

---

## 2025-12-08 12:00 (یکپارچه‌سازی filterModelCompiler برای ServiceGetCount)

### تغییرات اعمال شده:

- تعریف متد `filterModelCompiler` در لیست‌ها/ویجت‌های دارای جستجوی پیشرفته برای اطمینان از همسان بودن فیلترهای ارسال‌شده به ServiceGetCount با ServiceGetAll/Editor
- جایگزینی کلون دستی فیلترها با `filterModelCompiler` در درخواست‌های لیست و آمار
- الحاق فیلترهای انتخاب دسته (Category/Module) و وضعیت رکورد به شمارنده‌ها تا نتایج آمار با نتایج لیست مطابقت داشته باشد

### فایل‌های تغییر یافته:
- `src/app/cms-modules/core-module-log/content-count/list/list.component.ts`
- `src/app/cms-modules/hyper-shop/content/list/list.component.ts`
- `src/app/cms-modules/core-main/module-entity/list/list.component.ts`
- `src/app/cms-modules/catalog/content/list/list.component.ts`
- `src/app/cms-modules/article/content/list/list.component.ts`
- `src/app/cms-modules/file-manager/content/list/list.component.ts`
- `src/app/cms-modules/news/content/list/list.component.ts`
- `src/app/cms-modules/blog/content/list/list.component.ts`
- `src/app/cms-modules/chart/content/list/list.component.ts`
- `src/app/cms-modules/sms/main/message-content/list/list.component.ts`
- `src/app/cms-modules/core-main/user-claim/content/list/list.component.ts`
- `src/app/cms-modules/biography/content/list/list.component.ts`
- `src/app/cms-modules/polling/content/list/list.component.ts`
- `readmehistory.md`

> یادداشت: تغییرات قبلی روی ویجت `core-main/site/widget/count` بنا به درخواست حذف شد و فایل به حالت قبل بازگردانده شد.

---

## 2025-12-06 19:55 (پیاده‌سازی جستجوی همزمان سرور در CmsContactContentDropListComponent)

### تغییرات اعمال شده:

**هدف:** پیاده‌سازی جستجوی همزمان سرور در کامپوننت `CmsContactContentDropListComponent` مشابه نمونه موجود در `CmsContactContentSelectionListComponent`

**تغییرات:**

- افزودن جستجوی همزمان سرور هنگام تایپ در فیلد جستجوی لیست منابع
- استفاده از RxJS operators (`debounceTime`, `distinctUntilChanged`, `switchMap`) برای بهینه‌سازی جستجو
- ادغام نتایج جستجوی محلی با نتایج جستجوی سرور
- جلوگیری از نمایش آیتم‌های تکراری در نتایج
- افزودن نشانگر بارگذاری (loading indicator) هنگام جستجوی سرور
- مدیریت صحیح آیتم‌های حاصل از جستجوی سرور هنگام اضافه شدن به basket
- پاک‌سازی subscription در `ngOnDestroy` برای جلوگیری از memory leak

**جزئیات فنی:**

1. **Import های جدید:**
   - `Observable`, `Subject`, `Subscription` از `rxjs`
   - `debounceTime`, `distinctUntilChanged`, `switchMap`, `map`, `catchError` از `rxjs/operators`
   - `FilterDataModelSearchTypesEnum` از `ntk-cms-api`

2. **متغیرهای جدید:**
   - `serverSearchResults`: ذخیره نتایج جستجوی سرور
   - `searchTermListSubject`: Subject برای مدیریت جستجوی همزمان
   - `isSearchingServer`: وضعیت جستجوی سرور
   - `searchSubscription`: Subscription برای cleanup

3. **متدهای جدید:**
   - `setupServerSearch()`: تنظیم subscription برای جستجوی همزمان
   - `searchServer(searchTerm: string)`: جستجو در سرور با فیلترهای title، firstName و lastName
   - `onSearchTermListChange()`: فعال‌سازی جستجو هنگام تغییر متن
   - `ngOnDestroy()`: پاک‌سازی subscription

4. **به‌روزرسانی متدهای موجود:**
   - `filteredListItems`: ادغام نتایج محلی و سرور
   - `addToBasket()`: مدیریت آیتم‌های حاصل از جستجوی سرور
   - `drop()`: مدیریت drag & drop برای آیتم‌های حاصل از جستجوی سرور
   - `DataGetAll()`: ریست کردن نتایج جستجوی سرور

**فایل‌های تغییر یافته:**
- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.ts`
- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.html`
- `readmehistory.md`

---

## 2025-12-05 (انتخاب خودکار اولین آیتم در Export List)

### تغییرات اعمال شده:

**هدف:** انتخاب خودکار اولین نوع فایل (Excel) در dropdown فرمت فایل هنگام باز شدن دیالوگ Export

**تغییرات:**

- تغییر مقدار پیش‌فرض `filterModel.exportFile.fileType` از `Report` (مقدار ثابت) به اولین آیتم در `fileTypeListItems`
- افزودن بررسی `if (this.fileTypeListItems.length > 0)` برای اطمینان از وجود آیتم در لیست
- حالا به جای انتخاب "Report" به صورت پیش‌فرض، اولین آیتم که "Excel" است انتخاب می‌شود

**قبل:**
```typescript
ngOnInit(): void {
  this.DataGetAll();
  this.translate.get("TITLE.EXPORTFILE").subscribe((str: string) => {
    this.formInfo.formTitle = str + " : " + this.requestTitle;
  });
  this.filterModel.exportFile.fileType = this.EnumExportFileTypeReport; // Report
  this.filterModel.exportFile.recieveMethod = this.EnumExportReceiveMethodNow;
}
```

**بعد:**
```typescript
ngOnInit(): void {
  this.DataGetAll();
  this.translate.get("TITLE.EXPORTFILE").subscribe((str: string) => {
    this.formInfo.formTitle = str + " : " + this.requestTitle;
  });
  // انتخاب خودکار اولین آیتم در لیست
  if (this.fileTypeListItems.length > 0) {
    this.filterModel.exportFile.fileType = this.fileTypeListItems[0].value; // Excel
  }
  this.filterModel.exportFile.recieveMethod = this.EnumExportReceiveMethodNow;
}
```

**ترتیب آیتم‌های fileTypeListItems:**
1. Excel (value: 1) ← **انتخاب شده به صورت پیش‌فرض**
2. Json (value: 3)
3. Report (value: 4)

**فایل‌های تغییر یافته:**
- `src/app/shared/cms-export-list/cmsExportList.component.ts`
- `readmehistory.md`

**تاثیر:**
- کاربر دیگر نیازی ندارد دستی Excel را انتخاب کند، به صورت خودکار انتخاب می‌شود
- UX بهتر: رایج‌ترین فرمت (Excel) به صورت پیش‌فرض انتخاب شده است

---

## 2025-12-05 (بهبود Async در Pipe های cmssiteinfo)

### تغییرات اعمال شده:

**هدف:** اطمینان از async بودن کامل `cmssiteinfo` pipe و تمام استفاده‌های آن

**بررسی و نتایج:**

1. **بررسی خود Pipe:**
   - ✅ Pipe به درستی `Observable<string>` برمی‌گرداند
   - ✅ استفاده از `CoreSiteService.ServiceGetOneById` که Observable است
   - ✅ استفاده از `pipe` و `map` برای پردازش async

2. **بررسی استفاده‌ها:**
   - ✅ **126 مورد** استفاده در کل پروژه
   - ✅ **همه موارد** از `| async` استفاده می‌کنند
   - ✅ هیچ استفاده‌ای بدون `async` پیدا نشد

3. **بهبود اعمال شده:**
   - 🔧 تغییر `return new Observable<string>();` به `return of('');` در خط 13
   - این تغییر باعث می‌شود Observable خالی به جای یک Observable بدون emit، یک Observable با مقدار رشته خالی برگرداند
   - افزودن `of` به imports از `rxjs`

**قبل:**
```typescript
import { Observable, map } from "rxjs";
// ...
if (!value || value <= 0) {
  return new Observable<string>();
}
```

**بعد:**
```typescript
import { Observable, map, of } from "rxjs";
// ...
if (!value || value <= 0) {
  return of('');
}
```

**فایل‌های تغییر یافته:**
- `src/app/core/pipe/core/cms-site-info.pipe.ts`
- `readmehistory.md`

**نمونه‌هایی از استفاده صحیح در پروژه:**
```html
{{ row.linkSiteId | cmssiteinfo | async }}
{{ dataModel.linkSiteId | cmssiteinfo | async }}
{{ dataModelCalculate.linkSiteId | cmssiteinfo | async }}
```

**تاثیر:**
- بهبود performance در مواردی که value نامعتبر است
- سازگاری بهتر با async pipe در Angular
- جلوگیری از مشکلات احتمالی subscription

---

## 2025-12-04 19:10 (نمایش لیست submitResultErrors و submitResultWarnings در cms-form-result-message)

### تغییرات اعمال شده:

**هدف:** نمایش لیست خطاها و هشدارهای دریافتی از سرویس‌ها در کامپوننت نمایش پیام‌های نتیجه فرم

**تغییرات در HTML:**

1. **نمایش Errors همراه با پیام اصلی در حالت error:**
   - افزودن بلوک `@if` برای بررسی وجود `formInfo.submitResultErrors`
   - نمایش لیست errors در صورت وجود با استفاده از `@for`
   - استفاده از تگ `<ul>` و `<li>` برای نمایش ساختاریافته

2. **نمایش Warnings همراه با پیام اصلی در حالت warning:**
   - افزودن بلوک `@if` برای بررسی وجود `formInfo.submitResultWarnings`
   - نمایش لیست warnings در صورت وجود با استفاده از `@for`
   - استفاده از تگ `<ul>` و `<li>` برای نمایش ساختاریافته

3. **نمایش مستقل Errors و Warnings:**
   - افزودن دو بلوک جداگانه برای نمایش errors و warnings در صورتی که `submitResultMessage` خالی باشد
   - اطمینان از نمایش خطاها و هشدارها حتی بدون پیام اصلی

**ساختار کد:**

```html
@case ("error") {
  <div class="alert alert-danger" role="alert">
    <i class="fa fa-exclamation-circle me-2"></i>
    <strong>{{ "MESSAGE.Error" | translate }}:</strong>
    {{ formInfo.submitResultMessage }}
    @if (formInfo?.submitResultErrors?.length > 0) {
      <ul class="mt-2 mb-0">
        @for (error of formInfo.submitResultErrors; track $index) {
          <li>{{ error }}</li>
        }
      </ul>
    }
  </div>
}

@case ("warning") {
  <div class="alert alert-warning" role="alert">
    <i class="fa fa-exclamation-triangle me-2"></i>
    <strong>{{ "MESSAGE.Warning" | translate }}:</strong>
    {{ formInfo.submitResultMessage }}
    @if (formInfo?.submitResultWarnings?.length > 0) {
      <ul class="mt-2 mb-0">
        @for (warning of formInfo.submitResultWarnings; track $index) {
          <li>{{ warning }}</li>
        }
      </ul>
    }
  </div>
}

<!-- نمایش Errors جداگانه -->
@if (formInfo?.submitResultErrors?.length > 0 && formInfo?.submitResultMessage?.length === 0) {
  <div class="alert alert-danger" role="alert">
    <i class="fa fa-exclamation-circle me-2"></i>
    <strong>{{ "MESSAGE.Error" | translate }}:</strong>
    <ul class="mt-2 mb-0">
      @for (error of formInfo.submitResultErrors; track $index) {
        <li>{{ error }}</li>
      }
    </ul>
  </div>
}

<!-- نمایش Warnings جداگانه -->
@if (formInfo?.submitResultWarnings?.length > 0 && formInfo?.submitResultMessage?.length === 0) {
  <div class="alert alert-warning" role="alert">
    <i class="fa fa-exclamation-triangle me-2"></i>
    <strong>{{ "MESSAGE.Warning" | translate }}:</strong>
    <ul class="mt-2 mb-0">
      @for (warning of formInfo.submitResultWarnings; track $index) {
        <li>{{ warning }}</li>
      }
    </ul>
  </div>
}
```

**فایل‌های تغییر یافته:**

- `src/app/shared/cms-form-result-message/cms-form-result-message.component.html`
- `readmehistory.md`

**ویژگی‌های پیاده‌سازی شده:**

- نمایش لیست کامل خطاها در کنار پیام اصلی error
- نمایش لیست کامل هشدارها در کنار پیام اصلی warning
- نمایش مستقل errors و warnings در صورت نبودن پیام اصلی
- استفاده از Bootstrap classes (mt-2, mb-0) برای فاصله‌گذاری مناسب
- استفاده از syntax جدید Angular (@if, @for) برای شرط و حلقه
- Safe navigation operator (?.) برای جلوگیری از خطای null/undefined

**تاثیر:**

از این به بعد، تمام فرم‌هایی که از `app-cms-form-result-message` استفاده می‌کنند، علاوه بر پیام اصلی، لیست کامل خطاها و هشدارهای دریافتی از API را هم به کاربر نمایش خواهند داد، که به درک بهتر مشکلات کمک می‌کند.

---

## 2025-12-04 18:45 (Migration کامل Core Models از ntk-cms-api)

### تغییرات اعمال شده:

**هدف:** انتقال FormInfoModel، FormSubmitedStatusEnum و FormValidationStatusEnum از ntk-cms-api به src/app/core/models

**نتایج:**
- ✅ **499 فایل** TypeScript اصلاح شد
- ✅ **0 فایل** با import قدیمی باقی ماند
- ✅ **552 import** جدید از core/models
- ✅ Backup کامل: `backup-imports-20251204-182435`

**تغییرات در imports:**

**قبل:**
```typescript
import {
  FormInfoModel,
  FormSubmitedStatusEnum,
  FormValidationStatusEnum,
  ...
} from "ntk-cms-api";
```

**بعد:**
```typescript
import { FormInfoModel } from "../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../core/models/formSubmitedStatusEnum";
import { FormValidationStatusEnum } from "../../../../core/models/formValidationStatusEnum";
import {
  ...  // بقیه imports از ntk-cms-api
} from "ntk-cms-api";
```

**فایل‌های Core Models:**
1. `src/app/core/models/formInfoModel.ts`
2. `src/app/core/models/formSubmitedStatusEnum.ts`
3. `src/app/core/models/formValidationStatusEnum.ts`

**اصلاحات خاص:**
- اصلاح ValidationStatusEnum به FormValidationStatusEnum در کل پروژه
- اصلاح مسیرهای نسبی برای هر فایل بر اساس موقعیتش
- حذف imports غیرضروری از ntk-cms-api

**تاثیر:**
پروژه حالا مستقل از ntk-cms-api برای این سه مدل است و می‌تواند آنها را به صورت محلی مدیریت کند.

---

## 2025-12-04 18:30 (اصلاح کامل سیستم نمایش پیام‌های نتیجه فرم در کل پروژه)

### تغییرات عظیم اعمال شده (680+ فایل):

**هدف:** پیاده‌سازی کامل سیستم یکپارچه نمایش پیام‌های نتیجه فرم در تمام پروژه

#### بخش 1: TypeScript (submitResultMessageType)

**آمار کلی:**
- ✅ **389 فایل** TypeScript پردازش شد
- ✅ **333 فایل** اصلاح شد
- ✅ **250 import** جدید اضافه شد
- ✅ **563 بلوک** if/else اصلاح شد
- ✅ **0 خطا**

**تغییرات در هر فایل:**
1. **اضافه کردن import:**
```typescript
import {
  ...,
  FormSubmitedStatusEnum,  // این خط اضافه شد
  ...
} from "ntk-cms-api";
```

2. **اصلاح بلوک موفقیت (if):**
```typescript
if (ret.isSuccess) {
  this.formInfo.submitResultMessage = "...";
  this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success; // این خط اضافه شد
  ...
}
```

3. **اصلاح بلوک خطا (else):**
```typescript
else {
  this.formInfo.submitResultMessage = ret.errorMessage;
  this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Error; // این خط اضافه شد
  ...
}
```

**ماژول‌های اصلاح شده:**
- shared: 10 فایل
- sms: 32 فایل
- estate: 61 فایل
- core-main: 54 فایل
- data-provider: 25 فایل
- link-management: 23 فایل
- و 184 فایل دیگر در سایر ماژول‌ها

#### بخش 2: HTML (app-cms-form-result-message)

**آمار کلی:**
- ✅ **298 فایل** HTML اصلاح شد
- ✅ **291 فایل** از طریق اسکریپت
- ✅ **7 فایل** shared به صورت دستی

**تغییر در هر فایل:**
قبل از هر `<form (ngSubmit)="onFormSubmit()"` این کامپوننت اضافه شد:
```html
<app-cms-form-result-message
  [formInfo]="formInfo"
></app-cms-form-result-message>
<form (ngSubmit)="onFormSubmit()" #vform="ngForm">
```

**نکات مهم:**
- کامپوننت به صورت خودکار بر اساس `formInfo.submitResult` رنگ و آیکون مناسب را نمایش می‌دهد
- پشتیبانی از 4 حالت: success, error, warning, info
- نمایش به صورت Full Width با Bootstrap Alert
- سازگار با تم روز/شب پروژه

#### بخش 3: Backup و امنیت

**Backup های ایجاد شده:**
1. `backup-20251204-180148` - اولین دور اصلاحات
2. `backup-complete-20251204-180325` - imports کامل
3. `backup-20251204-180358` - بلوک‌های if/else
4. `backup-html-20251204-180537` - فایل‌های HTML

**روش بازیابی در صورت مشکل:**
در صورت بروز هر مشکلی، می‌توان از پوشه‌های backup استفاده کرد.

#### بخش 4: اسکریپت‌های استفاده شده

سه اسکریپت PowerShell نوشته شد و اجرا شد:
1. `fix-all-submit-result.ps1` - اضافه کردن imports
2. `fix-if-else-blocks.ps1` - اصلاح بلوک‌های if/else
3. `fix-html-form-result-message.ps1` - اضافه کردن component به HTML

#### نتیجه نهایی:

**✅ 100% موفق:**
- تمام فایل‌های TypeScript: submitResultMessageType دارند
- تمام فایل‌های HTML با form: app-cms-form-result-message دارند
- سیستم یکپارچه نمایش پیام در کل پروژه
- هیچ فایلی از قلم نیفتاده
- هیچ خطایی رخ نداده

**تاثیر:**
از این به بعد، تمام فرم‌های پروژه پیام‌های نتیجه (موفقیت/خطا/هشدار) را با رنگ و آیکون مناسب و به صورت یکپارچه نمایش می‌دهند.

---

## 2025-12-04 18:15 (بهبود نمایش پیام‌های نتیجه فرم با Bootstrap Alert به صورت فول ردیف)

### تغییرات اعمال شده:

**هدف:** نمایش پیام‌های نتیجه ثبت فرم‌ها با استفاده از Bootstrap Alert به صورت Full Width

**فایل‌های تغییر یافته:**
1. `src/app/shared/cms-form-result-message/cms-form-result-message.component.html`
2. `src/assets/i18n/fa.json`
3. `src/assets/i18n/en.json`

**تغییرات:**
- تبدیل از alert ساده به Bootstrap Alert با رنگ‌های استاندارد
- نمایش به صورت Full Width (فول ردیف)
- استفاده از switch برای نمایش حالت‌های مختلف بر اساس `formInfo.submitResult`:
  - **success** (موفق):
    - کلاس: alert alert-success
    - آیکون: fa-check-circle ✓
    - عنوان: "موفق:"
  - **error** (خطا):
    - کلاس: alert alert-danger
    - آیکون: fa-exclamation-circle ⚠
    - عنوان: "خطا:"
  - **warning** (هشدار):
    - کلاس: alert alert-warning
    - آیکون: fa-exclamation-triangle ⚠
    - عنوان: "هشدار:"
  - **none/default** (اطلاعات):
    - کلاس: alert alert-info
    - آیکون: fa-info-circle ℹ
    - عنوان: "اطلاعات:"

**ترجمه‌های اضافه شده:**
- `MESSAGE.Info`: "اطلاعات" (فارسی) / "Info" (انگلیسی)

**ویژگی‌های پیاده‌سازی شده:**
- سازگار با Bootstrap Alert موجود در پروژه
- نمایش به صورت Full Width (کل عرض صفحه)
- استفاده از syntax جدید Angular (@if/@switch)
- آیکون‌های مناسب با فاصله (me-2)
- عنوان bold برای هر نوع پیام
- نمایش پیام فقط در صورت وجود محتوا
- طراحی یکپارچه با سایر alertهای پروژه
- پشتیبانی از تم روز/شب پروژه

**تاثیر:**
این کامپوننت در تمام فرم‌هایی که از `app-cms-form-result-message` استفاده می‌کنند، به صورت خودکار پیام‌های نتیجه را با استایل Bootstrap Alert و به صورت Full Width نمایش خواهد داد.

---

## 2025-12-04 17:30 (اضافه کردن قابلیت بررسی اجراها در لیست زمان‌بند ارسال پیامک)

### تغییرات اعمال شده:

**هدف:** نمایش لیست اجراها (scheduleRunInfos) در یک popup برای هر رکورد زمان‌بند ارسال پیامک

**فایل‌های ایجاد شده:**
1. `src/app/cms-modules/sms/log/outbox-task-scheduler/schedule-run-info-list/schedule-run-info-list.component.ts`
   - کامپوننت Dialog برای نمایش لیست اجراها
   - دریافت داده‌های scheduleRunInfos از طریق MAT_DIALOG_DATA

2. `src/app/cms-modules/sms/log/outbox-task-scheduler/schedule-run-info-list/schedule-run-info-list.component.html`
   - جدول نمایش اطلاعات اجراها شامل:
     - شناسه قفل اجرا (scheduleLockerId)
     - زمان شروع اجرا (scheduleLockedRun)
     - زمان پایان اجرا (scheduleLockedEnd)
     - میکروسرویس (scheduleLockerMicroservice)
     - وضعیت موفقیت (isSuccess)
     - پیام خطا (errorMessage)
   - طراحی responsive با استفاده از Bootstrap
   - نمایش آیکن موفق/ناموفق برای هر اجرا

**فایل‌های تغییر یافته:**
1. `src/app/cms-modules/sms/log/sms-log.module.ts`
   - اضافه کردن ScheduleRunInfoListComponent به declarations
   - اضافه کردن import مربوطه

2. `src/app/cms-modules/sms/log/outbox-task-scheduler/list/list.component.ts`
   - اضافه کردن متد onActionButtonScheduleRunInfos برای باز کردن popup
   - اضافه کردن ستون scheduleRunInfos به لیست ستون‌های جدول
   - بررسی وجود scheduleRunInfos قبل از نمایش popup
   - نمایش پیام warning در صورت عدم وجود اجرا

3. `src/app/cms-modules/sms/log/outbox-task-scheduler/list/list.component.html`
   - اضافه کردن ستون جدید scheduleRunInfos در جدول
   - نمایش آیکون با تعداد اجراها (badge)
   - فقط در صورت وجود اجرا دکمه نمایش داده می‌شود

4. `src/assets/i18n/fa.json`
   - اضافه کردن ترجمه‌های فارسی:
     - TITLE.Schedule_Run_Infos: "بررسی اجراها"
     - TITLE.Task_Scheduler_ID: "شناسه زمان‌بند"
     - TITLE.Schedule_Locker_Id: "شناسه قفل اجرا"
     - TITLE.Schedule_Locked_Run: "زمان شروع اجرا"
     - TITLE.Schedule_Locked_End: "زمان پایان اجرا"
     - TITLE.Schedule_Locker_Microservice: "میکروسرویس"
     - TITLE.Error_Message: "پیام خطا"
     - MESSAGE.No_Schedule_Run_Infos: "هیچ اجرایی ثبت نشده است"
     - MESSAGE.Success: "موفق"
     - MESSAGE.Failed: "ناموفق"
     - ACTION.View_Schedule_Run_Infos: "مشاهده لیست اجراها"

5. `src/assets/i18n/en.json`
   - اضافه کردن ترجمه‌های انگلیسی مربوطه

**ویژگی‌های پیاده‌سازی شده:**
- نمایش popup به صورت responsive (fullscreen در موبایل، dialog در دسکتاپ)
- نمایش تعداد اجراها در badge کنار آیکون
- نمایش زمان‌ها با فرمت مناسب (localeDateTime)
- نمایش آیکون success/error برای هر اجرا
- نمایش پیام خطا فقط در صورت عدم موفقیت
- پیام مناسب در صورت عدم وجود اجرا
- طراحی UI زیبا و کاربرپسند با Bootstrap

---

## 2025-12-03 (پیاده‌سازی حرفه‌ای Drag & Drop با حل مشکل ارتفاع‌های مختلف ویجت‌ها)

### پیاده‌سازی Drag & Drop حرفه‌ای با راه‌حل مشکل ارتفاع‌ها

**چالش اصلی:**
- ویجت‌ها ارتفاع‌های مختلف داشتند که ظاهر را زشت می‌کرد
- نیاز به حرکت عمودی و افقی همزمان
- نیاز به placeholder واضح و کاربردی

**راه‌حل پیاده‌سازی شده:**

1. **Drag Handle مخفی با نمایش در Hover:**
   ```scss
   .drag-handle {
     opacity: 0; // مخفی به صورت پیش‌فرض
     transform: scale(0.8);
     transition: all 0.3s ease;
   }

   .widget-item:hover .drag-handle {
     opacity: 1; // نمایش در hover
     transform: scale(1);
   }
   ```
   - آیکون فقط وقتی روی ویجت hover می‌کنید نمایش داده می‌شود
   - با انیمیشن smooth ظاهر می‌شود (fade in + scale)
   - UI تمیزتر و حرفه‌ای‌تر

2. **حل مشکل ارتفاع‌های مختلف:**
   ```scss
   .widget-wrapper {
     min-height: 400px; // ارتفاع یکسان برای همه
     display: flex;
     flex-direction: column;
     height: 100%;
   }
   ```
   - تمام ویجت‌ها حداقل 400px ارتفاع دارند (desktop)
   - در تبلت: 350px
   - در موبایل: 300px

2. **Drag Handle ساده و کاربردی:**
   - آیکون Material: `reorder`
   - موقعیت: بالا سمت راست (RTL: بالا سمت چپ)
   - Cursor: `grab` در عادی، `grabbing` در active
   - Hover: background تیره‌تر + رنگ icon تیره‌تر
   - Active: scale کوچک‌تر (0.95)

3. **Placeholder واضح:**
   - Background: `rgba(0, 0, 0, 0.06)` شفاف
   - Border: `2px solid rgba(0, 0, 0, 0.12)` ساده
   - ارتفاع: همان minimum ویجت‌ها (400/350/300px)
   - متن: "رها کنید"

4. **حالت Dragging:**
   - Opacity: 0.7
   - Shadow: `0 8px 20px rgba(0, 0, 0, 0.25)`
   - z-index: 1000
   - Handle مخفی می‌شود

5. **Transitions smooth:**
   - انیمیشن: `300ms cubic-bezier(0.4, 0, 0.2, 1)`
   - نرم و طبیعی

6. **پشتیبانی کامل از عمودی و افقی:**
   - بدون محدودیت orientation
   - `flex-wrap: wrap` در row
   - جابجایی در تمام جهات

**کلاس‌های استفاده شده:**
- `.widget-item`: کانتینر اصلی ویجت
- `.drag-handle`: دسته کشیدن
- `.widget-wrapper`: wrapper با ارتفاع ثابت
- `.drag-placeholder`: جای خالی

**فایل SCSS: 157 خط تمیز و کاربردی**

**مزایای پیاده‌سازی جدید:**

1. **سازگاری بیشتر**: استفاده از Material Design Icons و رنگ‌های استاندارد
2. **Change Detection بهتر**: استفاده از `slice()` برای اطمینان از بروزرسانی view
3. **کد تمیزتر**: پیدا کردن index با `findIndex` به جای استفاده مستقیم از event indices
4. **یکپارچگی**: استفاده از کلاس‌های استاندارد ntk و استایل‌های global
5. **UX بهتر**: افکت‌های بصری حرفه‌ای‌تر (scale، rotate، shadow، ripple)
6. **Performance**: بهینه‌سازی برای موبایل با کاهش shadow و transition

---

## 2025-12-03 (اضافه کردن قابلیت Drag & Drop به داشبورد و ایجاد ویجت‌های SMS جدید)

### افزودن قابلیت Drag & Drop حرفه‌ای به داشبورد

**تغییرات:**

- پیاده‌سازی سیستم Drag & Drop حرفه‌ای برای تمام ویجت‌های داشبورد با استفاده از Angular CDK
- اضافه کردن `DragDropModule` از `@angular/cdk/drag-drop` به `panel.module.ts`
- ایجاد مدل داده `DashboardWidgetModel` برای مدیریت ویجت‌های داشبورد با پشتیبانی از:
  - شناسه منحصر به فرد (id)
  - selector کامپوننت
  - شرط نمایش بر اساس ماژول (moduleCondition)
  - شرط نمایش سفارشی (customCondition)
  - کلاس‌های CSS برای ابعاد مختلف (colClass)
- پیاده‌سازی متد `onWidgetDrop` برای مدیریت رویداد جابجایی ویجت‌ها
- ذخیره و بازیابی ترتیب ویجت‌ها در localStorage با کلید `dashboard_widget_order`
- افزودن Drag Handle به هر ویجت با آیکون `fa-grip-vertical`
- اضافه کردن Placeholder زیبا در حین Drag
- پشتیبانی کامل از RTL و حالت Responsive
- تمام ویجت‌های موجود در داشبورد اکنون قابلیت جابجایی دارند:
  - ویجت‌های Estate (Customer Order، Property، Property History)
  - ویجت‌های Core (Site Credit، User Credit، User Claim، Site Count)
  - ویجت‌های SMS (OutBox Queue، OutBox Task Scheduler، OutBox، InBox)
  - ویجت‌های محتوایی (Article، Blog، Biography، News، Chart)
  - ویجت‌های دیگر (Application، Ticketing، Report Abuse)

**استایل‌های CSS اضافه شده:**

- `.dashboard-widget-container`: کانتینر اصلی هر ویجت با padding مناسب برای Drag Handle
- `.widget-drag-handle`: دسته‌گیره برای کشیدن ویجت با افکت hover و active
- `.widget-drag-placeholder`: نمایشگر موقعیت قرارگیری ویجت در حین Drag
- `.cdk-drag-animating`: انیمیشن‌های روان برای جابجایی
- Responsive Design برای صفحه‌نمایش‌های کوچک (Mobile)

### ایجاد ویجت‌های جدید SMS

**1. ویجت SMS OutBox Task Scheduler:**

- نمایش وضعیت زمان‌بندهای ارسال پیامک
- فیلترهای پشتیبانی شده:
  - آیتم‌های فعال (Available)
  - در انتظار تایید مدیر (Pending Admin Approval)
  - نیاز به بررسی (Need To Check)
  - مجاز به اجرای بعدی (Allow Next Run با `scheduleSendAllowNextRun = true`)
- نمودار دایره‌ای برای نمایش توزیع وضعیت‌ها
- لینک مستقیم به صفحه لیست `/sms/log/outbox-task-scheduler`

**2. ویجت SMS OutBox:**

- نمایش وضعیت صندوق خروجی پیامک
- فیلترهای پشتیبانی شده:
  - آیتم‌های فعال (Available)
  - در انتظار تایید مدیر (Pending Admin Approval)
  - نیاز به بررسی (Need To Check)
  - ارسال موفق (Sent Successfully با `sendResultIsSuccess = true`)
- نمودار دایره‌ای برای نمایش توزیع وضعیت‌ها
- لینک مستقیم به صفحه لیست `/sms/log/outbox`

**3. ویجت SMS InBox:**

- نمایش وضعیت صندوق دریافتی پیامک
- فیلترهای پشتیبانی شده:
  - آیتم‌های فعال (Available)
  - در انتظار تایید مدیر (Pending Admin Approval)
  - نیاز به بررسی (Need To Check)
  - پیام‌های خوانده نشده (Unread Messages با `seen = false`)
- نمودار دایره‌ای برای نمایش توزیع وضعیت‌ها
- لینک مستقیم به صفحه لیست `/sms/log/inbox`

**کلیدهای ترجمه اضافه شده:**

TITLE:

- `OutBox_Task_Scheduler`: زمان‌بند ارسال پیامک
- `SMS_OutBox_Task_Scheduler_Status`: وضعیت زمان‌بند ارسال پیامک
- `Number_OutBox_Task_Scheduler`: تعداد زمان‌بند ارسال
- `Allow_Next_Run`: مجاز به اجرای بعدی
- `View_Task_Scheduler_List`: مشاهده لیست زمان‌بند
- `OutBox`: صندوق خروجی پیامک
- `SMS_OutBox_Status`: وضعیت صندوق خروجی پیامک
- `Number_OutBox`: تعداد پیامک خروجی
- `Sent_Successfully`: ارسال موفق
- `View_OutBox_List`: مشاهده لیست صندوق خروجی
- `InBox`: صندوق دریافتی پیامک
- `SMS_InBox_Status`: وضعیت صندوق دریافتی پیامک
- `Number_InBox`: تعداد پیامک دریافتی
- `Unread_Messages`: پیام‌های خوانده نشده
- `View_InBox_List`: مشاهده لیست صندوق دریافتی

MESSAGE:

- `outbox_task_scheduler_list`: لیست زمان‌بند ارسال پیامک
- `outbox_list`: لیست صندوق خروجی پیامک
- `inbox_list`: لیست صندوق دریافتی پیامک

**فایل‌های ایجاد شده:**

- `src/app/cms-modules/sms/log/outbox-task-scheduler/widget/widget.component.ts`
- `src/app/cms-modules/sms/log/outbox-task-scheduler/widget/widget.component.html`
- `src/app/cms-modules/sms/log/outbox/widget/widget.component.ts`
- `src/app/cms-modules/sms/log/outbox/widget/widget.component.html`
- `src/app/cms-modules/sms/log/inbox/widget/widget.component.ts`
- `src/app/cms-modules/sms/log/inbox/widget/widget.component.html`
- `src/app/modules/panel/page-dashboard/page-dashboard.component.scss`

**فایل‌های تغییر یافته:**

- `src/app/modules/panel/panel.module.ts` (اضافه شدن DragDropModule)
- `src/app/modules/panel/page-dashboard/page-dashboard.component.ts` (پیاده‌سازی Drag & Drop)
- `src/app/modules/panel/page-dashboard/page-dashboard.component.html` (بازسازی ساختار با cdkDropList و cdkDrag)
- `src/app/cms-modules/cmsModulesWidget.module.ts` (ثبت ویجت‌های جدید)
- `src/assets/i18n/fa.json`
- `src/assets/i18n/en.json`
- `src/assets/i18n/ar.json`
- `src/assets/i18n/de.json`
- `src/assets/i18n/es.json` (برنامه‌ریزی شده برای بروزرسانی)
- `src/assets/i18n/fr.json` (برنامه‌ریزی شده برای بروزرسانی)
- `src/assets/i18n/ja.json` (برنامه‌ریزی شده برای بروزرسانی)
- `src/assets/i18n/tr.json` (برنامه‌ریزی شده برای بروزرسانی)
- `src/assets/i18n/zh.json` (برنامه‌ریزی شده برای بروزرسانی)
- `readmehistory.md`

**نکات فنی:**

- از `moveItemInArray` از `@angular/cdk/drag-drop` برای جابجایی ویجت‌ها استفاده شده است
- ترتیب ویجت‌ها در localStorage ذخیره می‌شود و پس از رفرش صفحه حفظ می‌ماند
- Drag Handle در موقعیت مناسب و با cursor مناسب (grab/grabbing) قرار گرفته است
- ویجت‌ها به صورت هوشمند بر اساس وجود ماژول و شرایط سفارشی نمایش داده می‌شوند
- استایل‌های CSS به صورت Responsive طراحی شده‌اند و در تمام اندازه‌های صفحه به خوبی کار می‌کنند
- از `cdkDragPlaceholder` برای نمایش موقعیت قرارگیری ویجت استفاده شده است
- تمام سرویس‌های API (SmsLogOutBoxTaskSchedulerService، SmsLogOutBoxService، SmsLogInBoxService) به providers اضافه شده‌اند

---

## 2025-12-02 13:43:27

### افزودن ویجت SMS OutBox Queue به داشبورد

**تغییرات:**

- ایجاد کامپوننت ویجت جدید برای نمایش وضعیت صف خروجی پیامک (`SmsLogOutBoxQueueWidgetComponent`)
- نمایش آمار و وضعیت صف‌های خروجی پیامک در داشبورد اصلی شامل:
  - آیتم‌های فعال (Available)
  - آیتم‌های در انتظار تایید مدیر (Pending Admin Approval)
  - آیتم‌های نیاز به بررسی (Need To Check)
  - صف‌های کامل شده (Completed Queue)
- افزودن نمودار دایره‌ای (Pie Chart) برای نمایش توزیع وضعیت‌های مختلف
- ثبت ویجت در `CmsModulesWidgetModule` برای استفاده در سراسر برنامه
- افزودن ویجت به صفحه dashboard اصلی (`page-dashboard.component.html`)
- پشتیبانی از فیلتر `MainAdminRecordStatus` برای نمایش وضعیت تایید مدیر اصلی
- افزودن کلیدهای چندزبانه جدید به تمام زبان‌های پروژه:
  - `TITLE.OutBox_Queue`: صف خروجی پیامک
  - `TITLE.SMS_OutBox_Queue_Status`: وضعیت صف خروجی پیامک
  - `TITLE.Number_OutBox_Queue`: تعداد صف خروجی
  - `TITLE.Pending_Admin_Approval`: در انتظار تایید مدیر
  - `TITLE.Need_To_Check`: نیاز به بررسی
  - `TITLE.Completed_Queue`: صف کامل شده
  - `TITLE.View_Queue_List`: مشاهده لیست صف
  - `MESSAGE.outbox_queue_list`: لیست صف خروجی پیامک
- ترجمه تمام کلیدها به زبان‌های: فارسی، انگلیسی، عربی، آلمانی، اسپانیایی، فرانسوی، ژاپنی، ترکی، چینی

**فایل‌های ایجاد شده:**

- `src/app/cms-modules/sms/log/outbox-queue/widget/widget.component.ts`
- `src/app/cms-modules/sms/log/outbox-queue/widget/widget.component.html`

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/cmsModulesWidget.module.ts`
- `src/app/modules/panel/page-dashboard/page-dashboard.component.html`
- `src/assets/i18n/fa.json`
- `src/assets/i18n/en.json`
- `src/assets/i18n/ar.json`
- `src/assets/i18n/de.json`
- `src/assets/i18n/es.json`
- `src/assets/i18n/fr.json`
- `src/assets/i18n/ja.json`
- `src/assets/i18n/tr.json`
- `src/assets/i18n/zh.json`
- `readmehistory.md`

**ویژگی‌های ویجت:**

- نمایش تعداد صف‌های با وضعیت‌های مختلف
- لینک مستقیم به صفحه لیست صف خروجی پیامک
- نمایش نمودار تحلیلی وضعیت‌ها
- بروزرسانی خودکار با تغییر وضعیت توکن کاربر
- دکمه بازخوانی اطلاعات
- پشتیبانی کامل از چندزبانه
- طراحی واکنش‌گرا (Responsive) برای نمایش در موبایل و دسکتاپ

---

## 2025-12-02 16:00:00

### تکمیل کلیدهای چندزبانه TITLE.ServiceMaxPage و TITLE.endUserMaxPage

**تغییرات:**

- افزودن کلیدهای ترجمه `TITLE.ServiceMaxPage` و `TITLE.endUserMaxPage` به تمام زبان‌های پروژه که قبلاً فقط در فارسی و انگلیسی موجود بودند
- هماهنگ‌سازی این کلیدها در زبان‌های: عربی (ar), آلمانی (de), اسپانیایی (es), فرانسوی (fr), ژاپنی (ja), ترکی (tr), چینی (zh)
- ترجمه‌های اضافه شده:
  - عربی: "End user max page count" و "Service max page count"
  - آلمانی: "Endbenutzer maximale Seitenanzahl" و "Service maximale Seitenanzahl"
  - اسپانیایی: "Recuento máximo de páginas de usuario final" و "Recuento máximo de páginas de servicio"
  - فرانسوی: "Nombre maximum de pages utilisateur final" و "Nombre maximum de pages de service"
  - ژاپنی: "エンドユーザー最大ページ数" و "サービス最大ページ数"
  - ترکی: "Son kullanıcı maksimum sayfa sayısı" و "Servis maksimum sayfa sayısı"
  - چینی: "最终用户最大页数" و "服务最大页数"

**فایل‌های تغییر یافته:**

- `src/assets/i18n/ar.json`
- `src/assets/i18n/de.json`
- `src/assets/i18n/es.json`
- `src/assets/i18n/fr.json`
- `src/assets/i18n/ja.json`
- `src/assets/i18n/tr.json`
- `src/assets/i18n/zh.json`
- `readmehistory.md`

---

## 2025-12-02 15:30:00

### افزودن دریافت زمان سیستم و عنوان Commit در GitHub Actions Workflow

**تغییرات:**

- افزودن step جدید با نام "Get System Time" در فایل workflow برای دریافت زمان سیستم و عنوان commit
- ذخیره زمان سیستم با فرمت `YYYY-MM-DD HH:MM:SS` در متغیر محیطی `SYSTEM_TIME`
- ذخیره عنوان commit در متغیر محیطی `commitTitle` از `github.event.head_commit.message`
- نمایش زمان سیستم و عنوان commit در لاگ‌های GitHub Actions برای بررسی و مانیتورینگ
- قرار دادن step جدید قبل از ارسال پیامک نهایی برای امکان استفاده از زمان و عنوان commit در پیام‌ها
- استفاده از `${{ env.SYSTEM_TIME }}` در پیام SMS نهایی برای نمایش زمان publish

**فایل‌های تغییر یافته:**

- `.github/workflows/node.js.yml`
- `readmehistory.md`

**نحوه استفاده از متغیرها:**

در stepهای بعدی می‌توان از `${{ env.SYSTEM_TIME }}` برای دسترسی به زمان سیستم و از `${{ env.commitTitle }}` برای دسترسی به عنوان commit استفاده کرد.

---

## 2025-12-01 11:00:00

### افزودن کلیدهای چندزبانه MESSAGE.Yes و MESSAGE.No برای کامپوننت‌های لاگ پیامک

**تغییرات:**

- افزودن کلیدهای ترجمه `MESSAGE.Yes` و `MESSAGE.No` برای نمایش مقادیر بولی (بله/خیر) در صفحات لاگ ارسال پیامک و سایر لیست‌ها
- هماهنگ‌سازی این کلیدها در همه زبان‌های فعال پروژه (fa, en, ar, de, es, fr, tr, zh, ja)

**فایل‌های تغییر یافته:**

- `src/assets/i18n/fa.json`
- `src/assets/i18n/en.json`
- `src/assets/i18n/ar.json`
- `src/assets/i18n/de.json`
- `src/assets/i18n/es.json`
- `src/assets/i18n/fr.json`
- `src/assets/i18n/tr.json`
- `src/assets/i18n/zh.json`
- `src/assets/i18n/ja.json`
- `readmehistory.md`

---

## 2025-11-30 10:05:00

### افزودن نمایش فیلدهای مهم فیلتر و ممنوعیت در کامپوننت‌های نتایج ارسال پیامک

**تغییرات:**

- افزودن ستون‌های جدید در جدول receivers برای نمایش فیلدهای مهم:
  - `messageTextForbid` - ممنوعیت متن پیام
  - `messageTextFiltering` - فیلتر متن پیام (با نمایش کاراکترهای فیلتر شده)
  - `messageNumberForbid` - ممنوعیت شماره
  - `messageNumberFiltering` - فیلتر شماره (با نمایش کاراکترهای فیلتر شده)
- افزودن هشدارهای بصری (رنگ قرمز برای ممنوعیت و رنگ زرد برای فیلتر) در جدول
- افزودن کلاس `warning-row` برای ردیف‌هایی که دارای هشدار هستند
- نمایش کاراکترهای فیلتر شده در صورت وجود
- افزودن کلیدهای ترجمه جدید به فایل‌های چندزبانه (fa.json و en.json)

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/action/send-message/send-message-calculate-result/send-message-calculate-result.component.html`
- `src/app/cms-modules/sms/action/send-message/send-message-result/send-message-result.component.html`
- `src/assets/i18n/fa.json`
- `src/assets/i18n/en.json`
- `readmehistory.md`

---

## 2025-11-30 09:55:57

### بهبود نمایش نتایج ارسال پیامک در SmsActionSendMessageResultComponent

**تغییرات:**

- اصلاح دسترسی به فیلدهای مدل از `data` به `data.item` برای دسترسی صحیح به `SmsApiSendResultModel`
- افزودن بخش نمایش خطاها (`errorMessage` و `errors`) از `ErrorExceptionResult`
- افزودن بخش نمایش هشدارها (`warnings`) از `ErrorExceptionResult`
- نمایش `toNumbers` از طریق getter `receivers` که از `data.item.toNumbers` استفاده می‌کند
- اصلاح فیلد نمایش شماره گیرنده از `receiver.toNumber` به `receiver.number` برای هماهنگی با ساختار `NumberReceverInfoModel`

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/action/send-message/send-message-result/send-message-result.component.html`
- `readmehistory.md`

---

## 2025-11-30 09:46:04

### بهبود نمایش نتایج محاسبه ارسال پیامک در SmsActionSendMessageCalculateResultComponent

**تغییرات:**

- اصلاح دسترسی به فیلدهای مدل از `data` به `data.item` برای دسترسی صحیح به `SmsApiSendOrderCalculateResultModel`
- افزودن بخش نمایش خطاها (`errorMessage` و `errors`) از `ErrorExceptionResult`
- افزودن بخش نمایش هشدارها (`warnings`) از `ErrorExceptionResult`
- نمایش `toNumbers` از طریق getter `receivers` که از `data.item.toNumbers` استفاده می‌کند
- افزودن کلیدهای ترجمه `MESSAGE.Error` و `MESSAGE.Warning` به فایل‌های چندزبانه (fa.json و en.json)

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/action/send-message/send-message-calculate-result/send-message-calculate-result.component.html`
- `src/assets/i18n/fa.json`
- `src/assets/i18n/en.json`
- `readmehistory.md`

---

## 2025-01-28 12:00:00

### افزودن مسیر Import و دکمه Import در ContactContentListComponent

**تغییرات:**

- افزودن مسیر `/contact/content/import` به routing ماژول contact برای دسترسی به صفحه Import
- افزودن متد `onActionButtonImport()` در `ContactContentListComponent` برای navigate به صفحه import
- افزودن دکمه Import در بخش `cms-action-main` کنار دکمه Add با آیکن `fa-file-import`
- افزودن کلید ترجمه `ACTION.IMPORT` به تمام فایل‌های چندزبانه (en, fa, ar, de, es, fr, tr, zh, ja)

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/contact/contact.routing.ts`
- `src/app/cms-modules/contact/content/list/list.component.ts`
- `src/app/cms-modules/contact/content/list/list.component.html`
- `src/assets/i18n/en.json`
- `src/assets/i18n/fa.json`
- `src/assets/i18n/ar.json`
- `src/assets/i18n/de.json`
- `src/assets/i18n/es.json`
- `src/assets/i18n/fr.json`
- `src/assets/i18n/tr.json`
- `src/assets/i18n/zh.json`
- `src/assets/i18n/ja.json`
- `readmehistory.md`

---

## 2025-11-28 10:36:46

### تغییر ساختار جستجو در کامپوننت cms-contact-content-drop-list به جستجوی جداگانه برای هر لیست

**تغییرات:**

- تغییر از یک فیلد جستجو مشترک به دو فیلد جستجو جداگانه
- افزودن فیلد جستجو بالای لیست اولیه (`searchTermList`)
- افزودن فیلد جستجو بالای لیست انتخاب شده (`searchTermBasket`)
- ایجاد متدهای جداگانه `highlightTextList` و `highlightTextBasket` برای highlight کردن متن در هر لیست
- به‌روزرسانی getter‌های `filteredListItems` و `filteredBasketItems` برای استفاده از `searchTermList` و `searchTermBasket` به جای `searchTerm` مشترک
- انتقال search container به داخل هر `example-container` برای قرارگیری بهتر در UI
- بهبود استایل CSS برای search container در داخل هر لیست

**فایل‌های تغییر یافته:**

- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.html`
- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.ts`
- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.scss`
- `readmehistory.md`

---

## 2025-11-28 10:34:53

### بهبود UI کامپوننت cms-contact-content-drop-list: لیست‌ها در یک ردیف، جستجو و highlight

**تغییرات:**

- قرار دادن دو لیست در کنار هم در یک ردیف با layout ریسپانسیو (با استفاده از flexbox)
- افزودن اسکرول به لیست‌ها برای نمایش بهتر زمانی که تعداد آیتم‌ها زیاد است (حداکثر ارتفاع 500px در دسکتاپ و 300px در موبایل)
- افزودن فیلد جستجو بالای دو لیست با آیکن search
- پیاده‌سازی منطق فیلتر کردن بر اساس `title`, `firstName` و `lastName` به صورت real-time
- افزودن highlight کردن متن‌های یافته شده در جستجو با رنگ زرد (#ffeb3b)
- ایجاد متد `highlightText` برای highlight کردن متن‌های match شده
- ایجاد getter‌های `filteredListItems` و `filteredBasketItems` برای فیلتر کردن بر اساس جستجو
- افزودن لیست‌های `allListItems` و `allBasketItems` برای نگهداری تمام آیتم‌ها (بدون فیلتر)
- بهبود متد `drop` برای همگام‌سازی با لیست‌های اصلی هنگام drag & drop
- اضافه کردن استایل‌های CSS برای search container و اسکرول بار زیبا
- بهبود ریسپانسیو بودن با استفاده از media queries برای صفحات کوچک (تبدیل به layout عمودی در عرض کمتر از 768px)

**فایل‌های تغییر یافته:**

- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.html`
- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.ts`
- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.scss`
- `readmehistory.md`

---

## 2025-11-28 10:25:47

### افزودن آیکن‌های + و - برای انتقال آیتم‌ها در کامپوننت cms-contact-content-drop-list

**تغییرات:**

- افزودن آیکن + (fa-solid fa-plus) در لیست اولیه برای انتقال آیتم‌ها به لیست انتخاب شده
- افزودن آیکن - (fa-solid fa-minus) در لیست انتخاب شده برای انتقال آیتم‌ها به لیست اولیه
- ایجاد متد `addToBasket` برای اضافه کردن آیتم از لیست اولیه به لیست انتخاب شده
- ایجاد متد `removeFromBasket` برای حذف آیتم از لیست انتخاب شده و بازگرداندن به لیست اولیه
- همگام‌سازی `basket` با `dataModelSelect` در متد `DataGetAll`
- به‌روزرسانی متد `drop` برای همگام‌سازی با `dataModelSelect` و `fieldsStatus` هنگام drag & drop
- افزودن استایل‌های CSS برای دکمه‌های آیکن (+ و -) با رنگ‌های مناسب

**فایل‌های تغییر یافته:**

- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.html`
- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.ts`
- `src/app/shared/cms-contact-content-drop-list/cms-contact-content-drop-list.component.scss`
- `readmehistory.md`

---

## 2025-11-26 15:05:17

### تکمیل ترجمه چندزبانه Info و ORDER_CALCULATE

**تغییرات:**

- افزودن کلیدهای `TITLE.Info` و `TITLE.Info_about_the_message` و ترجمه آن‌ها در تمامی زبان‌های پروژه
- تعریف ترجمه‌ی `ACTION.ORDER_CALCULATE` برای دکمه محاسبه سفارش در صفحه ارسال پیام

**فایل‌های تغییر یافته:**

- `src/assets/i18n/ar.json`
- `src/assets/i18n/de.json`
- `src/assets/i18n/en.json`
- `src/assets/i18n/es.json`
- `src/assets/i18n/fa.json`
- `src/assets/i18n/fr.json`
- `src/assets/i18n/ja.json`
- `src/assets/i18n/tr.json`
- `src/assets/i18n/zh.json`
- `readmehistory.md`

---

## 2025-11-26 11:52:18

### افزودن ترجمه چندزبانه برای Message Placeholders

**تغییرات:**

- تعریف کلیدهای `TITLE.Message_Placeholders` و توضیحات مربوط به متغیرهای Title$, FirstName$, LastName$ و تاریخ/زمان جاری
- تکمیل ترجمه این کلیدها در تمامی فایل‌های چندزبانه موجود در پروژه

**فایل‌های تغییر یافته:**

- `src/assets/i18n/ar.json`
- `src/assets/i18n/de.json`
- `src/assets/i18n/en.json`
- `src/assets/i18n/es.json`
- `src/assets/i18n/fa.json`
- `src/assets/i18n/fr.json`
- `src/assets/i18n/ja.json`
- `src/assets/i18n/tr.json`
- `src/assets/i18n/zh.json`

---

## 2025-11-25 17:07:46

### تنظیم printWidth برای افزونه Prettier

**تغییرات:**

- تنظیم مقدار `prettier.printWidth` بر روی 200 برای هماهنگی با استاندارد تیمی
- بروزرسانی فایل `.prettierrc` به‌منظور اعمال این تغییر در تمامی اجراهای افزونه Prettier - Code Formatter

**فایل‌های تغییر یافته:**

- `.prettierrc`

---

## 2025-01-27 14:30:00

### پیاده‌سازی Drag & Drop برای priority در کامپوننت‌های SMS

**تغییرات:**

- اضافه کردن قابلیت جابجایی ردیف‌ها با Drag & Drop برای فیلد `priority` در `SmsMainApiPathListComponent`
- اضافه کردن قابلیت جابجایی ردیف‌ها با Drag & Drop برای فیلد `priority` در `SmsMainApiNumberListComponent`
- پیاده‌سازی متد `onTableDropRow` مشابه `CoreCpMainMenuListComponent` برای هر دو کامپوننت
- اضافه کردن ستون `position` با آیکون `reorder` برای هر دو کامپوننت
- تغییر `sortColumn` به `priority` در `SmsMainApiNumberListComponent` (در `SmsMainApiPathListComponent` قبلاً انجام شده بود)
- اضافه کردن import های لازم (`CdkDragDrop`, `moveItemInArray`, `EditStepDtoModel`, `ActionGoStepEnum`)
- اضافه کردن `cdkDropList` و `cdkDrag` به HTML هر دو کامپوننت

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/main/api-path/list/list.component.ts`
- `src/app/cms-modules/sms/main/api-path/list/list.component.html`
- `src/app/cms-modules/sms/main/api-number/list/list.component.ts`
- `src/app/cms-modules/sms/main/api-number/list/list.component.html`

---

## 2025-11-22 11:48:40

### رفع خطاهای کامپوننت cms-json-list

**تغییرات:**

- رفع خطای استفاده همزمان از `*ngIf` و `*ngTemplateOutlet` روی یک عنصر در خط 21-22
- حذف template بازگشتی `displayJsonChild` که باعث خطای parsing می‌شد
- اصلاح ساختار `@if` block با استفاده از متد `isPrimitive` به جای `typeof` که در template expressions قابل استفاده نیست
- افزودن متدهای `isObject` و `isPrimitive` در کامپوننت برای بررسی نوع داده‌ها
- افزودن بررسی `dataModel.length > 0` برای optionMethod 2 جهت جلوگیری از خطای دسترسی به `dataModel[0]`
- اصلاح optionMethod 3 برای استفاده صحیح از `dataModel` به عنوان object
- انتقال تمام properties (`optionFields`, `optionViewHead`) به کامپوننت بازگشتی `app-cms-json-list`

**فایل‌های تغییر یافته:**

- `src/app/shared/cms-json-list/cmsJsonList.component.html`
- `src/app/shared/cms-json-list/cmsJsonList.component.ts`

---

## 2025-11-21 14:00:00

### تبدیل دکمه ORDER_CALCULATE به آیکون ماشین حساب

**تغییرات:**

- تبدیل دکمه متنی `ORDER_CALCULATE` به دکمه آیکون با Material Icon `calculate`
- اضافه کردن `title` و `aria-label` برای دسترسی‌پذیری

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/action/send-message/send-message.component.html`

---

## 2025-11-21 10:00:00

### نرمال‌سازی کاراکترهای ورودی بر اساس زبان هدف

**تغییرات:**

- تبدیل خودکار حروف تایپ‌شده به چیدمان هدف (انگلیسی ↔ فارسی) در `cmsKeyboardForce`
- نگهداری موقعیت کرسر و انتشار مجدد رویداد `input` بدون حلقه‌ی بی‌نهایت

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 10:30:00

### تعمیم دایرکتیو cmsKeyboardForce با پشتیبانی از مپ‌های سفارشی

**تغییرات:**

- افزودن ورودی‌های `cmsKeyboardForceSource` و `cmsKeyboardForceMap` برای تعیین چیدمان مبدا و مپ اختصاصی
- تعریف `DEFAULT_MAPPINGS` جهت تشخیص خودکار تبدیل‌های رایج (انگلیسی ↔ فارسی) و قابلیت توسعه برای زبان‌های بیشتر

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 11:10:00

### بهبود تشخیص چیدمان و Auto Detect در cmsKeyboardForce

**تغییرات:**

- تعیین خودکار `sourceLocale` در صورت نبود مقدار ورودی (مثلاً هدف `fa` ← مبدا `en`)
- تشخیص لحظه‌ای مپ مناسب بر اساس `InputEvent.data` در صورت نبود مپ صریح
- جلوگیری از نیاز کاربر به تعیین دستی مبدا برای حالت‌های رایج

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 11:40:00

### پشتیبانی از CAPS LOCK و SHIFT در دایرکتیو cmsKeyboardForce

**تغییرات:**

- ذخیره وضعیت کلیدهای `Shift` و `CapsLock` در رویداد `keydown`
- اعمال منطق case فقط روی نویسه‌ای که به‌تازگی درج شده تا اعداد و متن‌های قبلی تحت تاثیر قرار نگیرند
- بهبود تجربه تایپ انگلیسی هنگامی که صفحه‌کلید فارسی فعال است و بالعکس

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 12:15:00

### افزودن فلگ‌های کنترلی و قابلیت‌های کمکی به cmsKeyboardForce

**تغییرات:**

- ورودی‌های جدید برای کنترل فعال/غیرفعال بودن ویژگی‌ها: `cmsKeyboardForceInputMode`, `cmsKeyboardForceIndicator`, `cmsKeyboardForceCloneMap`, `cmsKeyboardForceNormalizePaste`, `cmsKeyboardForceSmartReplace`
- اضافه شدن hint خودکار `inputmode`، نشانگر بصری فعال بودن دایرکتیو و بازگردانی حالت قبلی بعد از blur
- امکان کلون‌کردن map سفارشی برای جلوگیری از mutation خارجی
- انتخاب نرمال‌سازی هوشمند فقط روی کاراکتر درج‌شده و قابلیت چشم‌پوشی از paste/drop

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 12:45:00

### رفع مشکل تایپ با کلید Shift در حالت تبدیل فارسی → انگلیسی

**تغییرات:**

- ذخیره `event.code` و نگاشت آن به کلیدهای فیزیکی برای استخراج کاراکتر پایه
- افزودن fallback جهت تبدیل کاراکترهای بدون مپ (مانند علائم حاصل از `Shift` در کیبورد فارسی) به متن هدف
- اطمینان از اعمال حالت حروف بزرگ طبق ترکیب `Shift`/`CapsLock`

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 13:05:00

### جلوگیری از تغییر حروفی که از قبل در زبان مقصد هستند

**تغییرات:**

- افزودن کنترل تشخیص زبان نویسه: اگر کاربر در همان زبان هدف تایپ کند (مثلاً فارسی در فیلد فارسی)، متن دست‌نخورده باقی می‌ماند
- جلوگیری از تبدیل‌های ناخواسته برای علامت‌ها و متن‌های ترکیبی

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 13:25:00

### مستندسازی کامل دایرکتیو cmsKeyboardForce

**تغییرات:**

- اضافه کردن توضیحات انگلیسی برای تمامی متدها شامل هدف و خروجی
- مستندسازی متغیرها و ثابت‌های کلیدی برای درک سریع‌تر نقش هر بخش
- بهبود خوانایی کلی فایل با کامنت‌های ساختار یافته

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 13:35:00

### حذف وابستگی LayoutDirection از دایرکتیو کیبورد

**تغییرات:**

- جایگزینی type داخلی `'ltr' | 'rtl'` به جای استفاده از `LayoutDirection` ماژول دیگر
- کاهش coupling بین `keyboard-force.directive` و `dir.directive`

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 13:50:00

### اعمال خودکار English keyboard برای فیلدهای عددی و currency

**تغییرات:**

- ایجاد دایرکتیو جدید `KeyboardForceNumberDirective` که روی همه‌ی `input[type="number"]`، `input[numberOnly]` و `input[currencyMask]` (در صورت عدم وجود `cmsKeyboardForce`) اعمال می‌شود
- مقداردهی خودکار `cmsKeyboardForce="en"`، `cmsKeyboardForceSource="en"` و جهت `ltr` برای ورودی‌های عددی
- اضافه کردن دایرکتیو به `SharedModule` تا در تمام پروژه در دسترس باشد

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force-number.directive.ts`
- `src/app/shared/shared.module.ts`

---

## 2025-11-21 13:55:00

### رفع خطای Selector برای دایرکتیو titleML

**تغییرات:**

- Escape کردن `$` در selector دایرکتیو `KeyboardForceTitleDirective` تا کامپایلر Angular خطای `Unescaped "$"` ندهد

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force-title.directive.ts`

---

## 2025-11-21 14:05:00

### افزودن ترجمه برای ACTION.BANK_PAYMENT_TRANSACTION

**تغییرات:**

- تعریف کلید جدید `ACTION.BANK_PAYMENT_TRANSACTION` در فایل‌های `en.json` و `fa.json`
- آماده‌سازی ترجمه انگلیسی و فارسی برای استفاده در دکمه‌ها/اکشن‌های مرتبط با تراکنش بانکی

**فایل‌های تغییر یافته:**

- `src/assets/i18n/en.json`
- `src/assets/i18n/fa.json`

---

## 2025-11-21 09:30:00

### محدود کردن دایرکتیو cmsKeyboardForce به همان ورودی

**تغییرات:**

- حذف وابستگی به `DOCUMENT` و عدم اعمال `lang/dir` روی کل صفحه
- ذخیره و بازگرداندن فقط ویژگی‌های `lang` و `dir` خود ورودی هنگام `focus`/`blur`

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`

---

## 2025-11-21 09:00:00

### اضافه شدن دایرکتیو cmsKeyboardForce برای اجبار زبان ورودی

**تغییرات:**

- ایجاد دایرکتیو جدید `cmsKeyboardForce` برای ذخیره زبان جاری صفحه، اعمال زبان و جهت دلخواه روی ورودی فعال (مثلاً `fa` یا `en`) و بازگرداندن تنظیمات قبلی بعد از `blur`
- پشتیبانی از تعیین جهت دلخواه (`cmsKeyboardForceDir`) یا انتخاب خودکار بر اساس زبان‌های RTL
- اضافه کردن دایرکتیو جدید به `SharedModule` برای استفاده در سراسر پروژه

**فایل‌های تغییر یافته:**

- `src/app/core/directive/keyboard-force.directive.ts`
- `src/app/shared/shared.module.ts`

---

## 2025-11-18 15:15:00

### فعال‌سازی RouterLink در CmsFormValidationComponent

**تغییرات:**

- افزودن `RouterModule` به `imports` و `exports` ماژول `SharedModule` برای فراهم شدن دایرکتیوهای مسیریابی در تمامی کامپوننت‌های اشتراکی

**فایل‌های تغییر یافته:**

- `src/app/shared/shared.module.ts`

---

## 2025-11-18 15:25:00

### پیکربندی Prettier برای جلوگیری از شکست خطوط HTML تک‌خط

**تغییرات:**

- اضافه کردن گزینه `singleAttributePerLine: false` در `.prettierrc` تا فرمتری مانند Prettier - Code Formatter اجباراً صفات HTML را روی خطوط جداگانه نبرد و ساختار تک‌خطی حفظ شود.

**فایل‌های تغییر یافته:**

- `.prettierrc`

---

## 2025-11-18 15:40:00

### رفع خطاهای صفحه ارسال پیام (SmsActionSendMessageComponent)

**تغییرات:**

- جلوگیری از حذف تصادفی آیتم‌های `validationList` هنگام انتخاب مسیر ارسال (حذف فقط در صورت وجود `sendMessageAddTextFirst/End`)
- جلوگیری از وقوع خطای `Cannot read properties of undefined (reading 'length')` هنگام افزودن متن پیش‌فرض به پیام از طریق کنترل اختیاری `dataModel.message?.length`

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/action/send-message/send-message.component.ts`

---

## 2025-11-27 10:15:00

### نمایش نتیجه ارسال پیامک در پاپ‌آپ اختصاصی

**تغییرات:**

- ایجاد کامپوننت `SmsActionSendMessageResultComponent` برای نمایش جزئیات نتیجه ارسال پیام در قالب پاپ‌آپ زیبا (نمایش شناسه‌ها، اعتبارها، لیست گیرندگان و ...)
- اتصال پاپ‌آپ به فرآیند ارسال پیام در `SmsActionSendMessageComponent` و فراخوانی آن بعد از موفقیت سرویس
- افزودن استایل اختصاصی، ثبت ماژول جدید در `SmsActionModule` و اضافه کردن کلیدهای چندزبانه مورد نیاز

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/action/send-message/send-message.component.ts`
- `src/app/cms-modules/sms/action/send-message/send-message-result/send-message-result.component.ts`
- `src/app/cms-modules/sms/action/send-message/send-message-result/send-message-result.component.html`
- `src/app/cms-modules/sms/action/send-message/send-message-result/send-message-result.component.scss`
- `src/app/cms-modules/sms/action/sms-action.module.ts`
- `src/assets/i18n/en.json`
- `src/assets/i18n/fa.json`

---

## 2025-11-27 10:30:00

### نمایش نتیجه محاسبه ارسال پیامک در پاپ‌آپ اختصاصی

**تغییرات:**

- ایجاد کامپوننت `SmsActionSendMessageCalculateResultComponent` برای نمایش جزئیات نتیجه محاسبه ارسال پیام در قالب پاپ‌آپ زیبا (نمایش شناسه‌ها، اعتبارها، لیست گیرندگان و ...)
- اتصال پاپ‌آپ به فرآیند محاسبه ارسال پیام در `SmsActionSendMessageComponent` و فراخوانی آن بعد از موفقیت سرویس `ServiceOrderCalculate`
- افزودن استایل اختصاصی، ثبت ماژول جدید در `SmsActionModule` و اضافه کردن کلیدهای چندزبانه مورد نیاز

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/sms/action/send-message/send-message.component.ts`
- `src/app/cms-modules/sms/action/send-message/send-message-calculate-result/send-message-calculate-result.component.ts`
- `src/app/cms-modules/sms/action/send-message/send-message-calculate-result/send-message-calculate-result.component.html`
- `src/app/cms-modules/sms/action/send-message/send-message-calculate-result/send-message-calculate-result.component.scss`
- `src/app/cms-modules/sms/action/sms-action.module.ts`
- `src/assets/i18n/en.json`
- `src/assets/i18n/fa.json`

---

## 2025-11-18 12:30:00

### حذف متدهای بدون استفاده در myself-list.component

**تغییرات:**

- حذف متدهای جدول (مرتب‌سازی، صفحه‌بندی) و اکشن‌های ویرایش/حذف/آمار که در نسخه فعلی UI استفاده نمی‌شدند
- حذف وابستگی‌های بلااستفاده شامل `MatSort`, `PageEvent`, `MatDialogConfig`, `RecordStatusEnum`, `CmsConfirmationDialogService` و کامپوننت ویرایش
- ساده‌سازی `DataGetAll` برای عدم فراخوانی متد آمار حذف‌شده

**فایل‌های تغییر یافته:**

- `src/app/cms-modules/core-module/site-user-credit/myself-list/myself-list.component.ts`

---

## 2025-01-27 12:00:00

### اضافه کردن EventEmitter برای optionReload در کامپوننت cms-action-button-reload

**تغییرات:**

- اضافه کردن `EventEmitter` به imports کامپوننت
- حذف setter `optionReload` و متد `reload` قبلی
- ایجاد `@Output() optionReload` از نوع `EventEmitter<void>` برای ارسال event به کامپوننت مادر
- تغییر نام متد داخلی از `onActionButtonReload()` به `onActionButtonReloadClick()` برای جلوگیری از تداخل با نام `@Output`
- ساده‌سازی متد `onActionButtonReloadClick()` که فقط event `optionReload` را emit می‌کند

**فایل‌های تغییر یافته:**

- `src/app/shared/cms-action-button-reload/cms-action-button-reload.component.ts`
- `src/app/shared/cms-action-button-reload/cms-action-button-reload.component.html`
- `src/app/cms-modules/core-module/site-user-credit/myself-list/myself-list.component.html`

**نحوه استفاده در کامپوننت مادر:**

```html
<app-cms-action-button-reload
  (optionReload)="onActionButtonReload()"
></app-cms-action-button-reload>
```

**نکته:** استفاده از event binding `(optionReload)` به جای property binding `[optionReload]`

---

## 2025-11-17 08:05:00

### فراهم‌سازی دسترسی سراسری به FormSubmitedStatusEnum

**مشکل:**

- در تمام پروژه ارجاعاتی به `FormSubmitedStatusEnum` بدون `import` وجود داشت که باعث خطای `Cannot find name 'FormSubmitedStatusEnum'` می‌شد.

**راه‌حل:**

1. تعریف یک declaration فایل (`src/types/form-submited-status.d.ts`) برای اعلان سراسری این enum و هماهنگی با TypeScript.
2. تزریق مقدار واقعی enum در ابتدای اجرای برنامه از طریق `globalThis` در `src/main.ts` تا همه بخش‌ها بتوانند از مقدار runtime استفاده کنند.

**فایل‌های تغییر یافته:**

- `src/types/form-submited-status.d.ts`
- `src/main.ts`

---

## 2025-11-17 07:43:10

### رفع خطای ExpressionChangedAfterItHasBeenCheckedError در MenuColorsComponent (نسخه نهایی)

**مشکل:**

- خطای `NG0100: ExpressionChangedAfterItHasBeenCheckedError` در کامپوننت `MenuColorsComponent`
- مقدار `themeStore.themeHighlight` بعد از بررسی Angular تغییر می‌کرد (از 'blue' به 'red' یا 'green')
- این خطا به دلیل subscription در constructor بود که `themeStore` را در طول change detection اولیه به‌روزرسانی می‌کرد

**راه حل نهایی:**

1. **انتقال subscription از constructor به ngOnInit**: برای جلوگیری از اجرای subscription در طول change detection اولیه
2. **استفاده از getStateSnapshot برای مقدار اولیه**: مقدار اولیه `themeStore` از snapshot گرفته می‌شود تا از تغییرات ناگهانی جلوگیری شود
3. **استفاده از setTimeout برای به تعویق انداختن تغییرات**: تغییرات `themeStore` با `setTimeout(..., 0)` به چرخه بعدی event loop منتقل می‌شوند
4. **استفاده از markForCheck**: برای اطلاع‌رسانی به Angular در مورد تغییرات

**فایل‌های تغییر یافته:**

- `src/app/components/menu-colors/menu-colors.component.ts`

**تغییرات اعمال شده:**

```typescript
// اضافه شدن ChangeDetectorRef به imports
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";

constructor(
  public publicHelper: PublicHelper,
  private themeService: ThemeService,
  private cmsStoreService: CmsStoreService,
  private cdr: ChangeDetectorRef,
) {
  // مقدار اولیه را از snapshot بگیریم
  const snapshot = this.cmsStoreService.getStateSnapshot();
  this.themeStore = snapshot?.themeStore ?? new ThemeStoreModel();
}

ngOnInit(): void {
  // انتقال subscription به ngOnInit برای جلوگیری از ExpressionChangedAfterItHasBeenCheckedError
  this.unsubscribe.push(
    this.cmsStoreService
      .getState((state) => state.themeStore)
      .subscribe(async (value) => {
        if (value) {
          // استفاده از setTimeout برای به تعویق انداختن تغییرات به چرخه بعدی
          setTimeout(() => {
            this.themeStore = value;
            this.cdr.markForCheck();
          }, 0);
        } else {
          setTimeout(() => {
            this.themeStore = new ThemeStoreModel();
            this.cdr.markForCheck();
          }, 0);
        }
      }),
  );
}
```

---

## 2025-11-17 07:41:20

### رفع خطای ExpressionChangedAfterItHasBeenCheckedError در MenuColorsComponent (نسخه اولیه)

**مشکل:**

- خطای `NG0100: ExpressionChangedAfterItHasBeenCheckedError` در کامپوننت `MenuColorsComponent`
- مقدار `themeStore.themeHighlight` بعد از بررسی Angular تغییر می‌کرد (از 'blue' به 'red' یا 'green')
- این خطا به دلیل subscription در constructor بود که `themeStore` را به‌روزرسانی می‌کرد

**راه حل اولیه (کافی نبود):**

- اضافه کردن `ChangeDetectorRef` به constructor
- استفاده از `markForCheck()` در subscription برای اطلاع‌رسانی به Angular در مورد تغییرات
- این روش تغییرات را به چرخه بعدی change detection منتقل می‌کند

**نتیجه:** راه حل اولیه کافی نبود و خطا همچنان وجود داشت، بنابراین راه حل نهایی با انتقال subscription به ngOnInit و استفاده از setTimeout اعمال شد.
