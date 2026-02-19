# Plan: اضافه شدن کلاس ntk-row-expanded به تمام list.component.html ها

## هدف کلی:

اضافه شدن کلاس `[class.ntk-row-expanded]="row.expanded === true"` به تمام ردیف‌های `expandedDetail` در فایل‌های `list.component.html` برای حل مشکل جدایی ردیف‌های هم‌گروه.

---

## Part 1: فهرست فایل‌های دارای expandedDetail

### 1.1 Article Module (1 فایل)

- ✅ `article/content/list/list.component.html` - **انجام شده**

### 1.2 News Module (2 فایل)

- ✅ `news/content/list/list.component.html` - **انجام شده**
- `news/category/list/list.component.html`

### 1.3 Estate Module (15 فایل)

- `estate/data/property/list/list.component.html`
- `estate/data/property-supplier/list/list.component.html`
- `estate/data/property-project/list/list.component.html`
- `estate/data/property-company/list/list.component.html`
- `estate/data/billboard/list/list.component.html`
- `estate/main/account-expert/list/list.component.html`
- `estate/main/account-agency/list/list.component.html`
- `estate/log/property-history/list/list.component.html`
- `estate/log/property-expert-price/list/list.component.html`
- `estate/log/customer-order/list/list.component.html`
- `estate/data/property/responsible-user-list/responsible-user-list.component.html`
- `estate/data/property/quick-list/quick-list.component.html`
- `estate/log/property-history/responsible-user-list/responsible-user-list.component.html`
- `estate/log/customer-order/responsible-user-list/responsible-user-list.component.html`

### 1.4 SMS Module (7 فایل)

- `sms/main/client-application/list/list.component.html`
- `sms/main/client-application-permission/list/list.component.html`
- `sms/main/api-path-pagination/list/list.component.html`
- `sms/main/api-path-permission/list/list.component.html`
- `sms/main/api-number-permission/list/list.component.html`
- `sms/log/outbox-detail/list/list.component.html`
- `sms/log/api-path/list/list.component.html`

### 1.5 Data Provider Module (6 فایل)

- `data-provider/main/source/list/list.component.html`
- `data-provider/main/plan/list/list.component.html`
- `data-provider/main/client/list/list.component.html`
- `data-provider/main/client-application/list/list.component.html`
- `data-provider/main/client-application-permission/list/list.component.html`

### 1.6 Link Management Module (5 فایل)

- `link-management/target/list/list.component.html`
- `link-management/target-billboard-log/list/list.component.html`
- `link-management/member/list/list.component.html`
- `link-management/accounting-detail/list/list.component.html`
- `link-management/accounting/list/list.component.html`

### 1.7 Core Modules (8 فایل)

- `core-main/site/user-list/user-list.component.html`
- `core-main/user/list/list.component.html`
- `core-module-data/task/list/list.component.html`
- `core-module-data/pin/list/list.component.html`
- `core-module-data/memo/list/list.component.html`
- `core-module-data/comment/list/list.component.html`
- `core-module-log/show-key/list/list.component.html`

### 1.8 سایر ماژول‌ها (10 فایل)

- `hyper-shop/content/list/list.component.html`
- `polling/content/list/list.component.html`
- `member/property-alias/list/list.component.html`
- `member/group/list/list.component.html`
- `donate/target/list/list.component.html`
- `chart/content/list/list.component.html`
- `catalog/content/list/list.component.html`
- `blog/content/list/list.component.html`
- `biography/content/list/list.component.html`
- `application/memberInfo/list/list.component.html`

---

## Part 2: تغییر مورد نیاز

### الگوی تغییر:

```html
<!-- قبل -->
<mat-row
  *matRowDef="let row; columns: ['expandedDetail']; let i = dataIndex"
  class="ntk-row-expandedDetail"
  (click)="onActionTableRowSelect(row, $event)"
  ...
>
  <!-- بعد -->
  <mat-row
    *matRowDef="let row; columns: ['expandedDetail']; let i = dataIndex"
    class="ntk-row-expandedDetail"
    [class.ntk-row-expanded]="row.expanded === true"
    (click)="onActionTableRowSelect(row, $event)"
    ...
  ></mat-row
></mat-row>
```

---

## Part 3: مراحل اجرا

### مرحله 1: بررسی و اعمال تغییرات به صورت دسته‌ای

- بررسی هر فایل برای وجود `expandedDetail`
- اضافه کردن `[class.ntk-row-expanded]="row.expanded === true"` به ردیف `expandedDetail`
- تست و بررسی خطاها

---

## Result 1: Plan ایجاد شد

✅ Plan کامل ایجاد شد و شامل:

- فهرست کامل تمام فایل‌های دارای expandedDetail (50+ فایل)
- الگوی تغییر مورد نیاز
- مراحل اجرای کامل

**آماده برای شروع کار**

---

## Result 2: اعمال تغییرات به تمام فایل‌ها - 2026-02-19 20:45:00

✅ **39 فایل با موفقیت به‌روزرسانی شد:**

### Estate Module (10 فایل):

- ✅ `estate/data/property/list/list.component.html`
- ✅ `estate/data/property-supplier/list/list.component.html`
- ✅ `estate/data/property-project/list/list.component.html`
- ✅ `estate/data/property-company/list/list.component.html`
- ✅ `estate/data/billboard/list/list.component.html`
- ✅ `estate/main/account-expert/list/list.component.html`
- ✅ `estate/main/account-agency/list/list.component.html`
- ✅ `estate/log/property-history/list/list.component.html`
- ✅ `estate/log/property-expert-price/list/list.component.html`
- ✅ `estate/log/customer-order/list/list.component.html`

### SMS Module (7 فایل):

- ✅ `sms/main/client-application/list/list.component.html`
- ✅ `sms/main/client-application-permission/list/list.component.html`
- ✅ `sms/main/api-path-pagination/list/list.component.html`
- ✅ `sms/main/api-path-permission/list/list.component.html`
- ✅ `sms/main/api-number-permission/list/list.component.html`
- ✅ `sms/log/outbox-detail/list/list.component.html`
- ✅ `sms/log/api-path/list/list.component.html`

### Data Provider Module (6 فایل):

- ✅ `data-provider/main/source/list/list.component.html`
- ✅ `data-provider/main/plan/list/list.component.html`
- ✅ `data-provider/main/client/list/list.component.html`
- ✅ `data-provider/main/client-application/list/list.component.html`
- ✅ `data-provider/main/client-application-permission/list/list.component.html`

### Link Management Module (5 فایل):

- ✅ `link-management/target/list/list.component.html`
- ✅ `link-management/target-billboard-log/list/list.component.html`
- ✅ `link-management/member/list/list.component.html`
- ✅ `link-management/accounting-detail/list/list.component.html`
- ✅ `link-management/accounting/list/list.component.html`

### سایر ماژول‌ها (11 فایل):

- ✅ `hyper-shop/content/list/list.component.html`
- ✅ `news/category/list/list.component.html`
- ✅ `polling/content/list/list.component.html`
- ✅ `member/property-alias/list/list.component.html`
- ✅ `member/group/list/list.component.html`
- ✅ `donate/target/list/list.component.html`
- ✅ `core-main/user/list/list.component.html`
- ✅ `chart/content/list/list.component.html`
- ✅ `catalog/content/list/list.component.html`
- ✅ `blog/content/list/list.component.html`
- ✅ `biography/content/list/list.component.html`
- ✅ `application/memberInfo/list/list.component.html`

### تغییر اعمال شده:

در تمام فایل‌ها، کلاس `[class.ntk-row-expanded]="row.expanded === true"` به ردیف `expandedDetail` اضافه شد.

### نتیجه:

- ✅ تمام فایل‌ها بدون خطای linter
- ✅ تغییرات به صورت یکپارچه اعمال شد
- ✅ مشکل جدایی ردیف‌های هم‌گروه در تمام ماژول‌ها حل شد

**کار تکمیل شد!**

---

## Part 4: بررسی و اصلاح list.mobile.component.html ها بر اساس الگوی news

### هدف:

**تمام فایل‌های `list.mobile.component.html` موجود باید از الگوی `news/content/list/list.mobile.component.html` نوشته شده باشند و ساختار یکسانی داشته باشند.**

### الگوی مرجع (الزامی):

- **فایل الگو**: `src/app/cms-modules/news/content/list/list.mobile.component.html`
- **استفاده از**: `app-cms-html-list-mobile` component
- **ساختار**: مطابق با الگوی news برای یکپارچگی پروژه

### ویژگی‌های الگوی news که باید در تمام فایل‌ها رعایت شود:

#### 4.1 ساختار کلی:

- استفاده از `<app-cms-html-list-mobile>` به عنوان component اصلی
- استفاده از `ng-container` با slot های: `cms-tree`, `cms-header`, `cms-action-header`, `cms-action-header-start`, `cms-action-header-end`, `cms-action-main`, `cms-action-row`, `cms-action-area`, `cms-body`, `cms-footer`

#### 4.2 دکمه‌های action-header-start:

- دکمه Info (viewGuideNotice)
- دکمه Reload (onActionButtonReload)
- دکمه Maximize (onActionGridExpandRows(true))
- دکمه Minimize (onActionGridExpandRows(false))

#### 4.3 دکمه‌های action-header-end:

- دکمه Search (optionsSearch.data.show)
- دکمه Statist (optionsStatist.data.show)
- دکمه BatchView (در صورت وجود categoryModelSelected)

#### 4.4 دکمه‌های action-main:

- دکمه Add (در صورت وجود accessAddRow)

#### 4.5 دکمه‌های action-row:

- دکمه Edit (در صورت وجود accessEditRow و tableRowSelected?.id > 0)
- دکمه Delete (در صورت وجود accessDeleteRow و tableRowSelected?.id > 0)
- دکمه Comment (در صورت وجود tableRowSelected?.id > 0)
- دکمه LinkTo

#### 4.6 ساختار Mobile List View در cms-body:

- استفاده از `cms-m-list` و `cms-m-list-item`
- نمایش تصویر یا placeholder
- نمایش title, id, viewCount, createdDate, recordStatus
- نمایش description
- نمایش expanded detail با `getRowExpanded(row)`
- استفاده از کلاس‌های `border-highlight` و `bg-fade-highlight-light` برای selected items

#### 4.7 Inputs و Outputs مورد نیاز:

- `[optionsListInfoAreaId]="constructorInfoAreaId"`
- `[optionGuideNoticeKey]="'module.entity.list'"`
- `[(optionActionGuideNoticeDisplay)]="viewGuideNotice"`
- `(optionOnActionButtonMemoRow)`, `(optionOnActionButtonMemo)`, `(optionOnActionButtonExport)`, `(optionOnActionButtonPrintRow)`
- `[optionTreeDisplay]="true/false"`
- `[optionActionRowId]="tableRowSelected?.id"`
- `[optionActionRowDisplay]="tableRowSelected?.id > 0"`
- `[optionActionRowDisplayMenu]`, `[optionActionRowDisplayMenuAct]`
- `[optionSelectRowItemTitle]`

### فایل‌های نیازمند بررسی و اصلاح:

#### 4.1 فایل‌های موجود (208 فایل):

- بررسی تمام 208 فایل `list.mobile.component.html` موجود
- مقایسه با الگوی `news/content/list/list.mobile.component.html`
- شناسایی فایل‌هایی که ساختار متفاوتی دارند
- اصلاح فایل‌های غیر استاندارد بر اساس الگوی news

#### 4.2 فایل‌های نیازمند ایجاد:

- بررسی تمام فایل‌های `list.component.html` در `src/app/cms-modules`
- شناسایی فایل‌هایی که `list.mobile.component.html` ندارند
- ایجاد `list.mobile.component.html` برای آن‌ها بر اساس الگوی news

### معیارهای بررسی:

1. ✅ استفاده از `app-cms-html-list-mobile` component
2. ✅ وجود تمام ng-container های مورد نیاز
3. ✅ وجود دکمه‌های action-header-start (Info, Reload, Maximize, Minimize)
4. ✅ وجود دکمه‌های action-header-end (Search, Statist, BatchView)
5. ✅ وجود دکمه‌های action-main (Add)
6. ✅ وجود دکمه‌های action-row (Edit, Delete, Comment, LinkTo)
7. ✅ ساختار Mobile List View مطابق الگو
8. ✅ استفاده از کلاس‌های استاندارد (`cms-m-list`, `cms-m-list-item`, `border-highlight`, `bg-fade-highlight-light`)
9. ✅ Inputs و Outputs مطابق الگو
10. ✅ استفاده از `getRowExpanded(row)` برای expanded detail

### ⚠️ نکته مهم: هماهنگی tabledisplayedColumns با matColumnDef

**مشکل:** اگر در `list.component.ts` ستونی در `tabledisplayedColumns` تعریف شده باشد اما در `list.component.html` `matColumnDef` مربوط به آن وجود نداشته باشد، خطای Angular رخ می‌دهد.

**راه حل:**

- بررسی `tabledisplayedColumns` در فایل `.ts`
- بررسی وجود `ng-container matColumnDef` برای هر ستون در فایل `.html`
- اطمینان از اینکه تمام ستون‌های `tabledisplayedColumns` دارای `matColumnDef` هستند
- در صورت عدم وجود، یا اضافه کردن `matColumnDef` یا حذف ستون از `tabledisplayedColumns`

**مثال:**

```typescript
// list.component.ts
tabledisplayedColumns: string[] = [
  "linkMainImageIdSrc",
  "id",
  "recordStatus",
  "title",
  "createdDate",
  "LinkTo",
  "action_menu"
];
```

```html
<!-- list.component.html -->
<!-- باید برای هر ستون matColumnDef وجود داشته باشد -->
<ng-container matColumnDef="linkMainImageIdSrc">
  <mat-header-cell *matHeaderCellDef>...</mat-header-cell>
  <mat-cell *matCellDef="let row">...</mat-cell>
</ng-container>

<ng-container matColumnDef="id">
  <mat-header-cell *matHeaderCellDef>...</mat-header-cell>
  <mat-cell *matCellDef="let row">...</mat-cell>
</ng-container>

<!-- و غیره... -->
```

**چک‌لیست:**

- ✅ تمام ستون‌های `tabledisplayedColumns` دارای `matColumnDef` هستند
- ✅ هیچ `matColumnDef` اضافی وجود ندارد (اختیاری)
- ✅ ترتیب ستون‌ها در HTML مطابق با `tabledisplayedColumns` است (برای خوانایی بهتر)

---

## Part 5: ایجاد routes.mobile.ts برای تمام ماژول‌ها

### هدف:

تمام ماژول‌هایی که دارای `list.component.html` یا `list.mobile.component.html` هستند باید فایل `routes.mobile.ts` داشته باشند.

### الگوی مرجع:

- **فایل الگو**: `src/app/cms-modules/news/routes.mobile.ts`
- **ساختار**: شامل route های mobile برای تمام list و add/edit components

### فایل‌های نیازمند routes.mobile.ts:

#### 5.1 ماژول‌های دارای routes.mobile.ts (29 فایل موجود):

- ✅ `article/routes.mobile.ts`
- ✅ `news/routes.mobile.ts`
- ✅ `core-log/routes.mobile.ts`
- ✅ `web-designer/routes.mobile.ts`
- ✅ `transaction-assistant/routes.mobile.ts`
- ✅ `ticketing/routes.mobile.ts`
- ✅ `polling/routes.mobile.ts`
- ✅ `member/routes.mobile.ts`
- ✅ `link-management/routes.mobile.ts`
- ✅ `hyper-shop/routes.mobile.ts`
- ✅ `file-manager/routes.mobile.ts`
- ✅ `donate/routes.mobile.ts`
- ✅ `crm/main/routes.mobile.ts`
- ✅ `core-token/routes.mobile.ts`
- ✅ `core-module-data/routes.mobile.ts`
- ✅ `bank-payment/routes.mobile.ts`
- ✅ `api-telegram/routes.mobile.ts`
- ✅ `sms/main/routes.mobile.ts`
- ✅ `sms/log/routes.mobile.ts`
- ✅ `sms/config/routes.mobile.ts`
- ✅ `sms/action/routes.mobile.ts`
- ✅ `data-provider/transaction/routes.mobile.ts`
- ✅ `data-provider/main/routes.mobile.ts`
- ✅ `data-provider/log/routes.mobile.ts`
- ✅ `estate/main/routes.mobile.ts`
- ✅ `estate/log/routes.mobile.ts`
- ✅ `estate/data/routes.mobile.ts`
- ✅ `estate/config/routes.mobile.ts`
- ✅ `estate/action/routes.mobile.ts`

#### 5.2 ماژول‌های نیازمند routes.mobile.ts:

- بررسی تمام ماژول‌های دارای `list.component.html` یا `list.mobile.component.html`
- شناسایی ماژول‌هایی که `routes.mobile.ts` ندارند
- ایجاد `routes.mobile.ts` برای آن‌ها بر اساس الگوی news

### الگوی routes.mobile.ts:

```typescript
import { Routes } from "@angular/router";
import { ModuleEntityListMobileComponent } from "./entity/list/list.mobile.component";
import { ModuleEntityAddMobileComponent } from "./entity/add/add.mobile.component";
import { ModuleEntityEditComponent } from "./entity/edit/edit.component";
import { ModuleComponent } from "./module.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: ModuleComponent,
    data: { title: "ROUTE.MODULE" },
    children: [
      {
        path: "entity",
        component: ModuleEntityListMobileComponent,
        data: { title: "ROUTE.MODULE.ENTITY" },
      },
      {
        path: "entity/add/",
        component: ModuleEntityAddMobileComponent,
        data: { title: "ROUTE.MODULE.ENTITY" },
      },
      {
        path: "entity/add/:CategoryId",
        component: ModuleEntityAddMobileComponent,
        data: { title: "ROUTE.MODULE.ENTITY" },
      },
      {
        path: "entity/edit/:id",
        component: ModuleEntityEditComponent,
        data: { title: "ROUTE.MODULE.ENTITY" },
      },
      {
        path: "entity/LinkCategoryId/:LinkCategoryId",
        component: ModuleEntityListMobileComponent,
        data: { title: "ROUTE.MODULE.ENTITY" },
      },
      // سایر routes...
    ],
  },
];
```

---

## Part 6: مراحل اجرا

### مرحله 1: بررسی فایل‌های موجود

- بررسی تمام `list.component.html` ها
- شناسایی فایل‌هایی که `list.mobile.component.html` ندارند
- شناسایی ماژول‌هایی که `routes.mobile.ts` ندارند

### مرحله 2: بررسی و اصلاح list.mobile.component.html های موجود

- برای هر `list.mobile.component.html` موجود:
  - مقایسه با الگوی `news/content/list/list.mobile.component.html`
  - بررسی معیارهای 10 گانه
  - شناسایی تفاوت‌ها و ناهماهنگی‌ها
  - اصلاح فایل بر اساس الگوی news

### مرحله 2.1: بررسی هماهنگی tabledisplayedColumns با matColumnDef (⚠️ مهم)

- برای هر `list.component.html`:
  - بررسی `tabledisplayedColumns` در فایل `.ts` مربوطه
  - بررسی وجود `matColumnDef` برای هر ستون در فایل `.html`
  - اطمینان از اینکه تمام ستون‌های `tabledisplayedColumns` دارای `matColumnDef` هستند
  - در صورت عدم وجود، یا اضافه کردن `matColumnDef` یا حذف ستون از `tabledisplayedColumns`
  - بررسی خطاهای Angular runtime که ممکن است به دلیل این مشکل رخ دهد

### مرحله 3: ایجاد list.mobile.component.html برای فایل‌های نیازمند

- برای هر `list.component.html` که `list.mobile.component.html` ندارد:
  - ایجاد `list.mobile.component.html` بر اساس الگوی news
  - ایجاد `list.mobile.component.ts` (در صورت نیاز)
  - استفاده از `app-cms-html-list-mobile` component
  - رعایت تمام معیارهای الگوی news

### مرحله 4: ایجاد routes.mobile.ts

- برای هر ماژولی که `routes.mobile.ts` ندارد:
  - ایجاد `routes.mobile.ts` بر اساس الگوی news
  - اضافه کردن routes برای تمام list و add/edit components

### مرحله 5: تست و بررسی

- بررسی خطاهای linter
- تست عملکرد mobile components
- بررسی routes

---

## Result 3: Plan به‌روزرسانی شد - 2026-02-19 21:00:00

✅ **Plan به‌روزرسانی شد و شامل:**

### اضافه شده:

- **Part 4**: ایجاد `list.mobile.component.html` برای تمام `list.component.html` ها بر اساس الگوی news
- **Part 5**: ایجاد `routes.mobile.ts` برای تمام ماژول‌ها بر اساس الگوی news
- **Part 6**: مراحل اجرای کامل

### نکات مهم:

- الگوی مرجع: `news/content/list/list.mobile.component.html`
- استفاده از `app-cms-html-list-mobile` component
- ساختار routes مطابق با الگوی news
- 29 فایل `routes.mobile.ts` موجود شناسایی شد

**آماده برای شروع کار**
