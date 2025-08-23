import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from "@angular/common/http";
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  inject,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  Type,
} from "@angular/core";
import { MAT_CHIPS_DEFAULT_OPTIONS } from "@angular/material/chips";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { provideServiceWorker } from "@angular/service-worker";
import { MAT_COLOR_FORMATS, NGX_MAT_COLOR_FORMATS } from "@ngxmc/color-picker";
import { InlineSVGModule } from "ng-inline-svg-2";
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from "ng2-currency-mask";
import { ClipboardModule } from "ngx-clipboard";
import { ToastrModule } from "ngx-toastr";
import {
  CoreAuthV3Service,
  CoreConfigurationService,
  CoreEnumService,
  CoreModuleService,
} from "ntk-cms-api";
import { routes } from "./app.routes";
import { CmsTranslateModule } from "./core/i18n";
import { DYNAMIC_ENVIRONMENT_PROVIDER } from "./core/providers/dynamic-environment.provider";
import { CmsStoreModule } from "./core/reducers/cmsStore.module";
import { CmsStoreService } from "./core/reducers/cmsStore.service";
import { CmsAuthService } from "./core/services/cmsAuth.service";
import { CmsToastrService } from "./core/services/cmsToastr.service";
import { SharedModule } from "./shared/shared.module";

declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
  }
}
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 0,
  prefix: "",
  suffix: "",
  thousands: " ",
};
function appInitializer(authService: CmsAuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getTokenInfoType().subscribe().add(resolve);
    });
  };
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideAppInitializer(() => {
      const authService = inject(CmsAuthService);
      appInitializer(authService);
    }),
    CmsAuthService,
    CmsToastrService,
    CoreAuthV3Service,
    CoreEnumService,
    CoreModuleService,
    CoreConfigurationService,
    importProvidersFrom(CmsStoreService.forRoot()),
    importProvidersFrom(ClipboardModule),
    importProvidersFrom(CmsTranslateModule.forRoot()),
    importProvidersFrom(SharedModule.forRoot()),
    importProvidersFrom(CmsStoreModule.forRoot()),
    importProvidersFrom(InlineSVGModule.forRoot()),
    importProvidersFrom(
      ToastrModule.forRoot({
        // timeOut: 0,
        timeOut: 5000,
        enableHtml: true,
        positionClass: "toast-bottom-right",
        // positionClass: "toast-bottom-full-width",
        preventDuplicates: true,
        closeButton: true,
        // extendedTimeOut: 0,
        extendedTimeOut: 1000,
      }),
    ),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [CmsAuthService],
    },
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: { separatorKeyCodes: [13] },
    },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    DYNAMIC_ENVIRONMENT_PROVIDER,
  ],
};
