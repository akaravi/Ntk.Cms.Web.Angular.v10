# Plan: کامپوننت cms-link-to – نمایش آیکون‌ها و بهینه‌سازی ظاهر

## Part 1: رفع عدم نمایش آیکون‌ها و استانداردسازی ظاهر

**تاریخ:** 2026-03-08
**وضعیت:** ✅ تکمیل شده

### مشکل

- آیکون‌های اشتراک‌گذاری (واتساپ، تلگرام، لینکدین، فیسبوک، توییتر، کپی) با کلاس‌های `flaticon-*` نمایش داده نمی‌شدند؛ فونت/CSS مربوط به Flaticon در پروژه لود نمی‌شود.
- ظاهر کامپوننت نیاز به بهینه‌سازی و هماهنگی با استانداردهای جهانی (دسترسی‌پذیری، موبایل/دسکتاپ، تم شب/روز) داشت.

### اقدامات انجام‌شده

1. **جایگزینی آیکون‌ها با Font Awesome (موجود در پروژه)**
   - `flaticon-whatsapp` → `fa-brands fa-whatsapp`
   - `flaticon2-telegram-logo` → `fa-brands fa-telegram`
   - `flaticon-linkedin-logo` → `fa-brands fa-linkedin`
   - `flaticon-facebook-letter-logo` → `fa-brands fa-facebook-f`
   - `flaticon-twitter-logo` → `fa-brands fa-twitter`
   - `flaticon2-copy` → `fa-solid fa-copy`

2. **دسترسی‌پذیری (A11y)**
   - دکمه بستن: از `<a>` به `<button type="button">` با `aria-label="ACTION.CLOSE"`.
   - دکمه کپی: از `<span>` به `<button type="button">` با `aria-label="ACTION.Copy"`.
   - لینک‌های اشتراک: `rel="noopener noreferrer"` و `aria-label` برای هر شبکه (TITLE.Share_WhatsApp و غیره).
   - آیکون‌ها: `aria-hidden="true"`.
   - گروه دکمه‌های اشتراک: `role="group"` و `aria-label="TITLE.Share"`.

3. **ساختار و ظاهر HTML**
   - اضافه شدن کلاس ریشه `cms-link-to` و کلاس‌های BEM برای بخش‌ها (`cms-link-to__tab-padding`, `cms-link-to__share-buttons`, `cms-link-to__qrcode-img`, و غیره).
   - حذف استایل‌های inline و انتقال به SCSS.
   - گرید واکنش‌گرا: `col-12` برای موبایل و `col-md-6` برای دسکتاپ.
   - عنوان «اشتراک‌گذاری» با کلید ترجمه `TITLE.Share`.

4. **SCSS**
   - استایل‌های جدید در `cms-link-to.component.scss`: حداقل اندازه لمس 44×44 px برای دکمه‌ها (WCAG)، رنگ برند برای هر شبکه اجتماعی، حالت‌های hover/focus-visible، پشتیبانی تم شب (`.theme-dark`).
   - باکس پیام با کلاس‌های معنادار و اندازه‌های مینیمم به‌جای ارتفاع ثابت با inline style.
   - حفظ سازگاری با کلاس‌های قبلی (`message-box`, `message-box-button`) تا استفاده در سایر کامپوننت‌ها خراب نشود.

5. **چندزبانه**
   - اضافه شدن کلیدهای `TITLE.Share`, `TITLE.Share_WhatsApp`, `TITLE.Share_Telegram`, `TITLE.Share_LinkedIn`, `TITLE.Share_Facebook`, `TITLE.Share_Twitter` به فایل‌های i18n (fa, en, ar, de, es, fr, ja, tr, zh).

### فایل‌های تغییر یافته

- `src/app/shared/cms-link-to/cms-link-to.component.html`
- `src/app/shared/cms-link-to/cms-link-to.component.scss`
- `src/assets/i18n/fa.json`, `en.json`, `ar.json`, `de.json`, `es.json`, `fr.json`, `ja.json`, `tr.json`, `zh.json`

### Result 1

- آیکون‌های اشتراک و کپی با Font Awesome به درستی نمایش داده می‌شوند.
- ظاهر با استانداردهای دسترسی‌پذیری، لمس 44px و تم شب/روز هماهنگ شده است.
- در دستورات بعدی، هر تغییری در cms-link-to باید این ساختار (BEM، Font Awesome، کلیدهای i18n جدید) را در نظر بگیرد.
