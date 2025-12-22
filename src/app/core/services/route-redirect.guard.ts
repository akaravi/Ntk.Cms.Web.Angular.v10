import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { RouteRedirectService } from "./route-redirect.service";

/**
 * Guard برای redirect کردن route های قدیم به جدید
 * این guard به صورت سراسری استفاده می‌شود و قبل از فعال شدن هر route
 * بررسی می‌کند که آیا route قدیم است یا نه و در صورت نیاز redirect می‌کند
 */
@Injectable({
  providedIn: "root",
})
export class RouteRedirectGuard implements CanActivate {
  constructor(
    private routeRedirectService: RouteRedirectService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const currentUrl = state.url;

    // اگر route جدید هم در mapping باشد، از redirect جلوگیری می‌کنیم تا loop نشود
    // این بررسی ساده است - اگر route جدید باشد، نباید redirect شود
    const redirectRoute = this.routeRedirectService.getRedirectRoute(currentUrl);

    if (redirectRoute && redirectRoute !== currentUrl) {
      // بررسی می‌کنیم که route جدید خودش نیاز به redirect نداشته باشد
      const newRouteRedirect = this.routeRedirectService.getRedirectRoute(redirectRoute);
      if (newRouteRedirect && newRouteRedirect !== redirectRoute) {
        // اگر route جدید هم نیاز به redirect دارد، از redirect جلوگیری می‌کنیم
        console.warn(
          `Route redirect loop detected: ${currentUrl} -> ${redirectRoute} -> ${newRouteRedirect}`,
        );
        return true; // اجازه می‌دهیم route فعلی فعال شود
      }

      // حفظ query parameters اگر وجود داشته باشند
      const queryParams = route.queryParams;
      const fragment = route.fragment;

      // Redirect به route جدید
      this.router.navigate([redirectRoute], {
        queryParams,
        fragment,
        replaceUrl: true, // جایگزین کردن route در history به جای اضافه کردن
      });

      return false; // جلوگیری از فعال شدن route قدیم
    }

    // اگر redirect لازم نباشد، اجازه فعال شدن route را بده
    return true;
  }
}
