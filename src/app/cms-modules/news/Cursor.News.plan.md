# Plan بازنویسی ماژول News

## Part 1: بررسی ساختار فعلی ماژول News

### دستورات اجرا شده:
- بررسی ساختار فعلی ماژول news و شناسایی کامپوننت‌های موجود
- بررسی routing فعلی
- بررسی module definition

### Result 1:
- ماژول news شامل sub-module های زیر است:
  - `category`: شامل add, edit, delete, menu, selector, tree, tree-selector
  - `content`: شامل add, edit, delete, list, selector, header
  - `comment`: شامل list, edit
  - `config`: یک sub-module جداگانه
- Routing فعلی از یک routes array استفاده می‌کند و dynamic نیست
- اکثر کامپوننت‌ها فقط desktop version دارند و mobile version ندارند

---

## Part 2: ایجاد Mobile Component ها برای Content

### دستورات اجرا شده:
- ایجاد mobile list component برای content
- ایجاد mobile view component برای content
- ایجاد mobile add component برای content
- ایجاد mobile edit component برای content
- ایجاد mobile delete component برای content

### Result 2:
- تمام mobile component های content ایجاد شدند:
  - `list.mobile.component.ts`, `list.mobile.component.html`, `list.mobile.component.scss`
  - `view.mobile.component.ts`, `view.mobile.component.html`
  - `add.mobile.component.ts`, `add.mobile.component.html`
  - `edit.mobile.component.ts`, `edit.mobile.component.html`
  - `delete.mobile.component.ts`, `delete.mobile.component.html`
- Desktop view component برای content ایجاد شد (قبلاً وجود نداشت)

---

## Part 3: ایجاد Mobile Component ها برای Category

### دستورات اجرا شده:
- ایجاد desktop list component برای category (قبلاً وجود نداشت)
- ایجاد mobile list component برای category
- ایجاد desktop view component برای category (قبلاً وجود نداشت)
- ایجاد mobile view component برای category
- ایجاد mobile add component برای category
- ایجاد mobile edit component برای category
- ایجاد mobile delete component برای category

### Result 3:
- تمام mobile component های category ایجاد شدند:
  - `list.component.ts`, `list.component.html` (desktop)
  - `list.mobile.component.ts`, `list.mobile.component.html`, `list.mobile.component.scss`
  - `view.component.ts`, `view.component.html` (desktop)
  - `view.mobile.component.ts`, `view.mobile.component.html`
  - `add.mobile.component.ts`, `add.mobile.component.html`
  - `edit.mobile.component.ts`, `edit.mobile.component.html`
  - `delete.mobile.component.ts`, `delete.mobile.component.html`

---

## Part 4: ایجاد View Component ها

### دستورات اجرا شده:
- ایجاد desktop view component برای content
- ایجاد mobile view component برای content
- ایجاد desktop view component برای category
- ایجاد mobile view component برای category

### Result 4:
- تمام view component ها ایجاد شدند:
  - `content/view/view.component.ts`, `view.component.html`
  - `content/view/view.mobile.component.ts`, `view.mobile.component.html`
  - `category/view/view.component.ts`, `view.component.html`
  - `category/view/view.mobile.component.ts`, `view.mobile.component.html`

---

## Part 5: بازنویسی Routing

### دستورات اجرا شده:
- ایجاد `routes.normal.ts` برای desktop routes
- ایجاد `routes.mobile.ts` برای mobile routes
- بازنویسی `news.routing.ts` به صورت dynamic

### Result 5:
- Routing به صورت dynamic پیاده‌سازی شد:
  - `routes.normal.ts`: شامل routes برای desktop components
  - `routes.mobile.ts`: شامل routes برای mobile components
  - `news.routing.ts`: از `window.innerWidth` برای تشخیص mobile/desktop استفاده می‌کند

---

## Part 6: به‌روزرسانی Module

### دستورات اجرا شده:
- به‌روزرسانی `news.module.ts` برای اضافه کردن تمام mobile component ها

### Result 6:
- تمام mobile component ها به module اضافه شدند:
  - Content mobile components
  - Category mobile components
  - View components (desktop و mobile)

---

## Part 7: رفع خطاها

### دستورات اجرا شده:
- تغییر access modifiers از `private` به `protected` در base components
- اصلاح استفاده از متدهای service (ServiceGetAll به جای ServiceGetAllEditor برای category)
- اصلاح `onSubmitOptionsSearch` برای استفاده از `Array<FilterDataModel>`
- اصلاح `onTableSortData` برای استفاده از pattern template
- اضافه کردن متد `onFormCancel` به add و edit components
- اصلاح استفاده از `dataModelResultCategory` در mobile delete HTML
- اصلاح dialog config ها برای استفاده از `environment.cmsViewConfig`
- حذف import های غیرضروری

### Result 7:
- تمام خطاهای linter و type errors برطرف شدند
- تمام component ها با الگوی template هماهنگ شدند
- هیچ خطای linter یا type error وجود ندارد

---

## خلاصه نهایی

### کامپوننت‌های ایجاد شده:

#### Content:
- ✅ Desktop List (قبلاً وجود داشت)
- ✅ Mobile List
- ✅ Desktop View (جدید)
- ✅ Mobile View
- ✅ Desktop Add (قبلاً وجود داشت)
- ✅ Mobile Add
- ✅ Desktop Edit (قبلاً وجود داشت)
- ✅ Mobile Edit
- ✅ Desktop Delete (قبلاً وجود داشت)
- ✅ Mobile Delete

#### Category:
- ✅ Desktop List (جدید)
- ✅ Mobile List
- ✅ Desktop View (جدید)
- ✅ Mobile View
- ✅ Desktop Add (قبلاً وجود داشت)
- ✅ Mobile Add
- ✅ Desktop Edit (قبلاً وجود داشت)
- ✅ Mobile Edit
- ✅ Desktop Delete (قبلاً وجود داشت)
- ✅ Mobile Delete

### Routing:
- ✅ `routes.normal.ts` برای desktop
- ✅ `routes.mobile.ts` برای mobile
- ✅ `news.routing.ts` به صورت dynamic

### Module:
- ✅ تمام component ها به module اضافه شدند

### خطاها:
- ✅ تمام خطاهای linter برطرف شدند
- ✅ تمام خطاهای type برطرف شدند

---

**تاریخ تکمیل:** 2024-12-19
**وضعیت:** ✅ تکمیل شده
