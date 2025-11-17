import { bootstrapApplication } from "@angular/platform-browser";
import { FormSubmitedStatusEnum } from "ntk-cms-api";
import { App } from "./app/app";
import { appConfig } from "./app/app.config";

(
  globalThis as typeof globalThis & {
    FormSubmitedStatusEnum?: typeof FormSubmitedStatusEnum;
  }
).FormSubmitedStatusEnum = FormSubmitedStatusEnum;

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
