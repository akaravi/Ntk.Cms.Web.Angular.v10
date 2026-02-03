# Data Provider Module Documentation

## 📋 Overview

ماژول Data Provider یک ماژول جامع برای مدیریت منابع داده (Data Sources)، پلن‌ها (Plans)، کلاینت‌ها (Clients) و تراکنش‌ها (Transactions) است. این ماژول با الگوگیری از ماژول‌های SMS و Estate طراحی شده و از معماری modular با lazy loading استفاده می‌کند.

## 🏗️ Architecture

### ساختار کلی

```
data-provider/
├── main/              # ماژول اصلی (Main Module)
│   ├── client/       # مدیریت کلاینت‌ها
│   ├── plan/         # مدیریت پلن‌ها
│   ├── plan-category/# دسته‌بندی پلن‌ها
│   ├── plan-price/   # قیمت‌گذاری پلن‌ها
│   ├── plan-client/  # ارتباط پلن و کلاینت
│   ├── plan-source/  # ارتباط پلن و منبع
│   ├── source/       # مدیریت منابع داده
│   ├── source-company/# شرکت‌های منبع
│   ├── source-path/  # مسیرهای منبع
│   ├── source-public-config/# تنظیمات عمومی منبع
│   └── client-permission/# دسترسی‌های کلاینت
├── log/              # ماژول لاگ (Log Module)
│   ├── client/       # لاگ کلاینت‌ها
│   ├── plan/         # لاگ پلن‌ها
│   └── source/       # لاگ منابع
├── transaction/      # ماژول تراکنش (Transaction Module)
│   └── list/         # لیست تراکنش‌ها
├── config/           # ماژول تنظیمات (Config Module)
│   ├── check-site/   # بررسی سایت
│   ├── check-user/  # بررسی کاربر
│   └── main-admin/   # تنظیمات ادمین اصلی
├── dashboard/        # داشبورد
├── overview/         # نمای کلی
│   ├── summary/      # خلاصه
│   └── events/       # رویدادها
└── shared/           # ماژول مشترک (Shared Module)
```

## 📦 Modules

### 1. DataProviderModule (Main Module)

ماژول اصلی که شامل dashboard و overview است.

**Location:** `src/app/cms-modules/data-provider/data-provider.module.ts`

**Components:**
- `DataProviderComponent` - کامپوننت اصلی
- `DataProviderDashboardComponent` - داشبورد با KPI ها
- `DataProviderOverviewSummaryComponent` - خلاصه نمای کلی
- `DataProviderOverviewEventsComponent` - رویدادها

**Providers:**
- `DataProviderClientService`
- `DataProviderPlanService`
- `DataProviderSourceService`
- `DataProviderTransactionService`
- `DataProviderPlanCategoryService`
- `DataProviderPlanPriceService`
- `DataProviderEnumService`

### 2. DataProviderMainModule

ماژول اصلی برای مدیریت entities (client, plan, source, etc.)

**Location:** `src/app/cms-modules/data-provider/main/data-provider-main.module.ts`

**Entities:**
- Client (کلاینت)
- Plan (پلن)
- Plan Category (دسته‌بندی پلن)
- Plan Price (قیمت پلن)
- Plan Client (ارتباط پلن-کلاینت)
- Plan Source (ارتباط پلن-منبع)
- Source (منبع)
- Source Company (شرکت منبع)
- Source Path (مسیر منبع)
- Source Public Config (تنظیمات عمومی منبع)
- Client Permission (دسترسی کلاینت)

**Components per Entity:**
- `add/` - کامپوننت افزودن
- `edit/` - کامپوننت ویرایش
- `list/` - کامپوننت لیست (normal + mobile)
- `delete/` - کامپوننت حذف
- `header/` - کامپوننت هدر (در صورت نیاز)
- `selector/` - کامپوننت انتخابگر (در صورت نیاز)
- `tree/` - کامپوننت درختی (در صورت نیاز)

**Mobile Components:**
تمام list components دارای نسخه موبایل هستند:
- `list.mobile.component.ts`
- `list.mobile.component.html`
- `list.mobile.component.scss`

### 3. DataProviderLogModule

ماژول لاگ برای مشاهده تاریخچه تغییرات.

**Location:** `src/app/cms-modules/data-provider/log/data-provider-log.module.ts`

**Entities:**
- Log Client
- Log Plan
- Log Source

**Components per Entity:**
- `list/` - لیست لاگ‌ها (normal + mobile)
- `view/` - مشاهده جزئیات لاگ

### 4. DataProviderTransactionModule

ماژول تراکنش برای مدیریت تراکنش‌ها.

**Location:** `src/app/cms-modules/data-provider/transaction/data-provider-transaction.module.ts`

**Components:**
- `list/` - لیست تراکنش‌ها (normal + mobile)
- `view/` - مشاهده جزئیات تراکنش

### 5. DataProviderConfigModule

ماژول تنظیمات برای پیکربندی ماژول.

**Location:** `src/app/cms-modules/data-provider/config/data-provider-config.module.ts`

**Components:**
- `check-site/` - بررسی سایت
- `check-user/` - بررسی کاربر
- `main-admin/` - تنظیمات ادمین اصلی
- `site/` - تنظیمات سایت

## 🛣️ Routing

### Routing Structure

ماژول Data Provider از lazy loading برای تمام sub-modules استفاده می‌کند:

```typescript
// data-provider.routing.ts
const routes: Routes = [
  {
    path: "",
    component: DataProviderComponent,
    children: [
      { path: "", component: DataProviderDashboardComponent }, // Default
      { path: "dashboard", component: DataProviderDashboardComponent },
      { path: "config", loadChildren: () => import("./config/...") },
      { path: "main", loadChildren: () => import("./main/...") },
      { path: "log", loadChildren: () => import("./log/...") },
      { path: "transaction", loadChildren: () => import("./transaction/...") },
      { path: "overview-summary", component: DataProviderOverviewSummaryComponent },
      { path: "overview-events", component: DataProviderOverviewEventsComponent },
    ],
  },
];
```

### Main Module Routing

Main module از دو فایل routing استفاده می‌کند:
- `routes.normal.ts` - برای دسکتاپ
- `routes.mobile.ts` - برای موبایل

**Routing Logic:**
```typescript
// data-provider-main.routing.ts
RouterModule.forChild(window.innerWidth < 1000 ? routesMobile : routesNormal)
```

**Route Examples:**

**Normal Routes:**
```typescript
{
  path: "client",
  component: DataProviderClientListComponent,
  data: { title: "ROUTE.DATAPROVIDER.CLIENT" },
},
{
  path: "client-charge/:LinkClientId",
  component: DataProviderClientChargeComponent,
  data: { title: "ROUTE.DATAPROVIDER.CLIENTCHARGE" },
},
```

**Mobile Routes:**
```typescript
{
  path: "client",
  component: DataProviderClientListMobileComponent,
  data: { title: "ROUTE.DATAPROVIDER.CLIENT" },
},
```

### Route Parameters

برخی routes از parameters استفاده می‌کنند:

- `LinkClientId` - شناسه کلاینت
- `LinkPlanId` - شناسه پلن
- `LinkUserId` - شناسه کاربر
- `LinkSourceCompanyId` - شناسه شرکت منبع
- `LinkPlanPriceId` - شناسه قیمت پلن

## 🧩 Components

### List Components Pattern

تمام list components از `ListBaseComponent` ارث‌بری می‌کنند:

```typescript
export class DataProviderClientListComponent
  extends ListBaseComponent<
    DataProviderClientService,
    DataProviderClientModel,
    number // یا string بسته به نوع id
  >
  implements OnInit, OnDestroy
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  tableData: DataProviderClientModel[] = [];

  // ...
}
```

### Mobile List Components Pattern

Mobile list components از base list component ارث‌بری می‌کنند:

```typescript
export class DataProviderClientListMobileComponent
  extends DataProviderClientListComponent
  implements OnInit, OnDestroy
{
  // Mobile-specific logic
}
```

### Component Structure

هر entity دارای ساختار زیر است:

```
entity-name/
├── add/
│   ├── add.component.ts
│   └── add.component.html
├── edit/
│   ├── edit.component.ts
│   └── edit.component.html
├── list/
│   ├── list.component.ts
│   ├── list.component.html
│   ├── list.mobile.component.ts
│   ├── list.mobile.component.html
│   └── list.mobile.component.scss
├── delete/
│   ├── delete.component.ts
│   └── delete.component.html
├── header/ (optional)
├── selector/ (optional)
└── tree/ (optional)
```

## 🔧 Services

### Service Pattern

تمام services از `ntk-cms-api` import می‌شوند:

```typescript
import {
  DataProviderClientService,
  DataProviderClientModel,
  FilterModel,
  SortTypeEnum,
} from "ntk-cms-api";
```

### Service Providers

Services در module های مربوطه تعریف می‌شوند:

**DataProviderMainModule:**
- `DataProviderClientService`
- `DataProviderPlanService`
- `DataProviderSourceService`
- `DataProviderPlanCategoryService`
- `DataProviderPlanClientService`
- `DataProviderPlanPriceService`
- `DataProviderPlanSourceService`
- `DataProviderSourceCompanyService`
- `DataProviderSourcePathService`
- `DataProviderSourcePublicConfigService`
- `DataProviderClientPermissionService`

**DataProviderLogModule:**
- `DataProviderLogClientService`
- `DataProviderLogPlanService`
- `DataProviderLogSourceService`

**DataProviderTransactionModule:**
- `DataProviderTransactionService`

## 📱 Mobile Support

### Mobile Components

تمام list components دارای نسخه موبایل هستند که شامل:

1. **Pull-to-Refresh** - برای به‌روزرسانی داده‌ها
2. **Swipe Actions** - برای عملیات سریع
3. **Mobile-Optimized UI** - رابط کاربری بهینه شده برای موبایل

### Mobile Routing

Mobile routing به صورت خودکار بر اساس عرض صفحه انتخاب می‌شود:

```typescript
RouterModule.forChild(window.innerWidth < 1000 ? routesMobile : routesNormal)
```

## 🎨 Styling

### Mobile Styles

Mobile components از فایل `list.mobile.component.scss` استفاده می‌کنند که شامل:

- استایل‌های مخصوص موبایل
- انیمیشن‌های pull-to-refresh
- استایل‌های swipe actions

### Global Styles

- Normal styles: `src/styles.scss`
- Mobile styles: `src/styles.mobile.scss`

## 🔐 Type Safety

### Generic Types

تمام components از generic types استفاده می‌کنند:

**Main Module:**
- `id` type: `number`

**Log Module:**
- `id` type: `string`

**Transaction Module:**
- `id` type: `string`

### Type Examples

```typescript
// Main Module
extends ListBaseComponent<DataProviderClientService, DataProviderClientModel, number>

// Log Module
extends ListBaseComponent<DataProviderLogClientService, DataProviderLogClientModel, string>
```

## 🚀 Performance

### Lazy Loading

تمام sub-modules از lazy loading استفاده می‌کنند:

```typescript
{
  path: "main",
  loadChildren: () => import("./main/data-provider-main.module").then(
    (m) => m.DataProviderMainModule
  ),
}
```

### Code Splitting

با استفاده از lazy loading، bundle size بهینه شده و code splitting انجام می‌شود.

### Memory Management

تمام subscriptions در `ngOnDestroy` unsubscribe می‌شوند:

```typescript
ngOnDestroy(): void {
  if (this.unsubscribe) {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
```

## 📝 Best Practices

### Import Paths

از absolute paths استفاده کنید:

```typescript
// ✅ Good
import { PublicHelper } from "src/app/core/helpers/publicHelper";

// ❌ Bad
import { PublicHelper } from "../../../../core/helpers/publicHelper";
```

### Component Naming

- Normal components: `EntityNameListComponent`
- Mobile components: `EntityNameListMobileComponent`

### Service Injection

Services باید در constructor inject شوند:

```typescript
constructor(
  public contentService: DataProviderClientService,
  public cmsToastrService: CmsToastrService,
  // ...
) {
  super(contentService, new DataProviderClientModel(), ...);
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Missing Components:**
   - اطمینان حاصل کنید که component در module declarations تعریف شده است
   - بررسی کنید که component در exports قرار دارد (در صورت نیاز)

2. **Routing Issues:**
   - بررسی کنید که route در `routes.normal.ts` و `routes.mobile.ts` تعریف شده است
   - اطمینان حاصل کنید که route parameters درست هستند

3. **Type Errors:**
   - بررسی کنید که generic types درست تعریف شده‌اند
   - اطمینان حاصل کنید که `id` type درست است (number vs string)

## 📚 Related Documentation

- [Cursor.1.plan.md](./Cursor.1.plan.md) - Plan کامل بازنویسی
- [Angular Documentation](https://angular.dev)
- [Material Design](https://material.angular.io)

## 🔄 Changelog

برای مشاهده تغییرات، به فایل `Cursor.1.plan.md` مراجعه کنید.

---

**Last Updated:** 2025-01-27
**Version:** 1.0.0
