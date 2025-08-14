# Development Setup Guide

## تنظیمات خودکار حذف Import های بدون استفاده

این پروژه با تنظیمات خودکار برای حذف import های بدون استفاده در زمان ذخیره کردن فایل‌ها پیکربندی شده است.

### فایل‌های تنظیمات ایجاد شده:

1. **`.vscode/settings.json`** - تنظیمات VS Code
2. **`.eslintrc.json`** - تنظیمات ESLint
3. **`.prettierrc`** - تنظیمات Prettier
4. **`.editorconfig`** - تنظیمات EditorConfig
5. **`tsconfig.json`** - تنظیمات TypeScript (به‌روزرسانی شده)

### ویژگی‌های فعال شده:

#### در زمان ذخیره (Ctrl+S):

- ✅ حذف خودکار import های بدون استفاده
- ✅ مرتب‌سازی import ها
- ✅ فرمت‌بندی خودکار کد
- ✅ حذف فاصله‌های اضافی
- ✅ اضافه کردن خط جدید در انتهای فایل

#### قوانین ESLint:

- ✅ شناسایی متغیرهای استفاده نشده
- ✅ شناسایی import های استفاده نشده
- ✅ قوانین Angular
- ✅ قوانین TypeScript

### دستورات مفید:

```bash
# فرمت‌بندی همه فایل‌ها
npm run format

# بررسی فرمت‌بندی
npm run format:check

# اجرای ESLint
npm run lint

# رفع خودکار خطاهای ESLint
npm run lint:fix

# بررسی کامل با ESLint
npm run lint:check
```

### نکات مهم:

1. **VS Code Extensions مورد نیاز:**
   - ESLint
   - Prettier - Code formatter
   - TypeScript Importer

2. **تنظیمات TypeScript:**
   - `noUnusedLocals: true` - شناسایی متغیرهای محلی استفاده نشده
   - `noUnusedParameters: true` - شناسایی پارامترهای استفاده نشده

3. **تنظیمات VS Code:**
   - `source.removeUnusedImports: "explicit"` - حذف import های بدون استفاده
   - `source.organizeImports: "explicit"` - مرتب‌سازی import ها
   - `source.fixAll: "explicit"` - رفع همه خطاها

### نحوه کار:

هر بار که فایل TypeScript را ذخیره می‌کنید (Ctrl+S):

1. ESLint خطاهای import های بدون استفاده را شناسایی می‌کند
2. VS Code به صورت خودکار این خطاها را رفع می‌کند
3. Prettier کد را فرمت‌بندی می‌کند
4. TypeScript import ها را مرتب می‌کند

### عیب‌یابی:

اگر تنظیمات کار نمی‌کند:

1. VS Code را restart کنید
2. Extensions را بررسی کنید
3. دستور `npm run lint` را اجرا کنید
4. فایل‌های `.vscode/settings.json` را بررسی کنید
