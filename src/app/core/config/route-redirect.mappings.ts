/**
 * فایل mapping برای route های قدیم به جدید
 * این فایل شامل تمام mapping های route های قدیم به جدید است
 * می‌توانید mapping های جدید را اینجا اضافه کنید
 */

export interface RouteMapping {
  oldRoute: string;
  newRoute: string;
  description?: string;
}

/**
 * لیست mapping های route های قدیم به جدید
 * برای اضافه کردن mapping جدید، یک object جدید به این آرایه اضافه کنید
 *
 * مثال:
 * {
 *   oldRoute: '/estate/main/property',
 *   newRoute: '/estate/data/property',
 *   description: 'Redirect property from main to data module'
 * }
 */
export const ROUTE_REDIRECT_MAPPINGS: RouteMapping[] = [
  /**
   * Estate Module Route Redirects
   * این mapping ها برای redirect کردن route های قدیم estate به route های جدید است
   * بر اساس تغییرات انجام شده در ساختار ماژول estate
   *
   * تغییرات انجام شده (از readmehistory.md):
   * - estate/property → estate/data/property (یا estate/main/property)
   * - estate/customer-order → estate/log/customer-order (یا estate/action/customer-order)
   * - estate/property-history → estate/log/property-history
   */

  // Redirect route های قدیم property از root به data
  {
    oldRoute: "/estate/property",
    newRoute: "/estate/data/property",
    description: "Redirect property from root to data module",
  },
  {
    oldRoute: "/estate/property/*",
    newRoute: "/estate/data/property/*",
    description: "Redirect all property sub-routes from root to data module",
  },

  // Redirect route های قدیم property از main به data (اگر از main به data منتقل شده باشد)
  {
    oldRoute: "/estate/main/property",
    newRoute: "/estate/data/property",
    description: "Redirect property from main to data module",
  },
  {
    oldRoute: "/estate/main/property/*",
    newRoute: "/estate/data/property/*",
    description: "Redirect all property sub-routes from main to data module",
  },

  // Redirect route های قدیم customer-order
  {
    oldRoute: "/estate/customer-order",
    newRoute: "/estate/log/customer-order",
    description: "Redirect customer-order to log module",
  },
  {
    oldRoute: "/estate/customer-order/*",
    newRoute: "/estate/log/customer-order/*",
    description: "Redirect all customer-order sub-routes to log module",
  },

  // Redirect route های قدیم property-history
  {
    oldRoute: "/estate/property-history",
    newRoute: "/estate/log/property-history",
    description: "Redirect property-history to log module",
  },
  {
    oldRoute: "/estate/property-history/*",
    newRoute: "/estate/log/property-history/*",
    description: "Redirect all property-history sub-routes to log module",
  },

  // Redirect route های قدیم property-company, property-project, property-supplier از main به data
  {
    oldRoute: "/estate/main/property-company",
    newRoute: "/estate/data/property-company",
    description: "Redirect property-company from main to data module",
  },
  {
    oldRoute: "/estate/main/property-company/*",
    newRoute: "/estate/data/property-company/*",
    description:
      "Redirect all property-company sub-routes from main to data module",
  },
  {
    oldRoute: "/estate/main/property-project",
    newRoute: "/estate/data/property-project",
    description: "Redirect property-project from main to data module",
  },
  {
    oldRoute: "/estate/main/property-project/*",
    newRoute: "/estate/data/property-project/*",
    description:
      "Redirect all property-project sub-routes from main to data module",
  },
  {
    oldRoute: "/estate/main/property-supplier",
    newRoute: "/estate/data/property-supplier",
    description: "Redirect property-supplier from main to data module",
  },
  {
    oldRoute: "/estate/main/property-supplier/*",
    newRoute: "/estate/data/property-supplier/*",
    description:
      "Redirect all property-supplier sub-routes from main to data module",
  },
  {
    oldRoute: "/estate/main/property-ads",
    newRoute: "/estate/data/property-ads",
    description: "Redirect property-ads from main to data module",
  },
  {
    oldRoute: "/estate/main/property-ads/*",
    newRoute: "/estate/data/property-ads/*",
    description:
      "Redirect all property-ads sub-routes from main to data module",
  },

  // Redirect route های قدیم از root به data (برای property-company, property-project, property-supplier, property-ads)
  {
    oldRoute: "/estate/property-company",
    newRoute: "/estate/data/property-company",
    description: "Redirect property-company from root to data module",
  },
  {
    oldRoute: "/estate/property-company/*",
    newRoute: "/estate/data/property-company/*",
    description:
      "Redirect all property-company sub-routes from root to data module",
  },
  {
    oldRoute: "/estate/property-project",
    newRoute: "/estate/data/property-project",
    description: "Redirect property-project from root to data module",
  },
  {
    oldRoute: "/estate/property-project/*",
    newRoute: "/estate/data/property-project/*",
    description:
      "Redirect all property-project sub-routes from root to data module",
  },
  {
    oldRoute: "/estate/property-supplier",
    newRoute: "/estate/data/property-supplier",
    description: "Redirect property-supplier from root to data module",
  },
  {
    oldRoute: "/estate/property-supplier/*",
    newRoute: "/estate/data/property-supplier/*",
    description:
      "Redirect all property-supplier sub-routes from root to data module",
  },
  {
    oldRoute: "/estate/property-ads",
    newRoute: "/estate/data/property-ads",
    description: "Redirect property-ads from root to data module",
  },
  {
    oldRoute: "/estate/property-ads/*",
    newRoute: "/estate/data/property-ads/*",
    description:
      "Redirect all property-ads sub-routes from root to data module",
  },
];

/**
 * تبدیل mapping ها به object برای استفاده در RouteRedirectService
 */
export function getRouteMappingsAsObject(): Record<string, string> {
  const mappings: Record<string, string> = {};
  ROUTE_REDIRECT_MAPPINGS.forEach((mapping) => {
    mappings[mapping.oldRoute] = mapping.newRoute;
  });
  return mappings;
}
