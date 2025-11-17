import { FormSubmitedStatusEnum as ApiFormSubmitedStatusEnum } from "ntk-cms-api";

declare global {
  /**
   * Global re-export of FormSubmitedStatusEnum so legacy components that
   * reference it without explicit imports still compile.
   */
  const FormSubmitedStatusEnum: typeof ApiFormSubmitedStatusEnum;
  type FormSubmitedStatusEnum = ApiFormSubmitedStatusEnum;
}

export {};
