import { bootstrapApplication } from "@angular/platform-browser";
import { App } from "./app/app";
import { appConfig } from "./app/app.config";
import { FormSubmitedStatusEnum } from "./app/core/models/formSubmitedStatusEnum";
import { FormValidationStatusEnum } from "./app/core/models/formValidationStatusEnum";

(
  globalThis as typeof globalThis & {
    FormSubmitedStatusEnum?: typeof FormSubmitedStatusEnum;
  }
).FormSubmitedStatusEnum = FormSubmitedStatusEnum;
(
  globalThis as typeof globalThis & {
    FormValidationStatusEnum?: typeof FormValidationStatusEnum;
  }
).FormValidationStatusEnum = FormValidationStatusEnum;
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
