/**
 * فایل مثال برای route redirect mappings
 * این فایل نشان می‌دهد که چگونه route های قدیم به جدید را mapping کنید
 *
 * برای استفاده:
 * 1. این فایل را کپی کنید و نام آن را به route-redirect.mappings.ts تغییر دهید
 * 2. mapping های خود را اضافه کنید
 */

import { RouteMapping } from "./route-redirect.mappings";

/**
 * مثال mapping ها
 */
export const EXAMPLE_ROUTE_MAPPINGS: RouteMapping[] = [
  // مثال 1: Redirect ساده
  {
    oldRoute: "/estate/main/property",
    newRoute: "/estate/data/property",
    description: "Redirect property from main to data module",
  },

  // مثال 2: Redirect با wildcard (همه زیرمسیرها)
  {
    oldRoute: "/estate/main/property/*",
    newRoute: "/estate/data/property/*",
    description: "Redirect all property sub-routes from main to data",
  },

  // مثال 3: Redirect با حفظ query parameters
  // Query parameters به صورت خودکار حفظ می‌شوند
  {
    oldRoute: "/old/search",
    newRoute: "/new/search",
    description: "Redirect search with query params",
  },

  // مثال 4: Redirect با wildcard در ابتدا
  {
    oldRoute: "/old/*/edit",
    newRoute: "/new/*/edit",
    description: "Redirect edit routes with dynamic middle part",
  },
];

/**
 * نحوه استفاده:
 *
 * 1. در route-redirect.mappings.ts:
 *    export const ROUTE_REDIRECT_MAPPINGS: RouteMapping[] = [
 *      {
 *         oldRoute: '/your/old/route',
 *         newRoute: '/your/new/route',
 *         description: 'توضیحات'
 *      }
 *    ];
 *
 * 2. یا به صورت programmatic در RouteRedirectService:
 *    this.routeRedirectService.addMapping('/old/route', '/new/route');
 *
 * 3. یا به صورت bulk:
 *    this.routeRedirectService.addMappings({
 *       '/old1': '/new1',
 *       '/old2': '/new2'
 *    });
 */
