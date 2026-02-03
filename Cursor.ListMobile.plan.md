# Plan: بازنویسی و استانداردسازی تمام List Mobile Components

## هدف کلی:
بازنویسی تمام `list.mobile.component.html` با استفاده از `app-cms-html-list-mobile` و حذف فایل‌های SCSS اضافی. همچنین ایجاد `list.mobile.component` برای `list.component` هایی که حالت موبایل ندارند.

---

## Part 1: فهرست تمام List Mobile Components موجود (56 فایل)

### 1.1 Estate Module (25 فایل)
1. ✅ `estate/log/customer-order/list/list.mobile.component.ts` - **انجام شده**
2. `estate/log/customer-order-result/list/list.mobile.component.ts`
3. `estate/log/property-expert-price/list/list.mobile.component.ts`
4. `estate/log/property-history/list/list.mobile.component.ts`
5. `estate/main/account-agency/list/list.mobile.component.ts`
6. `estate/main/account-agency-ads/list/list.mobile.component.ts`
7. `estate/main/account-expert/list/list.mobile.component.ts`
8. `estate/main/activity-type/list/list.mobile.component.ts`
9. `estate/main/ads-type/list/list.mobile.component.ts`
10. `estate/main/contract-type/list/list.mobile.component.ts`
11. `estate/main/property-detail/list/list.mobile.component.ts`
12. `estate/main/property-detail-group/list/list.mobile.component.ts`
13. `estate/main/property-type-landuse/list/list.mobile.component.ts`
14. `estate/main/property-type-usage/list/list.mobile.component.ts`
15. `estate/data/billboard/list/list.mobile.component.ts`
16. `estate/data/property/list/list.mobile.component.ts`
17. `estate/data/property-ads/list/list.mobile.component.ts`
18. `estate/data/property-company/list/list.mobile.component.ts`
19. `estate/data/property-project/list/list.mobile.component.ts`
20. `estate/data/property-supplier/list/list.mobile.component.ts`
21. `estate/category-rack/list/list.mobile.component.ts`
22. `estate/category-zone/list/list.mobile.component.ts`

### 1.2 SMS Module (15 فایل)
23. `sms/main/api-number/list/list.mobile.component.ts`
24. `sms/main/api-number-permission/list/list.mobile.component.ts`
25. `sms/main/api-path/list/list.mobile.component.ts`
26. `sms/main/api-path-company/list/list.mobile.component.ts`
27. `sms/main/api-path-permission/list/list.mobile.component.ts`
28. `sms/main/api-path-price-permission/list/list.mobile.component.ts`
29. `sms/main/api-path-pagination/list/list.mobile.component.ts`
30. `sms/main/client-application/list/list.mobile.component.ts`
31. `sms/main/message-content/list/list.mobile.component.ts`
32. `sms/main/public-config/list/list.mobile.component.ts`
33. `sms/log/api-path/list/list.mobile.component.ts`
34. `sms/log/inbox/list/list.mobile.component.ts`
35. `sms/log/outbox/list/list.mobile.component.ts`
36. `sms/log/outbox-detail/list/list.mobile.component.ts`
37. `sms/log/outbox-queue/list/list.mobile.component.ts`
38. `sms/log/outbox-task-scheduler/list/list.mobile.component.ts`

### 1.3 Data Provider Module (13 فایل)
39. `data-provider/main/client/list/list.mobile.component.ts`
40. `data-provider/main/client-application/list/list.mobile.component.ts`
41. `data-provider/main/client-application-permission/list/list.mobile.component.ts`
42. `data-provider/main/plan/list/list.mobile.component.ts`
43. `data-provider/main/plan-client/list/list.mobile.component.ts`
44. `data-provider/main/plan-price/list/list.mobile.component.ts`
45. `data-provider/main/plan-source/list/list.mobile.component.ts`
46. `data-provider/main/source/list/list.mobile.component.ts`
47. `data-provider/main/source-company/list/list.mobile.component.ts`
48. `data-provider/main/source-path/list/list.mobile.component.ts`
49. `data-provider/main/source-path-pagination/list/list.mobile.component.ts`
50. `data-provider/main/source-public-config/list/list.mobile.component.ts`
51. `data-provider/log/client/list/list.mobile.component.ts`
52. `data-provider/log/plan/list/list.mobile.component.ts`
53. `data-provider/log/source/list/list.mobile.component.ts`
54. `data-provider/transaction/list/list.mobile.component.ts`

### 1.4 News Module (2 فایل)
55. ✅ `news/content/list/list.mobile.component.ts` - **الگو**
56. `news/category/list/list.mobile.component.ts`

---

## Part 2: فهرست کامل تمام List Components (206 فایل)

**نکته**: از این 206 فایل، 56 فایل دارای `list.mobile.component.ts` هستند (در Part 1 لیست شده‌اند) و 150 فایل باقیمانده نیاز به ایجاد `list.mobile.component` دارند.

### 2.1 Estate Module (22 فایل - 12 فایل mobile دارند، 10 فایل نیاز به mobile)
**دارای Mobile:**
- ✅ `estate/log/customer-order/list/list.component.ts`
- ✅ `estate/log/customer-order-result/list/list.component.ts`
- ✅ `estate/log/property-expert-price/list/list.component.ts`
- ✅ `estate/log/property-history/list/list.component.ts`
- ✅ `estate/main/account-agency/list/list.component.ts`
- ✅ `estate/main/account-agency-ads/list/list.component.ts`
- ✅ `estate/main/account-expert/list/list.component.ts`
- ✅ `estate/main/activity-type/list/list.component.ts`
- ✅ `estate/main/ads-type/list/list.component.ts`
- ✅ `estate/main/contract-type/list/list.component.ts`
- ✅ `estate/main/property-detail/list/list.component.ts`
- ✅ `estate/main/property-detail-group/list/list.component.ts`
- ✅ `estate/main/property-type-landuse/list/list.component.ts`
- ✅ `estate/main/property-type-usage/list/list.component.ts`
- ✅ `estate/data/billboard/list/list.component.ts`
- ✅ `estate/data/property/list/list.component.ts`
- ✅ `estate/data/property-ads/list/list.component.ts`
- ✅ `estate/data/property-company/list/list.component.ts`
- ✅ `estate/data/property-project/list/list.component.ts`
- ✅ `estate/data/property-supplier/list/list.component.ts`
- ✅ `estate/category-rack/list/list.component.ts`
- ✅ `estate/category-zone/list/list.component.ts`

### 2.2 SMS Module (16 فایل - 15 فایل mobile دارند، 1 فایل نیاز به mobile)
**دارای Mobile:**
- ✅ `sms/main/api-number/list/list.component.ts`
- ✅ `sms/main/api-number-permission/list/list.component.ts`
- ✅ `sms/main/api-path/list/list.component.ts`
- ✅ `sms/main/api-path-company/list/list.component.ts`
- ✅ `sms/main/api-path-permission/list/list.component.ts`
- ✅ `sms/main/api-path-price-permission/list/list.component.ts`
- ✅ `sms/main/api-path-pagination/list/list.component.ts`
- ✅ `sms/main/client-application/list/list.component.ts`
- ✅ `sms/main/message-content/list/list.component.ts`
- ✅ `sms/main/public-config/list/list.component.ts`
- ✅ `sms/log/api-path/list/list.component.ts`
- ✅ `sms/log/inbox/list/list.component.ts`
- ✅ `sms/log/outbox/list/list.component.ts`
- ✅ `sms/log/outbox-detail/list/list.component.ts`
- ✅ `sms/log/outbox-queue/list/list.component.ts`
- ✅ `sms/log/outbox-task-scheduler/list/list.component.ts`

**نیاز به Mobile:**
- ❌ `sms/main/client-application-permission/list/list.component.ts`

### 2.3 Data Provider Module (14 فایل - 13 فایل mobile دارند، 1 فایل نیاز به mobile)
**دارای Mobile:**
- ✅ `data-provider/main/client/list/list.component.ts`
- ✅ `data-provider/main/client-application/list/list.component.ts`
- ✅ `data-provider/main/client-application-permission/list/list.component.ts`
- ✅ `data-provider/main/plan/list/list.component.ts`
- ✅ `data-provider/main/plan-client/list/list.component.ts`
- ✅ `data-provider/main/plan-price/list/list.component.ts`
- ✅ `data-provider/main/plan-source/list/list.component.ts`
- ✅ `data-provider/main/source/list/list.component.ts`
- ✅ `data-provider/main/source-company/list/list.component.ts`
- ✅ `data-provider/main/source-path/list/list.component.ts`
- ✅ `data-provider/main/source-path-pagination/list/list.component.ts`
- ✅ `data-provider/main/source-public-config/list/list.component.ts`
- ✅ `data-provider/log/client/list/list.component.ts`
- ✅ `data-provider/log/plan/list/list.component.ts`
- ✅ `data-provider/log/source/list/list.component.ts`
- ✅ `data-provider/transaction/list/list.component.ts`

**نیاز به Mobile:**
- ❌ `data-provider/main/source-public-config/list/list.component.ts` (بررسی شود)

### 2.4 News Module (3 فایل - 2 فایل mobile دارند، 1 فایل نیاز به mobile)
**دارای Mobile:**
- ✅ `news/content/list/list.component.ts` (الگو)
- ✅ `news/category/list/list.component.ts`

**نیاز به Mobile:**
- ❌ `news/comment/list/list.component.ts`

### 2.5 Transaction Assistant Module (14 فایل - همه نیاز به mobile)
**نیاز به Mobile:**
- ❌ `transaction-assistant/address/list/list.component.ts`
- ❌ `transaction-assistant/cart/list/list.component.ts`
- ❌ `transaction-assistant/category/list/list.component.ts`
- ❌ `transaction-assistant/inventory/list/list.component.ts`
- ❌ `transaction-assistant/invoice/list/list.component.ts`
- ❌ `transaction-assistant/offer/list/list.component.ts`
- ❌ `transaction-assistant/order/list/list.component.ts`
- ❌ `transaction-assistant/payment/list/list.component.ts`
- ❌ `transaction-assistant/product/list/list.component.ts`
- ❌ `transaction-assistant/rating/list/list.component.ts`
- ❌ `transaction-assistant/request/list/list.component.ts`
- ❌ `transaction-assistant/shipment/list/list.component.ts`
- ❌ `transaction-assistant/supplier/list/list.component.ts`
- ❌ `transaction-assistant/tag/list/list.component.ts`

### 2.6 Web Designer Module (5 فایل - همه نیاز به mobile)
**نیاز به Mobile:**
- ❌ `web-designer/intro/list/list.component.ts`
- ❌ `web-designer/log-member-info/list/list.component.ts`
- ❌ `web-designer/menu/list/list.component.ts`
- ❌ `web-designer/page-dependency/list/list.component.ts`
- ❌ `web-designer/page-template/list/list.component.ts`

### 2.7 Link Management Module (7 فایل - همه نیاز به mobile)
**نیاز به Mobile:**
- ❌ `link-management/accounting/list/list.component.ts`
- ❌ `link-management/accounting-detail/list/list.component.ts`
- ❌ `link-management/billboard/list/list.component.ts`
- ❌ `link-management/billboard-pattern/list/list.component.ts`
- ❌ `link-management/member/list/list.component.ts`
- ❌ `link-management/target/list/list.component.ts`
- ❌ `link-management/target-billboard-log/list/list.component.ts`

### 2.8 Polling Module (2 فایل - همه نیاز به mobile)
**نیاز به Mobile:**
- ❌ `polling/content/list/list.component.ts`
- ❌ `polling/vote/list/list.component.ts`

### 2.9 Ticketing Module (1 فایل - نیاز به mobile)
**نیاز به Mobile:**
- ❌ `ticketing/departemen/list/list.component.ts`

### 2.10 File Manager Module (1 فایل - نیاز به mobile)
**نیاز به Mobile:**
- ❌ `file-manager/content/list/list.component.ts`

### 2.11 Member Module (4 فایل - همه نیاز به mobile)
**نیاز به Mobile:**
- ❌ `member/group/list/list.component.ts`
- ❌ `member/property-alias/list/list.component.ts`
- ❌ `member/property-detail/list/list.component.ts`
- ❌ `member/property-detail-group/list/list.component.ts`

### 2.12 سایر ماژول‌ها (100+ فایل)
- (بقیه فایل‌ها در بررسی دقیق‌تر - شامل application, core-main, و سایر ماژول‌ها)

---

## Part 3: فهرست فایل‌های SCSS برای حذف (54 فایل)

### 3.1 Estate Module (22 فایل)
1. `estate/category-rack/list/list.mobile.component.scss`
2. `estate/category-zone/list/list.mobile.component.scss`
3. `estate/data/billboard/list/list.mobile.component.scss`
4. `estate/data/property/list/list.mobile.component.scss`
5. `estate/data/property-ads/list/list.mobile.component.scss`
6. `estate/data/property-company/list/list.mobile.component.scss`
7. `estate/data/property-project/list/list.mobile.component.scss`
8. `estate/data/property-supplier/list/list.mobile.component.scss`
9. `estate/log/customer-order-result/list/list.mobile.component.scss`
10. `estate/log/property-expert-price/list/list.mobile.component.scss`
11. `estate/log/property-history/list/list.mobile.component.scss`
12. `estate/main/account-agency/list/list.mobile.component.scss`
13. `estate/main/account-agency-ads/list/list.mobile.component.scss`
14. `estate/main/account-expert/list/list.mobile.component.scss`
15. `estate/main/activity-type/list/list.mobile.component.scss`
16. `estate/main/ads-type/list/list.mobile.component.scss`
17. `estate/main/contract-type/list/list.mobile.component.scss`
18. `estate/main/property-detail/list/list.mobile.component.scss`
19. `estate/main/property-detail-group/list/list.mobile.component.scss`
20. `estate/main/property-type-landuse/list/list.mobile.component.scss`
21. `estate/main/property-type-usage/list/list.mobile.component.scss`

### 3.2 SMS Module (12 فایل)
22. `sms/log/api-path/list/list.mobile.component.scss`
23. `sms/log/inbox/list/list.mobile.component.scss`
24. `sms/log/outbox/list/list.mobile.component.scss`
25. `sms/log/outbox-detail/list/list.mobile.component.scss`
26. `sms/log/outbox-queue/list/list.mobile.component.scss`
27. `sms/log/outbox-task-scheduler/list/list.mobile.component.scss`
28. `sms/main/api-number/list/list.mobile.component.scss`
29. `sms/main/api-number-permission/list/list.mobile.component.scss`
30. `sms/main/api-path/list/list.mobile.component.scss`
31. `sms/main/api-path-company/list/list.mobile.component.scss`
32. `sms/main/api-path-permission/list/list.mobile.component.scss`
33. `sms/main/api-path-price-permission/list/list.mobile.component.scss`
34. `sms/main/api-path-pagination/list/list.mobile.component.scss`
35. `sms/main/client-application/list/list.mobile.component.scss`
36. `sms/main/message-content/list/list.mobile.component.scss`
37. `sms/main/public-config/list/list.mobile.component.scss`

### 3.3 Data Provider Module (13 فایل)
38. `data-provider/log/client/list/list.mobile.component.scss`
39. `data-provider/log/plan/list/list.mobile.component.scss`
40. `data-provider/log/source/list/list.mobile.component.scss`
41. `data-provider/main/client/list/list.mobile.component.scss`
42. `data-provider/main/client-application/list/list.mobile.component.scss`
43. `data-provider/main/client-application-permission/list/list.mobile.component.scss`
44. `data-provider/main/plan/list/list.mobile.component.scss`
45. `data-provider/main/plan-client/list/list.mobile.component.scss`
46. `data-provider/main/plan-price/list/list.mobile.component.scss`
47. `data-provider/main/plan-source/list/list.mobile.component.scss`
48. `data-provider/main/source/list/list.mobile.component.scss`
49. `data-provider/main/source-company/list/list.mobile.component.scss`
50. `data-provider/main/source-path/list/list.mobile.component.scss`
51. `data-provider/main/source-path-pagination/list/list.mobile.component.scss`
52. `data-provider/main/source-public-config/list/list.mobile.component.scss`
53. `data-provider/transaction/list/list.mobile.component.scss`

### 3.4 News Module (1 فایل)
54. `news/category/list/list.mobile.component.scss`

---

## Part 4: مراحل اجرا

### مرحله 1: بازنویسی List Mobile Components موجود (55 فایل)

#### 1.1 Estate Module (24 فایل)
- [x] Part 1.1.1: `estate/log/customer-order-result` ✅
- [x] Part 1.1.2: `estate/log/property-expert-price` ✅
- [x] Part 1.1.3: `estate/log/property-history` ✅
- [x] Part 1.1.4: `estate/main/account-agency` ✅
- [x] Part 1.1.5: `estate/main/account-agency-ads` ✅
- [x] Part 1.1.6: `estate/main/account-expert` ✅
- [x] Part 1.1.7: `estate/main/activity-type` ✅
- [x] Part 1.1.8: `estate/main/ads-type` ✅
- [x] Part 1.1.9: `estate/main/contract-type` ✅
- [x] Part 1.1.10: `estate/main/property-detail` ✅
- [x] Part 1.1.11: `estate/main/property-detail-group` ✅
- [x] Part 1.1.12: `estate/main/property-type-landuse` ✅
- [x] Part 1.1.13: `estate/main/property-type-usage` ✅
- [x] Part 1.1.14: `estate/data/billboard` ✅
- [x] Part 1.1.15: `estate/data/property` ✅
- [x] Part 1.1.16: `estate/data/property-ads` ✅
- [x] Part 1.1.17: `estate/data/property-company` ✅
- [x] Part 1.1.18: `estate/data/property-project` ✅
- [x] Part 1.1.19: `estate/data/property-supplier` ✅
- [x] Part 1.1.20: `estate/category-rack` ✅ ⚠️ **ساختار خاص - TS ساده‌سازی شد**
- [x] Part 1.1.21: `estate/category-zone` ✅

#### 1.2 SMS Module (15 فایل)
- [x] Part 1.2.1: `sms/main/api-number` ✅
- [x] Part 1.2.2: `sms/main/api-number-permission` ✅
- [x] Part 1.2.3: `sms/main/api-path` ✅
- [x] Part 1.2.4: `sms/main/api-path-company` ✅
- [x] Part 1.2.5: `sms/main/api-path-permission` ✅
- [x] Part 1.2.6: `sms/main/api-path-price-permission` ✅
- [x] Part 1.2.7: `sms/main/api-path-pagination` ✅
- [x] Part 1.2.8: `sms/main/client-application` ✅
- [x] Part 1.2.9: `sms/main/message-content` ✅
- [x] Part 1.2.10: `sms/main/public-config` ✅
- [x] Part 1.2.11: `sms/log/api-path` ✅
- [x] Part 1.2.12: `sms/log/inbox` ✅
- [x] Part 1.2.13: `sms/log/outbox` ✅
- [x] Part 1.2.14: `sms/log/outbox-detail` ✅
- [x] Part 1.2.15: `sms/log/outbox-queue` ✅
- [x] Part 1.2.16: `sms/log/outbox-task-scheduler` ✅

#### 1.3 Data Provider Module (13 فایل)
- [x] Part 1.3.1: `data-provider/main/client` ✅
- [x] Part 1.3.2: `data-provider/main/client-application` ✅
- [x] Part 1.3.3: `data-provider/main/client-application-permission` ✅
- [x] Part 1.3.4: `data-provider/main/plan` ✅
- [x] Part 1.3.5: `data-provider/main/plan-client` ✅
- [x] Part 1.3.6: `data-provider/main/plan-price` ✅
- [x] Part 1.3.7: `data-provider/main/plan-source` ✅
- [x] Part 1.3.8: `data-provider/main/source` ✅
- [x] Part 1.3.9: `data-provider/main/source-company` ✅
- [x] Part 1.3.10: `data-provider/main/source-path` ✅
- [x] Part 1.3.11: `data-provider/main/source-path-pagination` ✅
- [x] Part 1.3.12: `data-provider/main/source-public-config` ✅
- [x] Part 1.3.13: `data-provider/log/client` ✅
- [x] Part 1.3.14: `data-provider/log/plan` ✅
- [x] Part 1.3.15: `data-provider/log/source` ✅
- [x] Part 1.3.16: `data-provider/transaction` ✅

#### 1.4 News Module (1 فایل)
- [x] Part 1.4.1: `news/category` ✅

### مرحله 2: ایجاد List Mobile Components جدید (150+ فایل)

#### 2.1 Transaction Assistant Module (14 فایل)
- [ ] Part 2.1.1: `transaction-assistant/address`
- [ ] Part 2.1.2: `transaction-assistant/cart`
- [ ] Part 2.1.3: `transaction-assistant/category`
- [ ] Part 2.1.4: `transaction-assistant/inventory`
- [ ] Part 2.1.5: `transaction-assistant/invoice`
- [ ] Part 2.1.6: `transaction-assistant/offer`
- [ ] Part 2.1.7: `transaction-assistant/order`
- [ ] Part 2.1.8: `transaction-assistant/payment`
- [ ] Part 2.1.9: `transaction-assistant/product`
- [ ] Part 2.1.10: `transaction-assistant/rating`
- [ ] Part 2.1.11: `transaction-assistant/request`
- [ ] Part 2.1.12: `transaction-assistant/shipment`
- [ ] Part 2.1.13: `transaction-assistant/supplier`
- [ ] Part 2.1.14: `transaction-assistant/tag`

#### 2.2 سایر ماژول‌ها
- (در مراحل بعدی تکمیل می‌شود)

---

## Part 5: الگوی بازنویسی

### 5.1 الگوی HTML (بر اساس news/content/list)
```html
<app-cms-html-list-mobile
  [optionsListInfoAreaId]="constructorInfoAreaId"
  [optionGuideNoticeKey]="'module.entity.list'"
  [(optionActionGuideNoticeDisplay)]="viewGuideNotice"
  (optionOnActionButtonMemoRow)="onActionButtonMemoRow()"
  (optionOnActionButtonMemo)="onActionButtonMemo()"
  (optionOnActionButtonExport)="onActionButtonExport()"
  (optionOnActionButtonPrintRow)="onActionButtonPrintRow()"
  [optionTreeDisplay]="true/false"
  [optionActionRowId]="tableRowSelected?.id"
  [optionActionRowDisplay]="tableRowSelected?.id > 0"
  [optionActionRowDisplayMenu]="tableRowSelect2Click"
  [optionActionRowDisplayMenuAct]="tableRowSelectActionMenuClick"
  [optionSelectRowItemTitle]="tableRowSelected?.title || tableRowSelected?.id"
  >
  <!-- ng-content slots -->
</app-cms-html-list-mobile>
```

### 5.2 الگوی TypeScript
```typescript
import { Component } from "@angular/core";
import { BaseListComponent } from "./list.component";

@Component({
  selector: "app-module-entity-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class ModuleEntityListMobileComponent extends BaseListComponent {
  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
```

### 5.3 اقدامات برای هر فایل:
1. ✅ بازنویسی `list.mobile.component.html` با استفاده از `app-cms-html-list-mobile`
2. ✅ ساده‌سازی `list.mobile.component.ts` (حذف متدهای اضافی)
3. ✅ حذف `list.mobile.component.scss` (اگر وجود دارد)
4. ✅ حذف `list.mobile.component.css` (اگر وجود دارد)
5. ✅ بررسی و تست عملکرد

---

## Part 6: نتیجه‌گیری

### آمار کلی:
- **تعداد List Mobile Components موجود**: 56 فایل
- **تعداد List Mobile Components نیاز به بازنویسی**: 55 فایل (1 فایل انجام شده)
- **تعداد فایل‌های SCSS برای حذف**: 54 فایل
- **تعداد List Components بدون Mobile**: 150+ فایل

### اولویت‌بندی:
1. **اولویت بالا**: Estate, SMS, Data Provider, News (ماژول‌های اصلی)
2. **اولویت متوسط**: Transaction Assistant, Web Designer
3. **اولویت پایین**: سایر ماژول‌ها

---

## Result 1: Plan ایجاد شد

✅ Plan کامل ایجاد شد و شامل:
- فهرست کامل تمام List Mobile Components (56 فایل)
- فهرست List Components بدون Mobile (150+ فایل)
- فهرست فایل‌های SCSS برای حذف (54 فایل)
- مراحل اجرای کامل
- الگوی بازنویسی

**آماده برای شروع کار پس از تایید کاربر**

---

## Result 2: شروع کار - Part 1.1.1 تا 1.1.3

✅ **3 فایل انجام شد:**

### Part 1.1.1: `estate/log/customer-order-result`
- ✅ بازنویسی `list.mobile.component.html` با استفاده از `app-cms-html-list-mobile`
- ✅ ساده‌سازی `list.mobile.component.ts` (حذف متدهای اضافی، حفظ getTitle و getRowExpanded)
- ✅ حذف `list.mobile.component.scss`

### Part 1.1.2: `estate/log/property-expert-price`
- ✅ بازنویسی `list.mobile.component.html` با استفاده از `app-cms-html-list-mobile`
- ✅ ساده‌سازی `list.mobile.component.ts` (حذف متدهای اضافی، حفظ getTitle و getRowExpanded)
- ✅ حذف `list.mobile.component.scss`

### Part 1.1.3: `estate/log/property-history`
- ✅ بازنویسی `list.mobile.component.html` با استفاده از `app-cms-html-list-mobile`
- ✅ ساده‌سازی `list.mobile.component.ts` (حذف تمام متدهای اضافی، فقط getRowExpanded)
- ✅ حذف `list.mobile.component.scss`

### آمار:
- **انجام شده**: 3 فایل از 55 فایل (5.5%)
- **باقیمانده Estate Module**: 21 فایل
- **باقیمانده کل**: 52 فایل

**در حال ادامه کار...**
