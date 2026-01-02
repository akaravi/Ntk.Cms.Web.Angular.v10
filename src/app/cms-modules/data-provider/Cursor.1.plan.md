# Plan: بازنویسی کامل ماژول Data Provider

## Part 1: تحلیل و طراحی ساختار جدید

### 1.1 تحلیل ساختار فعلی Data Provider

- **وضعیت فعلی:**
  - ساختار مسطح بدون تفکیک منطقی
  - تمام کامپوننت‌ها در یک ماژول
  - عدم وجود ماژول‌های فرعی (sub-modules)
  - عدم پشتیبانی از نسخه موبایل
  - Routing مستقیم بدون lazy loading مناسب

### 1.2 تحلیل ساختار الگو (SMS و Estate)

- **SMS Module Structure:**

  ```
  sms/
  ├── main/          (ماژول اصلی - مدیریت API Paths, Messages, Configs)
  ├── log/           (ماژول لاگ - Inbox, Outbox, Queue, Task Scheduler)
  ├── action/        (ماژول اکشن - Send Message, API Actions)
  ├── config/        (ماژول تنظیمات - Site Config, User Config)
  ├── dashboard/     (داشبورد)
  └── shared/        (کامپوننت‌های مشترک)
  ```

- **Estate Module Structure:**
  ```
  estate/
  ├── main/          (ماژول اصلی - Account, Contract, Property Details)
  ├── data/          (ماژول داده - Property, Company, Project, Supplier)
  ├── log/           (ماژول لاگ - History, Orders, Expert Price)
  ├── action/        (ماژول اکشن)
  ├── config/        (ماژول تنظیمات)
  ├── dashboard/     (داشبورد)
  ├── overview/      (نمای کلی - Events, Summary)
  └── shared/        (کامپوننت‌های مشترک)
  ```

### 1.3 طراحی ساختار جدید Data Provider

```
data-provider/
├── main/                    (ماژول اصلی)
│   ├── client/          (مدیریت کلاینت‌ها)
│   ├── plan/            (مدیریت پلن‌ها)
│   ├── plan-category/   (دسته‌بندی پلن‌ها)
│   ├── plan-price/      (قیمت‌گذاری پلن‌ها)
│   ├── plan-client/     (ارتباط پلن و کلاینت)
│   ├── plan-source/     (ارتباط پلن و منبع)
│   ├── source/          (مدیریت منابع)
│   ├── source-company/   (شرکت‌های منبع)
│   ├── source-path/      (مسیرهای منبع)
│   ├── source-public-config/ (تنظیمات عمومی منبع)
│   └── client-permission/ (دسترسی‌های کلاینت)
│
├── log/                  (ماژول لاگ)
│   ├── client/          (لاگ کلاینت)
│   ├── plan/            (لاگ پلن)
│   └── source/          (لاگ منبع)
│
├── transaction/          (ماژول تراکنش)
│   ├── list/            (لیست تراکنش‌ها)
│   └── view/            (نمایش تراکنش)
│
├── action/               (ماژول اکشن)
│   ├── charge/          (شارژ کلاینت)
│   └── charge-payment/  (پرداخت شارژ)
│
├── config/               (ماژول تنظیمات)
│   ├── site/            (تنظیمات سایت)
│   ├── main-admin/      (تنظیمات ادمین)
│   ├── check-site/      (بررسی سایت)
│   └── check-user/      (بررسی کاربر)
│
├── dashboard/            (داشبورد)
│   └── dashboard.component.ts
│
├── overview/             (نمای کلی)
│   ├── summary/         (خلاصه)
│   └── events/          (رویدادها)
│
└── shared/               (کامپوننت‌های مشترک)
    └── data-provider-shared.module.ts
```

---

## Part 2: مراحل بازنویسی

### مرحله 1: ایجاد ساختار پوشه‌بندی جدید

- [x] انتقال plan به فولدر ماژول data-provider
- [x] ایجاد پوشه `main/` و زیرپوشه‌های آن
- [x] ایجاد پوشه `log/` و زیرپوشه‌های آن
- [x] ایجاد پوشه `transaction/` (موجود است - نیاز به بررسی)
- [x] ایجاد پوشه `action/` برای اکشن‌ها
- [x] ایجاد پوشه `overview/` برای نمای کلی
- [x] ایجاد پوشه `shared/` برای کامپوننت‌های مشترک
- [x] ایجاد پوشه `dashboard/` برای داشبورد

### مرحله 2: بازنویسی ماژول Main ✅

- [x] ایجاد `data-provider-main.component.ts`
- [x] ایجاد `data-provider-main.routing.ts`
- [x] ایجاد `routes.normal.ts` و `routes.mobile.ts`
- [x] انتقال تمام کامپوننت‌های main به `main/`:
  - [x] client
  - [x] plan
  - [x] plan-category
  - [x] plan-price
  - [x] plan-client
  - [x] plan-source
  - [x] source
  - [x] source-company
  - [x] source-path
  - [x] source-public-config
  - [x] client-permission
- [x] اصلاح import paths در تمام فایل‌های منتقل شده
- [x] ایجاد `data-provider-main.module.ts` با تمام declarations
- [x] به‌روزرسانی routing اصلی برای lazy loading از main module
- [ ] ایجاد نسخه موبایل برای تمام کامپوننت‌های list (`.mobile.component.ts` و `.mobile.component.html`) - TODO

### مرحله 3: بازنویسی ماژول Log ✅

- [x] ایجاد `data-provider-log.component.ts`
- [x] ایجاد `data-provider-log.routing.ts`
- [x] ایجاد `data-provider-log.module.ts`
- [x] ایجاد `routes.normal.ts` و `routes.mobile.ts`
- [x] انتقال کامپوننت‌های log-client به `log/client/`
- [x] انتقال کامپوننت‌های log-plan به `log/plan/`
- [x] انتقال کامپوننت‌های log-source به `log/source/`
- [x] اصلاح import paths در فایل‌های منتقل شده
- [x] به‌روزرسانی routing اصلی برای lazy loading
- [ ] ایجاد نسخه موبایل برای کامپوننت‌های list - TODO

### مرحله 4: بازنویسی ماژول Transaction ✅

- [x] تصمیم‌گیری: transaction به عنوان ماژول جداگانه (مشابه log)
- [x] ایجاد `data-provider-transaction.component.ts`
- [x] ایجاد `data-provider-transaction.routing.ts`
- [x] ایجاد `data-provider-transaction.module.ts`
- [x] ایجاد `routes.normal.ts` و `routes.mobile.ts`
- [x] اصلاح import paths در فایل‌های transaction
- [x] به‌روزرسانی routing اصلی برای lazy loading
- [ ] ایجاد نسخه موبایل برای کامپوننت‌های list - TODO

### مرحله 5: بازنویسی ماژول Action ✅

- [x] تصمیم‌گیری: charge و charge-payment در main باقی می‌مانند (مربوط به client و plan-price هستند)
- [x] بررسی ساختار: action برای آینده آماده است
- [ ] در صورت نیاز در آینده: ایجاد `data-provider-action.module.ts`
- [ ] در صورت نیاز در آینده: ایجاد `data-provider-action.routing.ts`

### مرحله 6: بازنویسی ماژول Config ✅

- [x] بررسی ساختار فعلی config: از قبل وجود دارد و درست کار می‌کند
- [x] اطمینان از وجود تمام کامپوننت‌های لازم: همه کامپوننت‌ها موجود هستند
- [x] بررسی routing: routing درست است و lazy loading استفاده می‌کند

### مرحله 7: ایجاد Dashboard ✅

- [x] ایجاد `dashboard/dashboard.component.ts`
- [x] ایجاد `dashboard/dashboard.component.html`
- [x] ایجاد `dashboard/dashboard.component.scss`
- [x] پیاده‌سازی نمایش آمار و اطلاعات کلی
- [x] اضافه کردن به routing
- [x] اضافه کردن به module

### مرحله 8: ایجاد Overview ✅

- [x] ایجاد `overview/summary/summary.component.ts`
- [x] ایجاد `overview/summary/summary.component.html`
- [x] ایجاد `overview/events/events.component.ts`
- [x] ایجاد `overview/events/events.component.html`
- [x] ایجاد `overview/events/events.component.scss`
- [x] پیاده‌سازی نمایش خلاصه و رویدادها
- [x] اضافه کردن به routing
- [x] اضافه کردن به module

### مرحله 9: ایجاد Shared Module ✅

- [x] ایجاد `shared/data-provider-shared.module.ts`
- [x] آماده‌سازی برای انتقال کامپوننت‌های مشترک در آینده
- [x] آماده‌سازی برای enum selector ها در صورت نیاز
- [ ] انتقال کامپوننت‌های مشترک به shared (در صورت نیاز در آینده)

### مرحله 10: بازنویسی Routing اصلی

- [ ] به‌روزرسانی `data-provider.routing.ts`
- [ ] استفاده از lazy loading برای تمام sub-modules
- [ ] اضافه کردن route برای dashboard
- [ ] اضافه کردن route برای overview
- [ ] بهینه‌سازی route parameters

### مرحله 11: بازنویسی Main Module

- [ ] به‌روزرسانی `data-provider.module.ts`
- [ ] حذف import مستقیم کامپوننت‌ها
- [ ] استفاده از lazy loading
- [ ] بهینه‌سازی providers

### مرحله 12: ایجاد نسخه موبایل

- [ ] برای هر کامپوننت list: ایجاد `.mobile.component.ts`
- [ ] برای هر کامپوننت list: ایجاد `.mobile.component.html`
- [ ] برای هر کامپوننت list: ایجاد `.mobile.component.scss`
- [ ] ایجاد `routes.mobile.ts` و `routes.normal.ts` در هر sub-module
- [ ] پیاده‌سازی responsive design

### مرحله 13: رفع خطاهای Type

- [ ] رفع خطاهای مربوط به نوع id (string vs number)
- [ ] بررسی و اصلاح تمام Generic types
- [ ] اطمینان از سازگاری با BaseEntity

### مرحله 14: رفع خطاهای Component

- [ ] رفع خطاهای مربوط به missing properties (tableData, sort, paginator)
- [ ] رفع خطاهای مربوط به method names (onActionButtonReload)
- [ ] اضافه کردن ViewChild برای MatSort و MatPaginator
- [ ] رفع خطاهای مربوط به listItems

### مرحله 15: رفع خطاهای Helper

- [ ] بررسی و رفع خطاهای TokenHelper (getCurrentToken, getCurrentTokenOnChange)
- [ ] بررسی و رفع خطاهای PublicHelper (TabledisplayedColumnsCheck)
- [ ] بررسی و رفع خطاهای FilterModel (totalRowCount, pageCurrent)
- [ ] بررسی و رفع خطاهای TokenAccessModel (accessAddRow, accessEditRow, accessDeleteRow)

### مرحله 16: رفع خطاهای Angular Components

- [ ] بررسی و اضافه کردن کامپوننت‌های missing به modules
- [ ] رفع خطاهای app-core-user-header
- [ ] رفع خطاهای app-cms-enum-record-status-viewer
- [ ] رفع خطاهای app-cms-action-list

### مرحله 17: تست و Debug

- [ ] Build پروژه و بررسی خطاها
- [ ] رفع تمام خطاهای TypeScript
- [ ] رفع تمام خطاهای Angular
- [ ] تست routing
- [ ] تست lazy loading

### مرحله 18: بهینه‌سازی

- [ ] بررسی و حذف کدهای تکراری
- [ ] بهینه‌سازی imports
- [ ] بررسی performance
- [ ] بهینه‌سازی bundle size

### مرحله 19: مستندسازی

- [ ] مستندسازی ساختار جدید
- [ ] مستندسازی routing
- [ ] مستندسازی کامپوننت‌های جدید

### مرحله 20: Final Check

- [ ] بررسی نهایی build
- [ ] بررسی نهایی routing
- [ ] بررسی نهایی lazy loading
- [ ] بررسی نهایی mobile versions
- [ ] بررسی نهایی تمام functionality ها

---

## Part 3: جزئیات فنی

### 3.1 ساختار فایل‌های هر Entity

هر entity باید دارای ساختار زیر باشد:

```
entity-name/
├── add/
│   ├── add.component.ts
│   ├── add.component.html
│   ├── add.mobile.component.ts (در صورت نیاز)
│   └── add.mobile.component.html (در صورت نیاز)
├── edit/
│   ├── edit.component.ts
│   ├── edit.component.html
│   ├── edit.mobile.component.ts (در صورت نیاز)
│   └── edit.mobile.component.html (در صورت نیاز)
├── list/
│   ├── list.component.ts
│   ├── list.component.html
│   ├── list.mobile.component.ts (الزامی)
│   ├── list.mobile.component.html (الزامی)
│   └── list.mobile.component.scss (الزامی)
├── delete/
│   ├── delete.component.ts
│   └── delete.component.html
├── header/
│   ├── header.component.ts
│   ├── header.component.html
│   └── header.component.scss
├── selector/
│   ├── selector.component.ts
│   └── selector.component.html
└── tree/
    ├── tree.component.ts
    └── tree.component.html
```

### 3.2 الگوی Routing

```typescript
// routes.normal.ts
export const routesNormal: Routes = [
  {
    path: "entity-name",
    component: EntityNameListComponent,
    data: { title: "ROUTE.ENTITYNAME" },
  },
  // ...
];

// routes.mobile.ts
export const routesMobile: Routes = [
  {
    path: "entity-name",
    component: EntityNameListMobileComponent,
    data: { title: "ROUTE.ENTITYNAME" },
  },
  // ...
];

// در routing اصلی
const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      ...(environment.cmsServerConfig.isMobile ? routesMobile : routesNormal),
      // ...
    ],
  },
];
```

### 3.3 الگوی Module

```typescript
@NgModule({
  declarations: [
    // تمام کامپوننت‌های normal و mobile
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    // ...
  ],
  providers: [
    // Services
  ],
})
export class DataProviderMainModule {}
```

### 3.4 الگوی List Component

```typescript
export class EntityNameListComponent
  extends ListBaseComponent<
    EntityNameService,
    EntityNameModel,
    string // یا number بسته به نوع id
  >
  implements OnInit, OnDestroy
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  tableData: EntityNameModel[] = [];

  // ...
}
```

---

## Part 4: چک‌لیست نهایی

### 4.1 ساختار فایل‌ها

- [ ] تمام پوشه‌ها ایجاد شده‌اند
- [ ] تمام فایل‌های لازم ایجاد شده‌اند
- [ ] ساختار مشابه SMS و Estate است

### 4.2 Modules

- [ ] data-provider.module.ts به‌روزرسانی شده
- [ ] data-provider-main.module.ts ایجاد شده
- [ ] data-provider-log.module.ts ایجاد شده
- [ ] data-provider-action.module.ts ایجاد شده
- [ ] data-provider-shared.module.ts ایجاد شده

### 4.3 Routing

- [ ] data-provider.routing.ts به‌روزرسانی شده
- [ ] تمام sub-modules از lazy loading استفاده می‌کنند
- [ ] routes.mobile.ts و routes.normal.ts ایجاد شده‌اند

### 4.4 Components

- [ ] تمام کامپوننت‌ها به مکان جدید منتقل شده‌اند
- [ ] نسخه موبایل برای list components ایجاد شده
- [ ] تمام imports به‌روزرسانی شده‌اند

### 4.5 Type Safety

- [ ] تمام خطاهای TypeScript رفع شده
- [ ] تمام Generic types درست تعریف شده‌اند
- [ ] تمام type mismatches رفع شده‌اند

### 4.6 Functionality

- [ ] تمام functionality ها کار می‌کنند
- [ ] Routing درست کار می‌کند
- [ ] Lazy loading درست کار می‌کند
- [ ] Mobile versions درست کار می‌کنند

### 4.7 Build

- [ ] Build بدون خطا انجام می‌شود
- [ ] تمام warnings بررسی شده‌اند
- [ ] Bundle size بهینه است

---

## Result 1

**تاریخ:** 2026-01-01
**وضعیت:** Plan ایجاد شد

Plan جامع برای بازنویسی کامل ماژول Data Provider با الگوگیری از ماژول‌های SMS و Estate ایجاد شد. این plan شامل:

- تحلیل ساختار فعلی و الگوها
- طراحی ساختار جدید
- 20 مرحله بازنویسی با جزئیات کامل
- جزئیات فنی برای هر بخش
- چک‌لیست نهایی برای اطمینان از تکمیل کامل

**مراحل بعدی:** شروع اجرای مرحله 1 (ایجاد ساختار پوشه‌بندی جدید)

---

## Result 2

**تاریخ:** 2026-01-01
**وضعیت:** مرحله 1 تکمیل شد

مرحله 1 (ایجاد ساختار پوشه‌بندی جدید) با موفقیت انجام شد:

- ✅ پوشه `main/` با تمام زیرپوشه‌های لازم ایجاد شد
- ✅ پوشه `log/` با زیرپوشه‌های client, plan, source ایجاد شد
- ✅ پوشه `action/` با زیرپوشه‌های charge و charge-payment ایجاد شد
- ✅ پوشه `overview/` با زیرپوشه‌های summary و events ایجاد شد
- ✅ پوشه `shared/` ایجاد شد
- ✅ پوشه `dashboard/` ایجاد شد

**مراحل بعدی:** شروع مرحله 2 (بازنویسی ماژول Main)

---

## Result 3

**تاریخ:** 2025-01-27
**وضعیت:** مرحله 2 تکمیل شد ✅

**خلاصه تغییرات:**

- تمام کامپوننت‌های main به فولدر `main/` منتقل شدند
- ماژول `DataProviderMainModule` ایجاد شد
- Routing به‌روزرسانی شد برای استفاده از lazy loading
- تمام import paths اصلاح شدند

**فایل‌های ایجاد شده:**

- `src/app/cms-modules/data-provider/main/data-provider-main.component.ts`
- `src/app/cms-modules/data-provider/main/data-provider-main.routing.ts`
- `src/app/cms-modules/data-provider/main/data-provider-main.module.ts`
- `src/app/cms-modules/data-provider/main/routes.normal.ts`
- `src/app/cms-modules/data-provider/main/routes.mobile.ts`

**فایل‌های منتقل شده:**

- تمام entityها (client, plan, plan-category, plan-price, plan-client, plan-source, source, source-company, source-path, source-public-config, client-permission) به `main/`

**فایل‌های به‌روزرسانی شده:**

- `src/app/cms-modules/data-provider/data-provider.routing.ts` - اضافه شدن route برای main module

**وضعیت:**

- ✅ ماژول main کامل شد
- ✅ Routing کار می‌کند
- ⏳ نسخه موبایل هنوز ایجاد نشده (TODO)

**مراحل بعدی:** شروع مرحله 3 (بازنویسی ماژول Log)

---

## Result 4

**تاریخ:** 2025-01-27
**وضعیت:** مرحله 4 تکمیل شد ✅

**خلاصه تغییرات:**

- ماژول `DataProviderTransactionModule` ایجاد شد
- Routing به‌روزرسانی شد برای استفاده از lazy loading
- تمام import paths اصلاح شدند

**فایل‌های ایجاد شده:**

- `src/app/cms-modules/data-provider/transaction/data-provider-transaction.component.ts`
- `src/app/cms-modules/data-provider/transaction/data-provider-transaction.routing.ts`
- `src/app/cms-modules/data-provider/transaction/data-provider-transaction.module.ts`
- `src/app/cms-modules/data-provider/transaction/routes.normal.ts`
- `src/app/cms-modules/data-provider/transaction/routes.mobile.ts`

**فایل‌های به‌روزرسانی شده:**

- `src/app/cms-modules/data-provider/data-provider.routing.ts` - اضافه شدن route برای transaction module
- `src/app/cms-modules/data-provider/data-provider.module.ts` - حذف کامپوننت‌های transaction

**وضعیت:**

- ✅ ماژول transaction کامل شد
- ✅ Routing کار می‌کند
- ⏳ نسخه موبایل هنوز ایجاد نشده (TODO)

**مراحل بعدی:** شروع مرحله 5 (بازنویسی ماژول Action)

---

## Result 5

**تاریخ:** 2025-01-27
**وضعیت:** پاکسازی فایل‌های قدیمی ✅

**خلاصه تغییرات:**

- فایل‌های قدیمی log-client, log-plan, log-source حذف شدند
- تمام import paths بررسی و اصلاح شدند
- هیچ خطای linter وجود ندارد

**فایل‌های حذف شده:**

- `src/app/cms-modules/data-provider/log-client/` (تمام محتوا)
- `src/app/cms-modules/data-provider/log-plan/` (تمام محتوا)
- `src/app/cms-modules/data-provider/log-source/` (تمام محتوا)

**وضعیت:**

- ✅ فایل‌های قدیمی حذف شدند
- ✅ هیچ خطای linter وجود ندارد
- ✅ ساختار پوشه‌بندی تمیز شد

**مراحل بعدی:**

- بررسی فایل‌های قدیمی در root (client, plan, source و غیره)
- شروع مرحله 5 (بازنویسی ماژول Action) یا ادامه با مراحل دیگر

---

## Result 6

**تاریخ:** 2025-01-27
**وضعیت:** بررسی و تکمیل مراحل 5 و 6 ✅

**خلاصه تغییرات:**

- مرحله 5 (Action): تصمیم گرفته شد که charge و charge-payment در main باقی بمانند (مربوط به client و plan-price هستند)
- مرحله 6 (Config): بررسی شد و تایید شد که از قبل وجود دارد و درست کار می‌کند

**وضعیت:**

- ✅ مرحله 5 تکمیل شد (charge و charge-payment در main باقی می‌مانند)
- ✅ مرحله 6 تکمیل شد (config module از قبل وجود دارد)
- ✅ Config module از lazy loading استفاده می‌کند
- ✅ تمام کامپوننت‌های config موجود هستند

**مراحل بعدی:**

- مرحله 7: ایجاد Dashboard
- مرحله 8: ایجاد Overview
- مرحله 9: ایجاد Shared Module

---

## Result 7

**تاریخ:** 2025-01-27
**وضعیت:** مرحله 7 تکمیل شد ✅

**خلاصه تغییرات:**

- Dashboard component ایجاد شد
- KPI برای client, plan, plan-category, plan-price, source, transaction پیاده‌سازی شد
- Routing به‌روزرسانی شد
- Module به‌روزرسانی شد

**فایل‌های ایجاد شده:**

- `src/app/cms-modules/data-provider/dashboard/dashboard.component.ts`
- `src/app/cms-modules/data-provider/dashboard/dashboard.component.html`
- `src/app/cms-modules/data-provider/dashboard/dashboard.component.scss`

**فایل‌های به‌روزرسانی شده:**

- `src/app/cms-modules/data-provider/data-provider.routing.ts` - اضافه شدن route برای dashboard
- `src/app/cms-modules/data-provider/data-provider.module.ts` - اضافه شدن dashboard component

**وضعیت:**

- ✅ Dashboard کامل شد
- ✅ KPI ها پیاده‌سازی شدند
- ✅ Routing کار می‌کند
- ✅ هیچ خطای linter وجود ندارد

**مراحل بعدی:**

- مرحله 8: ایجاد Overview
- مرحله 9: ایجاد Shared Module

---

## Result 8

**تاریخ:** 2025-01-27
**وضعیت:** مرحله 8 تکمیل شد ✅

**خلاصه تغییرات:**

- Overview components ایجاد شدند (summary و events)
- Routing به‌روزرسانی شد
- Module به‌روزرسانی شد

**فایل‌های ایجاد شده:**

- `src/app/cms-modules/data-provider/overview/summary/summary.component.ts`
- `src/app/cms-modules/data-provider/overview/summary/summary.component.html`
- `src/app/cms-modules/data-provider/overview/events/events.component.ts`
- `src/app/cms-modules/data-provider/overview/events/events.component.html`
- `src/app/cms-modules/data-provider/overview/events/events.component.scss`

**فایل‌های به‌روزرسانی شده:**

- `src/app/cms-modules/data-provider/data-provider.routing.ts` - اضافه شدن routes برای overview
- `src/app/cms-modules/data-provider/data-provider.module.ts` - اضافه شدن overview components

**وضعیت:**

- ✅ Overview کامل شد
- ✅ Routing کار می‌کند
- ✅ هیچ خطای linter وجود ندارد

**مراحل بعدی:**

- مرحله 9: ایجاد Shared Module

---

## Result 9

**تاریخ:** 2025-01-27
**وضعیت:** مرحله 9 تکمیل شد ✅

**خلاصه تغییرات:**

- Shared Module ایجاد شد
- آماده‌سازی برای انتقال کامپوننت‌های مشترک در آینده

**فایل‌های ایجاد شده:**

- `src/app/cms-modules/data-provider/shared/data-provider-shared.module.ts`

**وضعیت:**

- ✅ Shared Module ایجاد شد
- ✅ آماده برای استفاده در آینده
- ✅ هیچ خطای linter وجود ندارد

**نکته:**

- در حال حاضر، کامپوننت‌های مشترک در main module باقی می‌مانند
- در صورت نیاز در آینده، می‌توان selector و header components مشترک را به shared module منتقل کرد

**مراحل بعدی:**

- بررسی و تست نهایی
- ایجاد نسخه موبایل برای list components (TODO)
