# برنامه جامع حذف وابستگی به CDN و استفاده از منابع محلی

## هدف
تبدیل پروژه به حالت کاملاً آفلاین با حذف تمام وابستگی‌های CDN (فونت‌ها، CSS، JavaScript) و استفاده از فایل‌های محلی.

## منابع CDN شناسایی شده

### 1. فونت‌های Google (Google Fonts)
- **Material Icons**: `https://fonts.googleapis.com/icon?family=Material+Icons`
- **Poppins**: `https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700`
- **Roboto**: `https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700`
- **Open Sans**: `https://fonts.googleapis.com/css?family=Open+Sans`

**مکان‌های استفاده:**
- `src/index.html` (خط 16)
- `src/styles.scss` (خطوط 2, 3, 6)

### 2. Google Tag Manager (GTM)
- **Script**: `https://www.googletagmanager.com/gtm.js?id=GTM-NQN4PNL4`
- **Noscript iframe**: `https://www.googletagmanager.com/ns.html?id=GTM-NQN4PNL4`

**مکان استفاده:**
- `src/index.html` (خطوط 26-40, 47-54)

### 3. Embedly CDN
- **URL**: `http://cdn.embedly.com/widgets/embed?url=...`
- **مکان استفاده:**
  - `src/assets/plugins/embedly/embedly.js`
  - `source/AppKit Mobile-main-3.4/appkit/plugins/embedly/embedly.js`

---

## مراحل اجرا

### مرحله 1: دانلود و نصب فونت‌های Google به صورت محلی

#### 1.1. دانلود Material Icons
```bash
# استفاده از Google Fonts Helper یا دانلود مستقیم
# فایل‌های مورد نیاز:
# - MaterialIcons-Regular.woff2
# - MaterialIcons-Regular.woff
# - MaterialIcons-Regular.ttf
```

**مسیر ذخیره‌سازی:**
```
src/assets/fonts/material-icons/
├── MaterialIcons-Regular.woff2
├── MaterialIcons-Regular.woff
├── MaterialIcons-Regular.ttf
└── material-icons.css
```

#### 1.2. دانلود فونت Poppins
**وزن‌های مورد نیاز:** 300, 400, 500, 600, 700

**مسیر ذخیره‌سازی:**
```
src/assets/fonts/poppins/
├── poppins-v20-latin-300.woff2
├── poppins-v20-latin-400.woff2
├── poppins-v20-latin-500.woff2
├── poppins-v20-latin-600.woff2
├── poppins-v20-latin-700.woff2
└── poppins.css
```

#### 1.3. دانلود فونت Roboto
**وزن‌های مورد نیاز:** 300, 400, 500, 600, 700

**مسیر ذخیره‌سازی:**
```
src/assets/fonts/roboto/
├── roboto-v30-latin-300.woff2
├── roboto-v30-latin-400.woff2
├── roboto-v30-latin-500.woff2
├── roboto-v30-latin-600.woff2
├── roboto-v30-latin-700.woff2
└── roboto.css
```

#### 1.4. دانلود فونت Open Sans
**مسیر ذخیره‌سازی:**
```
src/assets/fonts/open-sans/
├── open-sans-v34-latin-regular.woff2
├── open-sans-v34-latin-600.woff2
├── open-sans-v34-latin-700.woff2
└── open-sans.css
```

### مرحله 2: ایجاد فایل‌های CSS برای فونت‌ها

#### 2.1. ایجاد `src/assets/fonts/material-icons/material-icons.css`
```css
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('./MaterialIcons-Regular.woff2') format('woff2'),
       url('./MaterialIcons-Regular.woff') format('woff'),
       url('./MaterialIcons-Regular.ttf') format('truetype');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
```

#### 2.2. ایجاد فایل CSS برای Poppins
```css
/* poppins.css */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url('./poppins-v20-latin-300.woff2') format('woff2');
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('./poppins-v20-latin-400.woff2') format('woff2');
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('./poppins-v20-latin-500.woff2') format('woff2');
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('./poppins-v20-latin-600.woff2') format('woff2');
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('./poppins-v20-latin-700.woff2') format('woff2');
}
```

#### 2.3. ایجاد فایل CSS برای Roboto (مشابه Poppins)
#### 2.4. ایجاد فایل CSS برای Open Sans (مشابه Poppins)

### مرحله 3: به‌روزرسانی فایل‌های پروژه

#### 3.1. به‌روزرسانی `src/styles.scss`
**قبل:**
```scss
@import url("https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Roboto:300,400,500,600,700");
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
```

**بعد:**
```scss
/* Local Fonts */
@import "assets/fonts/poppins/poppins.css";
@import "assets/fonts/roboto/roboto.css";
@import "assets/fonts/open-sans/open-sans.css";
@import "assets/fonts/material-icons/material-icons.css";
```

#### 3.2. به‌روزرسانی `src/index.html`
**حذف:**
```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

**نکته:** فونت Material Icons از طریق `styles.scss` لود می‌شود، پس این خط را حذف کنید.

### مرحله 4: حذف یا غیرفعال کردن Google Tag Manager

#### 4.1. گزینه 1: حذف کامل (پیشنهادی برای محیط آفلاین)
حذف کامل کد GTM از `src/index.html`:
- حذف اسکریپت GTM (خطوط 25-41)
- حذف noscript iframe (خطوط 46-55)

#### 4.2. گزینه 2: غیرفعال کردن شرطی
اگر در آینده نیاز به فعال‌سازی باشد:
```html
<!-- Google Tag Manager - Disabled for offline mode -->
<!--
<script>
  (function (w, d, s, l, i) {
    ...
  })(window, document, "script", "dataLayer", "GTM-NQN4PNL4");
</script>
-->
```

### مرحله 5: بررسی Embedly Plugin

#### 5.1. بررسی استفاده از Embedly
- بررسی کنید که آیا این پلاگین در پروژه استفاده می‌شود یا خیر
- اگر استفاده نمی‌شود، می‌توانید آن را حذف کنید
- اگر استفاده می‌شود، باید راه‌حل جایگزین پیدا کنید یا آن را غیرفعال کنید

### مرحله 6: به‌روزرسانی `angular.json`

#### 6.1. اضافه کردن فایل‌های فونت به assets
```json
{
  "glob": "**/*",
  "input": "src/assets/fonts/",
  "output": "assets/fonts/"
}
```

### مرحله 7: تست و بررسی

#### 7.1. بررسی‌های لازم:
- [ ] تمام فونت‌ها به درستی لود می‌شوند
- [ ] Material Icons نمایش داده می‌شوند
- [ ] فونت‌های Poppins, Roboto, Open Sans کار می‌کنند
- [ ] هیچ درخواست CDN در Network Tab وجود ندارد
- [ ] پروژه در حالت آفلاین کار می‌کند

---

## ابزارهای مورد نیاز برای دانلود فونت‌ها

### روش 1: استفاده از Google Fonts Helper
1. مراجعه به: https://google-webfonts-helper.herokuapp.com/
2. انتخاب فونت مورد نظر
3. انتخاب وزن‌های مورد نیاز
4. دانلود فایل‌های woff2

### روش 2: استفاده از Google Fonts API (قبل از حذف)
```bash
# دانلود CSS و فایل‌های فونت
curl "https://fonts.googleapis.com/css2?family=Material+Icons" -o material-icons.css
curl "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700" -o poppins.css
curl "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700" -o roboto.css
curl "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700" -o open-sans.css
```

### روش 3: استفاده از npm packages
```bash
npm install --save-dev @fontsource/material-icons
npm install --save-dev @fontsource/poppins
npm install --save-dev @fontsource/roboto
npm install --save-dev @fontsource/open-sans
```

---

## ساختار نهایی پوشه فونت‌ها

```
src/assets/fonts/
├── material-icons/
│   ├── MaterialIcons-Regular.woff2
│   ├── MaterialIcons-Regular.woff
│   ├── MaterialIcons-Regular.ttf
│   └── material-icons.css
├── poppins/
│   ├── poppins-v20-latin-300.woff2
│   ├── poppins-v20-latin-400.woff2
│   ├── poppins-v20-latin-500.woff2
│   ├── poppins-v20-latin-600.woff2
│   ├── poppins-v20-latin-700.woff2
│   └── poppins.css
├── roboto/
│   ├── roboto-v30-latin-300.woff2
│   ├── roboto-v30-latin-400.woff2
│   ├── roboto-v30-latin-500.woff2
│   ├── roboto-v30-latin-600.woff2
│   ├── roboto-v30-latin-700.woff2
│   └── roboto.css
├── open-sans/
│   ├── open-sans-v34-latin-regular.woff2
│   ├── open-sans-v34-latin-600.woff2
│   ├── open-sans-v34-latin-700.woff2
│   └── open-sans.css
└── css/
    └── all.min.css (Font Awesome - موجود است)
```

---

## نکات مهم

1. **اندازه فایل‌ها:** فایل‌های فونت ممکن است حجم زیادی داشته باشند. در صورت نیاز، فقط وزن‌های استفاده شده را دانلود کنید.

2. **بهینه‌سازی:** استفاده از `font-display: swap` برای بهبود عملکرد.

3. **پشتیبانی مرورگر:** فایل‌های woff2 برای مرورگرهای مدرن و woff/ttf برای پشتیبانی از مرورگرهای قدیمی‌تر.

4. **Cache:** پس از تغییرات، cache مرورگر را پاک کنید.

5. **Build:** پس از تغییرات، پروژه را rebuild کنید:
   ```bash
   npm run build-prod
   ```

---

## چک‌لیست نهایی

- [ ] دانلود تمام فونت‌های مورد نیاز
- [ ] ایجاد فایل‌های CSS برای هر فونت
- [ ] به‌روزرسانی `src/styles.scss`
- [ ] به‌روزرسانی `src/index.html`
- [ ] حذف/غیرفعال کردن Google Tag Manager
- [ ] بررسی Embedly Plugin
- [ ] به‌روزرسانی `angular.json` (در صورت نیاز)
- [ ] تست در حالت آفلاین
- [ ] بررسی Network Tab برای اطمینان از عدم وجود درخواست CDN
- [ ] تست تمام صفحات و کامپوننت‌ها

---

## منابع مفید

- Google Fonts Helper: https://google-webfonts-helper.herokuapp.com/
- Material Icons: https://fonts.google.com/icons
- Fontsource (npm packages): https://fontsource.org/
