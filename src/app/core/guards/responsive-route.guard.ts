import { Injectable } from "@angular/core";
import { CanMatch, Route, UrlSegment } from "@angular/router";
import { isMobileView } from "../helpers/responsive-routing.helper";

@Injectable({
  providedIn: "root",
})
export class MobileViewportCanMatchGuard implements CanMatch {
  canMatch(_route: Route, _segments: UrlSegment[]): boolean {
    return isMobileView();
  }
}

@Injectable({
  providedIn: "root",
})
export class DesktopViewportCanMatchGuard implements CanMatch {
  canMatch(_route: Route, _segments: UrlSegment[]): boolean {
    return !isMobileView();
  }
}
