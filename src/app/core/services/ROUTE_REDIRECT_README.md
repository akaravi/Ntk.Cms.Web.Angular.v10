# سیستم Route Redirect سراسری

این سیستم برای تبدیل خودکار route های قدیم به route های جدید استفاده می‌شود.

## ساختار

- **RouteRedirectService**: Service برای نگهداری و مدیریت mapping route های قدیم به جدید
- **RouteRedirectGuard**: Guard که قبل از فعال شدن هر route اجرا می‌شود و route های قدیم را به جدید redirect می‌کند
- **route-redirect.mappings.ts**: فایل configuration برای تعریف mapping های route

## نحوه استفاده

### 1. اضافه کردن mapping جدید

در فایل `src/app/core/config/route-redirect.mappings.ts`:

```typescript
export const ROUTE_REDIRECT_MAPPINGS: RouteMapping[] = [
  {
    oldRoute: '/estate/main/property',
    newRoute: '/estate/data/property',
    description: 'Redirect property from main to data module'
  },
  {
    oldRoute: '/estate/main/property/*',
    newRoute: '/estate/data/property/*',
    description: 'Redirect all property sub-routes'
  }
];
```

### 2. استفاده از wildcard

می‌توانید از `*` برای match کردن چند route استفاده کنید:

```typescript
{
  oldRoute: '/estate/main/*',
  newRoute: '/estate/data/*',
  description: 'Redirect all main routes to data routes'
}
```

### 3. استفاده programmatic

همچنین می‌توانید mapping ها را به صورت programmatic اضافه کنید:

```typescript
// در component یا service
constructor(private routeRedirectService: RouteRedirectService) {
  // اضافه کردن یک mapping
  this.routeRedirectService.addMapping('/old/route', '/new/route');

  // اضافه کردن چند mapping
  this.routeRedirectService.addMappings({
    '/old1': '/new1',
    '/old2': '/new2'
  });
}
```

## ویژگی‌ها

- ✅ حفظ query parameters
- ✅ حفظ fragment (hash)
- ✅ پشتیبانی از wildcard patterns
- ✅ جلوگیری از redirect loop
- ✅ جایگزین کردن route در history (replaceUrl)
- ✅ اجرای سراسری برای همه route ها

## مثال‌ها

### مثال 1: Redirect ساده
```typescript
{
  oldRoute: '/old/path',
  newRoute: '/new/path'
}
```

### مثال 2: Redirect با wildcard
```typescript
{
  oldRoute: '/old/*/edit',
  newRoute: '/new/*/edit'
}
```

### مثال 3: Redirect با حفظ query params
```typescript
// اگر کاربر به /old/search?q=test برود
// به /new/search?q=test redirect می‌شود
{
  oldRoute: '/old/search',
  newRoute: '/new/search'
}
```

## نکات مهم

1. Guard به صورت خودکار در همه route ها اجرا می‌شود (به `app.routes.ts` اضافه شده)
2. Query parameters و fragment به صورت خودکار حفظ می‌شوند
3. Route قدیم در history جایگزین می‌شود (replaceUrl: true)
4. سیستم از redirect loop جلوگیری می‌کند

## Debugging

برای مشاهده تمام mapping ها:

```typescript
const mappings = this.routeRedirectService.getAllMappings();
console.log(mappings);
```
