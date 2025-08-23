import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EnvironmentModel } from '../models/environmentModel';
import { DeviceTypeEnum, OperatingSystemTypeEnum } from "ntk-cms-api";
import { ServerConfigService, ServerConfig } from './server-config.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicEnvironmentService {
  private environmentSubject = new BehaviorSubject<EnvironmentModel | null>(null);
  public environment$ = this.environmentSubject.asObservable();

  constructor(private serverConfigService: ServerConfigService) {
    this.initializeEnvironment();
  }

  /**
   * Initialize environment with dynamic server config
   */
  private initializeEnvironment(): void {
    this.serverConfigService.loadServerConfig().subscribe(serverConfig => {
      const environment = this.createEnvironmentWithServerConfig(serverConfig);
      this.environmentSubject.next(environment);
    });
  }

  /**
   * Create environment object with dynamic server configuration
   */
  private createEnvironmentWithServerConfig(serverConfig: ServerConfig): EnvironmentModel {
    return {
      production: false,
      checkAccess: false,
      consoleLog: false,
      appVersion: '1.0.0',
      appName: 'CMS',
      authKey: "authf649fc9a5f55",
      loadDemoTheme: false,
      ProgressConsoleLog: false,
      leafletUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      mainTitle: "سامانه مدیریتی محتوا",
      cmsServerConfig: serverConfig,
      cmsTokenConfig: {
        SecurityKey: "123456789",
        ClientMACAddress: "",
        osType: OperatingSystemTypeEnum.Windows,
        DeviceType: DeviceTypeEnum.WebSite,
        PackageName: "",
      },
      cmsViewConfig: {
        mobileWindowInnerWidth: 1000,
        tableRowMouseEnter: true,
        enterAnimationDuration: "1500ms",
        exitAnimationDuration: "1000ms",
      },
      USERDATA_KEY: "authf649fc9a5f55",
      languagesDefault: "fa",
      languages: [
        {
          lang: "fa",
          name: "فارسی",
          flag: "./assets/media/flags/iran.svg",
        },
        {
          lang: "ar",
          name: "عربی",
          flag: "./assets/media/flags/united-arab-emirates.svg",
        },
        {
          lang: "en",
          name: "English",
          flag: "./assets/media/flags/united-states.svg",
        },
        {
          lang: "zh",
          name: "China",
          flag: "./assets/media/flags/china.svg",
        },
        {
          lang: "es",
          name: "Spanish",
          flag: "./assets/media/flags/spain.svg",
        },
        {
          lang: "ja",
          name: "Japanese",
          flag: "./assets/media/flags/japan.svg",
        },
        {
          lang: "de",
          name: "German",
          flag: "./assets/media/flags/germany.svg",
        },
        {
          lang: "fr",
          name: "French",
          flag: "./assets/media/flags/france.svg",
        },
      ],
    };
  }

  /**
   * Get current environment configuration
   */
  get environment(): EnvironmentModel {
    const currentEnv = this.environmentSubject.value;
    if (!currentEnv) {
      throw new Error('Environment not initialized. Server config is still loading.');
    }
    return currentEnv;
  }

  /**
   * Get environment as observable
   */
  getEnvironment(): Observable<EnvironmentModel> {
    return this.environment$;
  }

  /**
   * Reload server configuration
   */
  reloadServerConfig(): Observable<EnvironmentModel> {
    return this.serverConfigService.reloadServerConfig().pipe(
      map(serverConfig => {
        const environment = this.createEnvironmentWithServerConfig(serverConfig);
        this.environmentSubject.next(environment);
        return environment;
      })
    );
  }
}
