# گزارش جامع انتقال به Angular 21

**تاریخ بررسی:** 2025-01-13
**نسخه فعلی:** Angular 20.1.0
**نسخه هدف:** Angular 21

---

## 🔍 بررسی شرایط فعلی پروژه

### ✅ وضعیت نسخه‌های فعلی

| کامپوننت | نسخه فعلی | وضعیت |
|---------|----------|-------|
| Angular Core | 20.1.0 | ✅ به‌روز |
| Angular CLI | 20.1.0 | ✅ به‌روز |
| TypeScript | 5.8.2 | ✅ سازگار |
| RxJS | 7.8.0 | ⚠️ نیاز به بررسی |
| Zone.js | 0.15.0 | ✅ سازگار |
| Node.js | 24.x (CI) | ✅ سازگار |

### 📦 وابستگی‌های کلیدی

#### وابستگی‌های Angular
- ✅ `@angular/animations`: ^20.1.0
- ✅ `@angular/cdk`: ^20.1.0
- ✅ `@angular/common`: ^20.1.0
- ✅ `@angular/core`: ^20.1.0
- ✅ `@angular/material`: ^20.1.0
- ✅ `@angular/fire`: ^20.0.1

#### وابستگی‌های شخصی‌سازی شده
- ⚠️ `ntk-cms-api`: ^20.25.55 (نیاز به بررسی سازگاری)
- ⚠️ `ntk-cms-filemanager`: ^20.25.7 (نیاز به بررسی سازگاری)
- ⚠️ `ngx-ntk-smart-module`: ^20.25.3 (نیاز به بررسی سازگاری)
- ⚠️ `ngx-ntk-cron-editor`: ^20.25.4 (نیاز به بررسی سازگاری)
- ⚠️ `ngx-ntk-file-picker`: ^20.25.3 (نیاز به بررسی سازگاری)

#### وابستگی‌های شخص ثالث
- ⚠️ `@ng-bootstrap/ng-bootstrap`: ^19.0.1 (نیاز به بروزرسانی)
- ⚠️ `@ngx-translate/core`: ^16.0.4 (نیاز به بررسی)
- ⚠️ `ngx-toastr`: ^19.0.0 (نیاز به بررسی)

---

## 🚨 نکات مهم قبل از شروع

### ⚠️ هشدارها

1. **Angular 21 ممکن است هنوز منتشر نشده باشد**
   - بررسی دقیق‌تر در Angular.dev لازم است
   - احتمالاً آخرین نسخه stable Angular 20.x است

2. **پروژه از NgModule استفاده می‌کند**
   - Angular 21 احتمالاً بیشتر به سمت standalone components می‌رود
   - ممکن است نیاز به migration به standalone باشد

3. **وابستگی‌های شخصی‌سازی شده**
   - تمام پکیج‌های `ngx-ntk-*` و `ntk-cms-*` باید با Angular 21 سازگار باشند
   - ممکن است نیاز به بروزرسانی این پکیج‌ها باشد

---

## 📋 مراحل انتقال به Angular 21

### مرحله 1: بررسی اولیه و آماده‌سازی

#### 1.1 بررسی انتشار Angular 21
```bash
# بررسی آخرین نسخه Angular
npm view @angular/core versions --json

# بررسی آخرین نسخه Angular 21 (اگر منتشر شده باشد)
npm view @angular/core@21 versions --json
```

#### 1.2 بررسی مستندات Angular
- بررسی Angular Update Guide: https://angular.dev/update-guide
- بررسی breaking changes در Angular 21
- بررسی migration guide برای Angular 21

#### 1.3 ایجاد Branch جدید
```bash
git checkout -b feature/upgrade-to-angular-21
git push -u origin feature/upgrade-to-angular-21
```

#### 1.4 Backup کامل
```bash
# ایجاد backup از فایل‌های مهم
# - package.json
# - angular.json
# - tsconfig.json
# - تمام فایل‌های .ts در src/
```

---

### مرحله 2: بروزرسانی وابستگی‌های اصلی

#### 2.1 بروزرسانی Angular CLI
```bash
# بروزرسانی Angular CLI به آخرین نسخه
npm install -g @angular/cli@latest

# یا بروزرسانی محلی
npm install --save-dev @angular/cli@21
```

#### 2.2 استفاده از Angular Update Guide
```bash
# اجرای دستور ng update برای بررسی نسخه‌های قابل بروزرسانی
ng update

# اجرای دستور برای بروزرسانی به Angular 21
ng update @angular/core@21 @angular/cli@21
```

#### 2.3 بروزرسانی دستی در package.json
در صورت نیاز، بروزرسانی دستی:

```json
{
  "dependencies": {
    "@angular/animations": "^21.0.0",
    "@angular/cdk": "^21.0.0",
    "@angular/common": "^21.0.0",
    "@angular/compiler": "^21.0.0",
    "@angular/core": "^21.0.0",
    "@angular/forms": "^21.0.0",
    "@angular/material": "^21.0.0",
    "@angular/platform-browser": "^21.0.0",
    "@angular/platform-browser-dynamic": "^21.0.0",
    "@angular/router": "^21.0.0"
  },
  "devDependencies": {
    "@angular/build": "^21.0.0",
    "@angular/cli": "^21.0.0",
    "@angular/compiler-cli": "^21.0.0"
  }
}
```

---

### مرحله 3: بروزرسانی وابستگی‌های جانبی

#### 3.1 بروزرسانی RxJS (در صورت نیاز)
```bash
# بررسی نسخه مورد نیاز برای Angular 21
npm install rxjs@^7.8.0
# یا نسخه جدیدتر در صورت نیاز
```

#### 3.2 بروزرسانی TypeScript
```bash
# بررسی نسخه TypeScript مورد نیاز
npm install --save-dev typescript@~5.9.0
# (یا نسخه مورد نیاز Angular 21)
```

#### 3.3 بروزرسانی Zone.js
```bash
# Zone.js معمولاً با Angular به‌روزرسانی می‌شود
npm install zone.js@~0.16.0
# (یا نسخه مورد نیاز Angular 21)
```

#### 3.4 بروزرسانی Angular Material
```bash
# Angular Material باید همیشه با Angular Core هم‌نسخه باشد
ng update @angular/material@21
```

---

### مرحله 4: بروزرسانی پکیج‌های شخصی‌سازی شده

#### 4.1 بررسی و بروزرسانی ntk-cms-api
```bash
# بررسی آخرین نسخه
npm view ntk-cms-api versions --json

# بروزرسانی (در صورت وجود نسخه سازگار با Angular 21)
npm install ntk-cms-api@^21.0.0
```

#### 4.2 بررسی و بروزرسانی پکیج‌های ngx-ntk-*
```bash
# بررسی هر کدام از پکیج‌ها
npm view ngx-ntk-smart-module versions --json
npm view ngx-ntk-cron-editor versions --json
npm view ngx-ntk-file-picker versions --json
npm view ngx-ntk-icon-picker versions --json

# بروزرسانی در صورت وجود نسخه سازگار
npm install ngx-ntk-smart-module@^21.0.0
npm install ngx-ntk-cron-editor@^21.0.0
npm install ngx-ntk-file-picker@^21.0.0
npm install ngx-ntk-icon-picker@^21.0.0
```

#### 4.3 بررسی و بروزرسانی ntk-cms-filemanager
```bash
npm view ntk-cms-filemanager versions --json
npm install ntk-cms-filemanager@^21.0.0
```

---

### مرحله 5: بروزرسانی پکیج‌های شخص ثالث

#### 5.1 بروزرسانی @ng-bootstrap/ng-bootstrap
```bash
# بررسی نسخه سازگار با Angular 21
npm view @ng-bootstrap/ng-bootstrap versions --json
npm install @ng-bootstrap/ng-bootstrap@^20.0.0
```

#### 5.2 بروزرسانی @ngx-translate
```bash
# بررسی نسخه سازگار
npm install @ngx-translate/core@^17.0.0
npm install @ngx-translate/http-loader@^17.0.0
```

#### 5.3 بروزرسانی ngx-toastr
```bash
# بررسی نسخه سازگار
npm install ngx-toastr@^20.0.0
```

#### 5.4 سایر پکیج‌ها
```bash
# بررسی تمام پکیج‌های دیگر
npm outdated

# بروزرسانی تک‌تک
npm install @ali-hm/angular-tree-component@^21.0.0
npm install @angular/fire@^21.0.0
npm install @bluehalo/ngx-leaflet@^21.0.0
npm install ng-apexcharts@^1.17.0
# ... و سایرین
```

---

### مرحله 6: بررسی و اصلاح Breaking Changes

#### 6.1 بررسی فایل‌های tsconfig.json
- بررسی تنظیمات compiler options
- بررسی angularCompilerOptions
- اطمینان از سازگاری با Angular 21

#### 6.2 بررسی فایل angular.json
- بررسی builder configuration
- بررسی build options
- بررسی assets و styles configuration

#### 6.3 Migration به Standalone Components (در صورت نیاز)
اگر Angular 21 نیاز به standalone components داشته باشد:

```typescript
// قبل (NgModule)
@NgModule({
  declarations: [MyComponent],
  imports: [CommonModule]
})
export class MyModule {}

// بعد (Standalone)
@Component({
  standalone: true,
  imports: [CommonModule]
})
export class MyComponent {}
```

#### 6.4 بررسی و اصلاح استفاده از Deprecated APIs
- بررسی تمام استفاده‌های deprecated
- جایگزینی با API های جدید

---

### مرحله 7: نصب وابستگی‌ها و تست اولیه

#### 7.1 حذف node_modules و package-lock.json
```bash
# حذف node_modules و package-lock.json
rm -rf node_modules package-lock.json

# نصب مجدد
npm install
```

#### 7.2 بررسی خطاهای کامپایل
```bash
# اجرای build
npm run build

# بررسی خطاها
# اصلاح خطاهای TypeScript
# اصلاح خطاهای Angular
```

#### 7.3 بررسی خطاهای Linting
```bash
# اجرای lint
npm run lint

# اصلاح خطاها
npm run lint:fix
```

---

### مرحله 8: تست جامع

#### 8.1 تست واحد (Unit Tests)
```bash
# اجرای تست‌ها
npm test

# بررسی و اصلاح تست‌های شکسته شده
```

#### 8.2 تست اجرای برنامه
```bash
# اجرای برنامه در حالت development
npm start

# بررسی تمام صفحات و ماژول‌ها
# بررسی عملکرد کلی برنامه
```

#### 8.3 تست Build Production
```bash
# اجرای build production
npm run build-prod

# بررسی فایل‌های build شده
# بررسی اندازه bundle
```

---

### مرحله 9: بروزرسانی مستندات

#### 9.1 بروزرسانی README.md
- بروزرسانی نسخه Angular
- بروزرسانی نسخه Node.js (در صورت نیاز)
- بروزرسانی دستورات نصب

#### 9.2 بروزرسانی readmehistory.md
```markdown
## 2025-01-13 (انتقال به Angular 21)

### تغییرات اعمال شده:
- بروزرسانی Angular Core از 20.1.0 به 21.0.0
- بروزرسانی تمام وابستگی‌های Angular
- بروزرسانی TypeScript به نسخه جدیدتر
- اصلاح breaking changes
- تست جامع و بررسی عملکرد

### فایل‌های تغییر یافته:
- package.json
- angular.json
- tsconfig.json
- تمام فایل‌های .ts (در صورت نیاز)
```

---

## 🔧 کارهای مورد نیاز بر اساس تحلیل پروژه

### ✅ کارهای ضروری

1. **بررسی انتشار Angular 21**
   - ⚠️ **اولویت بالا**: بررسی اینکه Angular 21 منتشر شده یا خیر
   - در صورت عدم انتشار، منتظر بمانید یا به آخرین نسخه Angular 20.x بروزرسانی کنید

2. **بررسی سازگاری پکیج‌های شخصی‌سازی شده**
   - بررسی و بروزرسانی `ntk-cms-api`
   - بررسی و بروزرسانی `ntk-cms-filemanager`
   - بررسی و بروزرسانی تمام پکیج‌های `ngx-ntk-*`

3. **Migration به Standalone Components (احتمالی)**
   - ⚠️ **کار بزرگ**: اگر Angular 21 نیاز به standalone داشته باشد
   - تبدیل تمام NgModule ها به standalone
   - این کار می‌تواند زمان‌بر باشد

4. **بروزرسانی TypeScript**
   - بررسی نسخه TypeScript مورد نیاز Angular 21
   - بروزرسانی در صورت نیاز

5. **بروزرسانی RxJS**
   - بررسی نسخه RxJS مورد نیاز
   - بروزرسانی در صورت نیاز

### ⚠️ کارهای اختیاری (اما توصیه می‌شود)

1. **بروزرسانی Angular ESLint**
   ```bash
   ng update @angular-eslint/schematics@21
   ```

2. **بروزرسانی Prettier (در صورت نیاز)**
   ```bash
   npm install --save-dev prettier@latest
   ```

3. **بهینه‌سازی Build Configuration**
   - بررسی و بهبود تنظیمات build
   - بررسی bundle size

4. **بررسی Performance**
   - بررسی عملکرد بعد از بروزرسانی
   - بهینه‌سازی در صورت نیاز

---

## 📊 تخمین زمان و ریسک

### تخمین زمان

| مرحله | زمان تخمینی | اولویت |
|------|-----------|--------|
| بررسی و آماده‌سازی | 2-4 ساعت | بالا |
| بروزرسانی Angular Core | 1-2 ساعت | بالا |
| بروزرسانی وابستگی‌ها | 2-4 ساعت | بالا |
| Migration Breaking Changes | 4-8 ساعت | بالا |
| Migration به Standalone (اگر نیاز باشد) | 16-40 ساعت | متوسط |
| تست و Debug | 8-16 ساعت | بالا |
| مستندسازی | 2-4 ساعت | پایین |
| **مجموع** | **35-78 ساعت** | - |

### سطح ریسک

- **ریسک بالا**:
  - Migration به Standalone Components (در صورت نیاز)
  - Breaking changes در پکیج‌های شخصی‌سازی شده

- **ریسک متوسط**:
  - Breaking changes در Angular Core
  - مشکلات سازگاری با پکیج‌های شخص ثالث

- **ریسک پایین**:
  - بروزرسانی TypeScript
  - بروزرسانی مستندات

---

## ✅ چک‌لیست نهایی

- [ ] بررسی انتشار Angular 21
- [ ] ایجاد branch جدید
- [ ] Backup کامل پروژه
- [ ] بروزرسانی Angular CLI
- [ ] اجرای `ng update`
- [ ] بروزرسانی package.json
- [ ] بررسی و بروزرسانی ntk-cms-api
- [ ] بررسی و بروزرسانی پکیج‌های ngx-ntk-*
- [ ] بروزرسانی پکیج‌های شخص ثالث
- [ ] اصلاح breaking changes
- [ ] Migration به Standalone (در صورت نیاز)
- [ ] نصب مجدد وابستگی‌ها
- [ ] رفع خطاهای کامپایل
- [ ] رفع خطاهای linting
- [ ] اجرای تست‌های واحد
- [ ] تست اجرای برنامه
- [ ] تست build production
- [ ] بروزرسانی مستندات
- [ ] بررسی performance
- [ ] Code review
- [ ] Merge به branch اصلی

---

## 📝 یادداشت‌های مهم

1. **قبل از شروع**: حتماً از پروژه backup کامل بگیرید
2. **در طول کار**: به صورت incremental تغییرات را commit کنید
3. **بعد از اتمام**: تست جامع انجام دهید
4. **قبل از merge**: Code review انجام دهید

---

## 🔗 منابع مفید

- [Angular Update Guide](https://angular.dev/update-guide)
- [Angular Release Schedule](https://angular.dev/guide/releases)
- [Angular Breaking Changes](https://angular.dev/guide/releases)
- [TypeScript Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes.html)

---

**تهیه شده توسط:** AI Assistant
**تاریخ:** 2025-01-13
**نسخه:** 1.0
