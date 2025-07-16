// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { DeviceTypeEnum, OperatingSystemTypeEnum } from 'ntk-cms-api';
import { EnvironmentModel } from '../app/core/models/environmentModel';
import { LanguageFlagModel } from 'src/app/core/models/languageFlagModel';
declare var require: any;

export const environment:EnvironmentModel = {
  production: false,
  checkAccess: false,
  consoleLog: false,
  appVersion: require('../../package.json').version,
  appName: require('../../package.json').name,
  authKey: 'authf649fc9a5f55',
  loadDemoTheme: false,
  ProgressConsoleLog: false,
  leafletUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  mainTitle: 'سامانه مدیریتی محتوا',
  cmsServerConfig: {
    configApiRetry: 1,
    //configApiServerPath: 'https://apicms.ir/api/v2/',
    configApiServerPath: 'https://localhost:2390/api/v3/', // Test Api
    //configApiServerPath: 'https://6f4pj689-7130.euw.devtunnels.ms/api/v2/', // Test Api
    //configApiServerPath: 'https://localhost:44342/api/v2/', // Test Api Docer
    configHubServerPath: 'https://apicms.ir/hub/',
    //configHubServerPath: 'https://localhost:2390/hub/',
    configFileServerPath: 'https://apifile.ir/api/v2/',
    configQDocServerPath: 'https://qdoc.ir/api/chat',
    configCompanyWebSite: 'https://ntk.ir',
    modules: [''],
  },
  cmsTokenConfig: {
    SecurityKey: '123456789',
    ClientMACAddress: '',
    osType: OperatingSystemTypeEnum.Windows,
    DeviceType: DeviceTypeEnum.WebSite,
    PackageName: '',
  },
  cmsViewConfig: {
    mobileWindowInnerWidth: 1000,
    tableRowMouseEnter: true,
    enterAnimationDuration: '1500ms',
    exitAnimationDuration: '1000ms'
  },
  USERDATA_KEY: 'authf649fc9a5f55',
  languages: [
    {
      lang: 'fa',
      name: 'فارسی',
      flag: './assets/media/flags/iran.svg',
    },
    {
      lang: 'ar',
      name: 'عربی',
      flag: './assets/media/flags/united-arab-emirates.svg',
    },
    {
      lang: 'en',
      name: 'English',
      flag: './assets/media/flags/united-states.svg',
    },
    {
      lang: 'zh',
      name: 'China',// 'Mandarin',
      flag: './assets/media/flags/china.svg',
    },
    {
      lang: 'es',
      name: 'Spanish',
      flag: './assets/media/flags/spain.svg',
    },
    {
      lang: 'ja',
      name: 'Japanese',
      flag: './assets/media/flags/japan.svg',
    },
    {
      lang: 'de',
      name: 'German',
      flag: './assets/media/flags/germany.svg',
    },
    {
      lang: 'fr',
      name: 'French',
      flag: './assets/media/flags/france.svg',
    }
  ]


};

