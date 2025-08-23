# Dynamic Server Configuration

این سیستم امکان تغییر تنظیمات سرور را بعد از کامپایل فراهم می‌کند.

## نحوه استفاده

### 1. فایل تنظیمات سرور

تنظیمات سرور در فایل `src/assets/config/server-config.json` قرار دارد و قابل تغییر است:

```json
{
  "configApiRetry": 1,
  "configApiServerPath": "https://apicms.ir/api/v3/",
  "configHubServerPath": "https://apicms.ir/hub/",
  "configFileServerPath": "https://apifile.ir/api/v2/",
  "configQDocServerPath": "https://qdoc.ir/api/chat",
  "configCompanyWebSite": "https://ntk.ir",
  "modules": [""]
}
```

### 2. تغییر تنظیمات در سرور

بعد از کامپایل، می‌توانید فایل `dist/assets/config/server-config.json` را در سرور تغییر دهید.

### 3. بارگذاری مجدد تنظیمات

برای بارگذاری مجدد تنظیمات در زمان اجرا:

```typescript
import { DynamicEnvironmentService } from './core/services/dynamic-environment.service';

constructor(private envService: DynamicEnvironmentService) {}

reloadConfig() {
  this.envService.reloadServerConfig().subscribe(config => {
    console.log('Server config reloaded:', config);
  });
}
```

## مزایا

- تغییر تنظیمات سرور بدون نیاز به کامپایل مجدد
- پشتیبانی از تنظیمات پیش‌فرض در صورت عدم دسترسی به فایل JSON
- سازگاری کامل با کد موجود
