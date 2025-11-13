import { Injectable, OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { CmsTranslationService } from "../i18n";
import {
  THEME_MENU_PIN_LOCAL_STORAGE_KEY,
  themeFontSizeLSKey,
  themeHighLightLSKey,
  themeModeLSKey,
} from "../models/constModel";
import {
  ThemeStoreMenuModel,
  ThemeStoreModel,
} from "../models/themeStoreModel";
import { CmsStoreService } from "../reducers/cmsStore.service";
import { SET_Theme_STATE } from "../reducers/reducer.factory";
export type ThemeModeType = "dark" | "light" | "system";
export type ThemeDirectionType = "ltr" | "rtl";
export type ThemeFontChangeType =
  | "increase"
  | "decrease"
  | "default"
  | "memory";

//مستقیم ایمورت نکن
// از PublicHelper استفاده کن
@Injectable({
  providedIn: "root",
})
export class ThemeService implements OnDestroy {
  constructor(
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
    private cmsTranslationService: CmsTranslationService,
  ) {

  }
  private unsubscribe: Subscription[] = [];

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  public ctorAppMain(): void {
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.themeStore)
        .subscribe((value) => {
          if (environment.consoleLog)
            console.log("onInitAppComponentStateOnChange:ThemeService");
          if (value) {
            if (value.themeMode != this.themeStoreLast.themeMode)
              this.updateThemeModeType(value.themeMode);
            if (value.themeHighlight != this.themeStoreLast.themeHighlight)
              this.updateThemeHighLight(value.themeHighlight);
            if (value.themeDirection != this.themeStoreLast.themeDirection)
              this.updateThemeDirection(value.themeDirection);
            if (value.themeLanguage != this.themeStoreLast.themeLanguage)
              this.updateThemeLanguage(value.themeLanguage);
            this.themeStoreLast = { ...value };
          } else {
            this.themeStoreLast = new ThemeStoreModel();
          }
        }),
    );

    this.updateInnerSize();
  }
  public ngOnInitApp(): void {}
  public ngAfterViewInitApp() {
    this.updateThemeModeType(this.getThemeModeTypeFromLocalStorage());
    this.updateThemeHighLight(this.getThemeHighLightFromLocalStorage());
    this.updateThemeDirection(this.getThemeDirectionFromLocalStorage());
    this.updateThemeLanguage(this.cmsTranslationService.getSelectedLanguage);
    this.updateThemeFontSize("memory");
    this.updateThemeMenuPin(this.getThemeMenuPinFromLocalStorage());
    setTimeout(() => {
      this.htmlSelectorAddEvent();
    }, 200);
  }
  onNavigationStartAppComponent(): void {
    //this.themeStore.dataMenu = ''
    setTimeout(() => {
      this.themeStore.dataMenu = "";
    }, 200);
  }
  onNavigationEndAppComponent(): void {
    setTimeout(() => {
      this.htmlSelectorAddEvent();
    }, 200);
  }

  htmlSelectorAddEvent(): void {
    //Activating Menus
    document.querySelectorAll(".menu").forEach((el) => {
      const node = el as HTMLElement;
      node.style.display = "block";
    });
    //Accordion Rotate
    const accordionBtn = document.querySelectorAll(".accordion-btn");
    if (accordionBtn?.length) {
      accordionBtn.forEach((el) =>
        el.addEventListener("click", (event) => {
          el.querySelector("i:last-child")?.classList.toggle("fa-rotate-180");
        }),
      );
    }
  }
  get themeStore(): ThemeStoreModel {
    return (
      this.cmsStoreService.getStateSnapshot()?.themeStore ??
      new ThemeStoreModel()
    );
  }
  themeStoreLast = new ThemeStoreModel();

  private getThemeModeTypeFromLocalStorage(): ThemeModeType {
    if (!localStorage) {
      return "light";
    }
    const data = localStorage.getItem(themeModeLSKey);
    if (!data) {
      return "light";
    }

    if (data === "light") {
      return "light";
    }

    if (data === "dark") {
      return "dark";
    }

    return "system";
  }
  private getThemeHighLightFromLocalStorage(): string {
    if (!localStorage) {
      return "";
    }
    const data = localStorage.getItem(themeHighLightLSKey);
    if (!data) {
      return "";
    }
    return data;
  }

  private getThemeFontSizeFromLocalStorage(): number {
    if (!localStorage) {
      return 0;
    }
    const data = localStorage.getItem(themeFontSizeLSKey);
    if (!data) {
      return 0;
    }
    return +data;
  }
  private getThemeMenuPinFromLocalStorage(): ThemeStoreMenuModel[] {
    if (!localStorage) {
      return [];
    }
    const data = localStorage.getItem(THEME_MENU_PIN_LOCAL_STORAGE_KEY);
    if (!data) {
      return [];
    }
    var ret: ThemeStoreMenuModel[] = [];
    ret = JSON.parse(data);
    if (Array.isArray(ret)) return ret;
    return [];
  }
  private getThemeDirectionFromLocalStorage(): ThemeDirectionType {
    const lang = this.cmsTranslationService.getSelectedLanguage;
    if (lang && (lang == "fa" || lang == "ar")) return "rtl";
    return "ltr";
  }

  public getSystemMode = (): ThemeModeType => {
    return window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light";
  };
  public updateThemeModeType(_mode: ThemeModeType) {
    if (!_mode) _mode = "system";
    const updatedMode = _mode === "system" ? this.getSystemMode() : _mode;
    if (localStorage) localStorage.setItem(themeModeLSKey, updatedMode);

    this.themeStore.themeMode = updatedMode;
    this.cmsStoreService.setState({
      type: SET_Theme_STATE,
      payload: this.themeStore,
    });
    setTimeout(() => {
      /**theme-dark */
      if (this.themeStore.themeMode == "dark") {
        document.documentElement
          .querySelectorAll(".theme-light")
          .forEach((element) => {
            element.classList.remove("theme-light");
            element.classList.add("theme-dark");
          });
      } else {
        document.documentElement
          .querySelectorAll(".theme-dark")
          .forEach((element) => {
            element.classList.remove("theme-dark");
            element.classList.add("theme-light");
          });
      }
      /**theme-dark */
    }, 10);
  }

  public updateThemeHighLight(colorStr: string) {
    if (!colorStr || colorStr.length == 0) colorStr = "blue";
    if (localStorage) localStorage.setItem(themeHighLightLSKey, colorStr);

    this.themeStore.themeHighlight = colorStr;
    this.cmsStoreService.setState({
      type: SET_Theme_STATE,
      payload: this.themeStore,
    });
    setTimeout(() => {
      /* HighLigh*/
      if (this.themeStore?.themeHighlight.length > 0) {
        var pageHighlight = document.querySelectorAll(".page-highlight");
        if (pageHighlight.length) {
          pageHighlight.forEach(function (e) {
            e.remove();
          });
        }
        var loadHighlight = document.createElement("link");
        loadHighlight.rel = "stylesheet";
        loadHighlight.className = "page-highlight";
        loadHighlight.type = "text/css";
        loadHighlight.href =
          "assets/styles/highlights/highlight_" +
          this.themeStore?.themeHighlight +
          ".css";
        document.getElementsByTagName("head")[0].appendChild(loadHighlight);
        //document.body.setAttribute('data-highlight', 'highlight-' + colorStr)
      }
      /* HighLigh*/
    }, 10);
  }
  setAttributeDir = false;
  public updateThemeDirection(model: ThemeDirectionType) {
    if (!model) model = "ltr";
    this.themeStore.themeDirection = model;
    this.cmsStoreService.setState({
      type: SET_Theme_STATE,
      payload: this.themeStore,
    });
    setTimeout(() => {
      /**theme-rtl */
      if (this.themeStore.themeDirection == "ltr") {
        document.documentElement
          .querySelectorAll(".theme-rtl")
          .forEach((element) => {
            element.classList.remove("theme-rtl");
            element.classList.add("theme-ltr");
          });
        if (this.setAttributeDir)
          document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
      } else {
        document.documentElement
          .querySelectorAll(".theme-ltr")
          .forEach((element) => {
            element.classList.remove("theme-ltr");
            element.classList.add("theme-rtl");
          });
        if (this.setAttributeDir)
          document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
      }
      /**theme-rtl */
    }, 100);
  }
  public updateThemeLanguage(language: string) {
    document.getElementsByTagName("html")[0].setAttribute("lang", language);
  }
  private fontSize: number = 16; // اندازه پیشفرض فونت
  getFontSize(): string {
    return `${this.fontSize}px`;
  }
  public updateThemeFontSize(model: ThemeFontChangeType) {
    var diffNum = 0;
    if (model == "increase") {
      diffNum = 1;
    } else if (model == "decrease") {
      diffNum = -1;
    } else if (model == "default") {
      diffNum = -1 * this.themeStore.themeFontSize;
    } else if ((model = "memory")) {
      diffNum = this.getThemeFontSizeFromLocalStorage();
    }
    this.themeStore.themeFontSize = this.themeStore.themeFontSize + diffNum;
    this.cmsStoreService.setState({
      type: SET_Theme_STATE,
      payload: this.themeStore,
    });
    if (localStorage)
      localStorage.setItem(
        themeFontSizeLSKey,
        this.themeStore.themeFontSize + "",
      );
    setTimeout(() => {
      /**theme-font-changer */
      this.fontSize += diffNum; // افزایش اندازه فونت
      document.documentElement.style.setProperty(
        "--font-size",
        this.getFontSize(),
      );
      /**theme-font-changer */
    }, 10);
  }

  public updateThemeMenuPin(model: ThemeStoreMenuModel[]): void {
    if (!model) return;
    this.themeStore.themeMenuPin = model;
    this.cmsStoreService.setState({
      type: SET_Theme_STATE,
      payload: this.themeStore,
    });
  }
  public updateThemeMenuPinToggel(siteId: number, menuId: number): void {
    if (!siteId || !menuId) return;
    const themeMenuPin = [...this.themeStore.themeMenuPin];
    var index = themeMenuPin.findIndex(
      (x) => x.siteId == siteId && x.menuId == menuId,
    );
    if (index >= 0) {
      themeMenuPin.splice(index, 1);
    } else {
      themeMenuPin.push({ menuId: menuId, siteId: siteId });
    }
    if (localStorage)
      localStorage.setItem(
        THEME_MENU_PIN_LOCAL_STORAGE_KEY,
        JSON.stringify(themeMenuPin),
      );
    this.themeStore.themeMenuPin = [...themeMenuPin];
    this.cmsStoreService.setState({
      type: SET_Theme_STATE,
      payload: { ...this.themeStore },
    });
  }
  public updateThemeMenuPinAdd(siteId: number, menuId: number): void {
    if (!siteId || !menuId) return;
    var index = this.themeStore.themeMenuPin.findIndex(
      (x) => x.siteId == siteId && x.menuId == menuId,
    );
    if (index >= 0) return;
    this.themeStore.themeMenuPin.push({ menuId: menuId, siteId: siteId });
    if (localStorage)
      localStorage.setItem(
        THEME_MENU_PIN_LOCAL_STORAGE_KEY,
        JSON.stringify(this.themeStore.themeMenuPin),
      );
    this.cmsStoreService.setState({
      type: SET_Theme_STATE,
      payload: this.themeStore,
    });
  }
  public updateThemeMenuPinRemove(siteId: number, menuId: number): void {
    if (!siteId || !menuId) return;
    var index = this.themeStore.themeMenuPin.findIndex(
      (x) => x.siteId == siteId && x.menuId == menuId,
    );
    if (index >= 0) this.themeStore.themeMenuPin.splice(index, 1);
    if (localStorage)
      localStorage.setItem(
        THEME_MENU_PIN_LOCAL_STORAGE_KEY,
        JSON.stringify(this.themeStore.themeMenuPin),
      );
    this.cmsStoreService.setState({
      type: SET_Theme_STATE,
      payload: this.themeStore,
    });
  }

  public updateMainPagePreloaderShow(v: boolean) {
    this.themeStore.mainPagePreloaderShow = v;
    this.cmsStoreService.setState({
      type: SET_Theme_STATE,
      payload: this.themeStore,
    });
    if (environment.consoleLog)
      console.log(
        "mainPagePreloaderShow :",
        this.themeStore.mainPagePreloaderShow,
      );
  }
  public updateInnerSize() {
    this.themeStore.innerWidth = window.innerWidth;
    this.themeStore.innerHeight = window.innerHeight;
    this.cmsStoreService.setState({
      type: SET_Theme_STATE,
      payload: this.themeStore,
    });
    if (environment.consoleLog)
      console.log(
        "windows Width :",
        window.innerWidth,
        "windows Height :",
        window.innerHeight,
      );
  }

  public onActionScrollTopPage(v: boolean, d = 0) {
    if (v == false) {
      this.themeStore.actionScrollTopPage = v;
      this.cmsStoreService.setState({
        type: SET_Theme_STATE,
        payload: this.themeStore,
      });
      if (environment.consoleLog)
        console.log(
          "windows actionGoTop :",
          this.themeStore.actionScrollTopPage,
        );
      return;
    }
    if (d > 0) {
      setTimeout(() => {
        this.themeStore.actionScrollTopPage = v;
        this.cmsStoreService.setState({
          type: SET_Theme_STATE,
          payload: this.themeStore,
        });
        if (environment.consoleLog)
          console.log(
            "windows actionGoTop :",
            this.themeStore.actionScrollTopPage,
          );
      }, 1000);
    } else {
      this.themeStore.actionScrollTopPage = v;
      this.cmsStoreService.setState({
        type: SET_Theme_STATE,
        payload: this.themeStore,
      });
      if (environment.consoleLog)
        console.log(
          "windows actionGoTop :",
          this.themeStore.actionScrollTopPage,
        );
    }
  }

  public onActionScrollTopList(v: boolean, d = 0) {
    if (v == false) {
      this.themeStore.actionScrollTopList = v;
      this.cmsStoreService.setState({
        type: SET_Theme_STATE,
        payload: this.themeStore,
      });
      if (environment.consoleLog)
        console.log(
          "windows actionGoTop :",
          this.themeStore.actionScrollTopList,
        );
      return;
    }
    if (d > 0) {
      setTimeout(() => {
        this.themeStore.actionScrollTopList = v;
        this.cmsStoreService.setState({
          type: SET_Theme_STATE,
          payload: this.themeStore,
        });
        if (environment.consoleLog)
          console.log(
            "windows actionGoTop :",
            this.themeStore.actionScrollTopList,
          );
      }, 1000);
    } else {
      this.themeStore.actionScrollTopList = v;
      this.cmsStoreService.setState({
        type: SET_Theme_STATE,
        payload: this.themeStore,
      });
      if (environment.consoleLog)
        console.log(
          "windows actionGoTop :",
          this.themeStore.actionScrollTopList,
        );
    }
  }

  public cleanDataMenu(): void {
    if (this.themeStore?.dataMenu?.length > 0) {
      this.themeStore.dataMenu = "";
      this.cmsStoreService.setState({
        type: SET_Theme_STATE,
        payload: this.themeStore,
      });
    }
  }
}
