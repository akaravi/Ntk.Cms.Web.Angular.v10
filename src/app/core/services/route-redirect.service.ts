import { Injectable } from "@angular/core";
import { getRouteMappingsAsObject } from "../config/route-redirect.mappings";

/**
 * Service برای نگهداری و مدیریت mapping route های قدیم به جدید
 * این service به صورت سراسری استفاده می‌شود و می‌تواند route های قدیم را به جدید تبدیل کند
 */
@Injectable({
  providedIn: "root",
})
export class RouteRedirectService {
  /**
   * Mapping table برای route های قدیم به جدید
   * کلید: route قدیم (می‌تواند با wildcard باشد)
   * مقدار: route جدید
   *
   * مثال:
   * - '/old/path' => '/new/path'
   * - '/estate/main/*' => '/estate/data/*' (برای تمام زیرمسیرها)
   */
  private routeMappings: Map<string, string> = new Map();

  constructor() {
    this.initializeMappings();
  }

  /**
   * مقداردهی اولیه mapping ها
   * می‌توانید route های قدیم به جدید را اینجا اضافه کنید
   */
  private initializeMappings(): void {
    // لود کردن mapping ها از فایل config
    const mappings = getRouteMappingsAsObject();
    this.addMappings(mappings);

    // همچنین می‌توانید mapping های اضافی را اینجا اضافه کنید
    // this.addMapping('/old/route', '/new/route');
    // this.addMapping('/estate/main/property', '/estate/data/property');
  }

  /**
   * اضافه کردن یک mapping جدید
   * @param oldRoute - route قدیم
   * @param newRoute - route جدید
   */
  addMapping(oldRoute: string, newRoute: string): void {
    this.routeMappings.set(oldRoute, newRoute);
  }

  /**
   * اضافه کردن چندین mapping به صورت bulk
   * @param mappings - object با کلید route قدیم و مقدار route جدید
   */
  addMappings(mappings: Record<string, string>): void {
    Object.entries(mappings).forEach(([oldRoute, newRoute]) => {
      this.addMapping(oldRoute, newRoute);
    });
  }

  /**
   * بررسی می‌کند که آیا route داده شده نیاز به redirect دارد یا نه
   * @param route - route برای بررسی
   * @returns route جدید اگر mapping وجود داشته باشد، در غیر این صورت null
   */
  getRedirectRoute(route: string): string | null {
    // بررسی exact match
    if (this.routeMappings.has(route)) {
      return this.routeMappings.get(route) || null;
    }

    // بررسی wildcard patterns
    for (const [oldPattern, newRoute] of this.routeMappings.entries()) {
      if (this.matchesPattern(route, oldPattern)) {
        // اگر pattern شامل wildcard باشد، باید route جدید را با بخش باقی‌مانده ترکیب کنیم
        return this.replacePattern(route, oldPattern, newRoute);
      }
    }

    return null;
  }

  /**
   * بررسی می‌کند که route با pattern مطابقت دارد یا نه
   * @param route - route برای بررسی
   * @param pattern - pattern (ممکن است شامل * باشد)
   * @returns true اگر مطابقت داشته باشد
   */
  private matchesPattern(route: string, pattern: string): boolean {
    // تبدیل pattern به regex
    const regexPattern = pattern
      .replace(/\*/g, ".*")
      .replace(/\//g, "\\/");
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(route);
  }

  /**
   * جایگزین کردن pattern با route جدید
   * @param route - route کامل
   * @param oldPattern - pattern قدیم
   * @param newRoute - route جدید
   * @returns route جدید با جایگزینی بخش‌های wildcard
   */
  private replacePattern(
    route: string,
    oldPattern: string,
    newRoute: string,
  ): string {
    // اگر pattern شامل wildcard نباشد، فقط route جدید را برگردان
    if (!oldPattern.includes("*")) {
      return newRoute;
    }

    // استخراج بخش‌های wildcard از route
    const oldParts = oldPattern.split("*");
    const routeParts = route.split("/");
    const newParts = newRoute.split("*");

    // اگر route جدید هم wildcard دارد، باید بخش باقی‌مانده را اضافه کنیم
    if (newRoute.includes("*")) {
      // پیدا کردن بخش باقی‌مانده از route قدیم
      const remainingPart = this.extractRemainingPart(route, oldPattern);
      return newRoute.replace("*", remainingPart);
    }

    return newRoute;
  }

  /**
   * استخراج بخش باقی‌مانده از route بر اساس pattern
   */
  private extractRemainingPart(route: string, pattern: string): string {
    const patternParts = pattern.split("*");
    if (patternParts.length === 2) {
      const prefix = patternParts[0];
      const suffix = patternParts[1];
      if (route.startsWith(prefix) && route.endsWith(suffix)) {
        return route.slice(prefix.length, -suffix.length || undefined);
      }
    }
    return "";
  }

  /**
   * دریافت تمام mapping ها (برای debugging)
   */
  getAllMappings(): Map<string, string> {
    return new Map(this.routeMappings);
  }

  /**
   * حذف یک mapping
   */
  removeMapping(oldRoute: string): boolean {
    return this.routeMappings.delete(oldRoute);
  }

  /**
   * پاک کردن تمام mapping ها
   */
  clearMappings(): void {
    this.routeMappings.clear();
  }
}
