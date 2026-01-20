# راهنمای سریع - استفاده آفلاین

## ✅ وضعیت پروژه

پروژه اکنون **کاملاً آماده استفاده در محیط آفلاین** است. تمام منابع CDN حذف شده‌اند.

## 🚀 شروع سریع

### 1. نصب Dependencies
```bash
npm install
```

### 2. اجرای پروژه
```bash
npm start
```

### 3. Build برای Production
```bash
npm run build-prod
```

## 📁 ساختار فونت‌ها

تمام فونت‌ها در `src/assets/fonts/` ذخیره شده‌اند:

```
src/assets/fonts/
├── material-icons/     # Material Icons
├── poppins/            # Poppins (300, 400, 500, 600, 700)
├── roboto/             # Roboto (300, 400, 500, 600, 700)
└── open-sans/          # Open Sans (400, 600, 700)
```

## 🔍 بررسی عملکرد

### در Development:
1. مرورگر را باز کنید
2. DevTools را باز کنید (F12)
3. به تب **Network** بروید
4. صفحه را Refresh کنید
5. بررسی کنید که:
   - ✅ هیچ درخواست به `fonts.googleapis.com` وجود ندارد
   - ✅ هیچ درخواست به `googletagmanager.com` وجود ندارد
   - ✅ فونت‌ها از `/assets/fonts/` لود می‌شوند

### در Production:
1. پروژه را Build کنید: `npm run build-prod`
2. فایل‌های فونت باید در `dist/ntk-cms-web/browser/assets/fonts/` باشند
3. پروژه را در حالت آفلاین تست کنید

## ⚠️ نکات مهم

1. **Cache مرورگر:** پس از تغییرات، cache را پاک کنید (Ctrl+Shift+Delete)

2. **Font Awesome:** Font Awesome از قبل به صورت محلی نصب شده است

3. **OpenStreetMap:** اگر از نقشه استفاده می‌کنید، باید tile server محلی تنظیم کنید

4. **Embedly:** این plugin غیرفعال شده است. اگر نیاز دارید، باید راه‌حل جایگزین پیدا کنید

## 🐛 عیب‌یابی

### مشکل: فونت‌ها نمایش داده نمی‌شوند
**راه‌حل:**
1. بررسی کنید که فایل‌های فونت در `src/assets/fonts/` وجود دارند
2. Console مرورگر را برای خطاها بررسی کنید
3. Network Tab را برای درخواست‌های ناموفق بررسی کنید
4. Cache مرورگر را پاک کنید

### مشکل: Material Icons کار نمی‌کند
**راه‌حل:**
1. بررسی کنید که `material-icons.css` import شده است
2. بررسی کنید که فایل‌های woff/woff2 وجود دارند
3. بررسی کنید که مسیرها در CSS درست هستند

### مشکل: Build خطا می‌دهد
**راه‌حل:**
1. بررسی کنید که تمام فایل‌های فونت وجود دارند
2. بررسی کنید که مسیرهای import در `styles.scss` درست هستند
3. `node_modules` را حذف کنید و دوباره `npm install` کنید

## 📞 پشتیبانی

برای جزئیات بیشتر، فایل `OFFLINE_MIGRATION_SUMMARY.md` را مطالعه کنید.

---

**آخرین به‌روزرسانی:** 2026-01-20
