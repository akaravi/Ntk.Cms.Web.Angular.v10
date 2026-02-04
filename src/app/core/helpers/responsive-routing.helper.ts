import { Routes } from "@angular/router";

export type CanMatchGuardType = new (...args: any[]) => unknown;

/**
 * Helper function to get responsive routes based on current window width
 * This function is called at module initialization, so it evaluates window width once.
 * For true dynamic behavior (responsive to window resize), use ResponsiveRouteGuard instead.
 *
 * @param routesMobile - Mobile routes (for screen width < 1000px)
 * @param routesNormal - Normal/Desktop routes (for screen width >= 1000px)
 * @returns Routes array based on current window width
 */
export function addCanMatchGuard(routes: Routes, guard: CanMatchGuardType): Routes {
  return routes.map((r) => ({
    ...r,
    canMatch: [...(r.canMatch ?? []), guard as any],
  }));
}

/**
 * Provide both mobile and normal route variants at the same time using `canMatch`,
 * so Angular evaluates the correct variant on every navigation (not only once at module init).
 *
 * Important: This becomes truly dynamic when the app triggers a re-navigation on breakpoint changes
 * (we do that in `src/app/app.ts` on window resize).
 */
export function withResponsiveRouteVariants(
  routesMobile: Routes,
  routesNormal: Routes,
  mobileGuard: CanMatchGuardType,
  desktopGuard: CanMatchGuardType,
): Routes {
  return [
    ...addCanMatchGuard(routesMobile, mobileGuard),
    ...addCanMatchGuard(routesNormal, desktopGuard),
  ];
}

/**
 * Check if current window width indicates mobile view
 * @returns true if window width < 1000px
 */
export function isMobileView(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.innerWidth < 1000;
}
