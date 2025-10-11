import { DeviceTypeEnum, OperatingSystemTypeEnum } from "ntk-cms-api";
import { LanguageFlagModel } from "./languageFlagModel";

export interface EnvironmentModel {
  production: boolean;
  checkAccess: boolean;
  consoleLog: boolean;
  appVersion: string;
  appName: string;
  authKey: string;
  loadDemoTheme: boolean;
  ProgressConsoleLog: boolean;
  leafletUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  mainTitle: string;
  cmsServerConfig: EnvironmentCmsServerConfig;
  cmsTokenConfig: EnvironmentCmsTokenConfig;
  cmsViewConfig: EnvironmentCmsViewConfig;
  languages: LanguageFlagModel[];
  USERDATA_KEY: string;
  languagesDefault: string;
}
export interface EnvironmentCmsServerConfig {
  configApiRetry: number;
  configApiServerPath: string;
  configHubServerPath: string;
  configFileServerPath: string;
  configQDocServerPath: string;
  configCompanyWebSite: string;
  modules: [""];
}
export interface EnvironmentCmsTokenConfig {
  SecurityKey: string;
  ClientMACAddress: string;
  osType: OperatingSystemTypeEnum;
  DeviceType: DeviceTypeEnum;
  PackageName: string;
}
export interface EnvironmentCmsViewConfig {
  mobileWindowInnerWidth: number;
  tableRowMouseEnter: boolean;
  enterAnimationDuration: string;
  exitAnimationDuration: string;
}
